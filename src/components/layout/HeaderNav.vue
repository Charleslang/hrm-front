<template>
  <div id="header-nav">
    <div class="left">
      <span class="left-icon" @click="toggleMenuCollapse">
        <i :class="{'el-icon-s-unfold' : menuCollapse, 'el-icon-s-fold' : !menuCollapse}"></i>
      </span>
      <span>成都信息工程大学</span>
    </div>
    <div class="right">
      <el-avatar class="right-avatar">张三</el-avatar>
      <el-dropdown class="right-down" trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profile">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout" @click.native.prevent="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
  

  export default {
    data() {
      return {
        menuCollapse: false
      }
    },
    methods: {
      toggleMenuCollapse() {
        this.menuCollapse = !this.menuCollapse
        this.$emit('toggleMenuCollapse', this.menuCollapse)
      },
      async logout() {
        // this.$emit('logout')
        await this.$store.dispatch('logout')
        this.$router.push('/')
      },
      handleCommand(command) {
        console.log(command)
      }
    }
    
  }
</script>

<style scoped>
 #header-nav {
   height: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
 }
 .left-icon {
   padding-right: 15px;
   font-size: 20px;
   vertical-align: middle;
   cursor: pointer;
 }
 .right {
   display: flex;
   align-items: flex-end;
 }
 .right-avatar {
   margin-right: 10px;
 }
 .right-down .el-dropdown-link {
   cursor: pointer;
 }
</style>