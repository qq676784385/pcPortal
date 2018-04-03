<template>
<div class="newZealand">
  <div class="cailiao" v-if='Iszhengjian == 1'>
    <div class="tip">
      <div class="titleTxt">必备证件</div>
    </div>
    <div class="col_1" v-for='material in certificateInfo.ApplyAllMaterialListInfo'>
      <div class="personInfo">
        <span>{{material.UserName}}</span>
        <span>({{shenfen[material.UserType]}})</span>
        <span>{{material.Passport}}</span>
      </div>
      <div class="personList">
        <div class="list1">
          <table border="1" cellspacing="0" frame="box" rules="none">
            <tr>
              <th>NO.</th>
              <th>附件名称</th>
              <th>在线预览</th>
              <th>下载</th>
              <th>上传</th>
              <th>已上传文件名称</th>
              <th>删除</th>
            </tr>
            <tr v-for='(info1,index) in material.CredentialsFileList'>
              <td>{{index+1}}</td>
              <td>{{info1.FileName}}</td>
              <td :class="!info1.HaveContent?'':'blueFont'" v-tap='{methods:preview,info:info1,userType:material.UserType,passport:material.Passport}'>
                浏览
              </td>
              <td :class="!info1.HaveContent?'':'blueFont'">
                <a :class="info1.HaveContent&&info1.UploadFileName?'link':'nothingA'" v-tap='{methods:downLoadFun,info:info1,passport:material.Passport}'>下载</a>
              </td>
              <td class='blueFont' @click='upload(info1,1,material.UserType,material.Passport)'>点击上传</td>
              <td>
                <span v-if='!info1.HaveContent'>---</span>
                <span v-if='info1.HaveContent' v-html='info1.UploadFileName||"---"'></span>
              </td>
              <td class="redFont" v-tap='{methods:delectFun,info:info1,passport:material.Passport}'>删除</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="cailiao" v-if='Iszhengjian == 2'>
    <div class="tip">
      <div class="titleTxt">必备材料</div>
    </div>
    <div class="col_1" v-for='material in certificateInfo.ApplyAllMaterialListInfo'>
      <div class="personInfo">
        <span>{{material.UserName}}</span>
        <span>({{shenfen[material.UserType]}})</span>
        <span>{{material.Passport}}</span>
      </div>
      <div class="personList">
        <div class="list1 list2" v-if='Iszhengjian == 2'>
          <table border="1" cellspacing="0" frame="box" rules="none">
            <tr>
              <th>NO.</th>
              <th>附件名称</th>
              <th>在线预览</th>
              <th>下载</th>
              <th>上传</th>
              <th>已上传文件名称</th>
              <th>删除</th>
            </tr>
            <tr v-for='(info2,index) in material.PaperFileList'>
              <td>{{index+1}}</td>
              <td>{{info2.FileName}}</td>
              <td :class="!info2.HaveContent?'':'blueFont'" v-tap='{methods:preview,info:info2,userType:material.UserType,passport:material.Passport}'>预览</td>
              <td :class="!info2.HaveContent?'':'blueFont'">
                <a :class="info2.HaveContent&&info2.UploadFileName?'link':'nothingA'" target="_blank" v-tap='{methods:downLoadFun,info:info2,passport:material.Passport}'>下载</a>
              </td>
              <td class='blueFont' @click='upload(info2,3,material.UserType,material.Passport)'>点击上传</td>
              <td>
                <span v-if='!info2.HaveContent'>---</span>
                <span v-if='info2.HaveContent' v-html='info2.UploadFileName||"---"'></span>
              </td>
              <td class="redFont" v-tap='{methods:delectFun,info:info2,passport:material.Passport}'>删除</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script type="text/javascript">
import Preview from './Preview.vue'
import DelectAll from './DelectAll.vue'
import Identification from './Identification.vue'

