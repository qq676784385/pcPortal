<template lang="html">
  <div>
    <div class="sidebar" v-if="whichRouter != 'personal'">
        <div class="infoInput" @click="infoFun" :class="nowRouter.indexOf('visaList')>-1||nowRouter.indexOf('content')>-1?'active':''">
            <img src="static/img/luru2.png" v-if="nowRouter.indexOf('visaList')>-1||nowRouter.indexOf('content')>-1">
            <img src="static/img/luru1.png" v-else>
            <span>信息录入</span>
        </div>
        <div class="schedule"  @click="scheduleFun" :class="nowRouter.indexOf('schedule')>-1||nowRouter.indexOf('jindu')>-1?'active':''">
            <img src="static/img/jindu2.png" v-if="nowRouter.indexOf('schedule')>-1||nowRouter.indexOf('jindu')>-1">
            <img src="static/img/jindu1.png" v-else>
            <span>进度查询</span>
        </div>
        <div class="visaHist"  @click="visaHistFun" :class="nowRouter.indexOf('history')>-1?'active':''">
            <img src="static/img/lishi2.png" v-if="nowRouter.indexOf('history')>-1">
            <img src="static/img/lishi1.png" v-else>
            <span>签证历史</span>
        </div>
    </div>
    <div class="sidebar" v-if="whichRouter == 'personal'">
        <div class="infoInput" @click="personalFun(1)" :class="nowRouter2=='setting'?'active':''">
            <span>个人设置</span>
        </div>
        <div class="schedule" @click="personalFun(2)" :class="nowRouter2=='safe'?'active':''">
            <span>安全设置</span>
        </div>
        <div class="visaHist"  @click="back">
            <span>返回</span>
        </div>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      nowRouter: "",
      nowRouter2: "",
      whichRouter: ""
    }
  },
  methods: {
    back() {
      this.$router.push({
        path: '/main/visaList'
      })
      this.whichRouter = '2'
      var el = document.getElementsByClassName('sidebar')[0].children[0]
      console.log(el,'<<<<');
      var that = this
      var t = setTimeout(function () {
        if(!that.$root.hasClass(el,'active')){
          // that.$root.addClass(el,'active')
        }
      }, 10);
      // location.reload()
      this.nowRouter = this.$route.fullPath
    },
    infoFun() {
      this.$router.push({
        path: "/main/visaList"
      })
      this.nowRouter = this.$route.fullPath
    },
    scheduleFun() {
      this.$router.push({
        path: "/main/schedule"
      })
      this.nowRouter = this.$route.fullPath
    },
    visaHistFun() {
      this.$router.push({
        path: "/main/history"
      })
      this.nowRouter = this.$route.fullPath
    },
    personalFun(index) {
      if (index == 1) {
        this.$router.push({
          path: "/main/personal/setting"
        })
      } else {
        this.$router.push({
          path: "/main/personal/safe"
        })
      }
      this.whichRouter = this.$route.fullPath.split("/")[2]
      this.nowRouter2 = this.$route.fullPath.split("/")[3]
    },
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
    }
  },
  created() {
    this.$store.state.app.token = window.localStorage.getItem("Token")
    this.nowRouter = this.$route.fullPath
    this.nowRouter2 = this.$route.fullPath.split("/")[3]
    this.whichRouter = this.$route.fullPath.split("/")[2]

    var that = this
    this.$root.$on("CHANGEPATH", function(obj) {
      that.nowRouter = this.$route.fullPath
      that.nowRouter2 = this.$route.fullPath.split("/")[3]
      that.whichRouter = this.$route.fullPath.split("/")[2]
    })

  }
}
</script>

<style type="text/css" lang="scss" src='./css/sidebar.scss'></style>
