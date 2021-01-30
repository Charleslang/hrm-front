<template>
  <div id="header">
    <div class="left"><slot name="header-left"></slot></div>
    <div class="center"><slot name="header-center"></slot></div>
    <div class="right"><slot name="header-right"></slot></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  #header {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .left, .center, .right {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .left {
    width: 15%;
  }
  .center {
    width: 53%;
  }
  .right {
    width: 32%;
  }
</style>