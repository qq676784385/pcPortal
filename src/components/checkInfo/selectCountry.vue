<template>
<div class="selectCountry">
  <div class="addPossport">
    <div class="number">
      <span>护照号：</span>
      <input id='passportNum' type="text">
    </div>
    <div class="checkBtn" v-tap='{methods:checkPassPortNum}'>核实</div>
  </div>
  <div class="country" v-if='countriesList.length>0'>
    <span class="tip">
				您的护照下有{{countriesList.length}}个待办的签证，请选择您要办理的签证国家
			</span>
    <form class='countryRadio'>
      <label v-for='data in countriesList'>
					<input type="radio" name="country">{{data.CountryName}}
				</label>

    </form>
    <div class="checkBtn" @click='checkPhone'>下一步</div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      countriesList: '',
      sele: ''
    }
  },
  mounted() {

  },
  created() {
    this.$store.state.info.PhoneToken = window.localStorage.getItem('PhoneToken')

  },
  methods: {
    checkPhone() {
      window.localStorage.setItem('UserVisaId', '')
      this.sele = -1
      var el = document.getElementsByClassName('countryRadio')[0]
      console.log(el.childNodes);
      for (var i = 0; i < el.childNodes.length; i++) {
        // console.log(el.children[i].getElementsByTagName('input')[0].checked);
        // this.sele = el.children[i].getElementsByTagName('input')[0].checked
        if (el.children[i].getElementsByTagName('input')[0].checked) {
          this.sele = i
          window.localStorage.setItem('seleNum', this.sele)
					this.$store.state.info.seleNum = this.sele
          break;
        }
      }
      if (this.sele == -1) {
        // this.$root.showTip1(['请选择待办签证！'])
        this.$layer.alert('请选择待办签证！')
      } else {
        var countryName = this.countriesList[this.sele].CountryName
        window.localStorage.setItem('passport',this.$store.state.info.passportNum)
        this.$store.state.info.countryName = countryName
        window.localStorage.setItem('CountryName', countryName)
        // alert(countryName)
        if (this.countriesList[this.sele].NeedVerifySMS) {
          this.$root.eventHub.$emit('checkPhone', {
            status: 1
          });
        } else {
          if (this.$store.state.info.visaList[this.$store.state.info.seleNum].UserVisaId != null) {
            window.localStorage.setItem('UserVisaId', this.$store.state.info.visaList[this.$store.state.info.seleNum].UserVisaId==undefined?'':this.$store.state.info.visaList[this.$store.state.info.seleNum].UserVisaId)
          }
          if (window.localStorage.getItem('CountryName') == '新西兰') {

            this.nzlIsInput()
          } else {
            this.$root.eventHub.$emit('checkPhone', {
              status: 2
            });
          }
        }
      }


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
    checkPassPortNum(obj) {

      this.countriesList = []
      document.getElementById('passportNum').blur(); //安卓焦点会有个蓝点，影响效果。验证的时候失去焦点。
      var passportnum = document.getElementById('passportNum').value
      var reg = /^[A-Za-z0-9]{9}$/

      var txt = document.getElementById('passportNum').value
      if (txt == '') {
        this.$layer.alert('请输入护照号！')
        return
      }
      if (passportnum.match(reg) == null) {

        this.$layer.alert('请输入正确的护照号码！')
        return
      }
      this.$store.state.info.passportNum = passportnum

      var el = obj.event.currentTarget
      if (this.$root.hasClass(el, 'gray')) {
        return
      } else {
        this.$root.addClass(el, 'gray')
      }
      document.getElementById('passportNum').blur()
      this.$http.get(this.$store.state.app.host + 'api/Wechat/ValidatePassportNumber', {
        params: {
          passportNumber: this.$store.state.info.passportNum,
          token: this.$store.state.info.PhoneToken
        },
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime - 7000
      }).then(
        function(res) {
          if (res.data.Code == 0) {
            if (res.data.Result.length > 0) {
              console.log(res.data.Result);
              //添加 SELE 状态
              this.$store.state.info.visaList = []
              for (var i = 0; i < res.data.Result.length; i++) {
                var obj = res.data.Result[i];
                obj.sele = false;
                this.$store.state.info.visaList.push(obj)
              }
              this.countriesList = this.$store.state.info.visaList

              this.oldseleNum = -1

              window.localStorage.setItem('info', JSON.stringify(this.$store.state.info.visaList))

              if (res.data.Result.length > 0) {
                this.verifySuccess = true
              }
              for (var i = 0; i < this.countriesList.length; i++) {
                this.countriesList[i].sele = false
              }
            } else {
              this.$layer.alert('没有找到相应的签证信息，请检查护照号是否输入正确，或联系销售人员核实。')
            }
          } else {
            this.$layer.alert(res.data.Message)

          }
          if (this.$root.hasClass(el, 'gray')) {
            this.$root.removeClass(el, 'gray')
          }
        },
        function(err) {
          if (this.$root.hasClass(el, 'gray')) {
            this.$root.removeClass(el, 'gray')
          }
          console.log('超时');
        })
    }
  }
}
</script>
<style type="text/css" lang="scss" src="./css/selectCountry.scss"></style>
