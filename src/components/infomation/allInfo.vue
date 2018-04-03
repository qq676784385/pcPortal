<template>
<div class="allInfo">
  <div class="submitBtn"><span v-tap='{methods:submitFun}'>提 交</span></div>
  <div class="allInfogroups">
    <!-- <div class="group" @click="getGroupInfo(-1,0)" v-if='show_model==1' :class="Iszhengjian==-1?'active':''">　身份证　</div> -->
    <div class="group" @click="getGroupInfo(0,1)" :class="Iszhengjian==1?'active':''" v-if='show_model==0'>证件上传</div>
    <div class="group" v-for="item in meterialDetail.GroupList" @click="getGroupInfo(item.GroupID,0)" :class="groupId == item.GroupID?'active':''">
      {{item.GroupName}}
    </div>
    <div id='cailiao' class="group" @click="getGroupInfo(0,2)" :class="Iszhengjian==2?'active':''" v-if='show_model==0'>资料上传</div>
  </div>
  <div class="groupContent">
    <component :is="modelName"></component>
  </div>
  <div class="all_btn" v-if='hidenBtn'>
    <div class="all_prev" v-tap='{methods:$root.infomationBtn,status:"prev"}'>
      <</div>
        <div class="all_next" v-tap='{methods:$root.infomationBtn,status:"next"}'>></div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Credentials from './components/credentials.vue'
import CredentialsNZL from './components/credentialsNZL.vue'
import Infomation from './components/infomation.vue'
import sfz from './components/sfz.vue'

