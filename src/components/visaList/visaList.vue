<template>
<div class="visaList">
  <div class="title">
    <span class="txtBorder"></span>
    <span>完善签证</span>
  </div>
  <div class="contList">
    <div class="addPerson" v-if="userType == 6" @click="addPerson">添加办理人</div>
    <table border="1" cellspacing="0" frame="box" rules="none" align="center">
      <tr class="tableTitle">
        <th>No</th>
        <th>护照号</th>
        <th>姓名</th>
        <th>国家</th>
        <th>签证种类</th>
        <th>手机号</th>
        <th>签证状态</th>
        <th>资料完成度</th>
      </tr>
      <tr v-for='(visa,index) in visaListInfo'>
        <td>{{index+1}}</td>
        <td>{{visa.PassportNumber}}</td>
        <td>{{visa.Name}}</td>
        <td>{{visa.Destination}}</td>
        <td>{{visa.VisaType}}</td>
        <td>{{visa.Phone}}</td>
        <td class="link" @click="addMaterialFun(visa.PaperProgress,visa.VisaID==undefined?'':visa.VisaID,index,visa.Destination,visa.ShowModel)">完善资料</td>
        <td>{{visa.ShowModel==1?visa.PaperProgress==100?100:parseInt((visa.PaperProgress-66)/33*100):visa.PaperProgress}}%</td>
      </tr>
    </table>
  </div>
</div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      visaListInfo: [],
      countryName: "",
      passportNumber: "",
      visaType: ["", "旅游", "工作", "学生", "商务", "探亲"],
      userType: window.localStorage.getItem("UserType")
    }
  },
  methods: {
    addMaterialFun(progress, visaId, index,countryName,showmodel) {
      window.localStorage.setItem('showmodel',showmodel)
      if (this.userType == 5) {
        window.localStorage.setItem('seleNum', index)
        this.$store.state.info.seleNum = index
      } else {
        window.localStorage.setItem('seleNum', index)
        this.$store.state.info.seleNum = index
      }
      // visa.PaperProgress
      // if (progress == 0) {
      //   // 未填写信息
      //   this.$router.push({
      //     path: '/main/content/checkInfo'
      //   })
      // } else {
      //   this.$router.push({
      //     path: '/main/content/info'
      //   })
      // }
			this.$router.push({
				path: '/main/content/checkInfo'
			})
			window.localStorage.setItem("CountryName", countryName)
      window.localStorage.setItem("UserVisaId", visaId)

    },
    getVisaList(curp, count) {
      this.$http.post(this.$store.state.app.host + "api/Manage/Search", {
          PassportNumber: this.passportNumber,
          Destination: this.countryName,
          CurrentIndex: curp,
          ShowCount: count,
          Page: "7",
          IsShowAll: false
        }, {
          headers: {
            Authorization: this.$store.state.app.token
          }
        }, {
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.visaListInfo = []
              for (var i = 0; i < res.data.Result.length; i++) {
                if (res.data.Result[i].VisaStatus == 1) {
                  this.visaListInfo.push(res.data.Result[i])
                }
              }

              console.log(this.visaListInfo);
              if (this.visaListInfo.SearchList.length == 0) {
                // this.visaListInfo.SearchList = [
                // 	{
                // 		Destination:this.countryName,
                // 		PaperProgress:0,
                // 		VisaType:"旅游"
                // 	}
                // ]
              }
            }

          },
          function(err) {
            console.log("网络连接超时")
          }
        )
    },
    getVisaListWX() {
      this.$http.get(this.$store.state.app.host + "api/Wechat/VisaList", {
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.visaListInfo = []
              for (var i = 0; i < res.data.Result.length; i++) {
                if (res.data.Result[i].VisaStatus == 1) {
                  this.visaListInfo.push(res.data.Result[i])
                }
              }
              // this.visaListInfo.push({
              //   // <td>{{visa.PassportNumber}}</td>
              //   // <td>{{visa.Name}}</td>
              //   // <td>{{visa.Destination}}</td>
              //   // <td>{{visa.VisaType}}</td>
              //   // <td>{{visa.Phone}}</td>
              //   PassportNumber: '123123555',
              //   Destination: this.countryName,
              //   Name: 'sss',
              //   Phone: '1111',
              //   PaperProgress: 0,
              //   VisaType: "旅游"
              // })
              window.localStorage.setItem('info', JSON.stringify(this.visaListInfo))
              this.$store.state.info.visaList = this.visaListInfo

              // if(res.data.Result.length>0){
              // 	for(var i = 0;i<res.data.Result.length;i++){
              // 		if(res.data.Result[i].VisaID == this.visaListInfo.SearchList[0].VisaID){
              // 			this.visaListInfo.SearchList[0].VisaType = res.data.Result[i].VisaType
              // 		}
              // 	}
              // }
            }
          },
          function(err) {

          }
        )
    },
    addPerson() {
			window.localStorage.setItem('newcreated','1')
      window.localStorage.setItem('showmodel',0)
      this.$router.push({
        path: "/main/content/checkInfo"
      })
    }
  },
  mounted() {

		window.localStorage.setItem('newcreated','0')
    this.countryName = window.localStorage.getItem("CountryName")
    this.passportNumber = window.localStorage.getItem("PassportNumber")
    this.$store.state.app.token = window.localStorage.getItem("Token")
    // this.getVisaList(1,1)
    this.getVisaListWX()
  }
}
</script>
<style type="text/css" lang="scss" src='./css/visaList.scss'></style>