export default {
  data() {
    return {
      shenfen: ['主申请人', '配偶', '子女'],
      Iszhengjian: "",
      certificateInfo: {
        "UserVisaID": 202,
        "OrderNumber": "N99205306",
        "Name": "张三",
        "PassportNumber": "A22222222",
        "Country": "澳大利亚",
        "Identity": 7,
        "VisaType": 1,
        "Married": 1,
        "PassportIncludeVisa": null,
        "GroupList": [{
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
            "GroupID": 3,
            "GroupName": "护照信息",
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
          {
            "GroupID": 9,
            "GroupName": "众信",
            "GroupType": 2,
            "IsFilled": false
          }
        ],
        "ApplyAllMaterialListInfo": [{
            "UserName": "张三2",
            "Passport": "XH9999991",
            "Identity": 2,
            "UserType": 0,
            "CredentialsFileList": [{
                "VisaFileId": 2,
                "FileName": "护照首页",
                "File": "Data/Visa/c87172b9-c75b-4f96-a692-bfac2fc8213d/225/20171227143820_2.jpg",
                "UploadFileName": "20171227143820_2.jpg",
                "FileType": 2,
                "HaveContent": true,
                "Tag": 1
              },
              {
                "VisaFileId": 3,
                "FileName": "身份证",
                "File": "Data/Visa/c87172b9-c75b-4f96-a692-bfac2fc8213d/225/20171227165348_2.jpg",
                "UploadFileName": "20171227165348_2.jpg<br/>20171227165357_2.jpg",
                "FileType": 3,
                "HaveContent": true,
                "Tag": 1
              },
              {
                "VisaFileId": 5,
                "FileName": "照片",
                "File": "Data/Visa/c87172b9-c75b-4f96-a692-bfac2fc8213d/225/20180105100554_2.jpg",
                "UploadFileName": "20180105100554_2.jpg",
                "FileType": 27,
                "HaveContent": true,
                "Tag": 1
              },
              {
                "VisaFileId": 6,
                "FileName": "户口本",
                "File": "Data/Visa/c87172b9-c75b-4f96-a692-bfac2fc8213d/225/20180105100325_2.jpg",
                "UploadFileName": "20180105100325_2.jpg",
                "FileType": 4,
                "HaveContent": true,
                "Tag": 1
              },
              {
                "VisaFileId": 8,
                "FileName": "暂住证/居住证",
                "File": null,
                "UploadFileName": "",
                "FileType": 5,
                "HaveContent": false,
                "Tag": null
              },
              {
                "VisaFileId": 9,
                "FileName": "学生证或卡",
                "File": "Data/Visa/c87172b9-c75b-4f96-a692-bfac2fc8213d/225/20180105100403_2.jpg",
                "UploadFileName": "20180105100403_2.jpg",
                "FileType": 9,
                "HaveContent": true,
                "Tag": 1
              }
            ],
            "PaperFileList": [{
                "VisaFileId": 12,
                "FileName": "资产证明",
                "File": null,
                "UploadFileName": "",
                "FileType": 8,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 14,
                "FileName": "存款证明",
                "File": null,
                "UploadFileName": "",
                "FileType": 20,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 15,
                "FileName": "房产",
                "File": null,
                "UploadFileName": "",
                "FileType": 21,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 16,
                "FileName": "车产",
                "File": null,
                "UploadFileName": "",
                "FileType": 22,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 23,
                "FileName": "与出资人直接关系证明",
                "File": null,
                "UploadFileName": "",
                "FileType": 17,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 26,
                "FileName": "学校准假信",
                "File": null,
                "UploadFileName": "",
                "FileType": 10,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 27,
                "FileName": "出生证明",
                "File": null,
                "UploadFileName": "",
                "FileType": 23,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 32,
                "FileName": "护照签证页",
                "File": null,
                "UploadFileName": "",
                "FileType": 35,
                "HaveContent": null,
                "Tag": null
              }
            ]
          },
          {
            "UserName": "张三",
            "Passport": "XH9999992",
            "Identity": 1,
            "UserType": 1,
            "CredentialsFileList": [{
                "VisaFileId": 2,
                "FileName": "护照首页",
                "File": "Data/Visa/c87172b9-c75b-4f96-a692-bfac2fc8213d/225/20171227172809_2.jpg",
                "UploadFileName": "20171227172809_2.jpg",
                "FileType": 2,
                "HaveContent": true,
                "Tag": 1
              },
              {
                "VisaFileId": 3,
                "FileName": "身份证",
                "File": null,
                "UploadFileName": "",
                "FileType": 3,
                "HaveContent": false,
                "Tag": null
              },
              {
                "VisaFileId": 4,
                "FileName": "营业执照副本",
                "File": null,
                "UploadFileName": "",
                "FileType": 6,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 5,
                "FileName": "照片",
                "File": null,
                "UploadFileName": "",
                "FileType": 27,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 7,
                "FileName": "结婚证",
                "File": null,
                "UploadFileName": "",
                "FileType": 7,
                "HaveContent": null,
                "Tag": null
              }
            ],
            "PaperFileList": [{
                "VisaFileId": 11,
                "FileName": "在职证明",
                "File": null,
                "UploadFileName": "",
                "FileType": 12,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 12,
                "FileName": "资产证明",
                "File": null,
                "UploadFileName": "",
                "FileType": 8,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 13,
                "FileName": "银行卡对账单",
                "File": null,
                "UploadFileName": "",
                "FileType": 15,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 14,
                "FileName": "存款证明",
                "File": null,
                "UploadFileName": "",
                "FileType": 20,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 15,
                "FileName": "房产",
                "File": null,
                "UploadFileName": "",
                "FileType": 21,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 16,
                "FileName": "车产",
                "File": null,
                "UploadFileName": "",
                "FileType": 22,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 32,
                "FileName": "护照签证页",
                "File": null,
                "UploadFileName": "",
                "FileType": 35,
                "HaveContent": null,
                "Tag": null
              }
            ]
          },
          {
            "UserName": "张三",
            "Passport": "XH9999993",
            "Identity": 7,
            "UserType": 2,
            "CredentialsFileList": [{
                "VisaFileId": 2,
                "FileName": "护照首页",
                "File": "Data/Visa/c87172b9-c75b-4f96-a692-bfac2fc8213d/225/20171227170604_2.jpg",
                "UploadFileName": "20171227170604_2.jpg",
                "FileType": 2,
                "HaveContent": true,
                "Tag": 1
              },
              {
                "VisaFileId": 3,
                "FileName": "身份证",
                "File": null,
                "UploadFileName": "",
                "FileType": 3,
                "HaveContent": false,
                "Tag": null
              },
              {
                "VisaFileId": 5,
                "FileName": "照片",
                "File": null,
                "UploadFileName": "",
                "FileType": 27,
                "HaveContent": null,
                "Tag": null
              }
            ],
            "PaperFileList": [{
                "VisaFileId": 27,
                "FileName": "出生证明",
                "File": null,
                "UploadFileName": "",
                "FileType": 23,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 32,
                "FileName": "护照签证页",
                "File": null,
                "UploadFileName": "",
                "FileType": 35,
                "HaveContent": null,
                "Tag": null
              }
            ]
          },
          {
            "UserName": "张三zi",
            "Passport": "XH9999994",
            "Identity": 8,
            "UserType": 2,
            "CredentialsFileList": [{
                "VisaFileId": 2,
                "FileName": "护照首页",
                "File": null,
                "UploadFileName": "",
                "FileType": 2,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 3,
                "FileName": "身份证",
                "File": null,
                "UploadFileName": "",
                "FileType": 3,
                "HaveContent": false,
                "Tag": null
              },
              {
                "VisaFileId": 5,
                "FileName": "照片",
                "File": null,
                "UploadFileName": "",
                "FileType": 27,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 9,
                "FileName": "学生证或卡",
                "File": null,
                "UploadFileName": "",
                "FileType": 9,
                "HaveContent": null,
                "Tag": null
              }
            ],
            "PaperFileList": [{
                "VisaFileId": 26,
                "FileName": "学校准假信",
                "File": null,
                "UploadFileName": "",
                "FileType": 10,
                "HaveContent": false,
                "Tag": null
              },
              {
                "VisaFileId": 27,
                "FileName": "出生证明",
                "File": null,
                "UploadFileName": "",
                "FileType": 23,
                "HaveContent": null,
                "Tag": null
              },
              {
                "VisaFileId": 32,
                "FileName": "护照签证页",
                "File": null,
                "UploadFileName": "",
                "FileType": 35,
                "HaveContent": null,
                "Tag": null
              }
            ]
          }
        ],
        "NZLField": {
          "PassportIdentity": 0,
          "IsSpouseFollow": true,
          "MinorChildrenFollow": 2,
          "SpouseName": "张三",
          "SpousePassport": "XH9999992",
          "SpouseCareer": 1,
          "MinorChildrenInfo": [{
              "ChildName": "张三",
              "ChildPassport": "XH9999993",
              "ChildCareer": 7
            },
            {
              "ChildName": "张三",
              "ChildPassport": "XH9999994",
              "ChildCareer": 8
            }
          ]
        },
      },

    }
  },
  methods: {
    getUserInfo() {
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
            if (res.data.Code == 0) {
              // 资产证明 /出资人资产证明
              for (var i = 0; i < res.data.Result.ApplyAllMaterialListInfo.length; i++) {
                for (var j = 0; j < res.data.Result.ApplyAllMaterialListInfo[i].PaperFileList.length; j++) {
                  if (res.data.Result.ApplyAllMaterialListInfo[i].PaperFileList[j].FileType == 8) {
                    res.data.Result.ApplyAllMaterialListInfo[i].PaperFileList.splice(j, 1)
                  }
                  if (res.data.Result.ApplyAllMaterialListInfo[i].PaperFileList[j].FileType == 28) {
                    res.data.Result.ApplyAllMaterialListInfo[i].PaperFileList.splice(j, 1)
                  }
                }
              }
							console.log('------------------===========');
							console.log( res.data.Result);
              this.certificateInfo = res.data.Result
              this.$store.state.visa.certificateInfo = this.certificateInfo


              this.MainApply = []
              this.SpouseApply = {}
              this.ChildrenApply = []
              var arr1 = [],
                arr2 = []

              for (var i = 0; i < this.certificateInfo.ApplyAllMaterialListInfo.length; i++) {
                // 新西兰合并 证件列表和材料列表
                // 识别完成后需要更新百分比
                for (var j = 0; j < this.certificateInfo.ApplyAllMaterialListInfo[i].CredentialsFileList.length; j++) {
                  arr1.push(this.certificateInfo.ApplyAllMaterialListInfo[i].CredentialsFileList[j])
                }
                for (var m = 0; m < this.certificateInfo.ApplyAllMaterialListInfo[i].PaperFileList.length; m++) {
                  arr2.push(this.certificateInfo.ApplyAllMaterialListInfo[i].PaperFileList[m])
                }
                this.$store.state.visa.certificateInfo.CredentialsFileList = arr1
                this.$store.state.visa.certificateInfo.PaperFileList = arr2

                switch (this.certificateInfo.ApplyAllMaterialListInfo[i].UserType) {
                  case 0:
                    // 主申请人
                    this.MainApply.push(this.certificateInfo.ApplyAllMaterialListInfo[i])
                    break;
                  case 1:
                    // 配偶
                    this.SpouseApply = this.certificateInfo.ApplyAllMaterialListInfo[i]
                    break;
                  case 2:
                    // 子女
                    var obj = {
                      "UserName": "",
                      "ChildPassport": "",
                      "ChildCareer": "",
                    }
                    obj.UserName = this.certificateInfo.ApplyAllMaterialListInfo[i].UserName
                    obj.ChildPassport = this.certificateInfo.ApplyAllMaterialListInfo[i].Passport
                    obj.ChildCareer = this.certificateInfo.ApplyAllMaterialListInfo[i].Identity
                    this.ChildrenApply.push(obj)

                    break;
                }
              }
              // console.log(this.$store.state.visa.certificateInfo)
            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
    },
    upload(item, type, usertype, passport) {
      // 证件 - type:1  材料 - type:3
      this.$store.state.visa.uploadInfo = item
      // 新西兰 申请人身份 主申请人-0 配偶-1 子女-2
      this.$store.state.visa.uploadInfo.UserType = usertype
      // 护照号
      this.$store.state.visa.uploadInfo.Passport = passport
      this.$store.state.visa.progressType = type
      this.idcardFrame = this.$layer.iframe({
        content: {
          content: Identification,
          parent: this,
          data: []
        },
        title: item.FileName
      })
    },
    preview(par) {
      this.$store.state.visa.fileInfo = par.info
      this.$store.state.visa.fileInfo.UserType = par.userType
      this.$store.state.visa.fileInfo.Passport = par.passport
      var passport = ""
      if (this.$store.state.visa.fileInfo.Passport) {
        passport = this.$store.state.visa.fileInfo.Passport
      }

      if (par.info.HaveContent && par.info.UploadFileName.length > 0) {
        this.$http.get(this.$store.state.app.host + 'api/Manage/PreView', {
            params: {
              userVisaId: this.$store.state.info.UserVisaId,
              visaFileId: this.$store.state.visa.fileInfo.VisaFileId,
              passport: passport
            },
            headers: {
              Authorization: this.$store.state.app.token
            },
            timeout: this.$store.state.app.httpTime
          })
          .then(
            function(res) {
              if (res.data.Code == 0) {
                this.$store.state.visa.previewInfo = res.data.Result
                this.previewFrame = this.$layer.iframe({
                  content: {
                    content: Preview,
                    parent: this,
                    data: []
                  },
                  title: par.info.FileName
                })
              }
            },
            function(err) {
              this.$layer.msg("网络连接超时")
            }
          )
      } else {

      }
    },
    delectFun(par) {
      this.$store.state.visa.VisaFileId = par.info.VisaFileId
      this.$store.state.visa.delectPassport = par.passport
      console.log($(par.event.target).parent().children().find("a"))
      $(par.event.target).parent().children().find("a").attr("href", "")
      $(par.event.target).parent().children().find("a").attr("download", "")

      if (par.info.HaveContent) {
        this.delectFrame = this.$layer.iframe({
          content: {
            content: DelectAll,
            parent: this,
            data: []
          },
          title: "删除"
        })
      } else {
        this.$layer.msg("请先上传文件")
      }
    },
    downLoadFun(par) {
      if (par.info.HaveContent) {
        if (par.info.FileType == 3 || par.info.FileType == 4 || par.info.FileType == 15 || par.info.FileType == 20 || par.info.FileType == 21 || par.info.FileType == 22 || par.info.FileType == 16 || par.info.FileType == 29 || par.info.FileType == 30 ||
          par.info.FileType == 31 || par.info.FileType == 32 || par.info.FileType == 33 || par.info.FileType == 35) {
          par.event.target.setAttribute("target", "_blank")
          par.event.target.setAttribute("href", this.$store.state.app.host + "api/Manage/MergeJPEGToPDF?userVisaId=" + this.$store.state.info.UserVisaId + "&fileType=" + par.info.FileType + "&passport=" + par.passport + "&download=true")
        } else {
          par.event.target.setAttribute("href", this.$store.state.app.host + par.info.File)
          par.event.target.setAttribute("download", this.$store.state.app.host + par.info.File)
        }
      } else {
        par.event.target.removeAttribute("href")
        par.event.target.removeAttribute("download")
      }

    }
  },
  created() {
    this.Iszhengjian = window.localStorage.getItem("Iszhengjian")
    this.$store.state.info.UserVisaId = window.localStorage.getItem("UserVisaId")
    this.getUserInfo()
  },
  mounted() {
    // this.getUserInfo()
    this.$store.state.app.token = window.localStorage.getItem("Token")
    var that = this
    this.$root.eventHub.$on("CHANGEGROUP", function(obj) {
      if (obj.zhengjian) {
        that.Iszhengjian = obj.zhengjian
      }
    })
    var _this = this
    this.$on('CLOSE', function(obj) {
      switch (obj.hideFrame) {
        case "previewFrame":
          _this.$layer.close(_this.previewFrame)
          break;
        case "idcardFrame":
          _this.$layer.close(_this.idcardFrame)
          if (obj.back) {

            var type = this.$store.state.visa.progressType
            var usertype = this.$store.state.visa.uploadInfo.UserType
            var passport = this.$store.state.visa.uploadInfo.Passport
            _this.upload(this.$store.state.visa.uploadInfo, type, usertype, passport)
          }
          break;
        case "delectFrame":
          _this.$layer.close(_this.delectFrame)
          break;
      }
      _this.$root.$emit("REFRESHFILL")
      _this.getUserInfo()
    })

  },
  components: {
    Preview,
    Identification,
    DelectAll
  }
}
</script>
<style type="text/css" lang="scss" src="../css/credentialsNZL.scss"></style>
