<template>
<div class="visaList">
  <div class="title">
    <span class="txtBorder"></span>
    <span>我的签证</span>
  </div>
  <div class="contList">
    <!-- <div class="addPerson" v-if="userType == 6" @click="addPerson">添加办理人</div> -->
    <table border="1" cellspacing="0" frame="box" rules="none" align="center">
      <tr class="tableTitle">
        <th>No</th>
        <th>护照号</th>
        <th>姓名</th>
        <th>国家</th>
        <!-- <th>签证种类</th> -->
        <th>操作时间</th>
        <th>签证状态</th>
        <!-- <th>资料完成度</th> -->
      </tr>
      <tr v-for='(visa,index) in visaListInfo'>
        <td>{{index+1}}</td>
        <td>{{visa.VisaInfo[0].PassportNumber}}</td>
        <td>{{visa.Name}}</td>
        <td>{{visa.VisaInfo[0].VisaName}}</td>
        <!-- <td>{{visa.VisaType}}</td> -->
        <td>{{visa.VisaInfo[0].Time.split(' ')[0]}}</td>
        <td>{{visa.VisaInfo[0].VisaStatus==8?'取消办理':visa.VisaInfo[0].IsSuccess?'已出签':'已拒签'}}</td>
        <!-- <td class="link" @click="addMaterialFun(visa.PaperProgress,visa.VisaID)">进度查询</td> -->

        <!-- <td>{{visa.PaperProgress}}%</td> -->
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
    addMaterialFun(progress, visaId) {
      // visa.PaperProgress
      if (progress == 0) {
        // 未填写信息
        this.$router.push({
          path: '/main/content/checkInfo'
        })
      } else {
        this.$router.push({
          path: '/main/content/info'
        })
      }
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
              this.visaListInfo = res.data.Result
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
      this.$http.get(this.$store.state.app.host + "api/Wechat/MyVisaHistory", {
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              for (var i = 0; i < res.data.Result.length; i++) {
                for (var j = 0; j < res.data.Result[i].VisaInfo.length; j++) {
                  // res.data.Result[i].VisaInfo[j].imgUrl = 'static/img/country' + res.data.Result[i].VisaInfo[j].CountryId + '.png'
                }
              }

              // for (var i = 0; i < 12; i++) {
              // this.pendData.push(res.data.Result[0])
              // }
              this.visaListInfo = res.data.Result
              console.log(this.visaListInfo);
              // this.visaListInfo = res.data.Result
              // for (var i = 0; i < this.visaListInfo.length; i++) {
              // 	if(this.visaListInfo[i].VisaStatus==1 || this.visaListInfo[i].VisaStatus>=7){
              // 		this.visaListInfo.splice(i,1)
              // 	}
              // }
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
      this.$router.push({
        path: "/main/content/checkInfo"
      })
    }
  },
  mounted() {
    this.countryName = window.localStorage.getItem("CountryName")
    this.passportNumber = window.localStorage.getItem("PassportNumber")
    this.$store.state.app.token = window.localStorage.getItem("Token")
    // this.getVisaList(1,1)
    this.getVisaListWX()
  }
}
</script>
<style type="text/css" lang="scss" src='./css/history.scss'></style>
