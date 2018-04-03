// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
// import hotcss from 'hotcss'

import layer from 'vue-layer' //e.parentNode.removeChild(e) 修改过源码 e.remove() 不兼容IE


import $ from 'jquery'
import VueCropper from 'vue-cropper-simple'
import vueTap from 'v-tap'

// import './components/js/mobiscroll.custom-2.17.0.min.js'
import './components/js/mobiscroll.2.13.2.js'

Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue)
Vue.use(vueTap)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(layer)
Vue.use(vueTap)

Vue.use(VueCropper)
// window.onbeforeunload = function() {
// 		window.token = window.localStorage.getItem('Token')
// 	window.localStorage.setItem('Token','')
//
// }
var _beforeUnload_time = 0,
  _gap_time = 0;

var is_fireFox = navigator.userAgent.indexOf("Firefox") > -1; //是否是火狐浏览器
console.log(is_fireFox);
window.onunload = function() {
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    var n = window.event.screenX - window.screenLeft;
    var b = n > document.documentElement.scrollWidth - 20;
    if (b && window.event.clientY < 0 || window.event.altKey) {
      // alert("是关闭而非刷新");
    } else {
      // alert("是刷新而非关闭");
      window.localStorage.setItem('Token', window.token)
      // alert(  window.localStorage.getItem('Token'))
    }
  } else {
    _gap_time = new Date().getTime() - _beforeUnload_time;
    if (_gap_time <= 2) {
      window.token = window.localStorage.getItem('Token')
      // window.localStorage.setItem('Token', '')
    } else {

      window.localStorage.setItem('Token', window.token)

    }
  }
}

window.onbeforeunload = function() {

  // alert(0)
  window.token = window.localStorage.getItem('Token')
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    // window.localStorage.setItem('Token', '')
    // alert(  window.localStorage.getItem('Token'))
  } else {
    _beforeUnload_time = new Date().getTime();
    // alert(1)
    if (is_fireFox) {
      // window.localStorage.setItem('Token', '')

    } //火狐关闭执行
  }
};



