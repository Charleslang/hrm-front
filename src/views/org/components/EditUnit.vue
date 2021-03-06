<template>
  <div id="container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="form-wrapper">
        <div> 
          <el-divider content-position="left"><b>单位信息</b></el-divider>
            <el-form ref="unitForm" :model="unitInfo" :rules="unitRules" status-icon label-width="80px" size="mini">
              <el-input v-model.trim="unitInfo.id" type="hidden"></el-input>
              <el-form-item prop="name" label="公司名称">
                <el-input v-model.trim="unitInfo.name"></el-input>
              </el-form-item>
              <el-form-item prop="shortName" label="简称">
                <el-input v-model.trim="unitInfo.shortName"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-switch
                  :width="50"
                  style="display: block"
                  v-model="unitInfo.enable"
                  active-color="#13ce66"
                  inactive-color="#DCDFE6"
                  active-text="启用"
                  inactive-text="禁用"
                  class="edit-switch">
                </el-switch>
              </el-form-item>
              <el-form-item prop="address" label="地址">
                <el-input v-model.trim="unitInfo.address"></el-input>
              </el-form-item>
              <el-form-item prop="postcode" label="邮编">
                <el-input v-model.trim="unitInfo.postcode" oninput ="value=value.replace(/[^0-9]/g,'')" maxlength="6"></el-input>
              </el-form-item>
              <el-form-item prop="telephone" label="电话">
                <el-input v-model.trim="unitInfo.telephone"></el-input>
              </el-form-item>
              <el-form-item  prop="website" label="网址">
                <el-input v-model.trim="unitInfo.website"></el-input>
              </el-form-item>
              <el-form-item prop="email" label="邮箱">
                <el-input v-model.trim="unitInfo.email"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model.trim="unitInfo.description" maxlength="200" show-word-limit></el-input>
              </el-form-item>
            </el-form>
        </div>
        <div>
          <el-divider content-position="left"><b>管理员信息</b></el-divider>
          <el-form ref="userForm" :model="adminInfo" :rules="userRules" status-icon label-width="80px" size="mini">
            <el-form-item prop="name" label="姓名">
              <el-input v-model.trim="adminInfo.name"></el-input>
            </el-form-item>
            <el-form-item prop="username" label="登录名">
              <el-input v-model.trim="adminInfo.username"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
              <el-input v-model.trim="adminInfo.password" type="password" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item prop="password2" label="确认密码">
              <el-input v-model.trim="adminInfo.password2" type="password" maxlength="20"></el-input>
            </el-form-item>
            
          </el-form>  
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Unit} from 'obj/Unit'
  import {UserAdmin} from 'obj/User'
  import {isBlank, validateUnitName, validatePostcode, validatePhone, 
  validateURL, validateEmail, validatePassword} from 'utils/validate'

  export default {
    props: {
      unit: {
        type: Object,
        default() {
          return {}
        }
      },
      admin: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      const validateName = (rule, value, callback) => {
        if (!validateUnitName(value)) {
          return callback(new Error('公司名称长度不能小于2'))
        }
        callback()
      }

      const validateShortName = (rule, value, callback) => {
        if (value && isBlank(value)) {
          return callback(new Error('请输入有效的公司简称'))
        }
        callback()
      }

      const validateAddress = (rule, value, callback) => {
        if (value && isBlank(value)) {
          return callback(new Error('请输入有效的地址'))
        }
        callback()
      }

      const validateUnitPostcode = (rule, value, callback) => {
        if (value && !validatePostcode(value)) {
          return callback(new Error('邮编格式不正确'))
        }
        callback()
      }

      const validateTel = (rule, value, callback) => {
        if (value && !validatePhone(value)) {
          return callback(new Error('电话格式不正确'))
        }
        callback()
      }

      const validateWebsite = (rule, value, callback) => {
        if (value && !validateURL(value)) {
          return callback(new Error('网址格式错误'))
        }
        callback()
      }

      const validateUnitEmail = (rule, value, callback) => {
        if (value && !validateEmail(value)) {
          return callback(new Error('邮箱格式错误'))
        }
        callback()
      }

      const validatePwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码'))
        } else if (value != this.admin.password && !validatePassword(value)) {
          return callback(new Error('密码应该为6-20位, 且同时含有大小写字母和数字'))
        }
        callback()
      }

      const validatePwd2 = (rule, value, callback) => {
        if (value != this.adminInfo.password) {
          return callback(new Error('两次输入的密码不一致'))
        }
        callback()
      }

      const validateAdminName = (rule, value, callback) => {
        if (isBlank(value)) {
          return callback(new Error('姓名不能为空'))
        }
        callback()
      }

      const validateUserName = (rule, value, callback) => {
        if (isBlank(value)) {
          return callback(new Error('用户名不能为空'))
        }
        callback()
      }
      return {
        unitInfo: {},
        adminInfo: {},
        unitRules: {
          name: [
            {required: true, message: `单位名称不能为空`, trigger: 'blur'},
            {validator: validateName, trigger: 'blur'}
          ],
          shortName: [
            {validator: validateShortName, trigger: 'blur'}
          ],
          address: [
            {validator: validateAddress, trigger: 'blur'}
          ],
          postcode: [
            {validator: validateUnitPostcode, trigger: 'blur'}
          ],
          telephone: [
            {validator: validateTel, trigger: 'blur'}
          ],
          website: [
            {validator: validateWebsite, trigger: 'blur'}
          ],
          email: [
            {validator: validateUnitEmail, trigger: 'blur'}
          ],
        },
        userRules: {
          name: [
            {required: true, message: `姓名不能为空`, trigger: 'blur'},
            {validator: validateAdminName, trigger: 'blur'}
          ],
          username: [
            {required: true, message: `登录名不能为空`, trigger: 'blur'},
            {validator: validateUserName, trigger: 'blur'}
          ],
          password: [
            {required: true, message: `密码不能为空`, trigger: 'blur'},
            {validator: validatePwd, trigger: 'blur'}
          ],
          password2: [
            {required: true, message: `密码不能为空`, trigger: 'blur'},
            {validator: validatePwd2, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      isUpdate() {
        return Object.keys(this.unit).length > 0
      }
    },
    created() {
      if (this.isUpdate) {
        this.unitInfo = Object.assign({}, this.unit)
        this.adminInfo = Object.assign({}, this.admin)
        this.$set(this.adminInfo, 'password2', this.adminInfo.password)
      } else {
        this.unitInfo = new Unit()
        this.adminInfo = new UserAdmin()
        this.$set(this.adminInfo, 'password2', '')
      }
    },
    destroyed() {
    },
    watch: {
      unitInfo(newV, oldV) {

      }
    }
  }
</script>

<style scoped>
  #container {
    height: 100%;
    width: 100%;
  }
  .form-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .form-wrapper > div {
    width: 45%;
  }
</style>