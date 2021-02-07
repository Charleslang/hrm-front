<template>
  <div id="login-main">
    <el-tabs value="pwd">
      <el-tab-pane label="密码登录" name="pwd">
        <div class="form-wrapper">
          <el-form :model="pwdForm" :rules="pwdRules" status-icon ref="pwdForm" label-width="0" class="pwd-form">
            <el-form-item prop="account">
              <el-input v-model.trim="pwdForm.account" autocomplete="off" placeholder="登录名/手机号/邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="pwdForm.password" autocomplete="off" placeholder="密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="submit-btn" type="primary" @click="loginWithPwd" :loading="loading">登&nbsp;录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="验证码登录" name="code">
        <div class="form-wrapper">
          <el-form :model="codeForm" :rules="codeRules" status-icon ref="codeForm" label-width="0" class="login-form">
            <el-form-item prop="account">
              <el-input v-model.trim="codeForm.account" autocomplete="off" placeholder="手机号/邮箱" :disabled="codeBtnDisabled"></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input v-model.number="codeForm.code" autocomplete="off" placeholder="请输入验证码" 
                oninput ="value=value.replace(/[^0-9]/g,'')" maxlength="6">
                <template v-slot:suffix>
                  <el-button type="text" @click="sendCode" :disabled="codeBtnDisabled" 
                    :class="{'btn-disabled' : codeBtnDisabled}" :loading="codeBtnLoading">
                    {{ showCodeBtnMsg }}
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="submit-btn" type="primary" :loading="loading" @click="loginWithCode">
                登&nbsp;录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="bottom">
      <div class="reset-div" @click="toReset">忘记密码</div>
      <div class="center-div">|</div>
      <div class="register-div" @click="toRegister">注册</div>
    </div>
  </div>
</template>

<script>
  import {isBlank, validatePhone, validateEmail, validateNumber} from 'utils/validate'

  import {loginWithPwd, loginWithCode} from 'api/login'
  import {sendCode} from 'api/code'

  import {Message} from 'element-ui'

  export default {
    data() {
      const validateAccount = (rule, value, callback) => {
        if(isBlank(value)) {
          return callback(new Error('请输入账号'))
        }
        callback()
      }
      const validatePassword = (rule, value, callback) => {
        if(!value) {
          return callback(new Error('请输入密码'))
        }
        callback()
      }
      const validateCodeAccount = (rule, value, callback) => {
        if (!validatePhone(value) && !validateEmail(value)) {
          return callback(new Error('手机号或邮箱格式不正确'))
        }
        callback()
      }
      return {
        pwdForm: {
          account: '',
          password: ''
        },
        pwdRules: {
          account: [
            {validator: validateAccount, trigger: 'blur'}
          ],
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ]
        },
        codeForm: {
          account: '',
          code: ''
        },
        codeRules: {
          account: [
            {validator: validateCodeAccount, trigger: 'blur'}
          ]
        },
        loading: false,
        timer: null,
        second: 59,
        codeBtnLoading: false
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
      toReset() {
        this.$router.push('/portal/reset')
      },
      toRegister() {
        this.$router.push('/portal/register')
      },
      toBackend() {
        this.$router.push('/backend')
      },
      sendCode() {
        this.$refs.codeForm.validate(valid => {
          if (valid) {
            this.codeBtnLoading = true
            sendCode(this.codeForm.account).then(res => {
              console.log(res)
              this.codeBtnLoading = false
              Message({
                message: '验证码已发送',
                type: 'success'
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
              this.codeBtnLoading = false
              console.log('loginMain : ' + err)
            })
          } else {
            return false
          }
        })
      },
      loginWithPwd() {
        this.$refs.pwdForm.validate((valid) => {
          if(valid) {
            this.loading = true
            loginWithPwd(this.pwdForm).then(res => {
              this.$store.commit('setToken', res.data.accessToken)
              this.loading = false
              this.$router.push('/backend')
            }, err => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      loginWithCode() {
        this.$refs.codeForm.validate(valid => {
          if(valid) {
            if(this.timer === null || this.second <= 1) {
              Message({
                type: 'error',
                message: '验证码错误或已失效, 请重新发送'
              })
              return
            }
            this.loading = true
            loginWithCode(this.codeForm).then(res => {
              this.$store.commit('setToken', res.data.accessToken)
              this.loading = false
              this.$router.push('/backend')
            }, err => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-wrapper {
    margin-top: 20px;
  }
  .submit-btn {
    width: 100%;
    color: #fff;
  }
  #login-main .bottom {
    color: #666;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
  }

  #login-main .bottom .center-div {
    margin: 0 10px;
  }

  #login-main .bottom .reset-div, 
  #login-main .bottom .register-div {
    cursor: pointer;
  }
  #login-main .bottom .reset-div:hover, 
  #login-main .bottom .register-div:hover {
    color: #409EFF;
  }
  .btn-disabled {
    color: #c0c4cc
  }
</style>