<template>
  <header-nav-bar class="nav-bar">
    <template v-slot:header-left>
      <div class="logo">
        <strong><b>HRM</b></strong>
      </div>
    </template>
  </header-nav-bar>
</template>

<script>
  import HeaderNavBar from 'components/header/HeaderNavBar'

  export default {
    components: {
      HeaderNavBar
    }
  }
</script>

<style scoped>
  
</style>