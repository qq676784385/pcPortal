<template lang="html">
  <div class="applyTableInfo">
    <!-- <div id="tianbiao_wrapper">
      <div id="tianbiao_scroller"> -->
        <div class="page1">
        </div>
      <!-- </div> -->
    <!-- </div> -->

    <div class="column1">
          <!-- <div class="btn btn2" @click='previousData'>
            上一步
          </div> -->
          <div class="x_btn prevBtn" v-tap='{methods:saveData,status:"prev"}'><</div>
          <div class="x_btn" v-tap='{methods:saveData,status:""}'>
            保 存
          </div>
          <div class="x_btn nextBtn" v-tap='{methods:saveData,status:"next"}'>></div>
        </div>
    <!-- <div class="page" v-if='showTip'> -->
      <div class="page" v-if='false'>
        <div class="tipcolumn1">
          <!-- <div class="column21">
            <span class="title">温馨提示</span>
            <span class="content"></span>
          </div> -->
          <div class="tip_title">
            温馨提示
          </div>
          <div class="tip_cont">
            您还有信息没有填写完整，点击“确认”保存信息并离开当前页面，点击“取消”继续填写。
          </div>
          <div class="tip_btn">
            <div class="submit" v-tap='{methods:quedingBtn}'>
               确认
            </div>
            <div class="cancel" v-tap="{methods:cancelBtn}">
               取消
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import '../../js/mobiscroll.2.13.2.js'
// import '../../js/mobiscroll.custom-2.17.0.min.js'
export default {
  props: ['updata'],
  data() {
    return {
      // tanhao: false,
      mask1: '',
      mask2: '',
      mask3: '',
      mask4: '',
      showTip: false,
      area1: [],
      area2: [],
      level: 0,
      dd: -1,
      dataObj: [],
      arr: [],
      geolocation: [
        ["", ""],
        ["CN", "中国"],
        ["AO", "安哥拉"],
        ["AF", "阿富汗"],
        ["AL", "阿尔巴尼亚"],
        ["DZ", "阿尔及利亚"],
        ["AD", "安道尔共和国"],
        ["AI", "安圭拉岛"],
        ["AG", "安提瓜和巴布达"],
        ["AR", "阿根廷"],
        ["AM", "亚美尼亚"],
        ["AU", "澳大利亚"],
        ["AT", "奥地利"],
        ["AZ", "阿塞拜疆"],
        ["BS", "巴哈马"],
        ["BH", "巴林"],
        ["BD", "孟加拉国"],
        ["BB", "巴巴多斯"],
        ["BY", "白俄罗斯"],
        ["BE", "比利时"],
        ["BZ", "伯利兹"],
        ["BJ", "贝宁"],
        ["BM", "百慕大群岛"],
        ["BO", "玻利维亚"],
        ["BW", "博茨瓦纳"],
        ["BR", "巴西"],
        ["BN", "文莱"],
        ["BG", "保加利亚"],
        ["BF", "布基纳法索"],
        ["MM", "缅甸"],
        ["BI", "布隆迪"],
        ["CM", "喀麦隆"],
        ["CA", "加拿大"],
        ["CF", "中非共和国"],
        ["TD", "乍得"],
        ["CL", "智利"],
        ["CO", "哥伦比亚"],
        ["CG", "刚果"],
        ["CK", "库克群岛"],
        ["CR", "哥斯达黎加"],
        ["CU", "古巴"],
        ["CY", "塞浦路斯"],
        ["CZ", "捷克"],
        ["DK", "丹麦"],
        ["DJ", "吉布提"],
        ["DO", "多米尼加共和国"],
        ["EC", "厄瓜多尔"],
        ["EG", "埃及"],
        ["SV", "萨尔瓦多"],
        ["EE", "爱沙尼亚"],
        ["ET", "埃塞俄比亚"],
        ["FJ", "斐济"],
        ["FI", "芬兰"],
        ["FR", "法国"],
        ["GF", "法属圭亚那"],
        ["GA", "加蓬"],
        ["GM", "冈比亚"],
        ["GE", "格鲁吉亚"],
        ["DE", "德国"],
        ["GH", "加纳"],
        ["GI", "直布罗陀"],
        ["GR", "希腊"],
        ["GD", "格林纳达"],
        ["GU", "关岛"],
        ["GT", "危地马拉"],
        ["GN", "几内亚"],
        ["GY", "圭亚那"],
        ["HT", "海地"],
        ["HN", "洪都拉斯"],
        ["HU", "匈牙利"],
        ["IS", "冰岛"],
        ["IN", "印度"],
        ["ID", "印度尼西亚"],
        ["IR", "伊朗"],
        ["IQ", "伊拉克"],
        ["IE", "爱尔兰"],
        ["IL", "以色列"],
        ["IT", "意大利"],
        ["JM", "牙买加"],
        ["JP", "日本"],
        ["JO", "约旦"],
        ["KH", "柬埔寨"],
        ["KZ", "哈萨克斯坦"],
        ["KE", "肯尼亚"],
        ["KR", "韩国"],
        ["KW", "科威特"],
        ["KG", "吉尔吉斯坦"],
        ["LA", "老挝"],
        ["LV", "拉脱维亚"],
        ["LB", "黎巴嫩"],
        ["LS", "莱索托"],
        ["LR", "利比里亚"],
        ["LY", "利比亚"],
        ["LI", "列支敦士登"],
        ["LT", "立陶宛"],
        ["LU", "卢森堡"],
        ["MG", "马达加斯加"],
        ["MW", "马拉维"],
        ["MY", "马来西亚"],
        ["MV", "马尔代夫"],
        ["ML", "马里"],
        ["MT", "马耳他"],
        ["MU", "毛里求斯"],
        ["MX", "墨西哥"],
        ["MD", "摩尔多瓦"],
        ["MC", "摩纳哥"],
        ["MN", "蒙古"],
        ["MS", "蒙特塞拉特岛"],
        ["MA", "摩洛哥"],
        ["MZ", "莫桑比克"],
        ["NA", "纳米比亚"],
        ["NR", "瑙鲁"],
        ["NP", "尼泊尔"],
        ["NL", "荷兰"],
        ["NZ", "新西兰"],
        ["NI", "尼加拉瓜"],
        ["NE", "尼日尔"],
        ["NG", "尼日利亚"],
        ["KP", "朝鲜"],
        ["NO", "挪威"],
        ["OM", "阿曼"],
        ["PK", "巴基斯坦"],
        ["PA", "巴拿马"],
        ["PG", "巴布亚新几内亚"],
        ["PY", "巴拉圭"],
        ["PE", "秘鲁"],
        ["PH", "菲律宾"],
        ["PL", "波兰"],
        ["PF", "法属玻利尼西亚"],
        ["PT", "葡萄牙"],
        ["PR", "波多黎各"],
        ["QA", "卡塔尔"],
        ["RO", "罗马尼亚"],
        ["RU", "俄罗斯"],
        ["LC", "圣卢西亚"],
        ["VC", "圣文森特岛"],
        ["SM", "圣马力诺"],
        ["ST", "圣多美和普林西比"],
        ["SA", "沙特阿拉伯"],
        ["SN", "塞内加尔"],
        ["SC", "塞舌尔"],
        ["SL", "塞拉利昂"],
        ["SG", "新加坡"],
        ["SK", "斯洛伐克"],
        ["SI", "斯洛文尼亚"],
        ["SB", "所罗门群岛"],
        ["SO", "索马里"],
        ["ZA", "南非"],
        ["ES", "西班牙"],
        ["LK", "斯里兰卡"],
        ["SD", "苏丹"],
        ["SR", "苏里南"],
        ["SZ", "斯威士兰"],
        ["SE", "瑞典"],
        ["CH", "瑞士"],
        ["SY", "叙利亚"],
        ["TJ", "塔吉克斯坦"],
        ["TZ", "坦桑尼亚"],
        ["TH", "泰国"],
        ["TG", "多哥"],
        ["TO", "汤加"],
        ["TT", "特立尼达和多巴哥"],
        ["TN", "突尼斯"],
        ["TR", "土耳其"],
        ["TM", "土库曼斯坦"],
        ["UG", "乌干达"],
        ["UA", "乌克兰"],
        ["AE", "阿拉伯联合酋长国"],
        ["GB", "英国"],
        ["US", "美国"],
        ["UY", "乌拉圭"],
        ["UZ", "乌兹别克斯坦"],
        ["VE", "委内瑞拉"],
        ["VN", "越南"],
        ["YE", "也门"],
        ["YU", "南斯拉夫"],
        ["ZW", "津巴布韦"],
        ["ZR", "扎伊尔"],
        ["ZM", "赞比亚"]
      ]
    }
  },
  updata() {
    console.log(this.updata);
  },
  created: function() {
    // alert(this.updata)
    this.$store.state.app.token = window.localStorage.getItem('Token')
    this.$store.state.info.UserVisaId = window.localStorage.getItem('UserVisaId')
    // alert(this.$store.state.app.token)
    // if (this.$store.state.info.UserVisaId == '') {
    this.$store.state.info.UserVisaId = window.localStorage.getItem('UserVisaId')
    // }
    // if (this.$store.state.info.GroupID == '') {
    // this.$store.state.info.GroupID = window.localStorage.getItem('GroupID')
    // if (this.$store.state.info.GroupID == null) {
    //   this.$store.state.info.GroupID = 1
    // }
    // alert(this.$store.state.info.GroupID)
    // }
    // if (this.$store.state.app.token == '') {
    //
    //   this.$store.state.app.token = window.localStorage.getItem('token')
    //
    // }
    this.area = JSON.parse(window.localStorage.getItem('area'))
    this.$store.state.info.area = this.data


  },
  methods: {
    myScroll() {
      // var myScroll;
      this.my_Scroll = new IScroll('#tianbiao_wrapper', {
        bounce: false,
        useTransform: true,
        scrollbars: true,
        preventDefault: true
      });
    },
    click1(element, type) {
      var event;
      if (document.createEventObject) {
        event = document.createEventObject();
        return element.fireEvent('on' + type, event);
      } else {
        event = document.createEvent('HTMLEvents');
        event.eventName = type;
        event.initEvent(type, true, true);
        return !element.dispatchEvent(event);
      }
    },


    getarea1(str) {
      this.area1 = []
      if (str == '中国') {
        this.area1 = [""]
        //// console.log(this.area);
        for (var i = 0; i < this.area.data.length; i++) {
          this.area1.push(this.area.data[i].province)
        }
      }
      return this.area1
    },
    getarea2(str) {
      this.area2 = []
      for (var i = 0; i < this.area.data.length; i++) {
        if (this.area.data[i].province == str) {
          this.area2 = JSON.parse(JSON.stringify(this.area.data[i].city))
          this.area2.unshift("")
          break;
        }
      }
      return this.area2
    },
    vforArray(arr, e) {

      var _arr
      if (this.dd >= 0) {
        _arr = arr[this.dd]
      } else {
        _arr = arr
      }
      var _type = Object.prototype.toString.call(_arr)

      //console.log(_arr);
      // this.$set(this.vforArray(arr,e),0,_arr)
      return _type.indexOf('Array') > -1 ? _arr : [_arr]
    },


    getGroupListInfo(id) {
      // console.log( this.$root.crossLogin());
      this.$http.get(this.$store.state.app.host + 'api/Wechat/NeedGroupInfo', {

        params: {
          userVisaId: this.$store.state.info.UserVisaId,
          groupId: this.$store.state.info.GroupID
          // userVisaId:6,
          // groupId: id
        },
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          //console.log(res.data.Result.ShowTagInfo);
          var el = document.getElementsByClassName('page1')[0]
          el.innerHTML = ""
          var that = this
          this.createDom(el, res.data.Result.ShowTagInfo, this.level)
          // var t = setTimeout(function() {
          //   that.my_Scroll.refresh()
          //
          // }, 50);
          // this.dataObj = res.data.Result.ShowTagInfo
          // this.dataProcess(res.data.Result.ShowTagInfo)
          // this.btnlist = res.data.Result
          // this.$store.state.info.GroupList =  res.data.Result
          // var _arr = []
          // for (var i = 0; i < res.data.Result.length; i++) {
          //     _arr.push(JSON.stringify(res.data.Result[i])); //storage是外部定义的数组  storage = []
          // }
          // window.localStorage.setItem('GroupList',JSON.stringify(_arr))

        },
        function(err) {
          //console.log('超时');
        })
    },
    createDom(parentEl, objArr, level) {


      // //console.log(parentEl, objArr,level);
      // if(level>0){
      //   for (var i = 0; i < objArr.length; i++) {
      //       for (var j = 0; j < objArr[i].length; j++) {
      //     this.dom(parentEl, objArr[i][j],level)
      //   }
      //   }
      // }else{
      //   for (var i = 0; i < objArr.length; i++) {
      //     this.dom(parentEl, objArr[i],level)
      //   }
      //
      // }
      for (var i = 0; i < objArr.length; i++) {
        // if(objArr[i].Tag.indexOf('GP')>-1){
        //   this.specialDom(parentEl,objArr[i].Children,level)
        // }else{
        // console.log(i,objArr[i].Tag);

        this.dom(parentEl, objArr[i], level)
        // }
      }
    },
    clickDatedom(e, type) {
      // e.target.style.display = 'none';
      var el = e.currentTarget.getElementsByClassName('datainput')[0]

      var ele = e.currentTarget.getElementsByClassName('value')[0]
      var elkey = e.currentTarget.getElementsByClassName('key')[0]
      var that = this

      // if (this.$store.state.app.mobileType == 'Android') {
      //
      //   if (obj.FieldType == 1) {
      //     $(Div_downline).mobiscroll().date({
      //       theme: 'material',
      //       display: 'bubble',
      //       defaultValue: new Date(2017, 1, 1),
      //       // startYear:currYear,
      //       // endYear:currYear+10,
      //       dateFormat: "yyyymmdd",
      //       dateOrder: "yyyymmdd",
      //       onClose: function(event, inst) {
      //         console.log(event,inst);
      //         // info.ValueCHS = event
      //         // info.ValueENG = event
      //         // that.VerifyTypeFun(info, info.VerifyType, true)
      //       }
      //     });
      //   }
      //   if (obj.FieldType == 6) {
      //     $(Div_downline).mobiscroll().date({
      //       theme: 'material',
      //       display: 'bubble',
      //       defaultValue: new Date(2017, 1, 1),
      //       // startYear:currYear,
      //       // endYear:currYear+10,
      //       dateFormat: "yyyymm",
      //       dateOrder: "yyyymm",
      //       onClose: function(event, inst) {
      //         console.log(event,inst);
      //         // info.ValueCHS = event
      //         // info.ValueENG = event
      //         // that.VerifyTypeFun(info, info.VerifyType, true)
      //       }
      //     });
      //   }
      // }

      if (this.$store.state.app.mobileType == 'ios') {
        // console.log('获得了焦点IOS');
        el.focus()
        el.click()
        //// console.log(el.change==='function','<<<<<,');
        var myEvent = 'blur'
        el.addEventListener(myEvent, function() {
          ele.innerHTML = el.value
          if (type == 1 || type == 3 || type == 6 || type == 7 || type == 8) {
            that.VerifyTypeFun(elkey, ele, type)
          }
        }, false)

      }
      // el.click()
      //console.log(el, ele);

      // if (e.target.value != '') {
      //   el.value = e.target.value
      // }
      // this.passportlist[index].value = e.target.value
    },
    clickdom(e, option, options) {
      //
      // // //console.log(option)
      // //// console.log(e.currentTarget.getElementsByClassName('value')[0].innerHTML);
      // //// console.log(options);
      // var index = 0
      // for (var i = 0; i < options.length; i++) {
      //   if (e.currentTarget.getElementsByClassName('value')[0].innerHTML == options[i].Value) {
      //     index = i;
      //     break;
      //   }
      // }
      //// console.log(index, 'l');
      //// console.log(e.currentTarget.getElementsByClassName('select')[0]);
      // var seleEl = e.currentTarget.getElementsByClassName('select')[0]
      // // seleEl[index].selected = true
      //// console.log(e.currentTarget.getElementsByClassName('select')[0].childNodes.length);
      // if (e.currentTarget.getElementsByClassName('select')[0].childNodes.length == 0) {
      //   return
      // } else {
      //
      //   if (option) {
      //     var el = e.currentTarget.getElementsByClassName('select')[0]
      //     // //console.log(el);
      //     el.focus()
      //     el.click()
      //     // this.click1(el,'click')
      //   } else {
      //
      //     var el = e.currentTarget.getElementsByClassName('value')[0]
      //     // //console.log(el);
      //     el.focus()
      //     el.click()
      //   }
      // }




      // //console.log(option)
      //// console.log(e.currentTarget.getElementsByClassName('value')[0].innerHTML);
      //// console.log(options);
      if (options != null) {

        var index = 0
        for (var i = 0; i < options.length; i++) {
          if (e.currentTarget.getElementsByClassName('value')[0].innerHTML == options[i].Value) {
            index = i;
            break;
          }
        }
        var seleEl = e.currentTarget.getElementsByClassName('select')[0]
        if (this.$store.state.app.mobileType == 'Android') {
          // seleEl[index].selected = true
        }
      }

      //// console.log(index, 'l');
      //// console.log(e.currentTarget.getElementsByClassName('select')[0]);
      //// console.log(seleEl,'===');
      //// console.log(e.currentTarget.getElementsByClassName('select')[0].childNodes.length);
      //// console.log(e.currentTarget.getElementsByClassName('select')[0]);
      if (e.currentTarget.getElementsByClassName('select')[0] != undefined) {
        if (e.currentTarget.getElementsByClassName('select')[0].childNodes.length == 0) {
          return
        } else {

          if (option) {
            var el = e.currentTarget.getElementsByClassName('select')[0]
            // //console.log(el);
            // this.click1('el','focus')
            // this.click1('el','click')
            el.focus()
            el.click()

            // this.click1(el,'click')
          } else {

            var el = e.currentTarget.getElementsByClassName('value')[0]
            // //console.log(el);

            el.focus()
            el.click()
          }
        }
      } else {
        if (option) {
          var el = e.currentTarget.getElementsByClassName('select')[0]
          // //console.log(el);
          // this.click1('el','focus')
          // this.click1('el','click')
          el.focus()
          el.click()
          // this.click1(el,'click')
        } else {

          var el = e.currentTarget.getElementsByClassName('value')[0]
          // console.log(e.currentTarget.parentNode.getAttribute('id'));

          if (e.currentTarget.parentNode.getAttribute('id') == 'HZ001901') {

          } else {
            el.focus()
            el.click()
          }
        }
      }


    },
    specialDom(parentEl, obj, level, icon, click) {
      //console.log(obj);
      // if (parentEl.getElementsByClassName('Div_childer')[0] != undefined) {
      //   parentEl.removeChild(parentEl.getElementsByClassName('Div_childer')[0])
      //   if (this.$root.hasClass(icon, 'rotate')) {
      //     this.$root.removeClass(icon, 'rotate');
      //   }
      // } else {
      //   this.$root.addClass(icon, 'rotate');
      //   var Div_childer = document.createElement('div');
      //   this.$root.addClass(Div_childer, 'Div_childer');
      //
      //   parentEl.appendChild(Div_childer)
      //   var arr = []
      //   for (var i = 0; i < obj.length; i++) {
      //     for (var j = 0; j < obj[i].length; j++) {
      //       arr.push(obj[i][j])
      //     }
      //   }
      //   this.createDom(Div_childer, arr, ++level)
      // }

      // console.log(!this.$root.hasClass(icon, 'rotate'),'<<<<<');
      if (this.$root.hasClass(icon, 'rotate')) {
        // console.log(111);
        // var Div_childer = document.createElement('div');
        // this.$root.addClass(Div_childer, 'Div_childer');
        if (this.$root.hasClass(icon, 'rotate')) {
          this.$root.removeClass(icon, 'rotate');
        }
        var Div_childer = parentEl.getElementsByClassName('Div_childer')[0]
        // Div_childer.innerHTML=''
        // console.log(click, '<<<<<');
        // 内容不可以收起来
        // Div_childer.style.display = 'none';
        // for (var i = 0; i < Div_childer.childNodes.length; i++) {
        //   Div_childer.childNodes[i].setAttribute('display','none')
        // }
        // for (var i = 0; i < Div_childer.childNodes.length; i++) {
        //   array[i]
        // }

      } else {
        // parentEl.removeChild(parentEl.getElementsByClassName('Div_childer')[0])
        // console.log(11);
        this.$root.addClass(icon, 'rotate');
        if (click) {

          // for (var i = 0; i < Div_childer.childNodes.length; i++) {
          //   Div_childer.childNodes[i].setAttribute('display','inline-block')
          // }
          var Div_childer = parentEl.getElementsByClassName('Div_childer')[0]
          Div_childer.style.display = 'block';
        } else {
          var arr = []
          for (var i = 0; i < obj.length; i++) {
            for (var j = 0; j < obj[i].length; j++) {
              arr.push(obj[i][j])
            }
          }
          var Div_childer = parentEl.getElementsByClassName('Div_childer')[0]
          this.createDom(Div_childer, arr, ++level)
          //  Div_childer.style.display = 'block';
        }



      }
      //   parentEl.removeChild(parentEl.getElementsByClassName('Div_childer')[0])
      //   if (this.$root.hasClass(icon, 'rotate')) {
      //     this.$root.removeClass(icon, 'rotate');
      //   }
      // } else {
      //   this.$root.addClass(icon, 'rotate');
      // }

    },
    dom(el, obj, level) {

      if (el.parentNode.getAttribute('id') != null) {
        if (el.parentNode.getAttribute('id').indexOf('_000_') > -1) {
          // console.log();
          if (obj.Tag.indexOf('000') < 0) {
            obj.Tag = obj.Tag + '_000_' + el.parentNode.getAttribute('id').split('_')[el.parentNode.getAttribute('id').split('_').length - 1]
          }
          if (obj.DependFieldTag != null) {
            if (obj.DependFieldTag.indexOf('000') < 0) {
              obj.DependFieldTag = obj.DependFieldTag + '_000_' + el.parentNode.getAttribute('id').split('_')[2]
            }
          }
        }
      }


      var that = this
      var Div_info = document.createElement('div');
      this.$root.addClass(Div_info, 'info');
      Div_info.id = obj.Tag
      Div_info.setAttribute('FieldId', obj.FieldId)
      if (obj.DependFieldTag != null) {
        Div_info.setAttribute('DependFieldTag', obj.DependFieldTag)
      }
      if (level > 0) {
        this.$root.addClass(Div_info, 'suojin');
      }
      Div_info.innerHTML = '';





      var Div_downline = document.createElement('div');
      this.$root.addClass(Div_downline, 'downline');
      // Div_downline.onclick=this.clickdom()
      Div_downline.innerHTML = '';
      var Div_key = document.createElement('div');
      this.$root.addClass(Div_key, 'key');
      Div_key.innerHTML = obj.title;
      if (obj.Tag == 'HZ001901') { //美国EVUS 签证号 添加图片TIP 提示
        Div_key.innerHTML = Div_key.innerHTML + '' + '&nbsp;&nbsp;'
        var Div_i = document.createElement('i')
        var Div_i_div = document.createElement('div')
        Div_key.appendChild(Div_i_div)
        Div_i_div.appendChild(Div_i)
        this.$root.addClass(Div_i_div, 'div_i');
        this.$root.addClass(Div_i, 'icon icon-tanhao tanhao');
        Div_i.addEventListener('click', function() {
          // that.tanhao = true;
          that.$root.showImgTip({
            "msg": '美国EVUS签证号'
          })
          // that.tanhao = false;
        })
      }



      var Div_value
      if (obj.FieldType == 0) { //无
        Div_value = document.createElement('div');
        this.$root.addClass(Div_value, 'value');
      }
      if (obj.FieldType == 1) { //日期 年月日
        // alert(1)
        Div_value = document.createElement('div');
        // Div_value.type = 'data'
        this.$root.addClass(Div_value, 'value');
        var div_input = document.createElement('input');
        if (window.localStorage.getItem('browser') != 'IE') {
          div_input.type = 'date' //Ie 不支持 date 属性
        }
        // alert(2)
        this.$root.addClass(div_input, 'datainput');
      }
      if (obj.FieldType == 6) { //日期  年月
        Div_value = document.createElement('div');
        // Div_value.type = 'data'
        this.$root.addClass(Div_value, 'value');
        var div_input = document.createElement('input');
        if (window.localStorage.getItem('browser') != 'IE') {
          div_input.type = 'month'
        }
        this.$root.addClass(div_input, 'datainput');
      }
      if (obj.FieldType == 2) { //国家
        Div_value = document.createElement('div');
        this.$root.addClass(Div_value, 'value');
      }
      if (obj.FieldType == 3) { //省市
        Div_value = document.createElement('div');
        this.$root.addClass(Div_value, 'value');
      }
      if (obj.FieldType == 4) { //二级市
        Div_value = document.createElement('div');
        this.$root.addClass(Div_value, 'value');
      }
      if (obj.FieldType == 5) { //数字
        Div_value = document.createElement('input');
        // if (window.localStorage.getItem('browser') != 'IE') {
        Div_value.type = 'number'
        Div_value.min = '0'
        // }
        this.$root.addClass(Div_value, 'value');
      }
      //// console.log(Div_value.type, obj.Value);

      if (obj.Value == null || obj.Value == '') {
        if (obj.DefaultValue != null) {
          Div_value.innerHTML = String(obj.DefaultValue).split('|')[0];
        } else {

          Div_value.innerHTML = obj.Value == null ? '' : '';
        }
      } else {
        console.log(obj.Value);
        Div_value.innerHTML = obj.Value;
      }
      if (Div_value.type == 'number') {
        Div_value.value = obj.Value;
      }
      ///

      ///???///
      var Div_i = document.createElement('i');
      this.$root.addClass(Div_i, 'icon icon-you you');
      var Div_triangle = document.createElement('div');
      this.$root.addClass(Div_triangle, 'triangle');
      Div_triangle.innerHTML = '';
      var Div_select = document.createElement('select');
      Div_select.setAttribute('onchange', 'this.blur()')
      // Div_select.addEventListener('change', function() {
      //
      // }
      // var myEvent = 'blur'
      // if(this.$store.state.app.mobileType == 'Android'){
      //   myEvent = 'change'
      // }
      // el.addEventListener(myEvent, function() {
      //
      // if (this.$store.state.app.mobileType == 'Android') {
      Div_select.addEventListener('click', function(event) {
        // //console.log(444,obj.Tag);
        that.optionBlur(event, Div_value, obj.Children, Div_info, level, obj.Tag, obj.Options, false)
        // alert(1)
      }, false)
      // }

      Div_select.addEventListener('blur', function(event) {
        // //console.log(444,obj.Tag);
        that.optionBlur(event, Div_value, obj.Children, Div_info, level, obj.Tag, obj.Options, false)
        // alert(1)
      }, false)
      this.$root.addClass(Div_select, 'select');
      Div_select.innerHTML = '';
      Div_downline.appendChild(Div_key)
      Div_downline.appendChild(Div_value)
      if (obj.Options != null) {
        Div_downline.appendChild(Div_triangle)
        Div_downline.appendChild(Div_select)
        this.optionDom(Div_select, obj.Options)
      } else {
        if (obj.FieldType == 2 || obj.FieldType == 3 || obj.FieldType == 4) {

          Div_downline.appendChild(Div_triangle)
          Div_downline.appendChild(Div_select)
          // if(obj.FieldType == 2){
          //  // console.log(obj.Tag);
          // }
          if (obj.FieldType == 2) {
            this.inputDom(Div_select, this.geolocation)

          }
          // console.log(obj.DependFieldTag);
          // console.log(document.getElementById(obj.DependFieldTag));
          if (obj.FieldType == 3) {
            // console.log(obj.DependFieldTag);
            // console.log(document.getElementById(obj.DependFieldTag));
            var contryvalue = document.getElementById(obj.DependFieldTag).getElementsByClassName('value')[0].innerHTML;
            // var cityvaluedom = document.getElementById(obj.Tag).getElementsByClassName('value')[0];
            // var citySanjiao = document.getElementById(obj.Tag).getElementsByClassName('triangle')[0]
            // var cityselect = document.getElementById(obj.Tag).getElementsByClassName('select')[0]

            if (contryvalue != '中国') {
              Div_triangle.style.opacity = 0;
              Div_value.contenteditable = true;
              Div_select.style.display = 'none';

            } else {
              Div_triangle.style.opacity = 1;
              Div_value.contentEditable = false;
              Div_select.style.display = 'inline-block';
              // Div_select.innerHTML = ''
              // Div_value.innerHTML = ''

              that.inputDom2(Div_select, that.getarea1(contryvalue))
            }
            // Div_value.addEventListener('click',function() {
            //  // console.log(111);
            // })
            var contrySelect = document.getElementById(obj.DependFieldTag).getElementsByClassName('select')[0];
            var that = this
            contrySelect.addEventListener('blur', function() {
              var contryvalue = document.getElementById(obj.DependFieldTag).getElementsByClassName('value')[0].innerHTML;
              if (Div_select.childNodes.length > 0) {
                Div_select.innerHTML = ''
                Div_value.innerHTML = ''
              }
              // that.click1(Div_select,'change')
              var cityvaluedom = document.getElementById(obj.Tag).getElementsByClassName('value')[0];
              var citySanjiao = document.getElementById(obj.Tag).getElementsByClassName('triangle')[0]
              var cityselect = document.getElementById(obj.Tag).getElementsByClassName('select')[0]
              if (contryvalue != '中国') {
                citySanjiao.style.opacity = 0;
                cityvaluedom.contentEditable = true;
                cityselect.style.display = 'none';
              } else {
                citySanjiao.style.opacity = 1;
                cityvaluedom.contentEditable = false;
                cityselect.style.display = 'inline-block';

              }

              Div_select.innerHTML = ''
              Div_value.innerHTML = ''

              //// console.log(contryvalue);
              that.inputDom2(Div_select, that.getarea1(contryvalue))
            })
          }
          if (obj.FieldType == 4) {

            var contryvalue = document.getElementById(document.getElementById(obj.DependFieldTag).getAttribute('DependFieldTag')).getElementsByClassName('value')[0].innerHTML;
            // var cityvaluedom = document.getElementById(obj.Tag).getElementsByClassName('value')[0];
            // var citySanjiao = document.getElementById(obj.Tag).getElementsByClassName('triangle')[0]
            // var cityselect = document.getElementById(obj.Tag).getElementsByClassName('select')[0]
            if (contryvalue != '中国') {
              Div_triangle.style.opacity = 0;
              Div_value.contentEditable = true;
              Div_select.style.display = 'none';
            } else {
              Div_triangle.style.opacity = 1;
              Div_value.contentEditable = false;
              Div_select.style.display = 'inline-block';
            }
            var cityvalue = document.getElementById(obj.DependFieldTag).getElementsByClassName('value')[0].innerHTML;
            that.inputDom2(Div_select, that.getarea2(cityvalue))

            var citySelect = document.getElementById(obj.DependFieldTag).getElementsByClassName('select')[0];
            var contrySelect = document.getElementById(document.getElementById(obj.DependFieldTag).getAttribute('DependFieldTag')).getElementsByClassName('select')[0];
            var that = this
            contrySelect.addEventListener('blur', function() {
              if (Div_select.childNodes.length > 0) {
                Div_select.innerHTML = ''
                Div_value.innerHTML = ''
              }
              var contryvalue = document.getElementById(document.getElementById(obj.DependFieldTag).getAttribute('DependFieldTag')).getElementsByClassName('value')[0].innerHTML;
              var cityvaluedom = document.getElementById(obj.Tag).getElementsByClassName('value')[0];
              var citySanjiao = document.getElementById(obj.Tag).getElementsByClassName('triangle')[0]
              var cityselect = document.getElementById(obj.Tag).getElementsByClassName('select')[0]
              if (contryvalue != '中国') {
                citySanjiao.style.opacity = 0;
                cityvaluedom.contentEditable = true;
                cityselect.style.display = 'none';
              } else {
                citySanjiao.style.opacity = 1;
                cityvaluedom.contentEditable = false;
                cityselect.style.display = 'inline-block';
              }
              Div_select.innerHTML = ''
              Div_value.innerHTML = ''
            })
            citySelect.addEventListener('blur', function() {
              var cityvalue = document.getElementById(obj.DependFieldTag).getElementsByClassName('value')[0].innerHTML;
              if (Div_select.childNodes.length > 0) {
                Div_select.innerHTML = ''
                Div_value.innerHTML = ''
              }
              that.inputDom2(Div_select, that.getarea2(cityvalue))
            })
          }
        } else if (obj.FieldType == 1 || obj.FieldType == 6) {
          Div_downline.appendChild(Div_triangle)
          Div_downline.appendChild(div_input)
        } else {
          Div_value.contentEditable = true;
          if (obj.VerifyType == 2 || obj.VerifyType == 4) {
            Div_value.addEventListener('blur', function(event) {
              //// console.log('表单失去焦点');
              // if(obj.VerifyType>0){
              that.VerifyTypeFun(Div_key, Div_value, obj.VerifyType)
              // }
              //// console.log(event.currentTarget.parentNode.parentNode);
            }, false)
          }



          // if(obj.VerifyType==1 || obj.VerifyType==3){
          //  // console.log('-----');
          //   div_input.addEventListener('change', function(event) {
          //     //// console.log('表单失去焦点');
          //     // if(obj.VerifyType>0){
          //       that.VerifyTypeFun(Div_key,Div_value,obj.VerifyType)
          //     // }
          //     //// console.log(event.currentTarget.parentNode.parentNode);
          //   }, false)
          // }
        }
      }
      Div_info.appendChild(Div_downline)
      el.appendChild(Div_info)

      if (obj.Tag == 'JB000605' && window.localStorage.getItem('showmodel') == '1') { //身份证有效期至 怎加长期选项
        var Div_inputS = document.createElement('input')
        var Div_inputLabel = document.createElement('label')
        var Div_inputSpan = document.createElement('span')
        this.$root.addClass(Div_inputLabel, 'checkbox')
        this.$root.addClass(Div_inputSpan, 'inputSpan')
        Div_inputS.addEventListener('click', function() {
          // alert(1)
          console.log(Div_inputS.checked);
          var el = document.getElementById('JB000605').children[0].children[1]

          if (Div_inputS.checked) {
            el.innerText = '长期'
          } else {
            el.innerText = ''
          }
        })
        var el = document.getElementById('JB000605').children[0].children[1]
        if (el.innerText == '长期') {
          Div_inputS.checked = true
        }
        Div_inputS.type = 'checkbox'
        Div_inputSpan.innerText = '长期'
        Div_inputLabel.appendChild(Div_inputS)
        Div_inputLabel.appendChild(Div_inputSpan)

        Div_info.appendChild(Div_inputLabel)
      }

      if (obj.Tag == 'JB000601' && window.localStorage.getItem('showmodel') == '1' && window.localStorage.getItem('CountryName') != '美国EVUS'&& window.localStorage.getItem('CountryName') != '英国') { //身份证有效期至 怎加长期选项
        var Div_inputS = document.createElement('input')
        var Div_inputLabel = document.createElement('label')
        var Div_inputSpan = document.createElement('span')
        this.$root.addClass(Div_inputLabel, 'checkbox')
        this.$root.addClass(Div_inputSpan, 'inputSpan')
        this.mask1 = document.createElement('div')
        that.$root.addClass(this.mask1, 'mask')
        this.mask2 = document.createElement('div')
        that.$root.addClass(this.mask2, 'mask')
        this.mask3 = document.createElement('div')
        that.$root.addClass(this.mask3, 'mask')
        this.mask4 = document.createElement('div')
        that.$root.addClass(this.mask4, 'mask')

        Div_inputS.addEventListener('click', function() {
          // console.log(el6);
          var el1 = document.getElementById('JB000603')
          var el2 = document.getElementById('JB000604')
          var el3 = document.getElementById('JB000605')
          var el4 = document.getElementById('JB000607')
          var el5 = document.getElementById('JB000605')
          if (Div_inputS.checked) {
            el1.children[0].children[1].innerText = '中国'
            el2.children[0].children[1].innerText = '长期'
            el3.children[0].children[1].innerText = '长期'
            el4.children[0].children[1].innerText = '公安局'
            el5.children[1].style.display = 'none'

            el1.appendChild(that.mask1);
            el2.appendChild(that.mask2);
            el3.appendChild(that.mask3);
            el4.appendChild(that.mask4);

            // el5.opacity = 0
          } else {
            el1.children[0].children[1].innerText = ''
            el2.children[0].children[1].innerText = ''
            el3.children[0].children[1].innerText = ''
            el4.children[0].children[1].innerText = ''
            el5.children[1].style.display = 'inline-block'
            el5.children[1].children[0].checked = false
            el1.removeChild(that.mask1);
            el2.removeChild(that.mask2);
            el3.removeChild(that.mask3);
            el4.removeChild(that.mask4);
          }

        })

        Div_inputS.type = 'checkbox'
        Div_inputSpan.innerText = '我小于18岁，尚未办理身份证'
        Div_inputLabel.appendChild(Div_inputS)
        Div_inputLabel.appendChild(Div_inputSpan)

        Div_info.appendChild(Div_inputLabel)
      }




      if (obj.Tag.indexOf('GP') > -1) {
        this.$root.addClass(Div_info, 'gray');
        Div_downline.appendChild(Div_i)
        Div_value.contentEditable = false
        Div_value.style.display = "none"
        this.$root.addClass(Div_key, 'key_GP');


        var Div_childer = document.createElement('div');
        this.$root.addClass(Div_childer, 'Div_childer');
        Div_info.appendChild(Div_childer);

        Div_downline.addEventListener("click", function() {
          that.specialDom(Div_info, obj.Children, level, Div_i, true)
        }, false);
        // this.optionBlur(event, Div_value, obj.Children, Div_info, level, obj.Tag, obj.Options,true)
        // var t = setTimeout(function () {
        // //console.log(obj.Children,'uuuuuuuuuuuuuu');
        that.specialDom(Div_info, obj.Children, level, Div_i, false)
        for (var i = 0; i < obj.Children.length; i++) {
          for (var j = 0; j < obj.Children[i].length; j++) {
            //// console.log(obj.Children);
            //// console.log(obj.Children[i][j].title, obj.Children[i][j].Value, 'fff', i, j);
            // if (obj.Children[i][j].Value == null || obj.Children[i][j].Value == '') {} else {
            // that.specialDom(Div_info, obj.Children, level, Div_i)
            // break;
            // }
          }
        }
        // }, 100);
      } else if (obj.FieldType == 2 || obj.FieldType == 3 || obj.FieldType == 4) {
        Div_downline.addEventListener("click", function(event) {
          return
          if (!obj.Disabled) {
            //PC中加入下面代码 SELECT 会清空。注释掉了。
            // that.clickdom(event, true, [])
          } else {
            //特殊处理身份证 提示
            if (obj.Tag == 'JB000603' || obj.Tag == 'JB000607' || obj.Tag == 'JB000604' || obj.Tag == 'JB000605') {
              if (window.localStorage.getItem('showmodel') == '1') {
                that.clickdom(event, true, [])
              } else {
                that.$root.showTip1(['请到"证件上传 - 身份证"处修改。'])
                // window.scrollTo(0, 0)
              }
            }
          }
        }, false);
      } else if (obj.FieldType == 1 || obj.FieldType == 6) {
        if (!obj.Disabled || obj.Tag == 'JB000605' && window.localStorage.getItem('showmodel') == '1' || obj.Tag == 'JB000604' && window.localStorage.getItem('showmodel') == '1') { //可以编辑的日期 再加日历功能
          // if (this.$store.state.app.mobileType == 'Android') {

          if (obj.FieldType == 1) {
            $(Div_downline).mobiscroll().date({
              theme: 'mobiscroll',
              display: 'bottom',
              lang: "zh",
              // height: 80,
              // width:100,
              // defaultValue: new Date(2017, 0, 1),//不写为当前日期
              // startYear:1949,//其实时间
              endYear: new Date().getFullYear() + 20,
              dateFormat: "yyyy-mm-dd",
              dateOrder: "yyyymmdd",
              onSelect: function(event, inst) {
                console.log(event, inst);
                var ele = Div_downline.getElementsByClassName('value')[0]
                var elkey = Div_downline.getElementsByClassName('key')[0]
                ele.innerHTML = event
                if (obj.VerifyType == 1 || obj.VerifyType == 3 || obj.VerifyType == 6 || obj.VerifyType == 7 || obj.VerifyType == 8) {
                  that.VerifyTypeFun(elkey, ele, obj.VerifyType)
                }
              }
            });
          }
          if (obj.FieldType == 6) {
            $(Div_downline).mobiscroll().date({
              theme: 'mobiscroll',
              display: 'bottom',
              lang: "zh",
              // height: 80,
              // width:200,
              // defaultValue: new Date(2017, 0, 1),//不写为当前日期
              // startYear:1949,//其实时间
              endYear: new Date().getFullYear() + 20,
              dateFormat: "yyyy-mm",
              dateOrder: "yyyymm",
              onSelect: function(event, inst) {
                // console.log(event, inst);
                var ele = Div_downline.getElementsByClassName('value')[0]
                var elkey = Div_downline.getElementsByClassName('key')[0]
                ele.innerHTML = event
                if (obj.VerifyType == 1 || obj.VerifyType == 3 || obj.VerifyType == 6 || obj.VerifyType == 7 || obj.VerifyType == 8) {
                  that.VerifyTypeFun(elkey, ele, obj.VerifyType)
                }
              }
            });
          }
          // }
        }
        Div_downline.addEventListener("click", function(event) {
          return
          if (!obj.Disabled) {

            that.clickDatedom(event, obj.VerifyType)
          } else {
            //特殊处理身份证 提示
            if (obj.Tag == 'JB000603' || obj.Tag == 'JB000607' || obj.Tag == 'JB000604' || obj.Tag == 'JB000605') {
              if (window.localStorage.getItem('showmodel') == '1') {
                that.clickDatedom(event, obj.VerifyType)
              } else {
                that.$root.showTip1(['请到"证件上传 - 身份证"处修改。'])
                // window.scrollTo(0, 0)
              }
            }
          }
        }, false);
      } else {

        Div_downline.addEventListener("click", function() {
          return

          if (!obj.Disabled) {
            //PC中加入下面代码 SELECT 会清空。注释掉了。
            // that.clickdom(event, obj.Options != null, obj.Options)
          } else {
            //特殊处理身份证 提示
            if (obj.Tag == 'JB000603' || obj.Tag == 'JB000607' || obj.Tag == 'JB000604' || obj.Tag == 'JB000605') {
              if (window.localStorage.getItem('showmodel') == '1') {
                that.clickdom(event, obj.Options != null, obj.Options)
              } else {
                that.$root.showTip1(['请到"证件上传 - 身份证"处修改。'])
                // window.scrollTo(0, 0)
              }
            }
          }
        }, false);

        //bollan 为TRUE 不需要 event ,下面的EVENT 为UNDEFINED  火狐下报错
        this.optionBlur('event', Div_value, obj.Children, Div_info, level, obj.Tag, obj.Options, true)
      }
      // if (this.$store.state.app.mobileType == 'Android') {
      if (!obj.Disabled) {
        /*Div_select.style.width = Div_downline.offsetWidth-162 + 'px'
        Div_select.style.height = Div_downline.offsetHeight + 'px'*/
        Div_select.style.width = Div_value.offsetWidth + "px"
        Div_select.style.height = Div_value.offsetHeight + "px"

      }
      // }
      if (obj.Disabled) {
        if (window.localStorage.getItem('showmodel') == '1') {
          if (obj.Tag == 'JB000603' || obj.Tag == 'JB000607' || obj.Tag == 'JB000604' || obj.Tag == 'JB000605') {
            // Div_select.style.display = 'inline-block'
            // Div_triangle.style.opacity = 1
            // Div_value.contentEditable = 'true'
          } else {

            Div_select.style.display = 'none'
            Div_triangle.style.opacity = 0
            Div_value.contentEditable = 'false'

            if (!this.$root.hasClass(Div_value, 'huise')) {
              this.$root.addClass(Div_value, 'huise')
            }
          }
        } else {
          Div_select.style.display = 'none'
          Div_triangle.style.opacity = 0
          Div_value.contentEditable = 'false'

          if (!this.$root.hasClass(Div_value, 'huise')) {
            this.$root.addClass(Div_value, 'huise')
          }
        }


      }


      if (obj.Tag == 'JB0013' && window.localStorage.getItem('showmodel') == '1') {
        this.mask1 = document.createElement('div')
        this.$root.addClass(this.mask1, 'mask')
        this.mask2 = document.createElement('div')
        this.$root.addClass(this.mask2, 'mask')
        this.mask3 = document.createElement('div')
        this.$root.addClass(this.mask3, 'mask')
        this.mask4 = document.createElement('div')
        this.$root.addClass(this.mask4, 'mask')

        var el1 = document.getElementById('JB000603')

        var el2 = document.getElementById('JB000604')
        var el3 = document.getElementById('JB000605')
        var el4 = document.getElementById('JB000607')
        var el5 = document.getElementById('JB000605')
        var el6 = document.getElementById('JB000601')
        if (el1.children[0].children[1].innerText == '中国' && el2.children[0].children[1].innerText == '长期' && el3.children[0].children[1].innerText == '长期' && el4.children[0].children[1].innerText == '公安局') {
          el1.appendChild(this.mask1);
          el2.appendChild(this.mask2);
          el3.appendChild(this.mask3);
          el4.appendChild(this.mask4);
          el5.children[1].style.display = 'none'
          el6.children[1].children[0].checked = true

        }
      }
      //// console.log(Div_select.offsetWidth,"11");

    },
    VerifyTypeFun(domKey, domValue, type) {
      //// console.log(type);
      // console.log('===========');
      if (type == 2) { //护照号码验证
        var reg = /^[A-Za-z0-9]{9}$/
        var value = domValue.innerHTML
        // if(domValue.type == 'number'){
        //   value = domValue.value
        // }
        if (value.match(reg) == null) {

          this.$root.showTip1(['请输入正确的护照号'])
          if (!this.$root.hasClass(domKey, 'red')) {
            this.$root.addClass(domKey, 'red')
          }
          if (!this.$root.hasClass(domValue, 'red')) {
            this.$root.addClass(domValue, 'red')
          }
          // window.scrollTo(0, 0)
        } else {
          if (this.$root.hasClass(domKey, 'red')) {
            this.$root.removeClass(domKey, 'red')
          }
          if (this.$root.hasClass(domValue, 'red')) {
            this.$root.removeClass(domValue, 'red')
          }
        }
      }

      if (type == 4) { //邮箱验证

        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        var value = domValue.innerText
        value = value.replace(/\n/g, '')
        domValue.innerText = value
        // if(domValue.type == 'number'){
        //   value = domValue.value
        // }
        if (value.match(reg) == null) {
          this.$root.showTip1(['请输入正确的邮箱格式'])
          if (!this.$root.hasClass(domKey, 'red')) {
            this.$root.addClass(domKey, 'red')
          }
          if (!this.$root.hasClass(domValue, 'red')) {
            this.$root.addClass(domValue, 'red')
          }
          // window.scrollTo(0, 0)
        } else {
          if (this.$root.hasClass(domKey, 'red')) {
            this.$root.removeClass(domKey, 'red')
          }
          if (this.$root.hasClass(domValue, 'red')) {
            this.$root.removeClass(domValue, 'red')
          }
        }
      }



      if (type == 1) { //身份证有效期
        // console.log(domValue.innerHTML);
        if (this.$root.verifyDay(domValue.innerHTML) < 180) {

          this.$root.showTip1(['您的身份证有效期已不满六个月，请到相应机构办理新的身份证后再进行办理。'])
          if (!this.$root.hasClass(domKey, 'red')) {
            this.$root.addClass(domKey, 'red')
          }
          if (!this.$root.hasClass(domValue, 'red')) {
            this.$root.addClass(domValue, 'red')
          }
          // window.scrollTo(0, 0)
        } else {
          if (this.$root.hasClass(domKey, 'red')) {
            this.$root.removeClass(domKey, 'red')
          }
          if (this.$root.hasClass(domValue, 'red')) {
            this.$root.removeClass(domValue, 'red')
          }
        }
      }
      if (type == 3) { //护照有效期
        //// console.log(domValue.innerHTML);
        if (this.$root.verifyDay(domValue.innerHTML) < 180) {
          this.$root.showTip1(['您的护照有效期已不满六个月，请到相应机构换发新护照后再进行办理，并留出充足的签证办理时间，以免耽误您的出行。'])
          if (!this.$root.hasClass(domKey, 'red')) {
            this.$root.addClass(domKey, 'red')
          }
          if (!this.$root.hasClass(domValue, 'red')) {
            this.$root.addClass(domValue, 'red')
          }
          // window.scrollTo(0, 0)
        } else {
          if (this.$root.hasClass(domKey, 'red')) {
            this.$root.removeClass(domKey, 'red')
          }
          if (this.$root.hasClass(domValue, 'red')) {
            this.$root.removeClass(domValue, 'red')
          }
        }
      }
      if (type == 6) { //出发日期不能为今天及以前
        //// console.log(domValue.innerHTML);
        if (this.$root.verifyDay(domValue.innerHTML) <= 0) {
          this.$root.showTip1(['出发日期不能为今天及以前的日期，请选择正确日期。'])
          if (!this.$root.hasClass(domKey, 'red')) {
            this.$root.addClass(domKey, 'red')
          }
          if (!this.$root.hasClass(domValue, 'red')) {
            this.$root.addClass(domValue, 'red')
          }
          // window.scrollTo(0, 0)
        } else if (this.$root.verifyDay(domValue.innerHTML) > 0 && this.$root.verifyDay(domValue.innerHTML) <= 45) {
          this.$root.showTip1(['如果您办理的是普通签证，请预留出至少45个工作日的签证办理时间；', '如果您办理的是绿通签证，请预留出至少10个工作日的签证办理时间。'])
          if (!this.$root.hasClass(domKey, 'red')) {
            this.$root.addClass(domKey, 'red')
          }
          if (!this.$root.hasClass(domValue, 'red')) {
            this.$root.addClass(domValue, 'red')
          }
          // window.scrollTo(0, 0)
        } else {
          if (this.$root.hasClass(domKey, 'red')) {
            this.$root.removeClass(domKey, 'red')
          }
          if (this.$root.hasClass(domValue, 'red')) {
            this.$root.removeClass(domValue, 'red')
          }
        }
      }
      if (type == 7) { //回国日期不能为出行日期及以前
        //// console.log(domValue.innerHTML);
        if (this.$root.verifyDay(domValue.innerHTML) <= 0) {
          this.$root.showTip1(['回国日期不能为出发日期当天及以前的日期，请选择正确日期。'])
          if (!this.$root.hasClass(domKey, 'red')) {
            this.$root.addClass(domKey, 'red')
          }
          if (!this.$root.hasClass(domValue, 'red')) {
            this.$root.addClass(domValue, 'red')
          }
          // window.scrollTo(0, 0)
        } else {
          var goDate = ''
          if (window.localStorage.getItem('CountryName') == '澳大利亚') {
            goDate = document.getElementById('LX000801').getElementsByClassName('value')[0].innerHTML
          }
          if (window.localStorage.getItem('CountryName') == '英国') {
            goDate = document.getElementById('LXUK01').getElementsByClassName('value')[0].innerHTML
          }
          if (window.localStorage.getItem('CountryName') == '新西兰') {
            goDate = document.getElementById('LX000803').getElementsByClassName('value')[0].innerHTML
          }
          if (this.$root.verifyDay1(domValue.innerHTML, goDate) <= 0) {
            this.$root.showTip1(['回国日期不能为出发日期当天及以前的日期，请选择正确日期。'])
            if (!this.$root.hasClass(domKey, 'red')) {
              this.$root.addClass(domKey, 'red')
            }
            if (!this.$root.hasClass(domValue, 'red')) {
              this.$root.addClass(domValue, 'red')
            }
            // window.scrollTo(0, 0)
          } else {
            if (this.$root.hasClass(domKey, 'red')) {
              this.$root.removeClass(domKey, 'red')
            }
            if (this.$root.hasClass(domValue, 'red')) {
              this.$root.removeClass(domValue, 'red')
            }
          }
        }
      }
    },
    postData(save, whichBtn) {
      this.$http.post(this.$store.state.app.host + 'api/Wechat/SaveFilledGroupInfo', {
        UserVisaId: this.$store.state.info.UserVisaId,
        GroupId: this.$store.state.info.GroupID,
        TagInfo: this.arr,
        CallId: parseInt(new Date().getTime())
        // CredentialsData: this.passportlist
      }, {
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          // alert(res.data.Code)
          if (res.data.Code == 0) {
            if (res.data.Result == 1) {
              // this.$router.push({
              // path: '/countries/applyTable'
              // })
              // if (window.localStorage.getItem('browser') != 'IE') {
              this.$layer.msg('保存成功')
              // }else{
              // alert('保存成功')
              // }
            } else {
              if (save) {
                this.showTip = false
                // if (window.localStorage.getItem('browser') != 'IE') {
                this.$layer.msg('保存成功')
                // }else{
                // alert('保存成功')
                // }
                // this.$router.push({
                // path: '/countries/applyTable'
                // })
              } else {
                this.arr = []
                var el = document.getElementsByClassName('page1')[0];
                // console.log('.pppppp');
                this.makeData(el, this.arr, true) //result 为0 判断有空没填写 ，makeData第三项为true 检测为空项。
                // console.log('HHHHHHHHHHHH');
                if (this.showTip && false) {
                  var t = setTimeout(function() {
                    var tip = document.getElementsByClassName('page')[0]
                    tip.addEventListener('touchmove', function(e) {
                      e.preventDefault();
                    })
                  }, 100);
                }

              }
            }

            // this.infomationStatus()
            if (whichBtn == 'prev') {

              this.$root.infomationBtn({
                "status": 'prev'
              })
            }
            if (whichBtn == 'next') {

              this.$root.infomationBtn({
                "status": 'next'
              })
            }
            // alert(whichBtn)
            if (whichBtn == '') {
              // alert('sss')
              this.infomationStatus()
            }
            // alert(11)
            // this.$root.infomationBtn({"status":'next'})
            //提交成功后 当前证件状态改为已经填充
          } else {
            if (res.data.Message.indexOf('未将对象引用') > -1) {

            } else if (res.data.Message.indexOf('Store update,insert,') > -1) {

            } else {
              this.$layer.alert("错误：" + res.data.Message)
            }
          }
        })
    },
    optionBlur(e, valueEl, childerDom, parentEl, level, tag, objOptions, boolan) {
      //// console.log(".............");
      //// console.log(e.currentTarget,'JJJJJJJJJ');
      // e.currentTarget.blur()
      var len
      if (objOptions != undefined) {

        len = objOptions.length
      }
      //areaSele 判断区域如果选择的相同 则不清空

      if (!boolan) {
        //// console.log(e.currentTarget.options.length, '<<<<<<<<<<');
        if (e.currentTarget.options.length > 0) {

          var areaSele = (valueEl.innerHTML == e.currentTarget.options[e.currentTarget.selectedIndex].text) ? true : false
          // if( e.currentTarget.options[e.currentTarget.selectedIndex].text!=undefined){
          valueEl.innerHTML = e.currentTarget.options[e.currentTarget.selectedIndex].text
          var index = e.currentTarget.selectedIndex + 1
        }
        // }
      } else {
        for (var i = 0; i < len; i++) {
          // //console.log(objOptions[i].Value,'oooooooooooo');
          if (objOptions[i].Value == valueEl.innerHTML) {
            var index = i + 1
            break;
          }

        }
      }
      // //console.log(parentEl.getElementsByClassName('Div_childer')[0]);
      if (parentEl.getElementsByClassName('Div_childer')[0] != undefined) {
        parentEl.removeChild(parentEl.getElementsByClassName('Div_childer')[0])
      }
      // if(parentEl.childNodes.length==0){
      if (childerDom.length > 0) {
        if (parentEl.getElementsByClassName('Div_childer')[0] == undefined) {
          var Div_childer = document.createElement('div');
          this.$root.addClass(Div_childer, 'Div_childer');
          parentEl.appendChild(Div_childer)
        }

        // for(var i=0;i<Div_childer.length;i++){
        //   Div_childer.removeChild(Div_childer.childNodes[i]);
        // }
        // //console.log(parentEl);
        // //console.log(e.currentTarget.options[e.currentTarget.selectedIndex].text);




        // //console.log(index);
        var arr = []
        // //console.log(childerDom.Tag);

        if (tag == 'JT000501' || tag == 'JT000601' || tag == 'JT000716' || tag == 'LX003506' || tag == "JTXXL019" || tag == "JT000907" || tag == "JTXXL001" || tag == "JTUK0801" || tag == "JTUK0701" || tag == "LXUK0608" || tag == "LX003506") {

        // console.log(objOptions[0].Value,tag);
        // index = childerDom.length-index

        // console.log(index, childerDom, '==');
        // if(index==='')
        //if index===undefined 则不创建下面的表单
        if (typeof(index) == "undefined") {
          return
        }
        if (objOptions[0].Value == '1') {
          index = index + 1 //这两个OPTIONS不同 需要增加1个
        }
        // if (tag == 'JT000716' || tag == 'LX003506' || tag == "JT000907" || tag == "JTUK0701") {
        //   index = index + 1 //这两个OPTIONS不同 需要增加1个
        // }

          // console.log(childerDom.length);
          var addDom = 0
          if (index - 1 <= childerDom.length) {
            var specialNum = index - 1
            index = 1
          } else {
            var specialNum = childerDom.length
            addDom = index - 1 - childerDom.length
            index = 1
          }

          for (var l = 0; l < index; l++) {
            arr = []
            var xdzvNum = 0
            for (var i = 0; i < specialNum; i++) {
              var Div_childer_special = document.createElement('div');
              this.$root.addClass(Div_childer_special, 'Div_childer_special');
              Div_childer.appendChild(Div_childer_special)

              for (var j = 0; j < childerDom[i].length; j++) {
                if (childerDom[i][j].OptionIndex == len) {
                  // console.log(childerDom[i][j], '<<<11');
                  var myObj = JSON.parse(JSON.stringify(childerDom[i][j]))
                  // console.log(i,',,<<<<<<<<<<<<<<<<<');
                  myObj.Tag = myObj.Tag + "_000_" + xdzvNum
                  if (myObj.DependFieldTag != null) {
                    myObj.DependFieldTag = myObj.DependFieldTag + "_000_" + xdzvNum
                  }
                  // console.log(myObj,'<<<<000');
                  arr.push(myObj)
                }
              }
              xdzvNum++
              this.createDom(Div_childer_special, arr, ++level)
              arr = []
            }
            for (var i = 0; i < addDom; i++) {
              var Div_childer_special = document.createElement('div');
              this.$root.addClass(Div_childer_special, 'Div_childer_special');
              Div_childer.appendChild(Div_childer_special)
              for (var j = 0; j < childerDom[0].length; j++) {
                if (childerDom[0][j].OptionIndex == len) {
                  // console.log(childerDom[0][j], '<<<22');
                  // console.log(i,'<<<<<<<<<<<<<<<><><><><');
                  var tempArr = JSON.parse(JSON.stringify(childerDom[0][j]))
                  tempArr.Value = ''
                  tempArr.Tag = tempArr.Tag + "_000_" + xdzvNum
                  if (tempArr.DependFieldTag != null) {
                    tempArr.DependFieldTag = tempArr.DependFieldTag + "_000_" + xdzvNum
                  }
                  arr.push(tempArr)
                }
              }
              xdzvNum++
              this.createDom(Div_childer_special, arr, ++level)
              arr = []
            }

          }

        } else {
          for (var i = 0; i < childerDom.length; i++) {
            for (var j = 0; j < childerDom[i].length; j++) {
              if (childerDom[i][j].OptionIndex == index) {
                // //console.log(childerDom[i][j].OptionIndex);
                arr.push(childerDom[i][j])
                // //console.log('i',i,'j',j);
                // break;
              }
            }
          }
          //console.log(arr, 'ppppppppppp');
          if (arr.length == 0) {
            if (parentEl.getElementsByClassName('Div_childer')[0] != undefined) {
              parentEl.removeChild(parentEl.getElementsByClassName('Div_childer')[0])
            }
          }
          this.createDom(Div_childer, arr, ++level)
        }
      }
      // if (e.currentTarget.options[e.currentTarget.selectedIndex].text == '是') {
      //   // this.vforArray([1, 1, 1])
      // }
      // var that = this
      // var t = setTimeout(function() {
      //   that.my_Scroll.refresh()
      // }, 50);

    },
    inputDom(parentSelectEL, arr) {
      // console.log(arr);
      for (var i = 0; i < arr.length; i++) {
        var option = document.createElement('option');
        //// console.log(arr[i].length>0,arr[i]);
        option.innerHTML = arr[i][1]
        parentSelectEL.appendChild(option)
      }

    },
    inputDom2(parentSelectEL, arr) {
      // console.log(arr);
      // console.log(parentSelectEL.childNodes.length);
      // for (var i = 0; i < parentSelectEL.childNodes.length; i++) {
      //   //// console.log( parentSelectEL.childNodes[0]);
      //   parentSelectEL.removeChild(parentSelectEL.childNodes[0])
      // }

      // console.log(parentSelectEL.childNodes.length);
      for (var i = 0; i < arr.length; i++) {
        var option = document.createElement('option');
        //// console.log(arr[i].length>0,arr[i]);
        option.innerHTML = arr[i]
        parentSelectEL.appendChild(option)
      }
      // console.log(parentSelectEL.childNodes.length);
    },
    optionDom(parentSelectEL, arr) {
      // //console.log(parentSelectEL,1111111);
      // var option = document.createElement('option');
      // option.innerHTML = 'arr[i].Value'
      // parentSelectEL.appendChild(option)
      for (var i = 0; i < arr.length; i++) {
        var option = document.createElement('option');
        // var that = this
        // option.addEventListener('click',function() {
        //   // parentSelectEL.blur()
        //   alert(1)
        //   that.click1(parentSelectEL,'blur')
        // })
        option.innerHTML = arr[i].Value
        parentSelectEL.appendChild(option)
      }
    },
    dataProcess(_arr) {
      this.dataObj = _arr
      for (var i = 0; i < _arr.length; i++) {

      }
    },
    cancelBtn() {
      this.showTip = false
    },
    quedingBtn() {
      var that = this
      var t = setTimeout(function() {
        that.postData(true, '')
      }, 100);
    },
    saveData(obj) {
      var whichBtn = obj.status
      // console.log(1);
      this.showTip = false
      this.arr = []
      var el = document.getElementsByClassName('page1')[0];
      // //console.log(el);
      this.makeData(el, this.arr, false)
      // //console.log(arr);
      this.showTip = false
      if (!this.showTip) { //makeData 第三项为flash  this.showTIp必为false
        var that = this
        var t = setTimeout(function() {
          that.postData(false, whichBtn)
        }, 100);
      } else {
        var t = setTimeout(function() {
          var tip = document.getElementsByClassName('page')[0]
          tip.addEventListener('touchmove', function(e) {
            e.preventDefault();
          })
        }, 100);
      }

    },
    makeData(el, arr, showTip) {
      // var arr_childer=[];
      //console.log(el);
      // console.log('start');
      for (var i = 0; i < el.childNodes.length; i++) {

        // if (val == '') {
        // alert('请输入全部内容！')
        // el.childNodes[i].getElementsByClassName('key')[0].focus()
        // el.childNodes[i].getElementsByClassName('key')[0].click()
        // return
        // }

        // var val = el.childNodes[i].getElementsByClassName('value')[0].innerHTML;
        var val = el.childNodes[i].getElementsByClassName('value')[0].innerText;


        //// console.log('=======================');
        //// console.log(el.childNodes[i].getElementsByClassName('value')[0]);
        //// console.log(el.childNodes[i].getElementsByClassName('value')[0].innerHTMz);
        //// console.log(el.childNodes[i].getElementsByClassName('value')[0].value);
        if (el.childNodes[i].getElementsByClassName('value')[0].type == 'number') {
          var val = el.childNodes[i].getElementsByClassName('value')[0].value
        }
        val = val.replace(/\n/g, '')
        // console.log(val, '>>>>>>>>>????', el.childNodes[i].id.indexOf('GP'));
        // console.log('showtip', showTip);
        if (showTip) {
          if (el.childNodes[i].id.indexOf('GP') < 0) {
            // console.log('gp');
            if (val == null || val == '') {
              if (this.$root.hasClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')) {} else {
                this.$root.addClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')
              }
              this.showTip = true
            } else {
              if (this.$root.hasClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')) {
                this.$root.removeClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')
              }
            }
          }
        }
        var obj = {
          // FieldId: el.childNodes[i].id,
          FieldId: el.childNodes[i].getAttribute('FieldId'),
          Value: val,
          Children: []
        };
        //// console.log(1111);
        var childer = this.$root.hasClass(el.childNodes[i].lastChild, 'Div_childer')
        //// console.log(222);
        //console.log(obj.FieldId, childer, el.childNodes[i].lastChild);
        if (childer) {

          // var that  =  this
          //console.log(el.childNodes[i].lastChild.className);
          // arr.push(childerArr)
          // if(el.childNodes[i].lastChild.length==0){
          //   return
          // }
          //// console.log(el.childNodes[i].lastChild.childNodes[0]);
          var dd
          if (el.childNodes[i].lastChild.childNodes[0] == undefined) {
            dd = false
          } else {
            dd = this.$root.hasClass(el.childNodes[i].lastChild.childNodes[0], 'Div_childer_special')
          }
          if (dd) {
            // //console.log('ddd');
            //console.log(el.childNodes[i].lastChild, 'llllllllll');
            //console.log(el.childNodes[i].lastChild.childNodes.length, 'llllllllll');
            var temp = []
            // console.log(el.childNodes[i].lastChild.childNodes.length, '======================');
            for (var k = 0; k < el.childNodes[i].lastChild.childNodes.length; k++) {

              var childerArr = []
              //console.log(el.childNodes[i].lastChild.childNodes[k], '9999999999');
              var val = el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('value')[0].innerText;
              if (el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('value')[0].type == 'number') {
                val = el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('value')[0].value
              }
              val = val.replace(/\n/g, '')
              if (showTip) {
                if (el.childNodes[i].id.indexOf('GP') < 0) {
                  if (val == null || val == '') {
                    if (this.$root.hasClass(el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('key')[0], 'red')) {} else {
                      this.$root.addClass(el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('key')[0], 'red')
                    }
                    this.showTip = true

                  } else {
                    if (this.$root.hasClass(el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('key')[0], 'red')) {
                      this.$root.removeClass(el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('key')[0], 'red')
                    }
                  }
                }
              }
              temp.push(childerArr)
              // obj = {
              //   FieldId:'',
              //   Value: '',
              //   Children: temp
              // };
              this.makeData(el.childNodes[i].lastChild.childNodes[k], childerArr, showTip)
            }
            var val = el.childNodes[i].getElementsByClassName('value')[0].innerText;
            if (el.childNodes[i].getElementsByClassName('value')[0].type == 'number') {
              val = el.childNodes[i].getElementsByClassName('value')[0].value
            }
            val = val.replace(/\n/g, '')
            if (showTip) {
              if (el.childNodes[i].id.indexOf('GP') < 0) {
                if (val == null || val == '') {
                  if (this.$root.hasClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')) {} else {
                    this.$root.addClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')
                  }
                  this.showTip = true

                } else {
                  if (this.$root.hasClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')) {
                    this.$root.removeClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')
                  }
                }
              }
            }
            obj = {
              // FieldId: el.childNodes[i].id,
              FieldId: el.childNodes[i].getAttribute('FieldId'),
              Value: val,
              Children: temp
            };
          } else {
            var val = el.childNodes[i].getElementsByClassName('value')[0].innerText;
            if (el.childNodes[i].getElementsByClassName('value')[0].type == 'number') {
              val = el.childNodes[i].getElementsByClassName('value')[0].value
            }
            val = val.replace(/\n/g, '')
            if (showTip) {
              if (el.childNodes[i].id.indexOf('GP') < 0) {
                if (val == null || val == '') {
                  if (this.$root.hasClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')) {} else {
                    this.$root.addClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')
                  }
                  this.showTip = true
                } else {
                  if (this.$root.hasClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')) {
                    this.$root.removeClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')
                  }
                }
              }
            }
            var temp = []
            var childerArr = []
            temp.push(childerArr)
            obj = {
              // FieldId: el.childNodes[i].id,
              FieldId: el.childNodes[i].getAttribute('FieldId'),
              Value: val,
              Children: temp
            };
            this.makeData(el.childNodes[i].lastChild, childerArr, showTip)
          }
        }
        // //console.log(childer);
        arr.push(obj);
      }
      // if(childer!=undefined){
      //   var childerArr=[]
      //   arr.push(childerArr)
      //   this.makeData(childer,childerArr)
      // }
      // arr.push(arr_childer)
      // console.log(this.arr, '<<<<<<<<<<<<<');
    },
    previousData() {
      console.log(this.groupId)
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
              for (var i = 0; i < zhengjian.length; i++) {
                if (zhengjian[i].HaveContent == null) {
                  if (this.$root.hasClass(el.children[0], 'green')) {
                    this.$root.removeClass(el.children[0], 'green')
                  }
                  zhengjianStatus = false
                  // break;
                } else {
                  if (!this.$root.hasClass(el.children[0], 'green')) {
                    this.$root.addClass(el.children[0], 'green')
                  }
                }
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
              this.setPaperProgress(2, parseInt(groupNumAll))
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
                    if (!this.$root.hasClass(el1, 'green')) {
                      this.$root.addClass(el1, 'green')
                    }
                  }
                }
              }
              if (cailiaoStatus) {
                this.infoStatus.push(1)
              } else {
                this.infoStatus.push(0)
              }

              if (window.localStorage.getItem('showmodel') == 1) {
                this.infoStatus[0] = 1
                this.infoStatus[2] = 1
              }

              // console.log(this.infoStatus,'llll',this.show_model);
              this.$store.state.info.infoStatus = this.infoStatus
            } else {
              this.$layer.msg(res.data.message)
            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
    },
  },
  mounted: function() {
    //
    this.groupId = window.localStorage.getItem("GroupId")
    this.$store.state.info.GroupID = window.localStorage.getItem("GroupId")
    this.getGroupListInfo(this.groupId)
    var that = this
    this.$root.eventHub.$on("CHANGEGROUP", function(obj) {
      if (!obj.zhengjian) {
        that.groupId = window.localStorage.getItem("GroupId")
        that.$store.state.info.GroupID = that.groupId
        that.getGroupListInfo(obj.groupId)
      }

    })
    this.$root.eventHub.$on("save", function(obj) {

      that.saveData({
        'status': ""
      })
      // that.$root.eventHub.$off('save')
    })
  },
  destroyed() {
    this.$root.eventHub.$off('CHANGEGROUP')
    this.$root.eventHub.$off('save')
  }
}
</script>

<style type="text/css">
/*@import url(../../css/mobiscroll.2.13.2.css);*/


/*@import url(../../css/mobiscroll.custom-2.17.0.min.css);*/
</style>
<style lang="scss" type="text/css" src='../css/infomation.scss'></style>
