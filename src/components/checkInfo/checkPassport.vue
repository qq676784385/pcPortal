<template>
<div class="checkPassport">
  <div class="title">
    护照验证
  </div>
  <div class="addPassport">
    <div>护照号</div>
    <input type="text" :value=" $store.state.info.passportNum" readonly="value">
    <!-- <div class="text">
				{{  $store.state.info.passportNum}}
			</div> -->
  </div>
  <div class="tips_x">
    请发送验证码至绑定手机{{phoneNum}}，请注意查收
  </div>
  <div class="addYz">
    <input type="text" v-model='smscode'>



    <div class="yzCode" @click='getSMS' v-if='sended'>发送验证码</div>
    <div class="yzCode gray" v-if='!sended'>{{time}}</div>
  </div>
  <div class="nextBtn" v-tap='{methods:VerifyToken}'>
    下一步
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      phoneNum: '',
      time: 59,
      sended: true,
      SMSToken: '',
      smscode: ''
    }
  },
  created() {
    if (window.localStorage.getItem('isTest') == '1') {
      this.phoneNum = JSON.parse(window.localStorage.getItem('info'))[window.localStorage.getItem('seleNum')].TestUserPhone == null ? JSON.parse(window.localStorage.getItem('info'))[window.localStorage.getItem('seleNum')].Phone : JSON.parse(window.localStorage
        .getItem('info'))[window.localStorage.getItem('seleNum')].TestUserPhone
    } else {
      this.phoneNum = JSON.parse(window.localStorage.getItem('info'))[window.localStorage.getItem('seleNum')].PhoneNumber == null ? JSON.parse(window.localStorage.getItem('info'))[window.localStorage.getItem('seleNum')].Phone : JSON.parse(window.localStorage
        .getItem('info'))[window.localStorage.getItem('seleNum')].PhoneNumber
    }
    if (window.localStorage.getItem('CountryName') == '新西兰') {
      this.$store.state.info.passportNum = window.localStorage.getItem('passport')
    }
  },
  mounted() {

  },
  methods: {

    VerifyToken() {
      console.log(this.smscode);
      // return
      this.$http.post(this.$store.state.app.host + 'api/Wechat/VerfiyPhoneCode', {
        // PhoneNumber: '13241796078',
        // Code: '548338',
        // VerifyToken: '8jFN9YdJixD2+hpGuEmE0MmUivYCvmuW+dwibhbeh0PZaAUwjg3s+oAkcpiofu0udXo6kiXjXuiIXTK22thTa7Av4zzKsp9dO36WdOFEqlk='
        PhoneNumber: this.phoneNum,
        Code: this.smscode,
        VerifyToken: this.SMSToken
      }, {
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          if (res.data.Code == 0) {
            this.$store.state.info.PhoneToken = res.data.Result
            window.localStorage.setItem('PhoneToken', res.data.Result)
            // console.log(res);
            // this.$router.push({
            //   // path: 'applyvisa'
            //   path: '/applyvisa1'
            // })
            if (window.localStorage.getItem('CountryName') == '新西兰') {
              // this.$router.push({
              //   path: '/addpersonalInfo/baseInfo_NewZealand'
              // })
              this.nzlIsInput()
              // this.$root.eventHub.$emit('checkPhone', {
              //   status:3
              // });
            } else {

              // this.$router.push({
              //   path: '/addpersonalInfo/baseInfo'
              // })
              this.$root.eventHub.$emit('checkPhone', {
                status: 2
              });
            }

          } else {
            // this.$root.showTip1([res.data.Message])
            this.$layer.alert("验证码输入错误")
          }


        },
        function(err) {
          console.log('超时');
        })
    },
    nzlIsInput() { //验证核实出来的护照号 如果办理新西兰签证 查询是否有其他护照号正在办理。如果办理应该是一个家庭的信息。
      this.$http.get(this.$store.state.app.host + 'api/Wechat/ReturnNZLVisaInfo', {
        params: {
          passport: this.$store.state.info.passportNum,
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
              window.localStorage.setItem('UserVisaId', _arr[0].VisaID)
              window.localStorage.setItem('info', JSON.stringify(_arr))
              // alert('新西兰页面未加入')
              // return
              // this.$router.push({
              //   path: '/addpersonalInfo/baseInfo_NewZealand'
              // })
              this.$root.eventHub.$emit('checkPhone', {
                status: 3
              });
            } else {
              this.$root.eventHub.$emit('checkPhone', {
                status: 3
              });
              // alert('新西兰页面未加入')
              // return
              // this.$router.push({
              //   path: '/addpersonalInfo/baseInfo_NewZealand'
              // })
            }
          }
        })
    },
    getSMS() {
      console.log('自动获取验证码');
      //this.$store.state.info.visaList[0].Phone  电话号码
      this.$http.get(this.$store.state.app.host + 'api/Wechat/SendPhoneCode', {
        params: {
          phoneNumber: this.phoneNum
        },
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          // console.log(res);
          if (res.data.Code == 0) {
            this.SMSToken = res.data.Result
            this.sended = false;
            // console.log(this.SMSToken);
            // this.sended = false;
            var that = this
            this.int = self.setInterval(function() {
              that.timer()
            }, 1000)

          } else {
            // console.log(res.data.Message);
            // this.$root.showTip1([res.data.Message])
            alert(res.data.Message)
            // this.int = self.setInterval(function(){
            //   that.timer()
            // },1000)
          }
          // this.$store.state.info.visaList = res.Result

        },
        function(err) {
          console.log('超时');
        })
    },
    timer() {
      this.time--
        if (this.time == 0) {
          clearInterval(this.int)
          this.sended = true;
          this.time = 59;
        }
    },
  }

}
</script>
<style type="text/css" lang="scss" src="./css/checkPassport.scss"></style>
