<template>
<div class="step1">
  <div id='stepGroup' class="stepGroup" v-if="userType == 6 && newcreated">
    <div class="g1 active">选择国家</div>
    <div class="g1">护照验证</div>
    <div class="g1">信息验证</div>
  </div>
  <component :is="modelName"></component>
</div>
</template>
<script type="text/javascript">
import baseInfo from "./baseInfo.vue"
import SelectCountry from "./selectCountry.vue"
import CheckPassport from "./checkPassport.vue"
import CheckInfo from "./checkInfo.vue"
import baseInfo_NZL from "./baseInfo_NZL.vue"
export default {
  data() {
    return {
      modelName: "",
      userType: "",
      newcreated: true

    }
  },
  methods: {

  },
  mounted() {
    this.userType = window.localStorage.getItem("UserType")
    var that = this


    if (this.userType == 5) {
      // 个人
      if (window.localStorage.getItem('CountryName') == '新西兰') {
        this.modelName = "baseInfo_NZL"
      } else {
        this.modelName = "baseInfo"
      }
    } else {
      if (window.localStorage.getItem('newcreated') == '1') {
        this.modelName = "SelectCountry"
      } else if (window.localStorage.getItem('newcreated') == '2') {

        var t=setTimeout(function () {
          var el = document.getElementsByClassName('stepGroup')[0]
          if (!that.$root.hasClass(el.children[1], 'active')) {
            that.$root.addClass(el.children[1], 'active')
          }
          if (!that.$root.hasClass(el.children[2], 'active')) {
            that.$root.addClass(el.children[2], 'active')
          }
        }, 10);


        if (window.localStorage.getItem('CountryName') == '新西兰') {
          this.modelName = "baseInfo_NZL"
        } else {
          this.modelName = "baseInfo"
        }
      } else {
        this.newcreated = false
        if (window.localStorage.getItem('CountryName') == '新西兰') {
          this.modelName = "baseInfo_NZL"
        } else {
          this.modelName = "baseInfo"
        }
      }
    }
  },
  created() {
    var that = this
    this.$root.eventHub.$on('checkPhone', function(msg) {
      if (msg.status == 1) {
        that.modelName = "CheckPassport"
        var el = document.getElementsByClassName('stepGroup')[0]
        console.log(el.children[1],'99999999999999');
        if (!that.$root.hasClass(el.children[1], 'active')) {
          that.$root.addClass(el.children[1], 'active')
        }
      }
      if (msg.status == 2) {
        that.modelName = "baseInfo"
        var el = document.getElementsByClassName('stepGroup')[0]
        // console.log(el.children[1]);
        if (!that.$root.hasClass(el.children[1], 'active')) {
          that.$root.addClass(el.children[1], 'active')
        }
        if (!that.$root.hasClass(el.children[2], 'active')) {
          that.$root.addClass(el.children[2], 'active')
        }
      }
      if (msg.status == 3) {
        that.modelName = "baseInfo_NZL"
        var el = document.getElementsByClassName('stepGroup')[0]
        // console.log(el.children[1]);
        if (!that.$root.hasClass(el.children[1], 'active')) {
          that.$root.addClass(el.children[1], 'active')
        }
        if (!that.$root.hasClass(el.children[2], 'active')) {
          that.$root.addClass(el.children[2], 'active')
        }
      }
    })
  },
  components: {
    SelectCountry,
    CheckPassport,
    CheckInfo,
    baseInfo,
    baseInfo_NZL
  }
}
</script>
<style type="text/css" lang="scss" src="./css/checkInfo.scss"></style>
