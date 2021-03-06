<template>
  <div id="register">
    <div class="top">
      <div @click="toLogin"><i class="el-icon-back"></i></div>
      <span>注册</span>
    </div>
    <div class="form-container">
      <el-form :model="registForm" :rules="rules" status-icon ref="registForm" label-width="0" class="login-form">
        <el-form-item prop="companyName">
          <el-input v-model.trim="registForm.companyName" placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item prop="telephone">
          <el-input v-model.trim="registForm.telephone" autocomplete="off" placeholder="手机号" 
            oninput ="value=value.replace(/[^0-9]/g,'')" maxlength="11" :disabled="codeBtnDisabled"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model.number="registForm.code" autocomplete="off" placeholder="请输入验证码" 
            oninput ="value=value.replace(/[^0-9]/g,'')" maxlength="6">
            <template v-slot:suffix>
              <el-button type="text" @click="sendCode" :loading="codeBtnLoading" 
                :disabled="!isValidetedPhone || codeBtnDisabled">
                {{showCodeMsg}}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="registForm.password" placeholder="密码, 6-20位, 同时含有大小写字母和数字" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit-btn" type="primary" :loading="registLoading" @click="regist">
            注&nbsp;册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {validatePhone, validatePassword} from 'utils/validate'
  import {sendCode} from 'api/code'
  import {regist} from 'api/app'
  import {messageDuration} from '@/settings'

  export default {
    
    data() {
      const validateCompanyName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入公司名称'))
        }
        callback()
      }
      const validateTele = (rule, value, callback) => {
        if (!validatePhone(value)) {
          this.isValidetedPhone = false
          return callback(new Error('手机号格式不正确'))
        }
        this.isValidetedPhone = true
        callback()
      }
      const validateCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入验证码'))
        }
        callback()
      }
      const validatePwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码'))
        } else if (!validatePassword(value)) {
          return callback(new Error('密码应该为6-20位, 且同时含有大小写字母和数字'))
        }
        callback()
      }
      return {
        registForm: {
          companyName: '',
          telephone: '',
          code: '',
          password: ''
        },
        rules: {
          companyName: [
            {min: 2, max: 100, message: '公司名称至少为2个字符', trigger: 'blur'},
            {validator: validateCompanyName, trigger: 'blur'},
          ],
          telephone: [
            {validator: validateTele, trigger: 'blur'}
          ],
          code: [
            {validator: validateCode, trigger: 'blur'}
          ],
          password: [
            {validator: validatePwd, trigger: 'blur'}
          ]
        },
        timer: null,
        second: 59,
        codeBtnLoading: false,
        registLoading: false,
        isValidetedPhone: false
      }
    },
    computed: {
      showCodeMsg() {
        let msg = '获取验证码'
        if (this.timer != null) {
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
        if (this.isValidetedPhone) {
          this.codeBtnLoading = true
          sendCode(this.registForm.telephone, 'register').then(res => {
            this.codeBtnLoading = false
            this.$message({
              type: 'success',
              message: '验证码已发送',
              duration: messageDuration
            })
            this.startCountdown()
          }, err => {
            this.codeBtnLoading = false
            console.log('register : ' + err)
          })
        }
      },
      startCountdown() {
        this.timer = setInterval(() => {
          if (this.second <= 1) {
            clearInterval(this.timer)
            this.timer = null
            this.second = 59
          }
          this.second--
        }, 1000)
      },
      regist() {
        this.$refs.registForm.validate(valid => {
          if (valid) {
            this.registLoading = true
            regist(this.registForm).then(res => {
              this.registLoading = false
              this.$message({
                type: 'success',
                message: '注册成功',
                duration: messageDuration
              })
              this.$router.push('/portal')
            }, err => {
              this.registLoading = false
              console.log("register : " + err)
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