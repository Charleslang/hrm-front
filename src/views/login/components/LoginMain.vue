<template>
  <div id="login-main">
    <el-tabs value="pwd">
      <el-tab-pane label="密码登录" name="pwd">
        <div class="form-wrapper">
          <el-form  status-icon ref="ruleForm" label-width="0" class="login-form">
            <el-form-item prop="pass">
              <el-input autocomplete="off" placeholder="登录名/手机号/邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password"  autocomplete="off" placeholder="密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="submit-btn" type="primary" @click="toBackend">登&nbsp;录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="验证码登录" name="code">
        <div class="form-wrapper">
          <el-form  status-icon ref="ruleForm" label-width="0" class="login-form">
            <el-form-item prop="pass">
              <el-input autocomplete="off" placeholder="手机号/邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input autocomplete="off" placeholder="请输入验证码" maxlength="6">
                <template v-slot:suffix>
                  <el-button type="text">获取验证码</el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="submit-btn" type="primary">登&nbsp;录</el-button>
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
  export default {
    methods: {
      toReset() {
        this.$router.push('/portal/reset')
      },
      toRegister() {
        this.$router.push('/portal/register')
      },
      toBackend() {
        this.$router.push('/backend')
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
</style>