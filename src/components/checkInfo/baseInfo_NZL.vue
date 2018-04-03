<template lang="html">
  <div class="baseInfo_NewZealand">


      <!-- // -->
      <div class="page01">
        <div class="zhushenqingren">
          <div class="huzhaohao">
            护照{{passportNum}}的身份为
          </div>
          <div class="shenqingren borderline" v-tap='{methods:seleYuan,personType:1}'>
            <span class="txt">主申请人</span>
            <div id='y1' class="yuan" :class='personType == 1?"active_blue":""' ></div>
          </div>
          <div class="shenqingren borderline" v-tap='{methods:seleYuan,personType:2}'>
            <span class="txt">主申请人配偶</span>
            <div id='y2' class="yuan" :class='personType == 2?"active_blue":""' ></div>
          </div>
          <div class="shenqingren" v-tap='{methods:seleYuan,personType:3}'>
            <span class="txt">主申请人子女</span>
            <div id='y3' class="yuan" :class='personType == 3?"active_blue":""' ></div>
          </div>
        </div>
        <div class="tishi" v-if='!contentPart'>
          <span class='txt1'>提示</span>
          <span class='txt2'>个人出行</span>
          <span class='txt3'>如果您本次出行计划是个人出行，请选择身份为“主申请人”。</span>
          <span class='txt2'>家庭出行</span>
          <span class='txt3'>如果您本次出行计划为家庭出行，请查看下方的家庭出行要求，并按家庭成员的实际情况选择身份：</span>

          <span class='txt3 marginT48 paddingL27'>•&nbsp;&nbsp;家庭出行办理范围：主申请人、主申请人配偶、未成年子女</span>
          <span class='txt3 paddingL27'>•&nbsp;&nbsp;家庭办理主申请人必须为父母</span>
          <span class='txt3 paddingL27'>•&nbsp;&nbsp;子女必须为未成年人（最多四个未成年子女申请）</span>
        </div>
        <component :is='contentPart' :personType1='personType' :olddata='olddata'></component>
        <div class="btnbg" v-if='!contentPart'>
          <div class="btn" :class='personType?"":"btnGray"' v-tap='{methods:nextFun}'>
            下一步
          </div>
        </div>
        <div class="mainApplicant_tipBg" v-if='personType&&showTip'>
          <div class="tipInfo">
            <div class="tip_h1">
                温馨提示
            </div>
            <div class="tip_cont">
              一旦确定主申请人的身份，接下来的步骤将以主申请人为主进行填写，如需要切换申请人会导致所填写内容重置，需要重新填写，请再次确认您的身份选择正确。
            </div>
            <div class="tip_btns">

              <div class="ok" v-tap='{methods:okFun}'>确定</div>
              <div class="cancel" v-tap='{methods:cancelFun}'>取消</div>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import MainApplicant from './MainApplicant.vue'
// import ApplicantSpouse from './components_NewZealand/ApplicantSpouse.vue'
// import ApplicantChild from './components_NewZealand/ApplicantChild.vue'