export default {
  data() {
    return {
      hidenBtn: true,
      modelName: "",
      groupId: "",
      Iszhengjian: "1",
      meterialDetail: '',
      GroupList: [{
          "GroupID": 1,
          "GroupName": "基本信息",
          "GroupType": 1,
          "IsFilled": false
        },
        {
          "GroupID": 2,
          "GroupName": "通信信息",
          "GroupType": 1,
          "IsFilled": false
        },
        {
          "GroupID": 4,
          "GroupName": "工作信息",
          "GroupType": 1,
          "IsFilled": false
        },
        {
          "GroupID": 5,
          "GroupName": "财产信息",
          "GroupType": 1,
          "IsFilled": false
        },
        {
          "GroupID": 6,
          "GroupName": "家庭信息",
          "GroupType": 1,
          "IsFilled": false
        },
        {
          "GroupID": 7,
          "GroupName": "旅行信息",
          "GroupType": 1,
          "IsFilled": false
        },
        {
          "GroupID": 8,
          "GroupName": "以往出境信息",
          "GroupType": 1,
          "IsFilled": false
        },
      ],
      infoStatus: [],
      show_model: 0,

    }
  },
  created() {
    this.$store.state.info.sinceJindu = 0
    //   if (this.show_model == 0) {
    //     this.modelName = "CredentialsNZL"
    //   } else {
    //     window.localStorage.setItem("Iszhengjian", 0)
    //     this.groupId = 1
    //     window.localStorage.setItem("GroupId", 1)
    //     this.modelName = "Infomation"
    //   }
    //
    // } else {
    //   self.getUserInfo()
    //   if (this.show_model == 0) {
    //     this.modelName = "Credentials"
    // this.groupId = index
    // this.Iszhengjian = zj

    this.$store.state.info.UserVisaId = window.localStorage.getItem('UserVisaId')
    this.show_model = window.localStorage.getItem('showmodel')
    var that = this
    if (this.show_model == 1) {
      that.hidenBtn = false
    } else {
      that.hidenBtn = true
    }
    this.$root.eventHub.$on("showzj", function(msg) {

      if (msg.zj == 0) {
        that.hidenBtn = false
        that.groupId = msg.groupid
        that.modelName = "Infomation"
        that.Iszhengjian = 0
      }
      if (msg.zj == 1) {
        that.hidenBtn = true
        that.groupId = 0
        if (window.localStorage.getItem('CountryName') == '新西兰') {
          that.modelName = "CredentialsNZL"
        } else {
          that.modelName = "Credentials"
        }
        that.Iszhengjian = 1
      }
      if (msg.zj == 2) {
        that.hidenBtn = true
        that.groupId = 0
        if (window.localStorage.getItem('CountryName') == '新西兰') {
          that.modelName = "CredentialsNZL"
        } else {

          that.modelName = "Credentials"
        }
        that.Iszhengjian = 2
      }
      that.infomationStatus()
    })
    // alert(this.show_model)
    // alert(this.$store.state.info.UserVisaId)
  },
  methods: {

    submitFun() {
      console.log(this.$store.state.info.infoStatus);
      console.log(this.$store.state.info.infoStatus);
      this.$root.eventHub.$emit("save")
      var that = this
      var t = setTimeout(function() {

        for (var i = 0; i < that.$store.state.info.infoStatus.length; i++) {
          if (that.$store.state.info.infoStatus[i] == 0) {
            that.$layer.alert("请确保提交信息都已经保存并且不存在未填写项！")
            return
          }
        }
        that.$router.push({
          path: "/main/content/submitInfo"
        })
        that.$root.eventHub.$emit('infoStep', {
          infoStep: 3,
          // messageArr: messagenumArr
        });

        that.setPaperProgress(2, 100)
        var t = setTimeout(function() {
          that.setPaperProgress(1, 100)
        }, 1000);
        var t = setTimeout(function() {
          that.setPaperProgress(3, 100)
        }, 2000);

      }, 500);

      return




      if (this.$store.state.visa.country == "新西兰") {
        // this.getUserInfoNZL()
      } else {
        // this.getUserInfo()
      }
      var groupFilled = false;
      var materialFilled = false
      var groupNum = 0,
        materialNum = 0;

      for (var i = 0; i < this.meterialDetail.GroupList.length; i++) {
        if (this.meterialDetail.GroupList[i].IsFilled) {
          groupNum++
        }
      }
      // if (groupNum == this.meterialDetail.GroupList.length) {
      // alert(this.$store.state.info.userVisaId)
      // console.log(    this.infoStatus,'***********');
      for (var i = 0; i < this.infoStatus.length; i++) {
        if (this.infoStatus[i] == 0) {
          this.$layer.alert("请确保提交前除证件信息外都已经保存并且不存在未填写项！")
          return
        }
      }
      this.$http.post(this.$store.state.app.host + 'api/Manage/TypeInfoSubmit', {
          UserVisaID: this.$store.state.info.UserVisaId
        }, {
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.$layer.msg('提交成功')
              this.$router.push({
                path: "/main/content/submitInfo"
              })
              this.$root.eventHub.$emit('infoStep', {
                infoStep: 3,
                // messageArr: messagenumArr
              });
            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
      // }
      // else {
      //   this.$layer.alert("请确保提交前除证件信息外都已经保存并且不存在未填写项！")
      // }


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
    infomationStatus() {
      ///////////////////////
      var el = document.getElementsByClassName('allInfogroups')[0]
      var el1 = document.getElementById('cailiao')
      // console.log(el,'8888888888888',el.children[0]);
      // console.log(this.$root.hasClass(el.children[0], 'green'));
      // return
      this.infoStatus = []
      this.$http.get(this.$store.state.app.host + 'api/Manage/UserVisaInfo', {
          params: {
            userVisaId: this.$store.state.info.UserVisaId,
            isAllFiles: true
          },
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              var zhengjian = res.data.Result.CredentialsFileList
              var GroupList = res.data.Result.GroupList
              var cailiao = res.data.Result.PaperFileList
              var zhengjianStatus = true
              var GroupListStatus = true
              var cailiaoStatus = true

              var zjNum = 0
              var clNum = 0
              for (var i = 0; i < zhengjian.length; i++) {
                if (zhengjian[i].HaveContent == null) {
                  if (this.$root.hasClass(el.children[0], 'green')) {
                    this.$root.removeClass(el.children[0], 'green')
                  }
                  zhengjianStatus = false
                  // break;
                } else {
                  zjNum++
                  if (!this.$root.hasClass(el.children[0], 'green')) {
                    this.$root.addClass(el.children[0], 'green')
                  }
                }
              }
              zjNum = parseInt(zjNum / zhengjian.length * 100)
              if (window.localStorage.getItem('showmodel') == 0) {

                var t = setTimeout(function() {
                  that.setPaperProgress(1, zjNum)
                }, 100);
              }
              if (zhengjianStatus) {

                this.infoStatus.push(1)
              } else {
                this.infoStatus.push(0)
              }
              ////
              var groupNum = 0
              for (var i = 0; i < GroupList.length - 1; i++) {
                if (GroupList[i].GroupName != '众信') {
                  // console.log(i, GroupList[i].IsFilled, GroupList);
                  if (GroupList[i].IsFilled == false) {
                    if (window.localStorage.getItem('showmodel') == '1') {
                      if (this.$root.hasClass(el.children[i + 0], 'green')) {
                        this.$root.removeClass(el.children[i + 0], 'green')
                      }
                    } else {
                      if (this.$root.hasClass(el.children[i + 1], 'green')) {
                        this.$root.removeClass(el.children[i + 1], 'green')
                      }
                    }
                    GroupListStatus = false
                    // break;
                  } else {
                    groupNum++
                    if (window.localStorage.getItem('showmodel') == '1') {
                      if (!this.$root.hasClass(el.children[i + 0], 'green')) {
                        this.$root.addClass(el.children[i + 0], 'green')
                      }
                    } else {
                      if (!this.$root.hasClass(el.children[i + 1], 'green')) {
                        this.$root.addClass(el.children[i + 1], 'green')
                      }
                    }
                  }
                }
              }
              var groupNumAll = groupNum / (GroupList.length - 1) * 100
              // alert(groupNumAll)
              var that = this
              var t = setTimeout(function() {
                that.setPaperProgress(2, parseInt(groupNumAll))
              }, 2500);
              if (GroupListStatus) {
                this.infoStatus.push(1)
              } else {
                this.infoStatus.push(0)
              }
              ////
              console.log(el.childNodes.length, '=============', el1);
              if (window.localStorage.getItem('showmodel') == 0) {
                for (var i = 0; i < cailiao.length; i++) {
                  if (cailiao[i].HaveContent == null) {
                    if (this.$root.hasClass(el1, 'green')) {
                      this.$root.removeClass(el1, 'green')
                    }
                    cailiaoStatus = false
                    // break;
                  } else {
                    clNum++
                    if (!this.$root.hasClass(el1, 'green')) {
                      this.$root.addClass(el1, 'green')
                    }
                  }
                }
              }
              clNum = parseInt(clNum / cailiao.length * 100)
              if (window.localStorage.getItem('showmodel') == 0) {

                var t = setTimeout(function() {
                  that.setPaperProgress(3, clNum)
                }, 500);
              }
              if (cailiaoStatus) {
                this.infoStatus.push(1)
              } else {
                this.infoStatus.push(0)
              }

              if (this.show_model == 1) {
                this.infoStatus[0] = 1
                this.infoStatus[2] = 1
              }

              console.log(this.infoStatus, 'llll', this.show_model);
              this.$store.state.info.infoStatus = this.infoStatus
              console.log(this.$store.state.info.infoStatus, '222');
            } else {
              this.$layer.msg(res.data.message)
            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
    },
    infomationStatusNZL() {
      var el = document.getElementsByClassName('allInfogroups')[0]
      var el1 = document.getElementById('cailiao')
      var zhengjianStatus = true
      var GroupListStatus = true
      var cailiaoStatus = true
      this.infoStatus = []
      var zjNum = 0
      var zjLen = 0
      var clNum = 0
      var clLen = 0
      var that = this
      /*新西兰*/
      // if(window.localStorage.getItem("CountryName") == "新西兰"){
      // this.getUserInfoNZL()
      console.log(this.meterialDetail)
      // 证件 CredentialsFileList
      for (var i = 0; i < this.meterialDetail.ApplyAllMaterialListInfo.length; i++) {
        for (var j = 0; j < this.meterialDetail.ApplyAllMaterialListInfo[i].CredentialsFileList.length; j++) {
          zjLen++
          if (this.meterialDetail.ApplyAllMaterialListInfo[i].CredentialsFileList[j].HaveContent == null) {
            if (this.$root.hasClass(el.children[0], 'green')) {
              this.$root.removeClass(el.children[0], 'green')
            }
            zhengjianStatus = false
          } else {
            zjNum++
            if (!this.$root.hasClass(el.children[0], 'green')) {
              this.$root.addClass(el.children[0], 'green')
            }
          }
        }
      }
      zjNum = parseInt(zjNum / zjLen * 100)
      if (window.localStorage.getItem('showmodel') == 0) {

        var t = setTimeout(function() {
          that.setPaperProgress(1, zjNum)
        }, 100);
      }
      if (zhengjianStatus) {
        this.infoStatus.push(1)
      } else {
        this.infoStatus.push(0)
      }
      // 表信息
      var groupNum = 0
      for (var i = 0; i < this.meterialDetail.GroupList.length - 1; i++) {
        if (this.meterialDetail.GroupList[i].GroupName != '众信') {
          // console.log(i, GroupList[i].IsFilled, GroupList);
          if (this.meterialDetail.GroupList[i].IsFilled == false) {
            if (window.localStorage.getItem('showmodel') == '1') {
              if (this.$root.hasClass(el.children[i + 0], 'green')) {
                this.$root.removeClass(el.children[i + 0], 'green')
              }
            } else {
              if (this.$root.hasClass(el.children[i + 1], 'green')) {
                this.$root.removeClass(el.children[i + 1], 'green')
              }
            }
            GroupListStatus = false
          } else {
            if (window.localStorage.getItem('showmodel') == '1') {
              if (!this.$root.hasClass(el.children[i + 0], 'green')) {
                this.$root.addClass(el.children[i + 0], 'green')
              }
            } else {
              if (!this.$root.hasClass(el.children[i + 1], 'green')) {
                this.$root.addClass(el.children[i + 1], 'green')
              }
            }
          }
        }
      }
      if (GroupListStatus) {
        this.infoStatus.push(1)
      } else {
        this.infoStatus.push(0)
      }
      this.infoStatus.push(0)
      var groupNumAll = groupNum / (this.meterialDetail.GroupList.length - 1) * 100
      // alert(groupNumAll)
      var that = this
      var t = setTimeout(function() {
        that.setPaperProgress(2, parseInt(groupNumAll))
      }, 2500);
      // 材料 PaperFileList
      for (var i = 0; i < this.meterialDetail.ApplyAllMaterialListInfo.length; i++) {
        for (var j = 0; j < this.meterialDetail.ApplyAllMaterialListInfo[i].PaperFileList.length; j++) {
          clLen++
          if (this.meterialDetail.ApplyAllMaterialListInfo[i].PaperFileList[j].HaveContent == null) {
            if (this.$root.hasClass(el.children[0], 'green')) {
              this.$root.removeClass(el.children[0], 'green')
            }
            cailiaoStatus = false
          } else {
            clNum++
            if (!this.$root.hasClass(el.children[0], 'green')) {
              this.$root.addClass(el.children[0], 'green')
            }
          }
        }
      }
      clNum = parseInt(clNum / clLen * 100)
      if(window.localStorage.getItem('showmodel')==0){

      var t = setTimeout(function() {
        that.setPaperProgress(3, clNum)
      }, 500);
    }
      if (cailiaoStatus) {
        this.infoStatus.push(1)
      } else {
        this.infoStatus.push(0)
      }
      // }
      console.log(this.infoStatus)
    },

    getGroupInfo(index, zj) {
      if (index == -1) {
        this.modelName = "sfz"
        index = -1
        window.localStorage.setItem("GroupId", index)
        this.Iszhengjian = -1
        this.groupId = 0
        // this.$root.eventHub.$emit("CHANGEGROUP", {
        //   groupId: index,
        //   zhengjian: zj
        // })
      } else {
        if (index == 0) {
          if (this.$root.get("CountryName") == "新西兰") {
            // 新西兰
            this.modelName = "CredentialsNZL"
          } else {
            this.modelName = "Credentials"
          }

          // window.localStorage.setItem("GroupId", "")
        } else {

          this.modelName = "Infomation"

          // window.localStorage.setItem("GroupId", index)
        }
        this.groupId = index
        window.localStorage.setItem("GroupId", index)
        this.Iszhengjian = zj
        this.$root.eventHub.$emit("CHANGEGROUP", {
          groupId: index,
          zhengjian: zj
        })
        window.localStorage.setItem("Iszhengjian", zj)
        if (zj == 0) {
          this.hidenBtn = false
        } else {
          this.hidenBtn = true
        }
        this.infomationStatus()
      }
    },
    getUserInfo() {
      this.$http.get(this.$store.state.app.host + 'api/Manage/UserVisaInfo', {
          params: {
            userVisaId: this.$store.state.info.UserVisaId,
            isAllFiles: true
          },
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.meterialDetail = res.data.Result
              for (var i = 0; i < this.meterialDetail.GroupList.length; i++) {
                if (this.meterialDetail.GroupList[i].GroupID == 9) {
                  this.meterialDetail.GroupList.splice(i, 1)
                }
              }
              this.$store.state.visa.detailInfo = res.data.Result
              if (this.submit == "false") {
                if (window.localStorage.getItem('addBgId') == "7") {
                  this.showUserInforTip()
                }
              }
              this.submit = true
              this.$root.set("Submit", this.submit)

              for (var i = 0; i < this.meterialDetail.PaperFileList.length; i++) {
                if (this.meterialDetail.PaperFileList[i] && this.meterialDetail.PaperFileList[i].FileType == 8) {
                  this.meterialDetail.PaperFileList.splice(i, 1)
                }
                if (this.meterialDetail.PaperFileList[i] && this.meterialDetail.PaperFileList[i].FileType == 28) {
                  this.meterialDetail.PaperFileList.splice(i, 1)
                }
              }

              for (var i = 0; i < this.meterialDetail.CredentialsFileList.length; i++) {
                if (!this.meterialDetail.CredentialsFileList[i].HaveContent) {
                  this.zhengjianOk = false
                  return
                } else {
                  this.zhengjianOk = true
                }
              }
              for (var i = 0; i < this.meterialDetail.PaperFileList.length; i++) {
                if (!this.meterialDetail.PaperFileList[i].HaveContent) {
                  this.zhengjianOk = false
                  return
                } else {
                  this.zhengjianOk = true
                }
              }

            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
    },
    getUserInfoNZL() {
      this.$http.get(this.$store.state.app.host + 'api/Manage/UserVisaInfo4NZL', {
          params: {
            userVisaId: this.$store.state.info.UserVisaId,
            isAllFiles: true
          },
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            this.meterialDetail = res.data.Result
            for (var i = 0; i < this.meterialDetail.GroupList.length; i++) {
              if (this.meterialDetail.GroupList[i].GroupID == 9) {
                this.meterialDetail.GroupList.splice(i, 1)
              }
            }
            this.$store.state.visa.detailInfo = res.data.Result
            if (this.submit == "false") {
              if (window.localStorage.getItem('addBgId') == "7") {
                this.familyTip()
              }
            }
            this.submit = true
            this.$root.set("Submit", this.submit)
            // 判断证件信息是否都已经上传
            for (var i = 0; i < this.meterialDetail.ApplyAllMaterialListInfo.length; i++) {
              for (var j = 0; j < this.meterialDetail.ApplyAllMaterialListInfo[i].PaperFileList.length; j++) {
                if (this.meterialDetail.ApplyAllMaterialListInfo[i].PaperFileList[j].FileType == 8) {
                  this.meterialDetail.ApplyAllMaterialListInfo[i].PaperFileList.splice(i, 1)
                }
                if (this.meterialDetail.ApplyAllMaterialListInfo[i].PaperFileList[j].FileType == 28) {
                  this.meterialDetail.ApplyAllMaterialListInfo[i].PaperFileList.splice(i, 1)
                }
              }
            }
            this.infomationStatusNZL()
            for (var i = 0; i < this.meterialDetail.ApplyAllMaterialListInfo.length; i++) {
              for (var n = 0; n < this.meterialDetail.ApplyAllMaterialListInfo[i].CredentialsFileList.length; n++) {
                if (!this.meterialDetail.ApplyAllMaterialListInfo[i].CredentialsFileList[n].HaveContent) {
                  this.zhengjianOk = false
                  return
                } else {
                  this.zhengjianOk = true
                }
              }
              for (var n = 0; n < this.meterialDetail.ApplyAllMaterialListInfo[i].PaperFileList.length; n++) {
                if (!this.meterialDetail.ApplyAllMaterialListInfo[i].PaperFileList[n].HaveContent) {
                  this.zhengjianOk = false
                  return
                } else {
                  this.zhengjianOk = true
                }
              }
            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
    },
  },
  mounted() {
    // if (window.localStorage.getItem('CountryName') == '美国EVUS') {
    //   this.GroupList.splice(3, 1)
    // }
    // if (window.localStorage.getItem("GroupId")) {
    //   this.groupId = window.localStorage.getItem("GroupId")
    //   this.Iszhengjian = ""
    //   this.modelName = "Infomation"
    // } else
    // if (window.localStorage.getItem("Iszhengjian")) {
    //   this.Iszhengjian = window.localStorage.getItem("Iszhengjian")
    //   console.log(this.$root.get("CountryId"), this.$root.get("CountryId") == "3")
    //   if (this.$root.get("CountryId") == "3") {
    //     // 新西兰
    //     this.modelName = "CredentialsNZL"
    //   } else {
    //     this.modelName = "Credentials"
    //   }
    // } else {
    //   this.Iszhengjian = 1
    //   window.localStorage.setItem("Iszhengjian", "1")
    //   if (this.$root.get("CountryId") == "3") {
    //     // 新西兰
    //     this.modelName = "CredentialsNZL"
    //   } else {
    //     this.modelName = "Credentials"
    //   }
    // }
    window.localStorage.setItem("Iszhengjian", 1)
    var self = this
    // alert(this.show_model)

    if (window.localStorage.getItem("CountryName") == "新西兰") {
      // 新西兰
      self.getUserInfoNZL()
      if (this.show_model == 0) {
        this.modelName = "CredentialsNZL"
      } else {
        window.localStorage.setItem("Iszhengjian", 0)
        this.groupId = 1
        window.localStorage.setItem("GroupId", 1)
        this.modelName = "Infomation"
      }

    } else {
      self.getUserInfo()
      if (this.show_model == 0) {
        this.modelName = "Credentials"
      } else {
        window.localStorage.setItem("Iszhengjian", 0)
        this.groupId = 1
        window.localStorage.setItem("GroupId", 1)
        this.modelName = "Infomation"
      }
    }

    // this.$root.$on('REFRESHFILL', function(obj) {
    //   if (window.localStorage.getItem("CountryName") == "新西兰") {
    //     self.getUserInfoNZL()
    //   } else {
    //     self.getUserInfo()
    //   }
    // })
    var t = setTimeout(function() {
      if (window.localStorage.getItem("CountryName") == "新西兰") {
        self.getUserInfoNZL()
      } else {
        self.infomationStatus()
      }

    }, 50);
  },
  components: {
    Credentials,
    Infomation,
    CredentialsNZL,
    sfz
  }
}
</script>
<style type="text/css" lang="scss" src="./css/allInfo.scss"></style>
