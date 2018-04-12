<template>
<div class="mainApplicant">
  <div class="part1 part2">
    <div id='person1' class="title">主申请人</div>
    <div class="content" v-if='!mainApplicantInfo.IsOk'>
      <div class='colLine'>
        <i></i>
        <span class='lineName'>护照号</span>
        <input type="text" name="" placeholder="请输入护照号..." v-model='mainApplicantInfo.Passport'>
        <button class="x_btn" :class='mainApplicantInfo.timer1>=0?"grayBg":"blueBg"'>
					<span v-if='mainApplicantInfo.timer1>=0'>({{mainApplicantInfo.timer1}}s)</span>
					<span class="cursor" v-tap='{methods:yzFun,identity:1}' v-else>发送验证码</span>
				</button>
      </div>
      <div class='colLine'>
        <i></i>
        <span class='lineName'>验证码</span>
        <input type="text" name="" placeholder="请输入验证码...">
        <button class="x_btn" v-tap='{methods:VerifyToken}'>确定</button>
      </div>
    </div>
    <div class="content" v-if='mainApplicantInfo.IsOk'>
      <div class='colLine'>
        <i></i>
        <span class='lineName'>护照号</span>
        <input type="text" disabled="disabled" v-model='mainApplicantInfo.Passport'>
        <span class="readyCheck">
					<img class="icon" src="static/img/gouxuan.png">
					<span class="txt">已验证</span>
        </span>
      </div>
      <div class='colLine'>
        <i></i>
        <span class='lineName'>姓名</span>
        <input type="text" name="" disabled="disabled" v-model='mainApplicantInfo.CustomerName'>
      </div>
      <div class='colLine'>
        <i></i>
        <span class='lineName'>国家</span>
        <input type="text" name="" disabled="disabled" v-model='mainApplicantInfo.CountryName'>
      </div>
      <div class='colLine'>
        <i></i>
        <span class='lineName'>出行目的</span>
        <!-- <input type="text" name="" disabled="disabled" v-model='VisaType[mainApplicantInfo.VisaType]'> -->
        <select v-model='mainApplicantInfo.VisaType' :on-change='getDataStatus()'>
              <option value='-1'></option>
              <option value="1">旅游</option>
              <option value="4">商务</option>
              <option value="5">探亲</option>
		</select>
        <span class="triangle"></span>
      </div>
      <div class='colLine'>
        <i></i>
        <span class='lineName'>职业</span>
        <select v-model='mainApplicantInfo.Career' :on-change='getDataStatus()'>
          <option value='-1'></option>
					<option value='1'>自雇</option>
					<option value='6'>受雇</option>
					<option value='5'>自由职业</option>
					<option value='4'>退休</option>
					<option value='3'>学生（18岁及以上）</option>
					<option value='2'>学生（18岁以下）</option>
					<option value='7'>学龄前儿童</option>
				</select>
        <span class="triangle"></span>
      </div>
      <div class='colLine'>
        <i></i>
        <span class='lineName'>婚姻状况</span>
        <select v-model='mainApplicantInfo.Married' @change='spouseFollow()'>
          	<option value='-1'></option>
					<option value='0'>未婚</option>
					<option value='1'>已婚</option>
					<option value='2'>离异</option>
					<option value='3'>丧偶</option>
				</select>
        <span class="triangle"></span>
      </div>
      <div class='colLine' v-if='mainApplicantInfo.Married == 1'>
        <i></i>
        <span class='lineName'>配偶是否跟随</span>
        <select v-model='mainApplicantInfo.IsSpouse' @change='spouseFollow()'>
          <option value='-1'></option>
					<option value='1'>是</option>
					<option value='0'>否</option>
				</select>
        <span class="triangle"></span>
      </div>
      <div class='colLine'>
        <i></i>
        <span class='lineName'>有几位未成年子女跟随</span>
        <select v-model='mainApplicantInfo.IsChild' @change='changeChildNum()'>
          <option value='-1'></option>
					<option value='0'>无</option>
					<option value='1'>1位</option>
					<option value='2'>2位</option>
					<option value='3'>3位</option>
					<option value='4'>4位</option>
				</select>
        <span class="triangle"></span>
      </div>
    </div>
  </div>
  <!-- <div v-if='spouseInfo.IsOk'> -->
  <div class="part1 part2" v-if='mainApplicantInfo.Married == 1&&mainApplicantInfo.IsSpouse == 1'>
    <div id='person2' class="title">配偶信息</div>
    <div class="content">
      <div class='colLine'>
        <i></i>
        <span class='lineName'>护照号</span>
        <input type="text" placeholder="请输入护照号..." :disabled="spouseInfo.IsOk" v-model='spouseInfo.Passport'>
        <button class="x_btn" :class='spouseInfo.timer1>=0?"grayBg":"blueBg"' v-if='!spouseInfo.IsOk'>
						<span v-if='spouseInfo.timer1>=0'>({{spouseInfo.timer1}}s)</span>
						<span v-tap='{methods:yzFun,identity:2}' v-else>发送验证码</span>
					</button>
        <span class="readyCheck" v-if='spouseInfo.IsOk'>
						<img class="icon" src="static/img/gouxuan.png">
						<span class="txt">已验证</span>
        </span>
      </div>
      <div class='colLine' v-if='!spouseInfo.IsOk'>
        <i></i>
        <span class='lineName'>验证码</span>
        <input type="text" name="" placeholder="请输入验证码...">
        <button class="x_btn" v-tap='{methods:VerifyToken}'>确定</button>
      </div>

      <div class='colLine' v-if='spouseInfo.IsOk'>
        <i></i>
        <span class='lineName'>姓名</span>
        <input type="text" name="" disabled="disabled" v-model='spouseInfo.CustomerName'>
      </div>
      <div class='colLine' v-if='spouseInfo.IsOk'>
        <i></i>
        <span class='lineName'>职业</span>
        <select v-model='spouseInfo.Career' :on-change='getDataStatus()'>
            <option value='-1'></option>
						<option value='1'>自雇</option>
						<option value='6'>受雇</option>
						<option value='5'>自由职业</option>
						<option value='4'>退休</option>
            <option value='8'>学生</option>
						<!-- <option value='3'>学生（18岁及以上）</option>
						<option value='2'>学生（18岁以下）</option> -->
						<!-- <option value='7'>学龄前儿童</option> -->
					</select>
        <span class="triangle"></span>
      </div>
    </div>
  </div>
  <!-- </div> -->
  <div class="part1 part2" v-if='childrenInfo.data.length !=0'>
    <div id='person3' class="title">子女信息</div>
    <div class="content" v-for='(child,index) in childrenInfo.data'>
      <div class='colLine'>
        <i></i>
        <span class='lineName'>护照号</span>
        <input type="text" name="" placeholder="请输入护照号..." :disabled='child.IsOk' v-model='child.Passport'>
        <button class="x_btn" :class='child.timer1>=0?"grayBg":"blueBg"' v-if='!child.IsOk'>
						<span v-if='child.timer1>=0'>({{child.timer1}}s)</span>
						<span v-tap='{methods:yzFun,identity:3,index:index}' v-else>发送验证码</span>
					</button>
        <span class="readyCheck" v-if='child.IsOk'>
						<img class="icon" src="static/img/gouxuan.png">
						<span class="txt">已验证</span>
        </span>
      </div>
      <div class='colLine' v-if='!child.IsOk'>
        <i></i>
        <span class='lineName'>验证码</span>
        <input type="text" name="" placeholder="请输入验证码..." v-model='child.yanzheng'>
        <button class="x_btn" v-tap='{methods:VerifyToken,index:index}'>确定</button>
      </div>
      <div class='colLine' v-if='child.IsOk'>
        <i></i>
        <span class='lineName'>姓名</span>
        <input type="text" disabled="disabled" v-model='child.CustomerName'>
      </div>
      <div class='colLine' v-if='child.IsOk'>
        <i></i>
        <span class='lineName'>职业</span>
        <select v-model='child.Career' :on-change='getDataStatus()'>
            <option value='-1'></option>
						<option value='7'>学龄前儿童</option>
						<option value='8'>学生</option>

            <!-- <option value='3'>学生（18岁及以上）</option> -->
					</select>
        <span class="triangle"></span>
      </div>

    </div>
  </div>

  <div class="page" v-if='showTip'>
    <div class="tipcolumn1">
      <div class="column21">
        <div class="title">温馨提示</div>
        <div class="content">请再次确认您所填写的信息准确无误，修改基础信息会导致后续所需签证材料发生变化，表格内容清空。
        </div>
      </div>
      <div class="page_btn">
        <div class="submit" v-tap='{methods:submitBtn}'>
          确认
        </div>
        <div class="cancel" v-tap="{methods:cancelBtn}">
          取消
        </div>
      </div>
    </div>
  </div>
  <div class="addMode">
    <form>
      <label class="intelligent">
          <input type="radio" name="model" value="0" v-model='show_model'>
          <div class="i_text">智能模式</div>
          <div class="i_detail">智能模式：可自动识别证件内容，需要上传证件及资料图片，提交后直接进入签证部审核，加快办理速度。
          </div>
        </label>
      <label class="intelligent">
          <input type="radio" name="model" value="1"  v-model='show_model'>
          <div class="i_text">普通模式</div>
          <div class="i_detail">普通模式：仅填写文字信息，无需上传证件及资料图片，线上提交后需等待纸质资料寄送至签证部后开始审核。
          </div>
        </label>
    </form>
  </div>
  <div class="btnbg">
    <div class="btn_btnbg" :class="Datafinish?'':'btnGray'" v-tap='{methods:createData}'>
      下一步
    </div>
  </div>
