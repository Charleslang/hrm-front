<template>
  <el-container id="container">
    <el-header class="header">
      <header-nav/>
    </el-header>
    <el-main class="portal-main">
      <!-- <portal-main/> -->
        <router-view/>
    </el-main>
    <el-footer class="portal-footer" style="height: auto">
      <portal-footer/>
    </el-footer>
    <div class="back-top" :class="{'div-hidden' : isHidden}" @click="backTop">
      <i class="el-icon-arrow-up"></i>
    </div>
  </el-container>
</template>

<script>
  import HeaderNav from './components/HeaderNav'
  import PortalFooter from './components/PortalFooter'

  export default {
    components: {
      HeaderNav,
      PortalFooter
    },
    data() {
      return {
        isHidden: true
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll() {
        let osTop = document.documentElement.scrollTop || document.body.srcollTop
        setTimeout(() => {
          if(osTop >= 500 && this.isHidden) {
            this.isHidden = false
          } else if(osTop < 500 && !this.isHidden) {
            this.isHidden = true
          }
        },500)
      },
      backTop() {
        // window.scrollTo(0, 0)
        // this.isHidden = true
        let osTop = document.documentElement.scrollTop || document.body.srcollTop
        this.easeout(osTop, 0, 5, function (val) {
          window.scrollTo(0, val)
        })
      },
      easeout (position, destination, rate, callback) {
        if (position === destination || typeof destination !== 'number') {
          return false;
        }
        destination = destination || 0
        rate = rate || 2

        // 不存在原生`requestAnimationFrame`，用`setTimeout`模拟替代
        if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = function (fn) {
            return setTimeout(fn, 17)
          }
        }

        let step = function () {
          position = position + (destination - position) / rate;
          if (Math.abs(destination - position) < 1) {
            callback(destination, true)
            return
          }
          callback(position, false)
          requestAnimationFrame(step)
        };
        step();
    }
    },
    destoryed() {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style scoped>
  #container {
    width: 100%;
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
  .portal-main {
    width: 100%;
    /* padding: 0 233px; */
    padding: 0;
    /* border-bottom: 1px solid #e5e5e5; */
    margin-top: 71px;
  }
  .portal-footer {
    width: 100%;
    background-color: #f9fafd;
    color: #333;
    padding: 0 233px;
  }
  .back-top {
    background-color: #00b4a5;
    color: #fff;
    width: 40px;
    height: 40px;
    position: fixed;
    top: 62%;
    right: 0;
    z-index: 12;
    cursor: pointer;
    overflow: hidden;
    border-radius: 5px 0 0 5px;
    box-shadow: rgba(15,66,76,0.25) 0 0 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .back-top:hover {
    background-color: #00c3b3;
  }
  .div-hidden {
    display: none;
  }
</style>