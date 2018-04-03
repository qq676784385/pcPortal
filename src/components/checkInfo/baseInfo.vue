<template lang="html">
  <div class="baseInfo">

    <!-- <div class="column2">
        <span class="content">请注意：修改基础信息会导致所需签证材料发生变化</span>
    </div> -->
    <div class="column3">
       <div class="content buchong1">
        <div class="Key buchong">
            产品信息
        </div>

      </div>
      <div class="content ">
        <div class="Key ">
            姓名：
        </div>
        <div class="value">
          {{name}}
        </div>
      </div>
       <div class="content">
        <div class="Key">
            国家：
        </div>
        <div class="value">
          <!-- 澳大利亚(绿通) -->
          {{this.$store.state.info.visaList[this.$store.state.info.seleNum].CountryName}}
          <!-- {{this.$store.state.info.visaList[this.$store.state.info.seleNum].CountryName}} -->
        </div>
      </div>
      <div v-if='myVisaType!="美国EVUS"'>
        <div class="content"  v-tap='{methods:content}'>
           <!--  -->
         <div class="Key">
             出行目的：
         </div>
         <div id="div0"  class="value">
           {{mudi}}
         </div>
        </div>
      </div>


    <div class="content2"  v-if='myVisaType=="美国EVUS"'>
        <div class="Key">
          <span>请确认您持有10年期的B1/B2有效美国签证？
            <div class="tishi">
              <!-- <img src="static/img/tip.png" class="EVUStanhao" v-tap='{methods:tanhaoClick}'> -->
            </div>
          </span>
        </div>
        <div id="div4"  class="value" :class='haveVisaUSA=="否"?"valueC":""'>
          {{haveVisaUSA}}
        </div>
        <select id='select4' v-on:change="optionBlur4($event)" >
          <option value =-1>   </option>
          <option value =1>是</option>
          <option value =0>否</option>
        </select>
        <div class="triangle" :class='haveVisaUSA=="否"?"triangleC":""'>
        </div>
        <div class="x_tip"  v-if='haveVisaUSA=="否"'>
          在EVUS上登记，您必须拥有10年有效期美国访客签证（B1，B2或B1 /B2）。如果您没有此类签证，但是希望访问美国，您必须先向美国大使馆申请签证。
        </div>
    </div>

    <div class="fenge">

    </div>
      <div class="content buchong1">
        <div class="Key buchong">
            个人信息
        </div>

      </div>
      <div class="content">
        <div class="Key">
            职业：
        </div>
        <div id="div1" class="value">
          {{career}}
        </div>
        <select id='select1' v-on:change="optionBlur1($event)"  v-if='mudi!="商务"'>
          <option value =0></option>
          <option value =1>自雇</option>
          <option value =6>受雇</option>
          <option value =5>自由职业</option>
          <option value =4>退休</option>
          <option value =3>学生（18岁及以上）</option>
          <option value =2>学生（18岁以下）</option>
          <option value =7>学龄前儿童</option>

        </select>
        <select id='select1' @change="optionBlur1($event)"  v-if='mudi=="商务"'>
          <option value =0></option>
          <option value =1>自雇</option>
          <option value =6>受雇</option>
        </select>

        <div class="triangle" >

        </div>
      </div>
      <div class="content"  v-if='myVisaType!="美国EVUS"'>
        <div class="Key">
            婚姻状况
        </div>
        <div id="div2"  class="value">
          {{Married}}
        </div>
        <select id='select2' v-on:change="optionBlur2($event)" >
          <option value =-1>   </option>
          <option value =1>已婚</option>
          <option value =0>未婚</option>
          <option value =2>离异</option>
          <option value =3>丧偶</option>
        </select>
    <div class="triangle" >

    </div>
      </div>
      <div class="content1"  v-if='myVisaType=="美国EVUS"'  v-on:change="optionBlur3($event)" >
        <div class="Key">
          您的有效美国签证页是否在您当前使用的护照内？
        </div>
        <div id="div3"  class="value">
          {{myPassportIncludeVisa}}
        </div>
        <select id='select3'>
          <option value =-1>   </option>
          <option value =1>是</option>
          <option value =0>否</option>
        </select>
    <div class="triangle" >

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
      <div class="column4">

          <div class="btn_column4" v-tap='{methods:clickBtn}' :class="btnStatus?'':'gray'">
            下一步
          </div>

      </div>

    </div>
    <!-- <div class="column4">
        <div class="btn" v-tap='{methods:clickBtn}' :class="btnStatus?'':'gray'">
          下一步
        </div>
    </div> -->
    <div class="page" v-if='showTip'>
        <div class="tipcolumn1">
          <div class="column21">
            <span class="title">温馨提示</span>
            <span class="content">请再次确认您所填写的{{myVisaType=="美国EVUS"?"":"职业、婚姻状况"}}信息准确无误，修改基础信息会导致后续所需签证材料发生变化，表格内容清空。</span>
            <div class="x_btn">
              <div class="submit" v-tap='{methods:submitBtn}'>
                 确认
              </div>
              <div class="cancel" v-tap="{methods:cancelBtn}">
                 取消
              </div>
          </div>
          </div>
        </div>
    </div>
    <div class="mask" v-if='false'>
      <div class="img">
        <img src="static/img/mask.gif" alt="">
      </div>
    </div>

    <div class="visaTip" v-if='showVisaTip'  v-tap='{methods:hidenVisatip}'>
        <div class="x_content">
          <div class="img">
            <img src="static/img/EVUStip.png" alt="">
          </div>
          <div class="wenzi">
            1、签证类别 请参阅美国签证样本方格1所示的签证类型/级别以确<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定您的美国签证类别是否为B1，B2，或B1/ B2。<br>
            2、签证有效期 到期日期必须是签发日期的10年后。<br>
            3、签证号码 美国签证的有效登记号码，申请过程中需要填写。<br>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show_model: 0,
      showVisaTip: false,
      haveVisaUSA: '是',
      myPassportIncludeVisa: '',
      myVisaType: '',
      _uvid: '',
      showAnimate: false,
      oldCareer: '',
      oldMarried: '', //EVUS时表示 您的有效美国签证页是否在您当前使用的护照内？ 否则 为 婚姻状态
      Married: '',
      career: '',
      btnStatus: false,
      name: '',
      showTip: false,
      mudi: '',
      status: [1, 0, 0] //记录选择状态，出现目的，职业，婚姻状况
    }
  },
  created: function() {
    // console.log();
    // if (this.$store.state.info.visaList.length == 0) {
    this.$store.state.info.visaList = JSON.parse(window.localStorage.getItem('info'))
    this.$store.state.info.seleNum = window.localStorage.getItem('seleNum')

    // if (this.$store.state.info.UserVisaId == '') {
    this.$store.state.info.UserVisaId = window.localStorage.getItem('UserVisaId')
    // }
    if (this.$store.state.info.UserVisaId != '') {
      // this.$store.state.info.goPage[1] = 1
    } else {
      // this.$store.state.info.goPage[1] = 0
    }


    // }
  },
  mounted: function() {
    this.getFileTip()
    // console.log();
    if (this.$store.state.info.visaList[this.$store.state.info.seleNum].CustomerName == undefined) {
      this.name = this.$store.state.info.visaList[this.$store.state.info.seleNum].Name
    } else {
      this.name = this.$store.state.info.visaList[this.$store.state.info.seleNum].CustomerName
    }
    if (this.$store.state.info.visaList[this.$store.state.info.seleNum].VisaID == undefined) {
      this._uvid = this.$store.state.info.visaList[this.$store.state.info.seleNum].UserVisaId
    } else {
      this._uvid = this.$store.state.info.visaList[this.$store.state.info.seleNum].VisaID
    }
    document.title = '基础信息';
    console.log(this.$store.state.info.visaList[this.$store.state.info.seleNum].VisaName);
    if (window.localStorage.getItem('showmodel') == '') {
      this.show_model = this.$store.state.info.visaList[this.$store.state.info.seleNum].ShowModel
    } else {
      this.show_model = window.localStorage.getItem('showmodel')
    }

    switch (this.$store.state.info.visaList[this.$store.state.info.seleNum].VisaType) {
      case 1:
        this.mudi = '旅游'
        break;
      case 2:
        this.mudi = '工作'
        break;
      case 3:
        this.mudi = '学生'
        break;
      case 4:
        this.mudi = '商务'
        break;
      case 5:
        this.mudi = '探亲'
        break;
      default:
        this.mudi = this.$store.state.info.visaList[this.$store.state.info.seleNum].VisaType
    }
    // this.mudi = '商务'
    this.status[1] = this.$store.state.info.visaList[this.$store.state.info.seleNum].Career
    this.oldCareer = this.status[1]
    console.log(this.status[1], '))))))))))))))', this.$store.state.info.visaList[this.$store.state.info.seleNum].Career, this.$store.state.info.visaList);
    switch (String(this.$store.state.info.visaList[this.$store.state.info.seleNum].Career)) {
      case '1':
        this.career = '自雇'
        break;
      case '2':
        this.career = '学生（18岁以下）'
        break;
      case '3':
        this.career = '学生（18岁及以上）'
        break;
      case '4':
        this.career = '退休'
        break;
      case '5':
        this.career = '自由职业'
        break;
      case '6':
        this.career = '受雇'
        break;
      case '7':
        this.career = '学龄前儿童'
        break;

    }
    // <option value =0></option>
    // <option value =1>自雇</option>
    // <option value =6>受雇</option>
    // <option value =5>自由职业</option>
    // <option value =4>退休</option>
    // <option value =3>学生,大于18岁</option>
    // <option value =2>学生,小于18岁</option>
    console.log(String(this.$store.state.info.visaList[this.$store.state.info.seleNum].Married), '------');
    switch (String(this.$store.state.info.visaList[this.$store.state.info.seleNum].Married)) {
      case "1":
        this.Married = "已婚"
        this.status[2] = 1
        break;
      case "0":
        this.Married = "未婚"
        this.status[2] = 0
        break;
      case "2":
        this.Married = "离异"
        this.status[2] = 2
        break;
      case "3":
        this.Married = "丧偶"
        this.status[2] = 3
        break;

    }

    this.myVisaType = this.$store.state.info.visaList[this.$store.state.info.seleNum].VisaName.indexOf('EVUS') > -1 ? "美国EVUS" : '';
    // this.myVisaType = '11'
    if (this.myVisaType == '美国EVUS') {
      //美国一次进来 服务端没有给PassportIncludeVisa的值 虽有是undefined，产品要求默认选是 。所以等于undefined 值设置为 是
      this.myPassportIncludeVisa = this.$store.state.info.visaList[this.$store.state.info.seleNum].PassportIncludeVisa ? "是" : "否";
      // console.log(  this.myPassportIncludeVisa,'>>>>>>>>>>,', this.$store.state.info.visaList[this.$store.state.info.seleNum].PassportIncludeVisa);
      if (this.$store.state.info.visaList[this.$store.state.info.seleNum].PassportIncludeVisa == undefined) {
        this.myPassportIncludeVisa = "是"
      }
      switch (this.myPassportIncludeVisa) {
        case '是':
          this.status[2] = 1
          break;
        case '否':
          this.status[2] = 0
          break;

      }
    }

    this.oldMarried = this.status[2]
    if (this.status[1] > 0 && this.status[2] >= 0) {
      this.btnStatus = true
    } else {
      this.btnStatus = false
    }

  },
  methods: {
    test1() {
      console.log("click1")
      var select = document.getElementById("select3")
      // console.log(select)
      select.focus()
    },
    test2() {
      console.log("focus2")
    },
    tanhaoClick() {
      this.showVisaTip = true
    },
    hidenVisatip() {
      this.showVisaTip = false
    },
    getFocus1() {
      console.log(1);
    },
    getFocus2() {
      console.log(2);
    },
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
    getnewlist() {
      this.$http.get(this.$store.state.app.host + 'api/Wechat/CredentialsList', {
        params: {
          // phoneNumber:this.$store.state.info.visaList[0].Phone
          visaId: this.$store.state.info.UserVisaId,
          type: 1
        },
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          console.log(res);

          if (res.data.Code == 0) {
            this.$store.state.info.ReadyCredentialsList = res.data.Result.Credentials

            window.localStorage.setItem('ReadyCredentialsList', JSON.stringify(res.data.Result.Credentials))
            this.showTip = false
            //修改或创建 当前签证条款  因为在线填表(3)肯定重置，所有(4)直接设置为0
            // this.$store.state.info.goPage[4] = 0
            // if(this.$root.verifyFinish(res.data.Result.Credentials)){
            //   this.$store.state.info.goPage[2] = 1
            // }else{
            //   this.$store.state.info.goPage[2] = 0
            // }
            this.showAnimate = false
            this.$router.push({
              // path: '/addpersonalInfo/xuzhi'
              path: '/main/content/info'

            })

            this.$root.eventHub.$emit('infoStep', {
              infoStep: 2,
              // messageArr: messagenumArr
            });
          } else {
            console.log(res.data.Message);

            this.$root.showTip1([res.data.Message])

          }
        })

    },
    triggerEvent(element, type) {

      var event;
      if (document.createEventObject) {
        event = document.createEventObject();
        return element.fireEvent('on' + type, event);
      } else {

        event = document.createEvent('HTMLEvents');
        event.eventName = type;
        event.initEvent(type, true, true);
        return !
          element.dispatchEvent(event);
      }
    },
    optionBlur0(e) {
      var el = document.getElementById('div0')
      var obj = document.getElementById("select0");
      var txt = obj.options[obj.selectedIndex].text;
      el.innerHTML = txt
      //  e.target.value//value提交到服务器
      this.status[0] = e.target.value
      // alert(txt);

    },
    optionBlur1(e) {
      var el = document.getElementById('div1')
      var obj = document.getElementById("select1");
      var txt = obj.options[obj.selectedIndex].text;
      el.innerHTML = txt
      // alert(e.target.value)
      this.status[1] = e.target.value
      if (this.status[1] > 0 && this.status[2] >= 0) {
        this.btnStatus = true
      } else {
        this.btnStatus = false
      }
      //  e.target.value//value提交到服务器
    },
    optionBlur2(e) {
      var el = document.getElementById('div2')
      var obj = document.getElementById("select2");
      var txt = obj.options[obj.selectedIndex].text;
      el.innerHTML = txt
      this.status[2] = e.target.value

      console.log(this.status[2], 'MMMMMMMMMMM');
      if (this.status[1] > 0 && this.status[2] >= 0) {
        this.btnStatus = true
      } else {
        this.btnStatus = false
      }
      //  e.target.value//value提交到服务器
    },
    optionBlur3(e) {
      var el = document.getElementById('div3')
      var obj = document.getElementById("select3");
      var txt = obj.options[obj.selectedIndex].text;
      el.innerHTML = txt
      this.status[2] = e.target.value

      console.log(this.status[2], 'MMMMMMMMMMM');
      if (this.status[1] > 0 && this.status[2] >= 0) {
        this.btnStatus = true
      } else {
        this.btnStatus = false
      }
      //  e.target.value//value提交到服务器
    },
    optionBlur4(e) {
      var el = document.getElementById('div4')
      var obj = document.getElementById("select4");
      var txt = obj.options[obj.selectedIndex].text;
      el.innerHTML = txt
      this.haveVisaUSA = txt
      if (txt == '是') {
        this.btnStatus = true
      } else {
        this.btnStatus = false
      }
      // this.status[2] = e.target.value
      //
      // console.log(this.status[2], 'MMMMMMMMMMM');
      // if (this.status[1] > 0 && this.status[2] >= 0) {
      //   this.btnStatus = true
      // } else {
      //   this.btnStatus = false
      // }
      //  e.target.value//value提交到服务器
    },
    content() {
      // var el = document.getElementById('select0')
      // el.focus()
      // el.onChange()
    },
    content1() {
      var el = document.getElementById('select1')
      // el.focus()
      // el.click()
      // el.change()
      // el.focus()
      // el.click()
      // this.triggerEvent(el,'click')
    },
    content2() {
      var el = document.getElementById('select2')
      // el.focus()
      // el.click()

    },
    clickBtn(obj) {
      var el = obj.event.currentTarget
      if (this.$root.hasClass(el, 'gray')) {
        return
      }
      // console.log(el,1);
      // // return
      // console.log(this.$store.state.info.UserVisaId, '---11--');
      // console.log(1100);
      // console.log(this.oldMarried,this.status[2]);

      // console.log(this.status[1],this.status[1]);
      if (this.oldMarried == this.status[2] && this.oldCareer == this.status[1] && this.$store.state.info.UserVisaId != '') {
        // this.$router.push({
        //   path: '/addpersonalInfo/xuzhi'
        // })
        this.submitBtn();
      } else {
        if (this.status[1] > 0 && this.status[2] >= 0) {
          this.showTip = true
        } else {
          // return
        }
      }



    },
    setPaperProgress(progressType,num) {
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
    cancelBtn() {
      this.showTip = false
    },
    submitBtn2() { //测试微信自行发送事件，加了时间戳
      this.tempTime = parseInt(new Date().getTime())
      this.submitBtn()
      this.submitBtn()
      this.submitBtn()
      this.submitBtn()
      this.submitBtn()
    },
    submitBtn() {
      this.showAnimate = true
      var _arr = this.$store.state.info.visaList;
      var _id = this.$store.state.info.seleNum;
      console.log(_arr[_id].CustomerName);
      // alert(_arr[_id].VisaID)
      var name = ''
      if (_arr[_id].CustomerName == undefined) {
        name = _arr[_id].Name
      } else {
        name = _arr[_id].CustomerName
      }

      // this.$router.push({
      //   path: '/addpersonalInfo/xuzhi'
      // })
      // console.log(this.status[1], this.status[2], "<<<<",parseInt(new Date().getTime()));
      this.showTip = false
      // console.log(this.status[2],'MMMMMMMMMMM11');
      var sinceMarried = this.myVisaType == '美国EVUS' ? _arr[_id].Married : this.status[2]
      var _PassportIncludeVisa = this.myVisaType == '美国EVUS' ? this.status[2] : null
      _PassportIncludeVisa = _PassportIncludeVisa == 1 ? true : false
      // if (sinceMarried == 1) {
      //   sinceMarried = true
      // } else {
      //   sinceMarried = false
      // }
      // console.log(sinceMarried,'MMMMMMMMMMM222');
      this.$http.post(this.$store.state.app.host + 'api/Wechat/CreateUserVisa', {
        UserVisaId: this._uvid,
        PassportNumber: _arr[_id].Passport,
        Name: _arr[_id].CustomerName,
        CountryId: _arr[_id].CountryId,
        VisaType: _arr[_id].VisaType,
        Career: this.status[1],
        Married: sinceMarried,
        VisaName: _arr[_id].VisaName,
        PayTime: _arr[_id].PayTime,
        Number: _arr[_id].Number,
        Agent: _arr[_id].Agent,
        Sales: _arr[_id].Sales,
        Destination: _arr[_id].Destination,
        Cause: this.status[0],
        PayStatus: _arr[_id].PayStatus,
        Phone: _arr[_id].Phone,
        IsPersonal: _arr[_id].IsPersonal,
        IsGreenChannel: _arr[_id].IsGreenChannel,
        PassportIncludeVisa: _PassportIncludeVisa, //evus 值为TRUE FALSE  ; 其他填写NULL,
        ShowModel: this.show_model,
        CallId: parseInt(new Date().getTime())
      }, {
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          if (res.data.Code == 0) {
            // console.log(res);
            this.$store.state.info.UserVisaId = res.data.Result

            _arr[_id].VisaID = this.$store.state.info.UserVisaId
            window.localStorage.setItem('info', JSON.stringify(_arr))
            // this.$store.state.info.goPage[1] = 1
            // this.$store.state.info.goPage[3] = 0
            window.localStorage.setItem('showmodel', this.show_model)
            console.log(this.status[1], this.status[2]);
            this.$store.state.info.visaList[this.$store.state.info.seleNum].Career = this.status[1]
            if (this.myVisaType == '美国EVUS') {
              // this.$store.state.info.visaList[this.$store.state.info.seleNum].Married = this.status[2]
              this.$store.state.info.visaList[this.$store.state.info.seleNum].PassportIncludeVisa = _PassportIncludeVisa
            } else {
              this.$store.state.info.visaList[this.$store.state.info.seleNum].Married = this.status[2]
            }




            window.localStorage.setItem('info', JSON.stringify(this.$store.state.info.visaList))

            window.localStorage.setItem('UserVisaId', JSON.stringify(res.data.Result))
            var that = this
            if (this.show_model == 1) {
              this.setPaperProgress(1,100)

              var t=setTimeout(function () {
                that.setPaperProgress(3,100)
              }, 500);
            } else {
              this.setPaperProgress(1,0)
              var t=setTimeout(function () {
                that.setPaperProgress(3,0)
              }, 1000);
            }
            this.$http.get(this.$store.state.app.host + 'api/Wechat/CredentialsList', {
              params: {
                // phoneNumber:this.$store.state.info.visaList[0].Phone
                visaId: res.data.Result,
                type: 0
              },
              headers: this.$root.crossLogin(),
              timeout: this.$store.state.app.httpTime
            }).then(
              function(res) {
                console.log(res);

                if (res.data.Code == 0) {
                  this.$store.state.info.CredentialsList = res.data.Result.Credentials

                  window.localStorage.setItem('CredentialsList', JSON.stringify(res.data.Result.Credentials))
                  this.showTip = false
                  if (this.$root.verifyFinish(res.data.Result.Credentials)) {
                    // this.$store.state.info.goPage[2] = 1
                  } else {
                    // this.$store.state.info.goPage[2] = 0
                  }
                  this.getnewlist()
                } else {
                  console.log(res.data.Message);

                  this.$root.showTip1([res.data.Message])

                }
              })



          } else {
            this.showAnimate = false
            this.$root.showTip1([res.data.Message])

          }


        },
        function(err) {
          console.log('超时');
        })



    }
  }
}
</script>

<style lang="css">
/*@import url(./css/baseInfo.css);*/
/* @import url(../../../css/_icons.css); */
</style>
<style lang="scss" type="text/css" src='./css/baseInfo.scss'>
Error:Source sample is missing.
</style>
