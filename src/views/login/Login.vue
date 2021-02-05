<template>
  <div id="login">
    <el-container id="container">
      <el-header class="header">
        <header-nav/>
      </el-header>
      <el-main class="login-main">
        <el-card class="card-container"><router-view/></el-card>
        <!-- <login-main/> -->
      </el-main>
      <el-footer class="login-footer">
        <login-footer/>
      </el-footer>
    </el-container>
    <!-- <el-form :model="ruleForm" :status-icon="Boolean(false)" :rules="rules" ref="ruleForm" label-width="80px" 
    class="demo-ruleForm" label-position="right"  size="small"
    >
      <el-form-item label="密码" prop="pass" :required="Boolean(true)">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="submitForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>
  import HeaderNav from './components/HeaderNav'
  import LoginMain from './components/LoginMain'
  import LoginFooter from './components/LoginFooter'
  // import {login} from 'api/login'

  export default {
    components: {
      HeaderNav,
      LoginMain,
      LoginFooter
    },
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { type: 'password', required: true, validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            login().then(res => {
              console.log("登陆成功了")
              this.$router.push('/home')
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  #login, #container {
    width: 100%;
    height: 100%;
  }
  .header {
    display: flex;
    align-items: center;
    height: 71px !important;
    width: 100%;
    padding: 0 233px;
    box-shadow: 0 2px 3px #eee;
    transition: box-shadow 0.2s;
    position: fixed;
    top: 0;
    background-color: #fff;
    z-index: 10;
  }
  .login-main {
    width: 100%;
    margin-top: 71px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card-container {
    width: 460px;
    padding: 20px;
  }
</style>