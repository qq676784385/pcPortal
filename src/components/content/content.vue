<template lang="html">
    <div class="content_step">
		<div class="stepNum">
			<div class="col col1" @click="changeStep(1)" :class="stepName=='checkInfo'?'active':''">
				<div class="number">1</div>
				<div class="txt">信息验证</div>
				<div class="line"></div>
				<div class="triangle1" v-if='$store.state.app.browser!="FF"'></div>
				<div class="triangle1 triangle2" v-if='$store.state.app.browser!="FF"'></div>
			</div>
			<div class="col col2" @click="changeStep(2)" :class="stepName=='info'?'active':''">
				<div class="number">2</div>
				<div class="txt">个人信息</div>
				<div class="line"></div>
				<div class="triangle1" v-if='$store.state.app.browser!="FF"'></div>
				<div class="triangle1 triangle2" v-if='$store.state.app.browser!="FF"'></div>
			</div>
			<div class="col col3" @click="changeStep(3)" :class="stepName=='submitInfo'?'active':''">
				<div class="number">3</div>
				<div class="txt">提交信息</div>
				<div class="triangle1" v-if='$store.state.app.browser!="FF"'></div>
				<div class="triangle1 triangle2" v-if='$store.state.app.browser!="FF"'></div>
			</div>
		</div>
		<router-view/>
    </div>
</template>
<script>
export default {
  data() {
    return {
      stepName: "",
      sinceIndex: 1

    }
  },
  methods: {
    setPaperProgress(progressType,num){
      this.$http.post(this.$store.state.app.host + "api/Manage/SetPaperProgress", {
          UserVisaId: this.$store.state.info.UserVisaId,
          TypeId: progressType,
          Progress: num
        }, { headers: { Authorization: this.$store.state.app.token } })
        .then(
          function(res) {

          }
        )
    },
    changeStep(index) {

      // return
      if(index==3){

        for (var i = 0; i < this.$store.state.info.infoStatus.length; i++) {
          if(this.$store.state.info.infoStatus[i]==0){
            this.$layer.alert("请确保提交信息都已经保存并且不存在未填写项！")
            return
          }
        }
        var that = this
        this.setPaperProgress(2, 100)
        var t = setTimeout(function() {
          that.setPaperProgress(1, 100)
        }, 1000);
        var t = setTimeout(function() {
          that.setPaperProgress(3, 100)
        }, 2000);
      }
      this.sinceIndex = index
      switch (index) {
        case 1:
        if(window.localStorage.getItem('newcreated') == '1'){
          window.localStorage.setItem('newcreated','2')
        }
          this.$router.push({
            path: '/main/content/checkInfo'
          })
          break;
        case 2:
          this.$router.push({
            path: '/main/content/info'
          })
          break;
        case 3:
          this.$router.push({
            path: '/main/content/submitInfo'
          })
          break;
      }
      if (this.stepName != this.$route.fullPath.split("/")[3]) {
        this.stepName = this.$route.fullPath.split("/")[3]
        window.localStorage.setItem("GroupId", "")
      }
    },
    changeBtnColor(num) {

      var el = document.getElementsByClassName('stepNum')[0]
      this.stepName = this.$route.fullPath.split("/")[3]
      console.log(el.childNodes,'===================')
      for (var i = 0; i < el.childNodes.length; i++) {
        if (this.$root.hasClass(el.children[0], 'active')) {
          this.$root.removeClass(el.children[0], 'active')
        }
      }

      switch (this.stepName) {
        case 'checkInfo':
          if (!this.$root.hasClass(el.children[0], 'active')) {
            this.$root.addClass(el.children[0], 'active')
          }
          break;
        case 'info':
          if (!this.$root.hasClass(el.children[1], 'active')) {
            this.$root.addClass(el.children[1], 'active')
          }
          break;
        case 'submitInfo':
          if (!this.$root.hasClass(el.children[2], 'active')) {
            this.$root.addClass(el.children[2], 'active')
          }
          break;

      }
    }
  },

  mounted() {
    this.stepName = this.$route.fullPath.split("/")[3]
    // alert(this.$route.fullPath.split("/")[3]);
  },
  created() {
    var that = this
    this.$root.eventHub.$on('infoStep', function(msg) {
      that.changeBtnColor(msg.infoStep)
    })
  },
  destroyed() {
    	window.localStorage.setItem('newcreated','0')
    this.$root.eventHub.$off('infoStep')
  }
}
</script>

<style type="text/css" lang="scss" src="./css/content.scss"></style>