export default {
  data() {
    return {
      oldpersonType: '',
      olddata: '',
      passportNum: '',
      contentPart: "",
      personType: "",
      showTip: false,
      nzlFamilyData: {
        main: {
          passportNum: '123123123',
          name: 'wangwei',
          country: 'china',
          type: '',
          carree: '',
          marriage: '',
          spouseFollow: true,
          childNum: 4
        },
        spouse: {
          passportNum: '123123123',
          name: 'wangwei',
          carree: ''
        },
        child: [{
            passportNum: '123123123',
            name: 'wangwei',
            carree: ''
          },
          {
            passportNum: '123123123',
            name: 'wangwei',
            carree: ''
          },
          {
            passportNum: '123123123',
            name: 'wangwei',
            carree: ''
          },
          {
            passportNum: '123123123',
            name: 'wangwei',
            carree: ''
          }
        ]
      }
    }
  },
  mounted(){
      document.title = '签证办理';
    this.getFileTip()
  },
  created() {
    this.$store.state.info.visaList = JSON.parse(window.localStorage.getItem('info'))
    this.$store.state.info.seleNum = window.localStorage.getItem('seleNum')
    // if (this.$store.state.info.UserVisaId == '') {

    this.$store.state.info.UserVisaId = window.localStorage.getItem('UserVisaId')==null||window.localStorage.getItem('UserVisaId')==undefined?'':window.localStorage.getItem('UserVisaId')

    //

    // alert(this.$store.state.info.UserVisaId)
    if (this.$store.state.info.UserVisaId != ''|| this.$store.state.info.UserVisaId !=null) {
      // alert(1)
        // this.$store.state.info.goPage[1] = 1
      // console.log(this.$store.state.info.visaList[this.$store.state.info.seleNum]);
      // alert(Number(this.$store.state.info.visaList[this.$store.state.info.seleNum].NZLField.PassportIdentity)+1);
      // if(this.$store.state.info.visaList[this.$store.state.info.seleNum].CountryName=='新西兰'){
      //
      // }

      this.personType = Number(this.$store.state.info.visaList[this.$store.state.info.seleNum].NZLField.PassportIdentity) + 1

      this.olddata = JSON.parse(JSON.stringify(this.$store.state.info.visaList[this.$store.state.info.seleNum]))
      window.localStorage.setItem('nzlOldData', JSON.stringify(this.olddata))
      var _arr = []
      _arr.push(this.olddata)
      window.localStorage.setItem('info', JSON.stringify(_arr))
      window.localStorage.setItem('seleNum', 0)
      this.contentPart = "MainApplicant"

      switch (this.olddata.NZLField.PassportIdentity) {
        case 0:
          this.passportNum = this.olddata.PassportNumber
          break;
        case 1:
          this.passportNum = this.olddata.NZLField.SpousePassport
          break;
        case 2:
          this.passportNum = this.olddata.NZLField.MinorChildrenInfo[0].ChildPassport
          break;


      }
    } else {
        // this.$store.state.info.goPage[1] = 0
      this.passportNum = this.$store.state.info.visaList[this.$store.state.info.seleNum].PassportNumber

      window.localStorage.setItem('nzlOldData', '0')
    }
  },
  methods: {
    getFileTip() {
      this.$http.get(this.$store.state.app.host + 'api/Wechat/GetFileTip', {
        params: {
          // phoneNumber:this.$store.state.info.visaList[0].Phone
          // visaId:this.$store.state.info.UserVisaId,
          // type: 1
        },
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          console.log(res);

          if (res.data.Code == 0) {



            this.$store.state.tip.FileTipArr = res.data.Result

            window.localStorage.setItem('FileTip', JSON.stringify(res.data.Result))
            // this.showTip = false
            // this.$router.push({
            //   path: '/addpersonalInfo/assetsReady'
            // })
          } else {
            console.log(res.data.Message);

            // alert(res.data.Message)
            this.$root.showTip1([res.data.Message])

          }
        })
    },
    seleYuan(obj) {
      console.log(123321);
      var e = obj.event
      this.oldpersonType = obj.personType
      if(this.$store.state.info.UserVisaId==''){

          if (!this.contentPart) {this.personType = obj.personType}
      }
      // console.log('LLLL', this.personType);
      // console.log(this.contentPart);
      console.log('?');
      if (this.contentPart) {
        if (document.getElementById('person1') == null) {

        } else {
          console.log('!',obj.personType ,this.personType,this.oldpersonType);
          if (obj.personType != this.personType||this.$store.state.info.UserVisaId=='') {
            // alert(obj.personType+ " "+Number(parseInt(this.olddata.NZLField.PassportIdentity)+1))
            this.showTip = true

            // var tip = document.getElementsByClassName('mainApplicant_tipBg')[0]
            // console.log(tip);
            // tip.addEventListener('touchmove',function(e){
            //   e.preventDefault();
            // })

          }
        }
      }
      // console.log(e.currentTarget);
      // this.$root.addClass(e.currentTarget,"active_blue")
      // if(this.contentPart){
      //   switch(obj.personType){
      //     case 1:
      //      this.contentPart = "MainApplicant"
      //     break;
      //     case 2:
      //     this.contentPart = "ApplicantSpouse"
      //     break;
      //     case 3:
      //     this.contentPart = "ApplicantChild"
      //     break;
      //   }
      // }

      //
    },
    nextFun() {
      // if(!this.personType){
      this.showTip = true

      // }

      //
    },
    cancelFun() {

      this.showTip = false
      if (this.contentPart == '') {
        this.personType = ""
        this.contentPart = ""
      } else {

      }
    },
    okFun() {
      this.showTip = false

      if (this.contentPart == '') {
        this.contentPart = "MainApplicant"
      } else {
        this.personType = this.oldpersonType
        this.$root.eventHub.$emit('nzlpersonType', {
          personType: this.personType
        });
      }
      // this.contentPart = "MainApplicant"

      // switch(this.personType){
      //     case 1:
      //      this.contentPart = "MainApplicant"
      //     break;
      //     case 2:
      //     this.contentPart = "ApplicantSpouse"
      //     break;
      //     case 3:
      //     this.contentPart = "ApplicantChild"
      //     break;
      //   }
    }
  },
  components: {
    "MainApplicant": MainApplicant,
    // "ApplicantSpouse":ApplicantSpouse,
    // "ApplicantChild":ApplicantChild
  }
}
</script>

<style lang="css">
/*@import url(./css/baseInfo.css);*/
/* @import url(../../../css/_icons.css); */
</style>
<style lang="scss" type="text/css" src='./css/baseInfo_NewZealand.scss'>
Error:Source sample is missing.
</style>