</div>
</template>
<script type="text/javascript">
export default {
  props: ['personType1', 'olddata'],
  data() {
    return {
      show_model: 0,
      yzBtn: false, //判断验证按钮是否点下
      VerifySuccessNum: '', //正在验证的ID
      getOlddata: '',
      showTip: false,
      getMainPersonData: '', //存储主申请人接口获取的 所有数据
      Datafinish: false, //当前状态，数据是否满足提交
      getTempUserData: '',
      personType: '',
      childrenObj: {
        Passport: "",
        yanzheng: "",
        CustomerName: "",
        Career: "-1",
        IsOk: false,
        timer1: -1
      },
      childNum: "",
      childrenInfo: {
        IsOk: false,
        data: []
      },

      identity: "",
      mainCheckOk: false,
      VisaType: ["", "旅游", "工作", "学生", "商务", "探亲"],
      mainApplicantInfo: {
        Passport: "TEST111",
        CustomerName: "li",
        CountryName: "中国",
        VisaType: "1",
        Career: "-1",
        Married: "-1",
        IsSpouse: "0",
        IsChild: "-1",
        timer1: -1,
        IsOk: false
      },
      spouseInfo: {
        Passport: "",
        CustomerName: "",
        Career: "-1",
        timer1: -1,
        IsOk: false
      },
      check: true,
      nextBtn: false
    }

  },

  methods: {
    cancelBtn() {
      this.showTip = false
    },
    submitBtn() {
      console.log(this.getMainPersonData);
      // var passport = this.getMainPersonData.Passport == undefined ? this.getMainPersonData.PassportNumber : this.getMainPersonData.Passport
      // var name = this.getMainPersonData.CustomerName == undefined ? this.getMainPersonData.Name : this.getMainPersonData.CustomerName
      var passport = this.mainApplicantInfo.Passport
      var name = this.mainApplicantInfo.CustomerName
      var childData = []
      for (var i = 0; i < this.childrenInfo.data.length; i++) {
        var obj = {
          'ChildName': this.childrenInfo.data[i].CustomerName,
          'ChildPassport': this.childrenInfo.data[i].Passport,
          'ChildCareer': this.childrenInfo.data[i].Career
        }
        childData.push(obj)
      }
      var _IsSpouseFollow = false;
      if (this.mainApplicantInfo.Married == 1 && this.mainApplicantInfo.IsSpouse == 1) {
        _IsSpouseFollow = true
      }
      // alert(this.$store.state.info.UserVisaId)


      this.$http.post(this.$store.state.app.host + 'api/Wechat/CreateUserVisaNZL', {
        "CallId": parseInt(new Date().getTime()),
        "PassportNumber": passport,
        "Name": name,
        "CountryId": this.getMainPersonData.CountryId,
        "VisaType": this.visatype,
        "Career": this.mainApplicantInfo.Career,
        "Married": this.mainApplicantInfo.Married,
        "VisaName": this.getMainPersonData.VisaName,
        "PayTime": this.getMainPersonData.PayTime,
        "Number": this.getMainPersonData.Number,
        "Agent": this.getMainPersonData.Agent,
        "Sales": this.getMainPersonData.Sales,
        "Destination": this.getMainPersonData.Destination,
        "Cause": this.getMainPersonData.Cause,
        "PayStatus": this.getMainPersonData.PayStatus,
        "Phone": this.getMainPersonData.Phone,
        "IsPersonal": this.getMainPersonData.IsPersonal,
        "IsGreenChannel": this.getMainPersonData.IsGreenChannel,
        "UserVisaId": this.$store.state.info.UserVisaId,
        "EntryTimes": this.getMainPersonData.EntryTimes,
        "PassportIdentity": this.identity - 1,
        "IsSpouseFollow": _IsSpouseFollow,
        "MinorChildrenFollow": this.mainApplicantInfo.IsChild,
        "SpouseName": this.spouseInfo.CustomerName,
        "SpousePassport": this.spouseInfo.Passport,
        "SpouseCareer": this.spouseInfo.Career == -1 ? '' : this.spouseInfo.Career,
        "MinorChildrenInfo": childData,
        "ShowModel": this.show_model,
      }, {
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          if (res.data.Code == 0) {
            this.showTip = false
            // alert(res.data.Result.UserVisaId)
            this.$store.state.info.UserVisaId = res.data.Result
            window.localStorage.setItem('UserVisaId', JSON.stringify(res.data.Result))
            window.localStorage.setItem('showmodel', this.show_model)
            var that = this
            if (this.show_model == 1) {
              this.setPaperProgress(1, 100)
              var t = setTimeout(function() {
                that.setPaperProgress(3, 100)
              }, 500);
            } else {
              this.setPaperProgress(1, 0)
              var t = setTimeout(function() {
                that.setPaperProgress(3, 0)
              }, 1000);
            }
            var _arr = []
            var _obj = {
              "VisaID": res.data.Result,
              "Name": name,
              "PassportNumber": passport,
              "VisaName": this.getMainPersonData.VisaName,
              "CountryId": this.getMainPersonData.CountryId,
              // "CountryName": "sample string 6",
              "Career": this.mainApplicantInfo.Career,
              "Married": this.mainApplicantInfo.Married,
              // "VisaStatus": 1,
              "VisaType": this.getMainPersonData.VisaType,
              "Cause": this.getMainPersonData.Cause,
              "Phone": this.getMainPersonData.Phone,
              "Destination": this.getMainPersonData.Destination,
              "Number": this.getMainPersonData.Number,
              // "PassportIncludeVisa": true,
              "NZLField": {
                "PassportIdentity": this.identity - 1,
                "IsSpouseFollow": this.mainApplicantInfo.IsSpouse == '0' ? false : true,
                "MinorChildrenFollow": this.mainApplicantInfo.IsChild,
                "SpouseName": this.spouseInfo.CustomerName,
                "SpousePassport": this.spouseInfo.Passport,
                "SpouseCareer": this.spouseInfo.Career == -1 ? '' : this.spouseInfo.Career,
                "MinorChildrenInfo": childData,
              }
            }
            _arr.push(_obj)
            window.localStorage.setItem('info', JSON.stringify(_arr))
            window.localStorage.setItem('seleNum', 0)
            this.getCredentialsListNZL('/main/content/info')


          } else {
            this.$root.showTip1([res.data.Message])
          }
        },
        function(err) {
          console.log('超时');
        })

    },
    createData() {

      //整理数据格式
      if (!this.Datafinish) {
        return
      }

      // alert(this.personType+'   '+Number(Number(this.getMainPersonData.NZLField.PassportIdentity)+1))
      // alert(this.$store.state.info.UserVisaId)
      if (this.$store.state.info.UserVisaId == '' || this.$store.state.info.UserVisaId == null) {
        this.showTip = true;
        return
      }
      // alert(this.$store.state.info.UserVisaId)
      console.log(this.personType, Number(Number(this.getOlddata.NZLField.PassportIdentity) + 1));
      if (this.personType != Number(Number(this.getOlddata.NZLField.PassportIdentity) + 1)) {
        // this.$router.push({
        //   path: '/addpersonalInfo/xuzhi'
        // })
        this.showTip = true;
      } else {
        console.log(this.getOlddata);
        console.log(this.childrenInfo.data);

        //下面的代码 只有当主申请人 职业 婚姻 变化的时候 走修改接口
        var _IsSpouse = this.mainApplicantInfo.IsSpouse == '0' ? false : true
        // alert(this.mainApplicantInfo.Career!=this.getOlddata.Career)
        // alert(this.mainApplicantInfo.Married!=this.getOlddata.Married)
        // alert(this.mainApplicantInfo.IsChild!=this.getOlddata.NZLField.MinorChildrenFollow)
        // alert(_IsSpouse!=this.getOlddata.NZLField.IsSpouseFollow)
        // alert(this.mainApplicantInfo.Career!=this.getOlddata.Career || this.mainApplicantInfo.Married!=this.getOlddata.Married  || this.mainApplicantInfo.IsChild!=this.getOlddata.NZLField.MinorChildrenFollow || _IsSpouse!=this.getOlddata.NZLField.IsSpouseFollow)
        if (this.mainApplicantInfo.Career != this.getOlddata.Career || this.mainApplicantInfo.Married != this.getOlddata.Married || this.mainApplicantInfo.IsChild != this.getOlddata.NZLField.MinorChildrenFollow || _IsSpouse != this.getOlddata.NZLField
          .IsSpouseFollow || this.mainApplicantInfo.IsChild != this.getOlddata.NZLField.MinorChildrenFollow) {
          // alert(1)
          this.showTip = true;
        } else {
          for (var i = 0; i < this.childrenInfo.data.length; i++) { //判断多个子女的时候 子女的职业变化 上面的IF 已经判断了子女的数量
            if (this.childrenInfo.data[i].Career != this.getOlddata.NZLField.MinorChildrenInfo[i].ChildCareer) {
              this.showTip = true;
              return
            }
          }
          this.submitBtn()
          // this.$router.push({
          //   path: '/addpersonalInfo/xuzhi'
          // })
        }
      }








    },
    setPaperProgress(progressType, num) {
      this.$http.post(this.$store.state.app.host + "api/Manage/SetPaperProgress", {
          UserVisaId: this.$store.state.info.UserVisaId,
          TypeId: progressType,
          Progress: num
        }, {
          headers: {
            Authorization: this.$store.state.app.token
          }
        })
        .then(
          function(res) {

          }
        )
    },
    getDataStatus() {

      var childNum = 0
      var spouse = false
      for (var variable in this.mainApplicantInfo) {
        if (this.mainApplicantInfo.hasOwnProperty(variable)) {
          // console.log(variable, this.mainApplicantInfo[variable]);
          if (variable == 'timer1') {
            break
          }
          if (variable == 'IsSpouse') {
            if (this.mainApplicantInfo['Married'] == 1 && this.mainApplicantInfo['IsSpouse'] == 1) {
              spouse = true
            }
          }

          if (variable == 'IsChild') {
            childNum = this.mainApplicantInfo[variable]
          }

          if (this.mainApplicantInfo[variable] == -1) {
            this.Datafinish = false
            return
          }
        }
      }
      if (spouse) {
        if (this.spouseInfo.Career == -1) {
          this.Datafinish = false
          return
        }
      }
      if (childNum > 0) {
        // console.log('AAA',childNum,this.childrenInfo.data);
        for (var i = 0; i < childNum; i++) {
          console.log(this.childrenInfo.data[i].Career, '<<<<<<<<<<<');
          if (this.childrenInfo.data[i].Career == -1) {
            this.Datafinish = false
            return
          }
        }

      }
      this.Datafinish = true
    },
    VerifySuccess() {
      console.log('------------------------', this.VerifySuccessNum);
      switch (this.VerifySuccessNum) {
        case 1:
          this.mainApplicantInfo.IsOk = true
          this.mainApplicantInfo.Passport = this.getTempUserData.Passport
          this.mainApplicantInfo.CustomerName = this.getTempUserData.CustomerName
          this.mainApplicantInfo.VisaType = this.getTempUserData.VisaType
          this.getMainPersonData = JSON.parse(JSON.stringify(this.getTempUserData))
          break;
        case 2:
          this.spouseInfo.IsOk = true
          this.spouseInfo.Passport = this.getTempUserData.Passport
          this.spouseInfo.CustomerName = this.getTempUserData.CustomerName
          break;
        case 3:

          this.childrenInfo.data[this.childredId].IsOk = true
          this.childrenInfo.data[this.childredId].Passport = this.getTempUserData.Passport
          this.childrenInfo.data[this.childredId].CustomerName = this.getTempUserData.CustomerName
          break;


      }

    },
    VerifyToken() {
      var smscode = event.target.parentNode.getElementsByTagName('input')[0].value
      if (this.getTempUserData == '' || smscode == '') return
      this.$http.post(this.$store.state.app.host + 'api/Wechat/VerfiyPhoneCode', {
        // PhoneNumber: '13241796078',
        // Code: '548338',
        // VerifyToken: '8jFN9YdJixD2+hpGuEmE0MmUivYCvmuW+dwibhbeh0PZaAUwjg3s+oAkcpiofu0udXo6kiXjXuiIXTK22thTa7Av4zzKsp9dO36WdOFEqlk='
        PhoneNumber: this.getTempUserData.TestUserPhone == null ? this.getTempUserData.Phone : this.getTempUserData.TestUserPhone,
        Code: smscode,
        VerifyToken: this.SMSToken
      }, {
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          if (res.data.Code == 0) {
            this.$store.state.info.PhoneToken = res.data.Result
            //牵扯到多个手机号码TOKEN需要验证的时候  在这里存储手机号+TOKEN。
            window.localStorage.setItem('PhoneToken', res.data.Result)

            // alert('!!!!!!!!!!!')
            // this.identity = par.identity
            // this.childredId = par.index
            this.VerifySuccess()

          } else {
            this.$root.showTip1([res.data.Message])
          }


        },
        function(err) {
          console.log('超时');
        })
    },
    passportVerification(str) {
      console.log(str);
      var sf = this.VerifySuccessNum; //当前选择的身份
      console.log('身份', sf);
      var reg = /^[A-Za-z0-9]{9}$/
      // console.log(arr[5].value.match(reg),'<<<<')
      if (str == '') {
        // alert('请输入护照号！')
        // this.$root.showTip1(['请输入护照号！'])
        alert('请输入护照号！')
        return
      }
      if (str.match(reg) == null) {
        // this.$root.showTip1(['请输入正确的护照号码！'])
        alert('请输入正确的护照号码！')
        return
      }
      if (sf != '1') {
        if (str == this.mainApplicantInfo.Passport) {
          // this.$root.showTip1(['输入的护照号码与主申请人相同！'])
          alert('输入的护照号码与主申请人相同！')
          return
        }
      }
      if (sf != '2') {
        if (str == this.spouseInfo.Passport) {
          // this.$root.showTip1(['输入的护照号码与主申请人配偶相同！'])
          alert('输入的护照号码与主申请人配偶相同！')
          return
        }
      }
      if (sf != '3') {
        for (var i = 0; i < this.childrenInfo.data.length; i++) {
          if (this.childrenInfo.data[i].Passport == str) {
            // this.$root.showTip1(['输入的护照号码与主申请人子女相同！'])
            alert('输入的护照号码与主申请人子女相同！')
            return
          }
        }
      } else if (sf == '3') {
        for (var i = 0; i < this.childrenInfo.data.length; i++) {
          if (i != this.childredId) {
            if (this.childrenInfo.data[i].Passport == str) {
              // this.$root.showTip1(['输入的护照号码与主申请人子女相同！'])
              alert('输入的护照号码与主申请人子女相同！')
              return
            }
          }
        }
      }
      this.$http.get(this.$store.state.app.host + 'api/Wechat/ReturnNZLVisaInfo', {
        params: {
          passport: str,
          typeId: 3
        },
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          if (res.data.Code == 0) {
            console.log(res.data.Result.VisaID);
            if (res.data.Result.VisaID != 0) {
              if (res.data.Result.VisaID == this.$store.state.info.UserVisaId) {
                //判断这个签证ID ，是否是当前在办理的签证ID。解决子女变化时候，情况所有子女信息。在录入信息后提示正在办理
                this.yanzhengPassport(str)
              } else {
                // this.$root.showTip1(['输入的护照号码已在办理中！'])
                alert('输入的护照号码已在办理中！')
              }
              return
            } else {
              this.yanzhengPassport(str)
            }
          }
        })

    },
    yanzhengPassport(passport) {
      this.getTempUserData = ''
      this.$http.get(this.$store.state.app.host + 'api/Wechat/ValidatePassportNumber', {
        params: {
          passportNumber: passport,
          token: this.$store.state.info.PhoneToken
          // versionId:7,
          // page: 53
        },
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime - 7000
      }).then(
        function(res) {
          if (res.data.Code == 0) {

            // res.data.Result=[]
            if (res.data.Result.length > 0) {
              console.log(res.data.Result);
              for (var i = 0; i < res.data.Result.length; i++) {
                if (res.data.Result[i].CountryName == '新西兰') {
                  this.getTempUserData = JSON.parse(JSON.stringify(res.data.Result[i]))
                  break;
                }
              }
              // console.log(1111);
              if (this.getTempUserData != '') {
                if (!this.getTempUserData.NeedVerifySMS) { //如果 NeedVerifySMS 等于FALSE  则不需要验证
                  this.VerifySuccess()

                  return;
                }
                this.$http.get(this.$store.state.app.host + 'api/Wechat/SendPhoneCode', {
                  params: {
                    phoneNumber: this.getTempUserData.TestUserPhone == undefined ? this.getTempUserData.Phone : this.getTempUserData.TestUserPhone
                    // phoneNumber: '13911809695'
                  },
                  headers: this.$root.crossLogin(),
                  timeout: this.$store.state.app.httpTime
                }).then(
                  function(res) {
                    // console.log(res);
                    if (res.data.Code == 0) {
                      // alert(this.VerifySuccessNum+"   "+this.childredId)
                      this.selfTime(this.VerifySuccessNum, this.childredId); //短信验证码成功发出后 ，才开始倒计时
                      this.SMSToken = res.data.Result
                      //

                      //
                    } else {
                      this.$root.showTip1([res.data.Message])
                    }
                  }
                )
              } else {
                // this.$root.showTip1(['没有找到相应的签证信息，请检查护照号是否输入正确，或联系销售人员核实。'])
                alert('没有找到相应的签证信息，请检查护照号是否输入正确，或联系销售人员核实。')
              }

            } else {
              // this.$root.showTip1(['没有找到相应的签证信息，请检查护照号是否输入正确，或联系销售人员核实。'])
              alert('没有找到相应的签证信息，请检查护照号是否输入正确，或联系销售人员核实。')
            }
          } else {
            // this.$root.showTip1([res.data.Message])
            alert(res.data.Message)

          }
        },
        function(err) {
          console.log('超时');
        })
    },
    MainVerification() {
      // this.mainApplicantInfo.IsOk = true
      switch (this.identity) {
        case 1:
          this.passportVerification(this.mainApplicantInfo.Passport)
          break;
        case 2:
          this.passportVerification(this.spouseInfo.Passport)
          break;
        case 3:
          this.passportVerification(this.childrenInfo.data[this.childredId].Passport)

          break;
      }
    },
    chilrdVerification(obj) {
      // var index = obj.index;
      // this.childrenInfo.data[index].IsOk = true
      switch (this.identity) {
        case 1:
          this.passportVerification(this.mainApplicantInfo.Passport)
          break;
        case 2:
          this.passportVerification(this.spouseInfo.Passport)
          break;
        case 3:
          this.passportVerification(this.childrenInfo.data[this.childredId].Passport)

          break;


      }
    },

    spouseFollow() {

      if (this.mainApplicantInfo.IsSpouse == '1' || this.mainApplicantInfo.Married == '1') {
        this.spouseInfo.IsOk = false
      } else {
        // this.spouseInfo.IsOk = false
      }
      this.getDataStatus()
    },
    changeChildNum() {
      if (this.mainApplicantInfo.IsChild == -1) {
        return
      }
      console.log(this.childrenInfo.data.length, 'PP')
      this.childrenInfo.data = []
      // for (var i = 0; i <this.mainApplicantInfo.IsChild; i++) {
      //   this.childrenInfo.data.push(JSON.parse(JSON.stringify(this.childrenObj)))
      // }
      if (this.childrenInfo.data.length > this.mainApplicantInfo.IsChild) {
        this.childrenInfo.data.length = this.mainApplicantInfo.IsChild
      } else {
        var len = this.mainApplicantInfo.IsChild - this.childrenInfo.data.length
        for (var i = 0; i < len; i++) {
          // this.childrenInfo.data.push(this.childrenObj)
          this.childrenInfo.data.push(JSON.parse(JSON.stringify(this.childrenObj)))
        }

      }
      console.log(this.personType, '------', this.passportNum);
      if (this.personType == 3 && this.childrenInfo.data.length > 0) {
        this.childrenInfo.data[0].IsOk = true
        this.childrenInfo.data[0].Passport = this.passportNum
        this.childrenInfo.data[0].CustomerName = this.name
        if (this.getMainPersonData.NZLField == undefined) {
          this.childrenInfo.data[0].Career = -1
        } else {

          this.childrenInfo.data[0].Career = this.getMainPersonData.NZLField.MinorChildrenInfo[0].ChildCareer
        }


      }
    },
    yzFun(par) {

      this.yzBtn = true
      // console.log(par.event.target.parentNode);
      // var thisEl  = par.event.target.parentNode
      //
      // if(this.$root.hasClass(thisEl,'grayBg')){
      //   return
      // }else{
      //   this.$root.removeClass(par.event.target.parentNode,'blueBg')
      //   this.$root.addClass(par.event.target.parentNode,'grayBg')
      // }
      this.childredId = par.index
      this.VerifySuccessNum = par.identity
      switch (par.identity) {
        case 1:
          this.passportVerification(this.mainApplicantInfo.Passport)
          break;
        case 2:
          this.passportVerification(this.spouseInfo.Passport)
          break;
        case 3:
          this.passportVerification(this.childrenInfo.data[this.childredId].Passport)

          break;


      }

    },
    selfTime(type, _d) {
      var that = this;
      var m = -1
      switch (type) {
        case 1:
          m = that.mainApplicantInfo.timer1
          break;
        case 2:
          m = that.spouseInfo.timer1
          break;
        case 3:
          m = that.childrenInfo.data[_d].timer1
          break;

      }
      if (m == -1) {
        var _t = 60;
        var tt = setInterval(function() {
          // console.log(type,_t);
          switch (type) {
            case 1:
              that.mainApplicantInfo.timer1 = _t
              break;
            case 2:
              that.spouseInfo.timer1 = _t
              break;
            case 3:
              that.childrenInfo.data[_d].timer1 = _t
              break;

          }
          if (_t < -1 || _t == -1) {
            _t = -1
            clearInterval(tt)
          } else {
            _t--;
          }
        }, 1000)
      } else {
        console.log("稍等")
        alert("稍等")
      }
    },
    changeType(str, reset) {
      // str = this.personType1
      if (this.$store.state.info.UserVisaId == '' || reset) {
        switch (str) {
          case 1:
            this.mainApplicantInfo.IsOk = true
            this.childrenInfo.data = []
            this.spouseInfo.IsOk = false
            this.mainApplicantInfo.Married = '-1'
            this.mainApplicantInfo.IsSpouse = '0'
            this.mainApplicantInfo.IsChild = '-1'
            this.mainApplicantInfo.Career = '-1'
            // this.childrenObj.IsOk = false
            //第一次验证数据植入。
            this.mainApplicantInfo.Passport = this.passportNum
            this.mainApplicantInfo.CustomerName = this.name
            this.mainApplicantInfo.VisaType = this.visatype

            //清楚其他类型第一次数据
            this.spouseInfo.Passport = ''
            this.spouseInfo.CustomerName = ''
            this.spouseInfo.Career = ''
            this.spouseInfo.timer1 = -1
            this.spouseInfo.IsOk = ''

            break;
          case 2:
            this.mainApplicantInfo.IsOk = false
            this.spouseInfo.IsOk = true
            this.childrenInfo.data = []
            this.mainApplicantInfo.Married = '1'
            this.mainApplicantInfo.IsSpouse = '1'
            this.mainApplicantInfo.IsChild = '-1'

            // this.childrenObj.IsOk = false
            //第一次验证数据植入。
            this.spouseInfo.Passport = this.passportNum
            this.spouseInfo.CustomerName = this.name

            //清楚其他类型第一次数据
            this.mainApplicantInfo.Passport = ''
            break;
          case 3:

            this.mainApplicantInfo.IsOk = false
            this.spouseInfo.IsOk = false
            this.mainApplicantInfo.Married = '-1'
            this.mainApplicantInfo.IsSpouse = '0'
            this.mainApplicantInfo.IsChild = '1'
            this.childrenInfo.data = []
            // this.childrenObj.IsOk = true
            this.childrenInfo.data.push(JSON.parse(JSON.stringify(this.childrenObj)))
            this.childrenInfo.data[0].IsOk = true
            //第一次验证数据植入。
            this.childrenInfo.data[0].Passport = this.passportNum
            this.childrenInfo.data[0].CustomerName = this.name

            //清楚其他类型第一次数据
            this.mainApplicantInfo.Passport = ''
            this.spouseInfo.Passport = ''

            this.spouseInfo.CustomerName = ''
            this.spouseInfo.Career = ''
            this.spouseInfo.timer1 = -1
            this.spouseInfo.IsOk = ''
            break;
            // this.changeChildNum()
        }
      } else {
        // this.getOlddata
        console.log('============================');
        console.log(this.getOlddata);
        this.mainApplicantInfo.IsOk = true
        this.mainApplicantInfo.Career = this.getOlddata.Career
        this.mainApplicantInfo.Married = this.getOlddata.Married
        this.mainApplicantInfo.IsSpouse = this.getOlddata.NZLField.IsSpouseFollow ? 1 : 0
        this.mainApplicantInfo.IsChild = this.getOlddata.NZLField.MinorChildrenFollow
        this.mainApplicantInfo.Passport = this.getOlddata.PassportNumber
        this.mainApplicantInfo.CustomerName = this.getOlddata.Name

        if (window.localStorage.getItem('newcreated') == '2') {
          this.mainApplicantInfo.VisaType = (this.getOlddata.VisaType)
        } else {
          this.mainApplicantInfo.VisaType = this.getHashVisaType(this.getOlddata.VisaType)

        }
        if (this.mainApplicantInfo.Married == 1 && this.mainApplicantInfo.IsSpouse == 1) {
          this.spouseInfo.IsOk = true
          this.spouseInfo.Passport = this.getOlddata.NZLField.SpousePassport
          this.spouseInfo.CustomerName = this.getOlddata.NZLField.SpouseName
          this.spouseInfo.Career = this.getOlddata.NZLField.SpouseCareer

        }
        if (this.childrenInfo.data.length < this.getOlddata.NZLField.MinorChildrenInfo.length) {
          for (var i = 0; i < this.getOlddata.NZLField.MinorChildrenInfo.length; i++) {
            this.childrenInfo.data.push(JSON.parse(JSON.stringify(this.childrenObj)))
            this.childrenInfo.data[i].IsOk = true
            this.childrenInfo.data[i].Passport = this.getOlddata.NZLField.MinorChildrenInfo[i].ChildPassport
            this.childrenInfo.data[i].CustomerName = this.getOlddata.NZLField.MinorChildrenInfo[i].ChildName
            this.childrenInfo.data[i].Career = this.getOlddata.NZLField.MinorChildrenInfo[i].ChildCareer
          }
        }

      }

    },
    getCredentialsListNZL(url) {
      this.$http.get(this.$store.state.app.host + 'api/Wechat/CredentialsListNZL', {
        params: {
          visaId: this.$store.state.info.UserVisaId,
          type: 0
        },
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          if (res.data.Code == 0) {
            window.localStorage.setItem('NzlCredentialsList', JSON.stringify(res.data.Result))
            this.$http.get(this.$store.state.app.host + 'api/Wechat/CredentialsListNZL', {
              params: {
                visaId: this.$store.state.info.UserVisaId,
                type: 1
              },
              headers: this.$root.crossLogin(),
              timeout: this.$store.state.app.httpTime
            }).then(
              function(res) {
                if (res.data.Code == 0) {
                  window.localStorage.setItem('NzlReadyCredentialsList', JSON.stringify(res.data.Result))
                  this.$router.push({
                    path: url
                  })
                  this.$root.eventHub.$emit('infoStep', {
                    infoStep: 2,
                    // messageArr: messagenumArr
                  });
                }
              })
          }
        })

    },
    getHashVisaType(str) {
      var vt = -1
      switch (str) {
        case '旅游':
          vt = 1
          break;
        case '工作':
          vt = 2
          break;
        case '学生':
          vt = 3
          break;
        case '商务':
          vt = 4
          break;
        case '探亲':
          vt = 5
          break;
      }
      return vt
    }
  },
  updata() {
    console.log('111');
    // console.log(this.personType1);
  },
  mounted() {
    console.log(this.personType1);
    document.title = '签证办理';
    this.changeType(this.personType1, false)
    this.personType = this.personType1

    this.identity = this.personType1
    // alert(this.identity)
    // this.getOlddata = this.olddata

    var that = this
    this.$root.eventHub.$on('nzlpersonType', function(msg) {
      if (that.personType == msg.personType) return;
      // console.log(msg.personType, '0000');
      that.personType = msg.personType
      that.identity = msg.personType
      that.changeType(msg.personType, true)

    })

  },
  created() {
    this.getOlddata = JSON.parse(window.localStorage.getItem('nzlOldData'))
    // if (this.$store.state.info.PhoneToken == '') {
    this.$store.state.info.PhoneToken = window.localStorage.getItem('PhoneToken')
    // }
    this.$store.state.info.visaList = JSON.parse(window.localStorage.getItem('info'))
    this.$store.state.info.seleNum = window.localStorage.getItem('seleNum')
    // if (this.$store.state.info.UserVisaId == '') {
    this.$store.state.info.UserVisaId = window.localStorage.getItem('UserVisaId') == null || window.localStorage.getItem('UserVisaId') == undefined ? '' : window.localStorage.getItem('UserVisaId')
    console.log(this.$store.state.info.UserVisaId);

    console.log(this.visatype, '+++++');
    if (this.$store.state.info.UserVisaId != '') {
      console.log(this.$store.state.info.visaList[this.$store.state.info.seleNum].VisaType);

      this.visatype = this.getHashVisaType(this.$store.state.info.visaList[this.$store.state.info.seleNum].VisaType)

      console.log(this.visatype, '+++++');
      switch (this.getOlddata.NZLField.PassportIdentity) {
        case 0:
          this.passportNum = this.getOlddata.PassportNumber
          this.name = this.getOlddata.Name
          this.Career = this.getOlddata.Career
          break;
        case 1:
          this.passportNum = this.getOlddata.NZLField.SpousePassport
          this.name = this.getOlddata.NZLField.SpouseName
          this.Career = this.getOlddata.NZLField.SpouseCareer
          break;
        case 2:
          this.passportNum = this.getOlddata.NZLField.MinorChildrenInfo[0].ChildPassport
          this.name = this.getOlddata.NZLField.MinorChildrenInfo[0].ChildName
          this.Career = this.getOlddata.NZLField.MinorChildrenInfo[0].ChildCareer
          break;


      }

    } else {
      if (window.localStorage.getItem('newcreated') == 1) {
        this.visatype = this.$store.state.info.visaList[this.$store.state.info.seleNum].VisaType
      } else {
        this.visatype = this.getHashVisaType(this.$store.state.info.visaList[this.$store.state.info.seleNum].VisaType)
      }


      this.passportNum = this.$store.state.info.visaList[this.$store.state.info.seleNum].Passport
      this.name = this.$store.state.info.visaList[this.$store.state.info.seleNum].CustomerName

      // window.localStorage.setItem('nzlOldData', '0')
    }





    // this.Career = this.$store.state.info.visaList[this.$store.state.info.seleNum].Career
    this.getMainPersonData = JSON.parse(JSON.stringify(this.$store.state.info.visaList[this.$store.state.info.seleNum]))
    console.log(this.passportNum, this.name, this.visatype, '?????????');
    // this.passportNum = '123321'
    if (window.localStorage.getItem('showmodel') == '') {
      this.show_model = this.$store.state.info.visaList[this.$store.state.info.seleNum].ShowModel
    } else {
      this.show_model = window.localStorage.getItem('showmodel')
    }

  },
  destroyed() {
    this.$root.eventHub.$off('nzlpersonType')
  }
}
</script>
<style type="text/css" lang='scss' src='./css/mainApplicant.scss'></style>
