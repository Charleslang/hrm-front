<template>
  <el-container>
    <el-aside width="210px">
      <el-menu
        mode="vertical"
      router>
        <side-menu :menu-list="routes"/>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <app-main/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import AppMain from './AppMain'
  import SideMenu from './SideMenu'

  export default {
    components: {
      AppMain,
      SideMenu
    },
    data() {
      return {
        routes: this.$router.options.routes
      }
    },
    create() {
      console.log(this.routes)
    }
  }
</script>

<style>

</style>