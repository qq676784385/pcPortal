<template lang="html">
  <div class="banner">
    <div class="logoDiv">
    	<img src="static/img/logo.png">
    </div>
    <!-- <div class="loginOut">
    	退出
    </div> -->
    <div class="userInfo" v-if='show'>
    	<span @click="dropDown=!dropDown">{{$store.state.info.Name}}</span>
      <span class="marginLeft30" @click="loginOut" v-if='userType==5'>退出</span>
        <div class="option" v-if='dropDown && userType==6' >
            <div class="text" @click="goSetting">个人中心</div>
            <div class="text" @click="loginOut">退出</div>
            <div class="triangle">
                <div class="t1"></div>
                <div class="t2"></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nikeName: "",
      dropDown: false,
      userType:'',
      show:true
    }
  },
  created(){
    this.userType = window.localStorage.getItem('UserType')
    this.show = window.localStorage.getItem('Token')==''?false:true
  },
  methods: {
    loginOut() {
      this.$http.post(this.$store.state.app.host + 'api/Account/Logout', {}, {
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.$router.push({
                path: "/"
              })
            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
    },
    goSetting() {
      this.dropDown = false
      this.$router.push({
        path: "/main/personal/setting"
      })
      this.$root.$emit("CHANGEPATH")

    },
    loginOut() {
      this.dropDown = false
      this.$http.post(this.$store.state.app.host + 'api/Account/Logout', {}, {
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.$router.push({
                path: "/"
              })
              this.$root.set("NikeName","")

            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
    }

  },
  mounted() {
    this.nikeName = window.localStorage.getItem("NikeName")
    this.$store.state.info.Name = this.nikeName
    this.$store.state.app.token = window.localStorage.getItem("Token")
  }
}
</script>

<style lang="scss" type="text/css" src='./css/banner.scss'></style>
