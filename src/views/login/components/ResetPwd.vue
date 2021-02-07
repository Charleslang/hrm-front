<template>
  <div id="reset-pwd">
    <div class="top">
      <div @click="toLogin()"><i class="el-icon-back"></i></div>
      <span>重置密码</span>
    </div>
    <div class="form-container">
      <el-form :model="resetForm" :rules="rules" status-icon ref="resetForm" label-width="0" class="login-form">
        <el-form-item prop="account">
          <el-input v-model.trim="resetForm.account" autocomplete="off" placeholder="手机号/邮箱" :disabled="codeBtnDisabled"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model.number="resetForm.code" autocomplete="off" placeholder="请输入验证码" 
            oninput ="value=value.replace(/[^0-9]/g,'')" maxlength="6">
            <template v-slot:suffix>
              <el-button type="text" @click="sendCode" 
                :disabled="!isValidatedAccount || codeBtnDisabled" :loading="sendCodeLoading">
                {{ showCodeBtnMsg }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="resetForm.password" placeholder="新密码, 6-20位, 同时含有大小写字母和数字" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit-btn" type="primary" @click="resetPwd" :loading="confirmLoading">
            确&nbsp;认
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {Message} from 'element-ui'

  import {isBlank, validatePhone, validateEmail, validatePassword} from 'utils/validate'
  import {sendCode} from 'api/code'
  import {resetPassword} from 'api/user'
  import {messageDuration} from '@/settings'

  export default {
    data() {
      const validateAccount = (rule, value, callback) => {
        if (!validatePhone(value) && !validateEmail(value)) {
          this.isValidatedAccount = false
          return callback(new Error('手机号或邮箱格式不正确'))
        }
        this.isValidatedAccount = true
        callback()
      }
      const validateCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入验证码'))
        }
        callback()
      }
      const validatePwd = (rule, value, callback) => {
        if (isBlank(value)) {
          return callback(new Error('请输入密码'))
        } else if (!validatePassword(value)) {
          return callback(new Error('密码应该同时含有大写字母、小写字母和数字'))
        }
        callback()
      }
      return {
        resetForm: {
          account: '',
          code: '',
          password: ''
        },
        rules: {
          account: [
            {validator: validateAccount, trigger: 'blur'}
          ],
          code: [
            {validator: validateCode, trigger: 'blur'}
          ],
          password: [
            {min: 6, max: 20, message: '密码长度应该为6-20位', trigger: 'blur'},
            {validator: validatePwd, trigger: 'blur'}
          ]
        },
        isValidatedAccount: false,
        sendCodeLoading: false,
        confirmLoading: false,
        timer: null,
        second: 59
      }
    },
    computed: {
      showCodeBtnMsg() {
        let msg = '获取验证码'
        if(this.timer != null) {
          msg = '重新发送(' + this.second + 's)'
        }
        return msg
      },
      codeBtnDisabled() {
        return this.timer != null
      }
    },
    methods: {
      toLogin() {
        this.$router.push('/portal')
      },
      sendCode() {
        this.sendCodeLoading = true
        sendCode(this.resetForm.account).then(res => {
          this.sendCodeLoading = false
          Message({
            message: '验证码已发送',
            type: 'success',
            duration: messageDuration
          })
          this.timer = setInterval(() => {
            if (this.second <= 1) {
              clearInterval(this.timer)
              this.timer = null
              this.second = 59
            }
            this.second--
          }, 1000)
        }, err => {
          this.sendCodeLoading = false
          console.log('resetPwd : ' + err)
        })
      },
      resetPwd() {
        this.$refs.resetForm.validate(valid => {
          if (valid) {
            // if (!this.codeBtnDisabled) {
            //   Message({
            //     type: 'error',
            //     message: '验证码错误或已失效, 请重新发送',
            //     duration: messageDuration
            //   })
            //   return
            // }
            this.confirmLoading = true
            resetPassword(this.resetForm).then(res => {
              Message({
                type: 'success',
                message: '密码修改成功',
                duration: messageDuration
              })
              this.confirmLoading = false
              this.$router.push('/portal')
            }, err => {
              this.confirmLoading = false
              console.log("resetPwd : " + err)
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .top {
    font-size: 23px;
    display: flex;
  }
  .top div {
    cursor: pointer;
  }
  .top span {
    margin-left: 15px;
  }

 .form-container {
   margin-top: 26px;
 }
 .submit-btn {
   width: 100%;
 }
</style>