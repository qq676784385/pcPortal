<template lang="html">
  <div class="sfz">
      身份证
  </div>
</template>

<script>
export default {
  data(){
    return{
      baseInfoData:{
        font:[
          {'Tag':'',
            'title':'姓(中文)',
            'value':''
          },

        ],
        back:{

        }
      },
      NZLInfoData:[{},{}]
    }
  },
  created(){
    this.$store.state.info.UserVisaId = window.localStorage.getItem()
    this.$http.get(this.$store.state.app.host + 'api/Wechat/GetCredentialsData', {
      params: {
        userVisaId: this.$store.state.info.UserVisaId,
        visaFileId: this.$store.state.info.VisaFileID,
        Extend: this.$root.Extend()

      },
      headers: this.$root.crossLogin(),
      timeout: this.$store.state.app.httpTime
    }).then(
      function(res) {
        if (res.data.Code == 0) {

        }
      }
    )
  }
}
</script>

<style lang="css">
</style>
