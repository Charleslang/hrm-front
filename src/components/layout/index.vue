<template>
  <el-container>
    <el-aside width="auto" class="menu-wrapper">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
          mode="vertical"
          :collapse="menuCollapse"
          :default-active="activeMenu"
          router
          class="el-menu-vertical">
          <side-menu :menu-list="routes"/>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="header-nav">
        <header-nav @toggleMenuCollapse="toggleMenuCollapse"></header-nav>
      </el-header>
      <el-main class="app-main-wrapper">
        <app-main/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import AppMain from './AppMain'
  import SideMenu from './SideMenu'
  import HeaderNav from './HeaderNav'

  export default {
    components: {
      AppMain,
      SideMenu,
      HeaderNav
    },
    computed: {
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      }
    },
    data() {
      return {
        routes: this.$router.options.routes,
        menuCollapse: false
      }
    },
    create() {
      console.log(this.routes)
    },
    methods: {
      toggleMenuCollapse(menuCollapse) {
        this.menuCollapse = menuCollapse
      }
    }
  }
</script>

<style scoped>
  .el-container {
    height: 100%;
  }
  .menu-wrapper {
    background-color: #304156;
    height: 100%;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-header {
    box-shadow: 0 2px 3px #eee;
  }
  .header-nav {
    background-color: #ffffff;
  }
  .app-main-wrapper {
    background-color: #f0f2f5;
  }
</style>