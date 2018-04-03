<template>
  <div class="addvisa">

    <div class="jindu">
      <!-- <div class="" id='addvisajindu_wrapper'> -->
        <!-- <div class=""  id='addvisajindu_scroller'> -->
        <div class="column1">
          <span>护照号：{{passportNumber}}</span>
          <span>姓名：{{name}}</span>
          <span>国家：{{countryName}}</span>
          <span>签证种类：{{visaType}}</span>
        </div>
        <div class="column2">
          <div class="p1" v-for='d in jindudata'>
              <div class="line1"></div>
              <div class="date">
                <div class="yuan"></div>
                <div class="c">
                    {{d.date}}
                </div>
              </div>
              <div class="line2"></div>
              <div class="content">
                <img :src=d.img class="img" alt="">
                <div class="c">
                  <span class="c1">{{d.name}}</span>
                  <span class="c2">{{d.content}}</span>
                </div>
              </div>
          </div>

          <div class="ding">

          </div>
        </div>
      </div>
    </div>
    <!-- </div>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      tempdata: '',
      jindudata: [
        {
          date: '-1',
          name: '资料填写',
          content: '...',
          img: ''
        },
        {
          date: '-1',
          name: '审核',
          content: '...',
          img: '',
          OperateStatus: 0
        },
        {
          date: '-1',
          name: '约签',
          content: '...',
          img: '',
          OperateStatus: 0
        },
        {
          date: '-1',
          name: '约签',
          content: '...',
          img: '',
          OperateStatus: 0
        },
        {
          date: '-1',
          name: '使馆审核',
          content: '...',
          img: ''
        },
        {
          date: '-1',
          name: '签证结果',
          content: '...',
          img: ''
        }
      ],
      updata: 0,
      txt1: '',
      txt2: '',
      search: false,
      // imgurl:'http://dev.ivisa.ydynasty.com/DevTest/test/2.jpg',
      pendData: [],
      data: [],
      dataObj: {
        img: [1, 1, 1, 1, 1, 1, 1, 1],
        time: ['', '', '', '', '', '', '', ''],
        timeStr: ['', '', '', '', '', '', '']

      },
      passportNumber:this.$root.get("PassportNumber"),
      name:this.$root.get("Name"),
      countryName:this.$root.get("CountryName"),
      visaType:this.$root.get("visaType"),
    }
  },
  methods: {


    txtStutas(status) {
      // alert(status)

      // var status = 6
      console.log(status, '<<<<<<<<<<<<<<<<<<<<<<<mm');
      console.log(this.jindudata);
      switch (status) {
        case 2:
          this.jindudata[0].img = './static/img/1.png'
          this.jindudata[1].img = './static/img/2.png'
          this.jindudata[2].img = './static/img/3.png'
          this.jindudata[3].img = './static/img/3.png'
          this.jindudata[4].img = './static/img/3.png'
          // this.jindudata[5].img = './static/img/3.png'
          var y = this.jindudata[0].date.split('.')[0]
          var m = this.jindudata[0].date.split('.')[1]
          var d = this.jindudata[0].date.split('.')[2]
          this.txt1 = '资料填写'
          this.txt2 = "已于" + y + "年" + m + "月" + d + "日上传完成"
          this.jindudata[0].content = "已于" + y + "年" + m + "月" + d + "日上传完成"

          this.jindudata[2].date = this.jindudata[0].date.split('.')[0] + "..."
          this.jindudata[3].date = this.jindudata[0].date.split('.')[0] + "..."
          this.jindudata[4].date = this.jindudata[0].date.split('.')[0] + "..."
          this.jindudata[5].date = this.jindudata[0].date.split('.')[0] + "..."
          break;
        case 3:
          this.jindudata[0].img = './static/img/1.png'
          this.jindudata[1].img = './static/img/2.png'
          this.jindudata[2].img = './static/img/3.png'
          this.jindudata[3].img = './static/img/3.png'
          this.jindudata[4].img = './static/img/3.png'
          // this.jindudata[5].img = './static/img/3.png'
          this.txt1 = '审核中'
          var y = this.jindudata[0].date.split('.')[0]
          var m = this.jindudata[0].date.split('.')[1]
          var d = this.jindudata[0].date.split('.')[2]
          this.txt2 = '您的资料正在审核中，请耐心等待…'
          this.jindudata[0].content = "已于" + y + "年" + m + "月" + d + "日上传完成"
          this.jindudata[1].content = '您的资料正在审核中，请耐心等待…'

          this.jindudata[2].date = this.jindudata[0].date.split('.')[0] + "..."
          this.jindudata[3].date = this.jindudata[0].date.split('.')[0] + "..."
          this.jindudata[4].date = this.jindudata[0].date.split('.')[0] + "..."
          this.jindudata[5].date = this.jindudata[0].date.split('.')[0] + "..."
          break;
        case 4:
          this.jindudata[0].img = './static/img/1.png'
          // this.jindudata[1].img = './static/img/2.png'
          // this.jindudata[2].img = './static/img/3.png'
          this.jindudata[3].img = './static/img/3.png'
          this.jindudata[4].img = './static/img/3.png'
          // this.jindudata[5].img = './static/img/3.png'
          var y = this.jindudata[0].date.split('.')[0]
          var m = this.jindudata[0].date.split('.')[1]
          var d = this.jindudata[0].date.split('.')[2]
          var y1 = this.jindudata[2].date.split('.')[0]
          var m1 = this.jindudata[2].date.split('.')[1]
          var d1 = this.jindudata[2].date.split('.')[2]
          this.jindudata[0].content = "已于" + y + "年" + m + "月" + d + "日上传完成"
          // alert(this.jindudata[2].OperateStatus)
          // alert(this.jindudata[2].OperateStatus)
          if (this.jindudata[2].OperateStatus == 0 || this.jindudata[2].OperateStatus == 1) {
            this.txt1 = '审核中'
            this.txt2 = '您的资料正在审核中，请耐心等待…'
            this.jindudata[1].img = './static/img/2.png'
            this.jindudata[1].content = '您的资料正在审核中，请耐心等待…'
            this.jindudata[2].img = './static/img/3.png'
          } else if (this.jindudata[2].OperateStatus == 2) {
            this.txt1 = '审核完成'
            this.txt2 = "已于" + y1 + "年" + m1 + "月" + d1 + "日审核完成"
            this.jindudata[1].img = './static/img/1.png'
            this.jindudata[1].content = "已于" + y1 + "年" + m1 + "月" + d1 + "日审核完成"
            this.jindudata[2].img = './static/img/2.png'
          } else if (this.jindudata[2].OperateStatus == 3) {
            this.txt1 = '审核中'
            this.txt2 = '您的资料正在审核中，请耐心等待…'
            this.jindudata[1].content = '您的资料正在审核中，请耐心等待…'
            this.jindudata[1].img = './static/img/2.png'
            this.jindudata[2].img = './static/img/3.png'
          }



          this.jindudata[2].content = "..."
          // this.jindudata[2].data ="..."
          this.jindudata[2].date = this.jindudata[0].date.split('.')[0] + "..."
          this.jindudata[3].date = this.jindudata[0].date.split('.')[0] + "..."
          this.jindudata[4].date = this.jindudata[0].date.split('.')[0] + "..."
          this.jindudata[5].date = this.jindudata[0].date.split('.')[0] + "..."
          break;
        case 5:
          // alert(12334)
          var y3 = this.jindudata[3].date.split('.')[0]
          var m3 = this.jindudata[3].date.split('.')[1]
          var d3 = this.jindudata[3].date.split('.')[2]
          var y32 = this.jindudata[3].date2.split('.')[0]
          var m32 = this.jindudata[3].date2.split('.')[1]
          var d32 = this.jindudata[3].date2.split('.')[2]
          console.log(this.$root.verifyDay(y3 + "-" + m3 + "-" + d3), '++++++2+11+');
          if (this.$root.verifyDay(y3 + "-" + m3 + "-" + d3) >= 0) {
            // alert(1)
            this.jindudata[0].img = './static/img/1.png'
            this.jindudata[1].img = './static/img/1.png'
            this.jindudata[2].img = './static/img/2.png'
            this.jindudata[3].img = './static/img/3.png'
            this.jindudata[4].img = './static/img/3.png'
            // this.jindudata[5].img = './static/img/3.png'
            this.txt1 = '等待约签中'
            var y1 = this.jindudata[0].date.split('.')[0]
            var m1 = this.jindudata[0].date.split('.')[1]
            var d1 = this.jindudata[0].date.split('.')[2]
            var y2 = this.jindudata[1].date.split('.')[0]
            var m2 = this.jindudata[1].date.split('.')[1]
            var d2 = this.jindudata[1].date.split('.')[2]

            this.txt2 = "约签时间为" + y3 + "年" + m3 + "月" + d3 + "日"
            this.jindudata[0].content = "已于" + y1 + "年" + m1 + "月" + d1 + "日上传完成"
            this.jindudata[1].content = "已于" + y2 + "年" + m2 + "月" + d2 + "日审核完成"
            this.jindudata[2].content = "约签时间为" + y3 + "日" + m3 + "月" + d3 + "日"
            this.jindudata[3].content = "…"

            this.jindudata[2].date = y32 + "." + m32 + "." + d32
            this.jindudata[3].date = this.jindudata[0].date.split('.')[0] + "..."
            this.jindudata[4].date = this.jindudata[0].date.split('.')[0] + "..."
            this.jindudata[5].date = this.jindudata[0].date.split('.')[0] + "..."
          } else {
            this.jindudata[0].img = './static/img/1.png'
            this.jindudata[1].img = './static/img/1.png'
            this.jindudata[2].img = './static/img/1.png'
            this.jindudata[3].img = './static/img/2.png'
            this.jindudata[4].img = './static/img/3.png'
            // this.jindudata[5].img = './static/img/3.png'
            this.txt1 = '使馆审核中'
            var y1 = this.jindudata[0].date.split('.')[0]
            var m1 = this.jindudata[0].date.split('.')[1]
            var d1 = this.jindudata[0].date.split('.')[2]
            var y2 = this.jindudata[1].date.split('.')[0]
            var m2 = this.jindudata[1].date.split('.')[1]
            var d2 = this.jindudata[1].date.split('.')[2]

            this.txt2 = "您的签证已到达使馆，请耐心等待签证结果…"
            this.jindudata[0].content = "已于" + y1 + "年" + m1 + "月" + d1 + "日上传完成"
            this.jindudata[1].content = "已于" + y2 + "年" + m2 + "月" + d2 + "日审核完成"
            this.jindudata[2].content = "已于" + y3 + "年" + m3 + "月" + d3 + "日审核完成"
            this.jindudata[3].content = "您的签证已到达使馆，请耐心等待签证结果…"

            this.jindudata[2].date = y32 + "." + m32 + "." + d32
            this.jindudata[3].date = y3 + "." + m3 + "." + d3
            this.jindudata[4].date = this.jindudata[0].date.split('.')[0] + "..."
            this.jindudata[5].date = this.jindudata[0].date.split('.')[0] + "..."
          }

          break;
        case 6:
          this.jindudata[0].img = './static/img/1.png'
          this.jindudata[1].img = './static/img/1.png'
          this.jindudata[2].img = './static/img/1.png'
          this.jindudata[3].img = './static/img/1.png'
          this.jindudata[4].img = './static/img/1.png'
          // this.jindudata[5].img = './static/img/1.png'
          this.txt1 = '签证结果' //已出签或已拒签等接口
          var y2 = this.jindudata[1].date.split('.')[0]
          var m2 = this.jindudata[1].date.split('.')[1]
          var d2 = this.jindudata[1].date.split('.')[2]

          var y1 = this.jindudata[0].date.split('.')[0]
          var m1 = this.jindudata[0].date.split('.')[1]
          var d1 = this.jindudata[0].date.split('.')[2]
          var y3 = this.jindudata[3].date.split('.')[0]
          var m3 = this.jindudata[3].date.split('.')[1]
          var d3 = this.jindudata[3].date.split('.')[2]
          // alert( this.tempdata[this.tempdata.length-1].date)
          var y4 = this.tempdata[this.tempdata.length - 1].Date.split('T')[0].split('-')[0]
          var m4 = this.tempdata[this.tempdata.length - 1].Date.split('T')[0].split('-')[1]
          var d4 = this.tempdata[this.tempdata.length - 1].Date.split('T')[0].split('-')[2]
          this.jindudata[4].date = y4 + '.' + m4 + '.' + d4
          var sss = ''


          // console.log(this.jindudata);
          // alert(this.jindudata[5].IsSuccess)
          // alert(this.tempdata[this.tempdata.length-1].IsSuccess)
          if (this.tempdata[this.tempdata.length - 1].IsSuccess) {
            sss = '成功出签'
          } else {
            sss = '被大使馆拒签'
          }
          this.txt2 = "已于" + y4 + "年" + m4 + "月" + d4 + "日 - " + sss //出签或拒签等接口

          this.jindudata[0].content = "已于" + y1 + "年" + m1 + "月" + d1 + "日上传完成"
          this.jindudata[1].content = "已于" + y2 + "年" + m2 + "月" + d2 + "日审核完成"
          this.jindudata[2].content = "已约签"
          this.jindudata[3].content = "使馆审核已经完成。"
          // this.jindudata[4].content ="已于" + y4 + "年" + m4 + "月" + d4 + "日完成"//出签或拒签等接口
          this.jindudata[4].content = "已于" + y4 + "年" + m4 + "月" + d4 + "日 - " + sss //出签或拒签等接口

          this.jindudata[2].date = y3 + "." + m3 + "." + d3
          break;
        default:

      }
      //
      // var status = 0
      // for (var i = 1; i <= 7; i++) {
      //   for (var j = 0; j < this.data.length; j++) {
      //     if (this.data[j].Description == i) {
      //       status = i
      //       this.dataObj.time[i - 1] = this.data[j].Date.split('T')[0].split('-')[1] + '月' + this.data[j].Date.split('T')[0].split('-')[2] + '日'
      //     }
      //   }
      // }
      // console.log(status, "<<<<<<<<<<<<<<");
      // switch (status) {
      //   case 1:
      //     this.txt1 = '资料填写'
      //     this.dataObj.img = [
      //       'static/img/2.png',
      //       'static/img/1.png',
      //       'static/img/1.png',
      //       'static/img/1.png',
      //       'static/img/1.png',
      //       'static/img/1.png',
      //       'static/img/1.png',
      //     ]
      //     break;
      //   case 2:
      //     this.txt1 = '资料上传'
      //     this.txt2 = '等待签收'
      //     this.dataObj.img = [
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/1.png',
      //       'static/img/1.png',
      //       'static/img/1.png',
      //       'static/img/1.png',
      //       'static/img/1.png',
      //       'static/img/1.png',
      //     ]
      //     break;
      //   case 3:
      //     this.txt1 = this.dataObj.time[2] + '资料已签收'
      //     this.dataObj.timeStr[2] = '已于' + this.dataObj.time[2] + '完成'
      //     this.txt2 = '资料签收'
      //     this.dataObj.img = [
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/1.png',
      //       'static/img/1.png',
      //       'static/img/1.png',
      //       'static/img/1.png',
      //     ]
      //     break;
      //   case 4:
      //     this.dataObj.timeStr[2] = '已于' + this.dataObj.time[2] + '完成'
      //     this.txt1 = '资料已签收'
      //     this.txt2 = '操作办理'
      //
      //     this.dataObj.img = [
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/3.png',
      //       'static/img/1.png',
      //       'static/img/1.png',
      //       'static/img/1.png',
      //     ]
      //     break;
      //   case 5:
      //     this.dataObj.timeStr[2] = '已于' + this.dataObj.time[2] + '完成'
      //     this.dataObj.timeStr[3] = '已于' + this.dataObj.time[3] + '完成'
      //     this.dataObj.timeStr[4] = '已于' + this.dataObj.time[4] + '完成'
      //     this.txt1 = '资料已签收'
      //     this.txt2 = '使馆审核'
      //     this.dataObj.img = [
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/3.png',
      //       'static/img/1.png',
      //     ]
      //     break;
      //   case 6:
      //     this.dataObj.timeStr[2] = '已于' + this.dataObj.time[2] + '完成'
      //     this.dataObj.timeStr[3] = '已于' + this.dataObj.time[3] + '完成'
      //     this.dataObj.timeStr[4] = '已于' + this.dataObj.time[4] + '完成'
      //     this.dataObj.timeStr[5] = '已于' + this.dataObj.time[5] + '完成'
      //     this.txt1 = '资料已签收'
      //     this.txt2 = '完成'
      //     this.dataObj.img = [
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //     ]
      //     break;
      //   case 7:
      //     this.dataObj.img = [
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/2.png',
      //       'static/img/1.png',
      //     ]
      //     break;
      //
      // }
      // console.log(this.dataObj);
      // // this.updata = this.updata+1
    },
    finish() {

      this.$http.get(this.$store.state.app.host + 'api/Wechat/GetSupplementaryMaterial', {
        params: {
          userVisaId: this.$store.state.info.UserVisaId
          // versionId:7,
          // page: 53
        },
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          console.log(res);

          this.$store.state.info.incuCert = res.data.Result
          // console.log(res.data.Result.Files,"<<<<<<<<<<");
          if (res.data.Result.Files.length > 0) {

            this.$store.state.previewImg.UserVisaFileId = res.data.Result.Files[0].UserVisaFileId
            window.localStorage.setItem('UserVisaFileId', JSON.stringify(res.data.Result.Files[0].UserVisaFileId))
          }
          window.localStorage.setItem('incuCert', JSON.stringify(res.data.Result))
          // console.log(res.data.Result.Files[0].UserVisaFileId,'?????????');
          this.$store.state.info.VisaFileID = res.data.Result.NeedVisaFileIds[0].VisaFileId
          window.localStorage.setItem('VisaFileID', res.data.Result.NeedVisaFileIds[0].VisaFileId)
          // alert(1)
          this.$router.push({
            path: '/addpersonalInfo/incuCert/1'
          })

        },
        function(err) {
          console.log('超时');
        })
    },
    goonFun(index, str) {
      if (str == '完善资料') {

        this.$store.state.info.UserVisaId = this.pendData[index].VisaID
        // console.log(this.$store.state.info.UserVisaId,'lll');
        // this.finish()//测试在职证明
        window.localStorage.setItem('UserVisaId', JSON.stringify(this.pendData[index].VisaID))

        this.$http.get(this.$store.state.app.host + 'api/Wechat/CredentialsList', {
          params: {
            // phoneNumber:this.$store.state.info.visaList[0].Phone
            visaId: this.pendData[index].VisaID
          },
          headers: this.$root.crossLogin(),
          timeout: this.$store.state.app.httpTime
        }).then(
          function(res) {
            console.log(res);
            if (res.data.Code == 0) {
              this.$store.state.info.CredentialsList = res.data.Result
              // var _arr = []
              // for (var i = 0; i < res.data.Result.length; i++) {
              //     _arr.push(JSON.stringify(res.data.Result[i])); //storage是外部定义的数组  storage = []
              // }
              window.localStorage.setItem('CredentialsList', JSON.stringify(res.data.Result))
              // window.localStorage.setItem('CredentialsList', res.data.Result)
              // console.log(this.SMSToken);
              this.$router.push({
                path: '/addpersonalInfo/assetsUpLoad'
              })
            } else {
              console.log(res.data.Message);
              this.$root.showTip1([res.data.Message])

            }
          })
      } else {
        this.search = true
      }





    },
    goApplyVisa() {
      this.$router.push({
        // path: 'applyvisa'
        path: '/applyvisa'
      })
    },
    myScroll() {
      // var myScroll;
      this.my_Scroll = new IScroll('#addvisajindu_wrapper', {
        bounce: false,
        useTransform: true,
        scrollbars: true
      });
    },
    getVisaList() {
      var that = this
      this.$http.get(this.$store.state.app.host + 'api/Wechat/VisaList', {
        headers: this.$root.crossLogin()
      }).then(
        function(res) {
          console.log(res);
          this.pendData = res.data.Result
          for (var i = 0; i < this.pendData.length; i++) {
            this.pendData[i].imgUrl = '/static/img/country' + this.pendData[i].CountryId + '.png'
            if (this.pendData[i].VisaStatus >= 2) {
              this.pendData[i].VisaStatus = '进度查询'
            } else {
              this.pendData[i].VisaStatus = '完善资料'
            }
          }

          // this.my_Scroll.refresh()
        })
    },

    jindu() {
      this.$http.get(this.$store.state.app.host + 'api/Wechat/GetVisaInfo', {
        params: {
          visaId: this.$store.state.info.UserVisaId
          // versionId:7,
          // page: 53
        },
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          console.log(res);
          this.tempdata = res.data.Result
          for (var i = 0; i < res.data.Result.length; i++) {
            // console.log(res.data.Result[i]);
            this.jindudata[i].Description = res.data.Result[i].Description
            this.jindudata[i].IsSuccess = res.data.Result[i].IsSuccess
            // console.log('why');
            if (res.data.Result[i].Date != null) {
              var date = res.data.Result[i].Date.split('T')[0].split('-')[0] + '.' + res.data.Result[i].Date.split('T')[0].split('-')[1] + '.' + (Number(res.data.Result[i].Date.split('T')[0].split('-')[2]))
              this.jindudata[i].date = date
            }
            //送取的时候状态5（Description==5）  ，  需要有Date2 是送签时间
            if (res.data.Result[i].Date2 != null && res.data.Result[i].Description == 5) {
              var date2 = res.data.Result[i].Date2.split('T')[0].split('-')[0] + '.' + res.data.Result[i].Date2.split('T')[0].split('-')[1] + '.' + (Number(res.data.Result[i].Date2.split('T')[0].split('-')[2]))
              this.jindudata[i].date2 = date2
            }
            //操作状态4 （Description==4）  ，  需要有Date2 是预审成功 或者 预审失败的时间
            if (res.data.Result[i].Date2 != null && res.data.Result[i].Description == 4) {
              var date2 = res.data.Result[i].Date2.split('T')[0].split('-')[0] + '.' + res.data.Result[i].Date2.split('T')[0].split('-')[1] + '.' + (Number(res.data.Result[i].Date2.split('T')[0].split('-')[2]))
              this.jindudata[i - 1].date2 = date2
              this.jindudata[i - 1].OperateStatus = res.data.Result[i].OperateStatus

            }
          }

          if (this.jindudata.length > 2) {
            this.jindudata.splice(3, 1)
          }

          // for (var i = 0; i < this.jindudata.length; i++) {
          //   if (this.jindudata[i].date == '-1') {
          //     this.jindudata[i].date = this.jindudata[0].date.split('.')[0] + "..."
          //   }
          // }
          // switch (this.jindudata[i].Description) {
          //   case 2:
          //
          //     break;
          //   default:
          //
          // }


          console.log(res.data.Result)
          //         console.log(res.data.Result[res.data.Result.length-1].Description);
          this.txtStutas(res.data.Result[res.data.Result.length - 1].Description)
        },
        function(err) {
          console.log('超时');
        })
    },

  },
  mounted: function() {
    // // alert($root.id)
    // document.title = '进度查询';
    // this.myScroll()
    // this.myScroll();
    // this.test1()
    // // this.getVisaList();
    // // el.appendChild(img1)
    this.jindu()
  },
  updated: function() {

    // this.my_Scroll.refresh()
  },
  created: function() {
      this.$store.state.info.UserVisaId = window.localStorage.getItem('UserVisaId')
    // var that = this
    // this.$root.eventHub.$on('LOGIN_SUCCESS', function() {
    //
    //   that.getVisaList()
    // })
    //   that.getVisaList()
    // el.appendChild(msg.url)
    // var img1 = new Image();
    // img1.width = '100'
    // img1.height = '100'
    // img1.src = this.imgurl;
    // el.appendChild(img1)
    // var node = document.createElement("img11");
    // node.src = this.imgurl;
    // document.body.appendChild(node);
    // var el = document.getElementById('addvisa_scroller')
    // var el = document.getElementsByClassName('column4')[0]
    // console.log(el);
    // el.appendChild(node);
    // alert( this.$root.$Store.state.imgUrl)
    // var that = this
    //   this.$root.eventHub.$on('imgurl', function(msg) {
    //
    //     var el = document.getElementById('abc')
    //     alert(el + "   "+msg.url)
    //     el.appendChild(msg.url)
    // var img1 = new Image();
    // img1.src = that.imgurl;
    // el.appendChild(img1)

    // var el = document.getElementById('abc')
    // console.log(el);
    // var img1 = new Image();
    // img1.width = '100'
    // img1.height = '100'
    // img1.src = this.imgurl;
    // el.appendChild(img1)


    // that.imgurl = msg.url.toString()
    // var el = document.getElementById('img1')
    // el.setAttribute('src',msg.url)
    // that.imgurl = 'http://dev.ivisa.ydynasty.com/DevTest/test/1.png'
    // alert(msg.url.toString())
    // })
  }
}
</script>

<style type="text/css" lang="scss" src='./css/jindu.scss'></style>
