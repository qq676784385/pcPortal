<template>
<div class="credentials">
  <div class="credentialsList" v-if='Iszhengjian == 1'>
    <div class="titleTxt">必备证件</div>
    <div class="materialList">
      <table border="1" cellspacing="0" frame="box" rules="none">
        <tr>
          <th>序号</th>
          <th>附件名称</th>
          <th>在线预览</th>
          <th>下载</th>
          <th>上传</th>
          <th>已上传文件名称</th>
          <th>删除</th>
        </tr>
        <tr v-for='(item,index) in certificateInfo.CredentialsFileList'>
          <td class="numberBg numberColor">{{index+1}}</td>
          <td>
            <span>{{item.FileName}}</span>
          </td>
          <td :class="item.HaveContent&&item.UploadFileName.length>0?'link':''" @click="preview(item)">
            浏览
          </td>
          <td>
            <a :class="item.HaveContent&&item.UploadFileName?'link':'nothingA'" v-tap='{methods:downLoadFun,info:item}'>下载</a>
          </td>
          <td class="numberColor link uploadInput" @click='upload(item,1)'>
            点击上传
          </td>
          <td>
            <span v-if='!item.HaveContent'>---</span>
            <span v-else v-html='item.UploadFileName||"---"'></span>
          </td>
          <td class="redColor" @click="delectFun(item)">删除</td>
        </tr>
      </table>
    </div>
  </div>
  <div class="credentialsList" v-if='Iszhengjian == 2'>
    <div class="titleTxt">必备材料</div>
    <div class="materialList">
      <table border="1" cellspacing="0" frame="box" rules="none">
        <tr>
          <th>序号</th>
          <th>附件名称</th>
          <th>在线预览</th>
          <th>下载</th>
          <th>上传</th>
          <th>已上传文件名称</th>
          <th>删除</th>
        </tr>
        <tr v-for='(item,index) in certificateInfo.PaperFileList'>
          <td class="numberBg numberColor">{{index+1}}</td>
          <td>
            <span>{{item.FileName}}</span>
          </td>
          <td :class="!item.HaveContent?'':'numberColor link'" @click="preview(item)">
            浏览
          </td>
          <td>
            <a :class="item.HaveContent&&item.UploadFileName?'link':'nothingA'" target="_blank" v-tap='{methods:downLoadFun,info:item}'>下载</a>
          </td>
          <td class="numberColor link uploadInput" @click='upload(item,3)'>
            点击上传
          </td>
          <td>
            <span v-html='item.UploadFileName||"---"'></span>
          </td>
          <td class="redColor" @click="delectFun(item)">删除</td>
        </tr>
      </table>
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
      certificateInfo: {},
      Iszhengjian: "1"
    }
  },
  methods: {
    upload(item, type) {
      this.$store.state.info.UserVisaId = this.certificateInfo.UserVisaID
      this.$store.state.visa.uploadInfo = item
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
    preview(info) {
      this.$store.state.visa.fileInfo = info
      var passport = null
      if (this.$store.state.visa.uploadInfo.Passport) {
        passport = this.$store.state.visa.uploadInfo.Passport
      }
      console.log(123, passport)
      if (info.HaveContent && info.UploadFileName.length > 0) {
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
                  title: info.FileName
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
    delectFun(info) {
      this.$store.state.visa.VisaFileId = info.VisaFileId
      this.$store.state.visa.delectPassport = ''
      if (info.HaveContent) {
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
      console.log(par.info.HaveContent)
      if (par.info.HaveContent && par.info.File) {
        if (par.info.FileType == 3 || par.info.FileType == 4 || par.info.FileType == 15 || par.info.FileType == 20 || par.info.FileType == 21 || par.info.FileType == 22 || par.info.FileType == 16 || par.info.FileType == 29 || par.info.FileType == 30 ||
          par.info.FileType == 31 || par.info.FileType == 32 || par.info.FileType == 33 || par.info.FileType == 35|| par.info.FileType == 5) {
          par.event.target.setAttribute("target", "_blank")
          par.event.target.setAttribute("href", this.$store.state.app.host + "api/Manage/MergeJPEGToPDF?userVisaId=" + this.$store.state.info.UserVisaId + "&fileType=" + par.info.FileType + "&passport=&download=true")
        } else {
          par.event.target.setAttribute("href", this.$store.state.app.host + par.info.File)
          par.event.target.setAttribute("download", this.$store.state.app.host + par.info.File)
        }
      } else {
        par.event.target.removeAttribute("href")
        par.event.target.removeAttribute("download")
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
              this.certificateInfo = res.data.Result

              for (var i = 0; i < this.certificateInfo.PaperFileList.length; i++) {
                if (this.certificateInfo.PaperFileList[i] && this.certificateInfo.PaperFileList[i].FileType == 8) {
                  this.certificateInfo.PaperFileList.splice(i, 1)
                }
                if (this.certificateInfo.PaperFileList[i] && this.certificateInfo.PaperFileList[i].FileType == 28) {
                  this.certificateInfo.PaperFileList.splice(i, 1)
                }
              }
              this.$store.state.visa.certificateInfo = this.certificateInfo
            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
    }
  },
  created() {
    this.Iszhengjian = window.localStorage.getItem("Iszhengjian")
    this.$store.state.visa.countryId = window.localStorage.getItem("CountryId")
    this.$store.state.info.UserVisaId = this.$root.get("UserVisaId")
  },
  mounted() {
    this.$store.state.app.token = window.localStorage.getItem("Token")
    this.getUserInfo()
    var that = this
    this.$root.eventHub.$on("CHANGEGROUP", function(obj) {
      // alert(obj.zhengjian)
      if (obj.zhengjian) {
        that.Iszhengjian = obj.zhengjian
      }
    })

    this.$on('CLOSE', function(obj) {
      // alert(3)
      switch (obj.hideFrame) {
        case "previewFrame":

          that.$layer.close(that.previewFrame)

          break;
        case "idcardFrame":
          // alert(1.5)
          that.$layer.close(that.idcardFrame)
              // alert(1.6)
          if (obj.back) {
            that.upload(this.$store.state.visa.uploadInfo)
          }
          break;
        case "delectFrame":
          that.$layer.close(that.delectFrame)
          break;
      }
      that.$root.$emit("REFRESHFILL")
      that.getUserInfo()
    })
  },
  components: {
    Identification,
    DelectAll,
    Preview
  }
}
</script>
<style type="text/css" lang="scss" src="../css/credential.scss"></style>
