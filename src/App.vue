<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'app'
        }
    }
  
}
</script>

<style lang='scss' type="text/css" src='./components/css/style.scss'></style>
