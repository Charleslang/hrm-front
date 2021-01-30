<template>
  <div id="reset-pwd">
    <div class="top">
      <div @click="toLogin()"><i class="el-icon-back"></i></div>
      <span>重置密码</span>
    </div>
    <div class="form-container">
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
          <el-input placeholder="请输入新密码, 长度为6-20位" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit-btn" type="primary">确&nbsp;认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      toLogin() {
        this.$router.push('/portal')
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