const vuex_store = new Vuex.Store({
  state: {
    app: {
      host: 'http://dev.ivisa.ydynasty.com/UZTest/', //??Է???
      // host: 'http://dev.ivisa.ydynasty.com/DevTest/',//?ʽ????
      token: "",
      phoneToken: "",
      httpTime: 10000,
      // ivisaId: "",
      personalInfo: "",
      browser: ''

    },
    info: {
      isTestUser: 0,
      area: '',
      visaList: [],
      passportNum: '',
      seleNum: '',
      GroupID: '',
      UserVisaId: '',
      infoStatus: [0, 0, 0], //分别代表 证件，信息，材料
      Name: '',
      sinceJindu: 0

    },
    visa: {
      fileInfo: {},
      uploadInfo: {},
      previewInfo: {},
      VisaFileId: "",
      delectPassport: ""
    },
    previewImg: { //裁剪图片
      rotateNum: "", //角度
      cutImgInfo: "", //裁剪后返回的数据
      saveImgInfo: "", //保存之后返回的数据
      uploadFiles: "", //上传过的数据
    },
    tip: {
      tip: false,
      type: 1,
      title: '',
      content: '内容提示',
      FileType: '',
      FileTipArr: '',
    }
  },
  mutations: {
    showRootObj(state) {},
    selebook_firstHidden(state) {},
    selebook_firstShow(state) {}
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: vuex_store,
  router,
  template: '<App/>',
  components: {
    App
  },
  data: {
    eventHub: new Vue(),
    jindu: [],
    // sinceJindu: this.$root.$store.state.info.sinceJindu
  },
  // data() {
  //   return {
  //
  //   }
  // },
  created() {

  },
  methods: {
    myBrowser() {
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      console.log(navigator.mimeType);

      // alert( navigator.mimeTypes.value)
      var isOpera = userAgent.indexOf("Opera") > -1;
      var explorer = window.navigator.userAgent.toLowerCase();
      var ver = 0
      if (isOpera) {
        return "Opera"
      }; //判断是否Opera浏览器
      if (userAgent.indexOf("Firefox") > -1) {
        ver = explorer.match(/firefox\/([\d.]+)/)[1];
        if (ver.split('.')[0] < 57) {
          alert("您的浏览器不是当前最新版本，可能会导致网站无法显示，请及时升级。")
        }
        return "FF";
      } //判断是否Firefox浏览器
      if (userAgent.indexOf("Chrome") > -1) {
        var desc = navigator.mimeTypes['application/x-shockwave-flash'].description.toLowerCase();
        // alert(desc)
        if (desc.indexOf('flash') > -1) {
          // alert("禁止使用360浏览器！请使用IE8或者Google浏览器，页面即将关闭！")
          // alert(111)
        } else {

          ver = explorer.match(/chrome\/([\d.]+)/)[1];
          if (ver.split('.')[0] < 63) {
            alert("您的浏览器不是当前最新版本，可能会导致网站无法显示，请及时升级。")
          }
          return "Chrome";
        }
      }
      if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
      } //判断是否Safari浏览器
      if (!!window.ActiveXObject || "ActiveXObject" in window) {

        if (navigator.appVersion.split(";")[1].indexOf('MSIE') > -1) {
          ver = navigator.appVersion.split(";")[1].split(" ")[2].split(".")[0]

        } else {
          ver = 11
        }
        if (ver < 10) {
          alert("您的浏览器不是当前最新版本，可能会导致网站无法显示，请及时升级。")
        }

        // ver=explorer.match(/msie ([\d.]+)/)[1];
        return "IE";
      }; //判断是否IE浏览器
    },
    trim(s) {
      return s.replace(/(^\s*)|(\s*$)/g, "");
    },

    Extend() {
      //GetCredentialsData ?ӿ??չ???      //??չ?????Ϊ?˸??????仯??ͳһ???????????޸?
      var _obj = {
        "passport": window.localStorage.getItem('nzlClickPassportNum')
      }
      return JSON.stringify(_obj)
    },
    Extend1() {
      //SaveCredentialsData ?ӿ??չ???      //??չ?????Ϊ?˸??????仯??ͳһ???????????޸?
      var _obj = {
        "Type": window.localStorage.getItem('NZLPassportStatus'),
        "passport": window.localStorage.getItem('nzlClickPassportNum')
      }
      return _obj
    },
    verifyDay1(dateStr, dateStr2) {
      var num = -1
      var s1 = dateStr; //'2012-05-12';
      s1 = new Date(s1.replace(/-/g, "/"));
      var s2 = dateStr2; //'2012-05-12';
      s2 = new Date(s2.replace(/-/g, "/"));
      var days = s1.getTime() - s2.getTime();
      var time = parseInt(days / (1000 * 60 * 60 * 24));
      num = time + 0
      return num
    },
    verifyDay(dateStr) {
      var num = -1
      var s1 = dateStr; //'2012-05-12';
      s1 = new Date(s1.replace(/-/g, "/"));
      var s2 = new Date().getFullYear() + '-' + String(Number(new Date().getMonth()) + 1) + '-' + new Date().getDate();
      s2 = new Date(s2.replace(/-/g, "/"));
      var days = s1.getTime() - s2.getTime();
      var time = parseInt(days / (1000 * 60 * 60 * 24));
      num = time + 0
      return num
    },
    verifyFinish(arr) {
      var status = true
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].IsFilled == false) {
          status = false
          break;
        }
      }
      return status
    },
    crossLogin() {
      var obj = {}

      obj = {
        Authorization: this.$store.state.app.token
      }

      return obj
    },
    showImgTip(obj) {

      this.$store.state.tip.content = obj.msg
      this.showTip({
        tiptype: 3
      })
    },
    showTip1(_arr) {
      this.$layer.alert(_arr[0])
      this.$store.state.tip.content = _arr
      this.showTip({
        tiptype: 2
      })
    },
    showTip(obj) {
      // alert(1)
      console.log(112233, obj.el);
      // window.scrollTo(0, 0)
      var tiptype = obj.tiptype
      var el = ''

      if (tiptype == 1) { //̾?ŵ???ʹ?
        var filetype = obj.fileType
        for (var i = 0; i < this.$store.state.tip.FileTipArr.length; i++) {
          if (filetype == this.$store.state.tip.FileTipArr[i].FileType) {

            this.$store.state.tip.content = this.$store.state.tip.FileTipArr[i].Content
            // alert(tiptype+" "+filetype+"  "+ this.$store.state.tip.FileTipArr[i].Content)
            this.$root.eventHub.$emit('SHOW_TIP', {
              tiptype: tiptype,
              // messageArr: messagenumArr
            });
            break;
          }
        }
      } else { //??????ʹ?
        this.$root.eventHub.$emit('SHOW_TIP', {
          tiptype: tiptype
          // messageArr: messagenumArr
        });
      }
    },



    removeClass(obj, cls) {
      var removed
      var obj_class = ' ' + obj.className + ' '; //??? class ??, ????β????????ո? ex) 'abc    bcd' -> ' abc    bcd '
      obj_class = obj_class.replace(/(\s+)/gi, ' '), //???????ַ??????????ո? ex) ' abc    bcd ' -> ' abc bcd '
        removed = obj_class.replace(' ' + cls + ' ', ' '); //?ԭ????class ?????????˿ո? class. ex) ' abc bcd ' -> 'bcd '
      removed = removed.replace(/(^\s+)|(\s+$)/g, ''); //ȥ?????ո? ex) 'bcd ' -> 'bcd'
      obj.className = removed; //???ԭ????class.
    },
    addClass(obj, cls) {
      var obj_class = obj.className, //??? class ??.
        blank = (obj_class != '') ? ' ' : ''; //??ϻ??????class ?????? ?????Ϊ??????Ӹ?'?ո?.
      var added = obj_class + blank + cls; //????????class ??????ӵ?class.
      obj.className = added; //???ԭ????class.
    },
    hasClass(obj, cls) {
      alert(obj);
      var obj_class = obj.className, //??? class ??.
        obj_class_lst = obj_class.split(/\s+/); //ͨ??split??ַ???clsת??????.
      var x = 0;
      for (x in obj_class_lst) {
        if (obj_class_lst[x] == cls) { //ѭ????, ???Ƿ???cls
          return true;
        }
      }
      return false;
    },
    getJson() {
      this.$http.get(this.$store.state.app.host + 'api/Wechat/GetArea', {
        params: {
          // visaId: this.$store.state.info.UserVisaId
          // versionId:7,
          // page: 53
        },
        headers: {
          Authorization: this.$store.state.app.token
        },
        timeout: this.$store.state.app.httpTime
        // emulateJSON:true
      }).then(
        function(res) {
          // console.log(res.data);
          this.$store.state.info.area = JSON.parse(res.data.Result)
          window.localStorage.setItem('area', res.data.Result)
        },
        function(err) {
          console.log('??ʱ');
        })
    },
    removeClass(obj, cls) {
      var removed
      var obj_class = ' ' + obj.className + ' '; //??? class ??, ????β????????ո? ex) 'abc    bcd' -> ' abc    bcd '
      obj_class = obj_class.replace(/(\s+)/gi, ' '), //???????ַ??????????ո? ex) ' abc    bcd ' -> ' abc bcd '
        removed = obj_class.replace(' ' + cls + ' ', ' '); //?ԭ????class ?????????˿ո? class. ex) ' abc bcd ' -> 'bcd '
      removed = removed.replace(/(^\s+)|(\s+$)/g, ''); //ȥ?????ո? ex) 'bcd ' -> 'bcd'
      obj.className = removed; //???ԭ????class.
    },
    addClass(obj, cls) {
      var obj_class = obj.className, //??? class ??.
        blank = (obj_class != '') ? ' ' : ''; //??ϻ??????class ?????? ?????Ϊ??????Ӹ?'?ո?.
      var added = obj_class + blank + cls; //????????class ??????ӵ?class.
      obj.className = added; //???ԭ????class.
    },
    hasClass(obj, cls) {
      var obj_class = obj.className, //??? class ??.
        obj_class_lst = obj_class.split(/\s+/); //ͨ??split??ַ???clsת??????.
      var x = 0;
      for (x in obj_class_lst) {
        if (obj_class_lst[x] == cls) { //ѭ????, ???Ƿ???cls
          return true;
        }
      }
      return false;
    },
    getJson() {
      this.$http.get(this.$store.state.app.host + 'api/Wechat/GetArea', {
        params: {
          // visaId: this.$store.state.info.UserVisaId
          // versionId:7,
          // page: 53
        },
        headers: {
          Authorization: this.$store.state.app.token
        },
        timeout: this.$store.state.app.httpTime
        // emulateJSON:true
      }).then(
        function(res) {
          // console.log(res.data);
          this.$store.state.info.area = JSON.parse(res.data.Result)
          window.localStorage.setItem('area', res.data.Result)
        },
        function(err) {
          console.log('网络连接超时');
        })
    },
    get(key) {
      return window.localStorage.getItem(key);
    },
    set(key, val) {
      window.localStorage.setItem(key, val);
    },
    remove(key) {
      window.localStorage.removeItem(key);
    },
    clearToken() {
      alert('clear')
    },
    infomationBtn(obj) {
      this.sinceJindu = this.$store.state.info.sinceJindu
      var id = window.localStorage.getItem('GroupId')

      var status = obj.status
      // alert(status)
      if (window.localStorage.getItem('CountryName').indexOf('EVUS') > -1) {
        this.jindu = [0, 1, 2, 3, 4, 6, 7, 8, 9]
        if (window.localStorage.getItem('showmodel') == '1') {
          this.jindu = [1, 2, 3, 4, 6, 7, 8]
        }
      } else {
        this.jindu = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        if (window.localStorage.getItem('showmodel') == '1') {
          this.jindu = [1, 2, 3, 4, 5, 6, 7, 8]
        }
      }
      if (window.localStorage.getItem('Iszhengjian') == 0) {

        for (var i = 0; i < this.jindu.length; i++) {
          if (this.jindu[i] == id) {
            this.sinceJindu = i
            break
          }
        }
      } else {
        if (window.localStorage.getItem('Iszhengjian') == 1) {
          this.sinceJindu = 0
        }
        if (window.localStorage.getItem('Iszhengjian') == 2) {
          this.sinceJindu = this.jindu.length - 1
        }
      }
      console.log(this.jindu);
      switch (status) {
        case 'prev':
          this.sinceJindu--;

          if (this.sinceJindu < 0) {
            this.sinceJindu = 0
          }
          break;
        case 'next':
          this.sinceJindu++;

          if (this.sinceJindu >= this.jindu.length) {
            this.sinceJindu = this.jindu.length - 1
          }
          break;

      }
      this.$store.state.info.sinceJindu = this.sinceJindu
      var _n = this.jindu[this.sinceJindu]
      console.log(_n, ',,,,,,,,,,,,,,');
      if (window.localStorage.getItem('showmodel') == '0') {

        if (_n == 0) {
          window.localStorage.setItem("Iszhengjian", 1)
          this.$root.eventHub.$emit("showzj", {
            groupid: 0,
            zj: 1
          })
        } else if (_n == 9) {
          window.localStorage.setItem("Iszhengjian", 2)

          this.$root.eventHub.$emit("showzj", {
            groupid: 0,
            zj: 2
          })
        } else {
          window.localStorage.setItem("Iszhengjian", 0)
          window.localStorage.setItem("GroupId", _n)
          this.$root.eventHub.$emit("showzj", {
            groupid: _n,
            zj: 0
          })
          this.$root.eventHub.$emit("CHANGEGROUP", {
            groupId: _n,
            zhengjian: 0
          })
        }
      } else {
        if (_n == 0) {
          return
        }
        window.localStorage.setItem("Iszhengjian", 0)
        window.localStorage.setItem("GroupId", _n)
        this.$root.eventHub.$emit("showzj", {
          groupid: _n,
          zj: 0
        })
        this.$root.eventHub.$emit("CHANGEGROUP", {
          groupId: _n,
          zhengjian: 0
        })
      }


    }

  },
  mounted: function() {

    this.$store.state.app.browser = this.myBrowser()
    // alert(this.$store.state.app.browser)
    window.localStorage.setItem('browser', this.$store.state.app.browser)
    // alert(window.localStorage.getItem('browser'))

    // alert(window.localStorage.getItem('browser'))
    // this.getJson()
    // console.log(document.body);
    // document.body.addEventListener('onunload', this.clearToken())
  }
})
