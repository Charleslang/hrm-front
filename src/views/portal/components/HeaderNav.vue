<template>
  <header-nav-bar class="nav-bar">
    <template v-slot:header-left>
      <div class="logo">
        <strong><b>HRM</b></strong>
      </div>
    </template>
    <template v-slot:header-center>
      <div class="center-content">
        <li><span>解决方案</span></li>
        <li><span>客户案例</span></li>
        <li><span>HR研究院</span></li>
        <li><span>合作渠道</span></li>
        <li><span>相关产品</span></li>
        <el-dropdown>
          <span class="el-dropdown-link">
            关于我们<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>企业介绍</el-dropdown-item>
            <el-dropdown-item>加入我们</el-dropdown-item>
            <el-dropdown-item>最新动态</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </template>
    <template v-slot:header-right>
      <div class="right-btn">
        <div class="btn-phone"><i class="el-icon-phone"></i>123-123-1236</div>
        <el-button type="primary" round size="medium" class="btn-free">免费试用</el-button>
        <el-button round size="small" type="text" class="btn-login" @click="toLogin">登&nbsp;录</el-button>
      </div>
    </template>
  </header-nav-bar>
</template>

<script>
  import HeaderNavBar from 'components/header/HeaderNavBar'

  export default {
    components: {
      HeaderNavBar
    },
    methods: {
      toLogin() {
        this.$router.push('/portal')
      }
    }
  }
</script>

<style scoped>
  .center-content, .right-btn {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .right-btn {
    justify-content: flex-end;
  }
  .btn-phone {
    margin-right: 20px;
  }
  .center-content {
    font-size: 15px;
    color: #3D4450;
  }
  .center-content > li:hover {
    color: #00B4A5;
    border-bottom: 2px solid #00B4A5;
    cursor: pointer;
    padding-bottom: 3px;
    transition: padding-bottom 0.5s;
  }
  .el-dropdown {
    color: #3D4450;
  }
  .el-dropdown:hover {
    color: #00B4A5;
    cursor: pointer;
  }
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: rgba(0,180,165,0.1);
    color: #00B4A5;
  }
  .btn-free {
    background-color: var(--color-text-highlint);
  }
  .btn-free:hover {
    box-shadow: 0 7px 10px 0 rgba(0,199,179,0.3);
    transition: all 0.3s;
  }
  
  .btn-login {
    color: var(--color-text);
    margin: 0;
  }
  .btn-login:hover {
    color: var(--color-text-highlint);
  }
</style>