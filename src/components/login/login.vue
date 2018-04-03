<template lang="html">
	<div class="login">
		<div class="bgImg">
			<img src='static/img/bg.jpg' width="100%" height="100%;">
		</div>
		<div class="middleCont">
			<div class="contTxt">
				<div class="title">登录</div>
				<div class="parts">
					<div class="part1" @click='changeFun(1)' :class='groupNum == 1?"active":""'>个人用户</div>
					<div class="part2" @click='changeFun(2)' :class='groupNum == 2?"active":""'>企业用户</div>
				</div>
				<div class="passport" v-if='groupNum == 1'>
					<div class="txt">护照号：</div>
					<input class="number" type="text" v-model='passportNumber'>
				</div>
				<!-- <div class="yzCodeImg" v-if="groupNum == 1">
					<input type="text" placeholder="请输入验证码" v-model="validCode">
					<div id="codeImg">
						<img :src="$store.state.app.host +'api/account/GetValidateCode/'+a" height="100%">
					</div>
					<img class="refreshImg" src="static/img/refresh.png" @click="refreshCode">
				</div> -->
				<div class="yanzheng" v-if='sendyzCode'>
					<div class="yzTip">
						已发送验证码至绑定手机{{phoneNumber.substr(0,3)}}****{{phoneNumber.substr(7)}}，请注意查收
					</div>
					<div class="yzNum">
						<input type="text" placeholder="请输入验证码" v-model='yzCode'>
						<div class="sendyz" @click="sendyzFun" :class="time>0?'time':''">
							<span v-if='time>0'>({{time}})s</span>
							<span v-if='time==0'>发送验证码</span>
						</div>
					</div>
				</div>
				<div class="company" v-if='groupNum == 2'>
					<input class="userName" type="text" placeholder="请输入用户名" v-model='companyUsername'>
					<input class="passport" type="Password" placeholder="请输入用户密码" v-model='companyPassport'>
					<div class="forget" >
						<span @click="$router.push({path:'/main/forgetPassword'})">忘记密码</span>
					</div>
				</div>
				<div class="checkBtn" @click="loginFun" v-if='groupNum == 1&&!sendyzCode'>核 实</div>
				<div class="checkBtn" @click="PhoneCode" v-if='sendyzCode'>验 证</div>
				<div class="checkBtn" @click="companyLogin" v-if='groupNum == 2&&!sendyzCode'>登 录</div>
			</div>

			<div class="countryList" v-if='countriesList.length&&!sendyzCode'>
				<span class="t1">您的护照下有{{countriesList.length}}个代办签证，请选择您要办理的签证国家</span>
				<div class="t2" v-for='(item,index) in countriesList' @click="selectCountry(item,index)">
					<span class="sele" :class="countryId == item.CountryId?'active':''"></span>
					<span class="name">{{item.CountryName}}</span>
				</div>
			</div>
			<div class="nextBtn"  v-if='countriesList.length>0&&!sendyzCode' @click='nextFun'>
				下一步
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      passportNumber: "",
      countriesList: [],
      groupNum: 1,
      sendyzCode: false,
      countryId: "",
      countryName: "",
      phoneNumber: "",
      yzCode: "",
      companyUsername: "",
      companyPassport: "",
      countryAllInfo: "",
      time: 0,
      validCode: "",
      a: 1
    }
  },
  mounted() {
    window.localStorage.setItem("Token", '')

  },
  methods: {
    changeFun(num) {
      this.groupNum = num
      this.sendyzCode = false
      this.countriesList = []
      this.a = 1
      this.validCode = ""
    },
    loginFun() {
      this.$http.post(this.$store.state.app.host + "api/Account/LoginUserInfo", {
          LoginName: this.passportNumber,
          Password: this.passportNumber,
          IsPersistent: false,
          Type: 5,
          ValidCode: this.validCode
        }, {
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
							var PhoneToken = window.localStorage.getItem('PhoneToken')
              window.localStorage.clear();
							window.localStorage.setItem('PhoneToken', PhoneToken)
							window.localStorage.setItem('Token', "Bearer " + res.data.Result.AccessToken)
              this.$store.state.app.token = "Bearer " + res.data.Result.AccessToken
              window.localStorage.setItem('isTest', 0)
              window.localStorage.setItem("NikeName", this.passportNumber)
              this.$root.getJson()
              this.ValidatePassport()
            } else {
              this.$layer.msg("没有找到正在办理的护照信息！")
            }
          },
          function(err) {
            this.$layer.msg("网络连接超时！")
          }
        )
    },
    ValidatePassport() {
      var reg = /^[A-Za-z0-9]{9}$/
      if (this.passportNumber == '') {
        this.$layer.alert('请输入护照号！')
        return
      }
      if (this.passportNumber.match(reg) == null) {
        this.$layer.alert('请输入正确的护照号码')
        return
      }
      if (window.localStorage.getItem("PhoneToken")) {
        this.$store.state.app.phoneToken = window.localStorage.getItem("PhoneToken")
      }

      this.$http.get(this.$store.state.app.host + "api/Wechat/ValidatePassportNumberAdmin", {
          params: {
            passportNumber: this.passportNumber,
            token: this.$store.state.app.phoneToken
          },
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.countriesList = []

              if (res.data.Result.length > 0) {
                console.log(res.data.Result);
                //添加 SELE 状态
                this.$store.state.info.visaList = []
                for (var i = 0; i < res.data.Result.length; i++) {
                  var obj = res.data.Result[i];
                  obj.sele = false;
                  this.$store.state.info.visaList.push(obj)
                }
                // this.countriesList = []
                this.countriesList = this.$store.state.info.visaList

                this.oldseleNum = -1
                console.log(this.countriesList);

                window.localStorage.setItem('info', JSON.stringify(this.$store.state.info.visaList))

                if (res.data.Result.length > 0) {
                  this.verifySuccess = true
                  // res.data.Result
                  // this.getPhoneSMS()
                  //  this.$router.push({
                  //    path: '/applyvisa1'
                  //  })
                }
                for (var i = 0; i < this.countriesList.length; i++) {
                  this.countriesList[i].sele = false
                }
              } else {
                this.$root.showTip1(['没有找到相应的签证信息，请检查护照号是否输入正确，或联系销售人员核实。'])
              }
            }

          },
          function(err) {

          }
        )
    },
    selectCountry(info, index) {
      console.log(info, '<<<<<', index);
      this.countryAllInfo = info
      this.countryId = info.CountryId
      this.countryName = info.CountryName
      this.phoneNumber = info.TestUserPhone == null ? info.Phone : info.TestUserPhone
      window.localStorage.setItem('seleNum', index)

      // this.phoneNumber ='13911809695'
    },
    sendyzFun() {

      if (this.time == 0) {
        var that = this
        that.time = 60
        var tt = setInterval(function() {
          if (that.time < 0) {
            that.time = 0
            clearInterval(tt)
          } else {
            that.time--
          }
        }, 1000)

        this.$http.get(this.$store.state.app.host + "api/Wechat/SendPhoneCode", {
            params: {
              phoneNumber: this.phoneNumber
            },
            headers: {
              Authorization: this.$store.state.app.token
            }
          })
          .then(
            function(res) {
              if (res.data.Code == 0) {
                this.VerifyToken = res.data.Result

              }
            }
          )
      }

    },
    PhoneCode() {
      this.$http.post(this.$store.state.app.host + "api/Wechat/VerfiyPhoneCode", {
          PhoneNumber: this.phoneNumber,
          Code: this.yzCode,
          VerifyToken: this.VerifyToken
        }, {
          headers: {
            Authorization: this.$store.state.app.token
          }
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.$store.state.app.phoneToken = res.data.Result
              window.localStorage.setItem("Token", this.$store.state.app.token)
              window.localStorage.setItem("PhoneToken", res.data.Result)
              window.localStorage.setItem("PassportNumber", this.passportNumber)
              window.localStorage.setItem("UserType", 5)
              if (this.countryName == '新西兰') {
                this.nzlIsInput()
              } else {

                this.$router.push({
                  path: 'main/content/checkInfo'
                })
              }
            } else {
              this.$layer.alert("验证码输入错误")
            }
          }
        )
    },
    nzlIsInput() { //验证核实出来的护照号 如果办理新西兰签证 查询是否有其他护照号正在办理。如果办理应该是一个家庭的信息。
      this.$http.get(this.$store.state.app.host + 'api/Wechat/ReturnNZLVisaInfo', {
        params: {
          passport: this.passportNumber,
          typeId: 3
        },
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          if (res.data.Code == 0) {
            if (res.data.Result.VisaID != 0) {
              // alert('000')
              window.localStorage.setItem('seleNum', 0)
              var _arr = []
              _arr.push(res.data.Result)
              // alert(res.data.Result.VisaID)
              window.localStorage.setItem('UserVisaId', res.data.Result.VisaID)
              window.localStorage.setItem('info', JSON.stringify(_arr))
							window.localStorage.setItem('showmodel', res.data.Result.ShowModel)
              this.$router.push({
                path: 'main/content/checkInfo'
              })
            } else {
              this.$router.push({
                path: 'main/content/checkInfo'
              })
            }
          }
        })
    },
    nextFun() {
      //
      window.localStorage.setItem("UserType", 5)
      window.localStorage.setItem("CountryId", this.countryId)
      window.localStorage.setItem("CountryName", this.countryName)
      window.localStorage.setItem('newcreated', 1)

      // 需不需要手机号验证
      if (this.countryAllInfo.NeedVerifySMS) {
        this.sendyzCode = true
      } else {
        this.sendyzCode = false
        window.localStorage.setItem("Token", this.$store.state.app.token)
        window.localStorage.setItem("PassportNumber", this.passportNumber)
        // this.$router.push({path: '/main/visaList'})
        if (this.countryName == '新西兰') {
          this.nzlIsInput()
        } else {

          this.$router.push({
            path: 'main/content/checkInfo'
          })
        }

      }
    },
    companyLogin() {
      this.$http.post(this.$store.state.app.host + "api/Account/LoginUserInfo", {
          LoginName: this.companyUsername,
          Password: this.companyPassport,
          IsPersistent: false,
          Type: 6,
          ValidCode: ""
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.$store.state.app.token = "Bearer " + res.data.Result.AccessToken
              window.localStorage.setItem("Token", this.$store.state.app.token)
              window.token = this.$store.state.app.token
              window.localStorage.setItem("NikeName", res.data.Result.NikeName)
              window.localStorage.setItem("UserType", 6)
              window.localStorage.setItem('isTest', res.data.Result.IsTest)
              this.$root.getJson()
              this.$router.push({
                path: '/main/visaList'
              })
            } else {
              this.$layer.msg("用户不存在或输入的密码有误！")
            }
          }
        )
    },
    refreshCode() {
      console.log($("#codeImg"))
      $("#codeImg").attr("src", "")
      this.a++
        // $("#codeImg").attr("src",this.$store.state.app.host + "api/account/GetValidateCode/1")
    }
  }
}
</script>

<style lang="scss" type="text/css" src='./css/login2.scss'></style>
