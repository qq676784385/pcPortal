<template lang="html">
  <div class="inputtest">
        <div class="b" v-tap='{methods:saveData}'>
          save
        </div>
        <div class="b" v-tap='{methods:addData}'>
          +
        </div>
        <!-- <div class="b" v-tap='{methods:deleData}'>
          -
        </div> -->
        <div class="data">


        <div :id='data.Tag+"|"+data.NewColumn'  class="input"  v-for='(data,index) in recoData'  >
          <!-- <div class="c1 k" contenteditable="true" v-tap='{methods:inputChange,index:index}'> -->
            <!-- if（data.ColumnType==1 || data.ColumnType==6） -->
            <div  class="date" v-if='data.ColumnType==1 || data.ColumnType==6'>

                <div class="c1 k" contenteditable="true" @blur='clearTipDom(index)'  @keyup='inputChange(index)' @keydown='keyEnter()' v-tap='{methods:inputChange,index:index}'>
                    {{data.CHNTitle}}
                </div>
                <div  class="c2 k" contenteditable="false" >
                    {{data.CHNValue}}
                </div>
                <div class="c1 k" contenteditable="false">
                    {{data.ENGTitle}}
                </div>
                <div  class="c2 k" contenteditable="false">
                    {{data.ENGValue}}
                </div>
            </div>
                <!-- else if（data.ColumnType==8） -->
            <div class="" v-else-if='data.ColumnType==8'>
                <div class="c1 k" contenteditable="true"   @blur='clearTipDom(index)' @keyup='inputChange(index)' @keydown='keyEnter()' v-tap='{methods:inputChange,index:index}'>
                    {{data.CHNTitle}}
                </div>
                <select  class="c2 k CHN" @change='selectChange()'>
                  <!-- <option :value="index" v-for='(option,index) in data.CHNOption' >{{option}}</option> -->
                  <template  v-for='(option,index) in data.CHNOption'>
                     <option :value="option" v-if='option==data.CHNValue' selected >{{option}}</option>
                     <option :value="option" v-else >{{option}}</option>
                  </template>
                </select>
                <div class="c1 k" contenteditable="false"   @keyup='inputChange3(index)' @keydown='keyEnter()'>
                    {{data.ENGTitle}}
                </div>
                <select  class="c2 k ENG" @change='selectChange()' >
                  <!-- <option :value="index" v-for='(option,index) in data.ENGOption'>{{option}}</option> -->
                  <template  v-for='(option,index) in data.ENGOption'>
                     <option :value="option" v-if='option==data.ENGValue' selected >{{option}}</option>
                     <option :value="option" v-else >{{option}}</option>
                  </template>
                </select>
          </div>
          <!-- else -->
          <div class="" v-else>
              <div class="c1 k" contenteditable="true"  @blur='clearTipDom(index)' @keyup='inputChange(index)' @keydown='keyEnter()' v-tap='{methods:inputChange,index:index}'>
                  {{data.CHNTitle}}
              </div>
              <div  class="c2 k" contenteditable="true"  @keyup='inputChange2(index)' @keydown='keyEnter()'>
                  {{data.CHNValue}}
              </div>
              <div class="c1 k" contenteditable="false"   @keyup='inputChange3(index)' @keydown='keyEnter()'>
                  {{data.ENGTitle}}
              </div>
              <div  class="c2 k" contenteditable="true"  @keyup='inputChange4(index)' @keydown='keyEnter()'>
                  {{data.ENGValue}}
              </div>
          </div>
    </div>
    </div>
    <div class="tipsplane">
      <div  class="tip" v-for='(data,index) in tipData' v-tap='{methods:seleTip,index:index}' @mouseover='tipMouseOver(index)' @mouseout='tipMouseOut(index)'>
        {{data.CHNTitle}}
      </div>
    </div>
    <!-- <select class="tipsplane">
      <option  class="tip" v-for='(data,index) in tipData' v-tap='{methods:seleTip,index:index}' @mouseover='tipMouseOver(index)' @mouseout='tipMouseOut(index)'>
        {{data.CHNTitle}}
      </option>
    </select> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      saveDomData: [],
      ttt: false,
      sicneDateId1: '', //当前DATE插件保留的DOM ID，整个页面钟只保留一个ID，新插件的创建会删除旧插件
      sicneDateId2: '', //当前DATE插件保留的DOM ID，整个页面钟只保留一个ID，新插件的创建会删除旧插件
      pageLoc: 400,
      seleDom: '',
      selerecoDataIndex: '',
      changeTxt: '',
      tipData: [],
      recoData: [],
      domData: [{
        'Tag': '',
        'CHNTitle': '',
        'CHNValue': '',
        'ENGTitle': '',
        'ENGValue': '',
        'ENGOption': [],
        'CHNOption': [],
        'x': 100,
        'y': 100,
        'w': 100,
        'h': 100,
        'ColumnType': 0,
        'NewColumn': 0,
      }, {
        'Tag': '1111',
        'CHNTitle': '日期年月',
        'CHNValue': '',
        'ENGTitle': 'DATEYMD',
        'ENGValue': '',
        'ENGOption': [],
        'CHNOption': [],
        'x': 100,
        'y': 100,
        'w': 100,
        'h': 100,
        'ColumnType': 1,
        'NewColumn': 0,
      }, {
        'Tag': '1112',
        'CHNTitle': '日期年月1',
        'CHNValue': '万邦华唐',
        'ENGTitle': 'DATEYM',
        'ENGValue': 'wanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatang',
        'ENGOption': [],
        'CHNOption': [],
        'x': 100,
        'y': 100,
        'w': 100,
        'h': 100,
        'ColumnType': 6,
        'NewColumn': 0,
      }, {
        'Tag': '1113',
        'CHNTitle': '1',
        'CHNValue': '万邦华唐',
        'ENGTitle': 'name',
        'ENGValue': 'wanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatang',
        'ENGOption': [],
        'CHNOption': [],
        'x': 100,
        'y': 100,
        'w': 100,
        'h': 100,
        'ColumnType': 0,
        'NewColumn': 0,
      }, {
        'Tag': '1114',
        'CHNTitle': '2',
        'CHNValue': '万邦华唐',
        'ENGTitle': 'name',
        'ENGValue': 'wanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatang',
        'ENGOption': [],
        'CHNOption': [],
        'x': 100,
        'y': 100,
        'w': 100,
        'h': 100,
        'ColumnType': 0,
        'NewColumn': 0,
      }, {
        'Tag': '1115',
        'CHNTitle': '3',
        'CHNValue': '万邦华唐',
        'ENGTitle': 'name',
        'ENGValue': 'wanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatangwanbanghuatang',
        'ENGOption': [],
        'CHNOption': [],
        'x': 100,
        'y': 100,
        'w': 100,
        'h': 100,
        'ColumnType': 0,
        'NewColumn': 0,
      }, {
        'Tag': '2226',
        'CHNTitle': '4',
        'CHNValue': '万邦华唐1',
        'ENGTitle': 'name1',
        'ENGValue': 'wanbanghuatang1',
        'ENGOption': [],
        'CHNOption': [],
        'x': 10,
        'y': 300,
        'w': 200,
        'h': 100,
        'ColumnType': 0,
        'NewColumn': 0,
      }, {
        'Tag': '3337',
        'CHNTitle': '下拉菜单2',
        'CHNOption': ['a', 'b', 'c'],
        'CHNValue': 'c',
        'ENGTitle': 'xlcd',
        'ENGOption': ['A', 'B', 'C'],
        'ENGValue': 'C',
        'x': 210,
        'y': 300,
        'w': 200,
        'h': 100,
        'ColumnType': 8,
        'NewColumn': 0,
      }], //标签列表 及 数据
      matchAllStr: false,
      NewColumn: 0,
    }
  },
  methods: {
    deleData() {
      for (var i = 0; i < 10; i++) {
        console.log(i);
        if (i == 5) break;
      }
    },
    addData() {
      var _obj = {
        'Tag': '',
        'CHNTitle': '',
        'CHNValue': '',
        'ENGTitle': '',
        'ENGValue': '',
        'ENGOption': [],
        'CHNOption': [],
        'x': 0,
        'y': 0,
        'w': 0,
        'h': 0,
        'ColumnType': 0,
      }
      this.recoData.unshift(_obj)
    },
    inputChange2(index) {
      var str = event.target.innerText
      // this.recoData[index].CHNValue = str
    },
    inputChange3(index) {
      var str = event.target.innerText
      // this.recoData[index].ENGTitle = str
    },
    inputChange4(index) {
      var str = event.target.innerText
      // this.recoData[index].ENGValue = str
    },
    saveData() {
      var el = document.getElementsByClassName('data')[0];
      console.log(el);
      var NewColumn = this.NewColumn;
      var _TemplateId = '';
      var mydata = []
      var _FileTags = []
      for (var i = 0; i < el.children.length; i++) {
        var _CHSTitle = el.children[i].childNodes[0].children[0].innerText
        var _ValueCHS = el.children[i].childNodes[0].children[1].innerText
        var _ENGTitle = el.children[i].childNodes[0].children[2].innerText
        var _ValueENG = el.children[i].childNodes[0].children[3].innerText
        var _Tag = el.children[i].id.split('|')[0];
        if (_Tag == '' && NewColumn > 0 && _CHSTitle == '' && _ValueCHS == '' && _ENGTitle == '' && _ValueENG == '') {
          //新创建并且都为空 则不保存
          //如果是个人创建，保存过，现在读出来了,Tag不为空，则提交到后台，后台负责删除，保存成功后不需刷新数据，同步数据库最新数据
        } else {
          var _UserVisaFileId = '';
          var _UserVisaId = '';
          var _x = 0
          var _y = 0
          var _w = 0
          var _h = 0
          var _base = '0';
          if (_Tag != '') {
            _FileTags.push(_Tag)
            // _base = '0'
          } else {
            NewColumn++
            // _base = '0'
          }
          var _CredentialsData = {
            "Tag": _Tag,
            "ValueCHS": _ValueCHS,
            "ValueENG": _ValueENG,
            "x": _x,
            "y": _y,
            "w": _w,
            "h": _h,
            "Base": _base,
            "CHSTitle": _CHSTitle,
            "ENGTitle": _ENGTitle,
            "NewColumn": _Tag == '' ? NewColumn : '',
          }
          var _data = {
            "UserVisaId": _UserVisaId,
            "UserVisaFileId": _UserVisaFileId,
            "CredentialsData": _CredentialsData
          }
          mydata.push(_data)
        }
      } //end for

      var _obj = {
        "Data": mydata,
        "TemplateId": _TemplateId,
        "FileTags": _FileTags,
      }
      this.$http.post(this.$store.state.app.host + 'api/Manage/SavePreViewDataDefineTemplate', {
        "Data": mydata,
        "TemplateId": _TemplateId,
        "FileTags": _FileTags,
      }, {
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          if (res.data.Code == 0) {
            //保存成功后获取最新数据。
            this.getAllData()
          }
        })
      // this.saveDomData.push(_obj)
      //创建保存数据格式
      // console.log(this.saveDomData);
    },
    clearTipDom(index) {
      console.log('clear', this.matchAllStr);
      var that = this
      var str = event.target.innerText
      var myEvent = event
      var match = true
      var el = document.getElementsByClassName('data')[0]
      // alert(this.matchAllStr)
      if (this.matchAllStr == true) {
        return
      }

      var t = setTimeout(function() {
        that.tipData = []
        console.log(myEvent.target.innerText);
        for (var i = 0; i < that.domData.length; i++) {
          if (that.domData[i].CHNTitle == str) {
            //失去焦点后 匹配当前字符是否有相同的选项，有的话 相当于选择了该条TIP
            match = false
            var that1 = that
            var _domData = JSON.parse(JSON.stringify(that.domData[i]))
            // var t = setTimeout(function() {
            // console.log(el.children[index].childNodes[0].children[2]);
            // console.log(JSON.parse(JSON.stringify(that.domData[i])));
            that1.recoData[index] = _domData;
            el.children[index].childNodes[0].children[2].contentEditable = false
            el.children[index].childNodes[0].children[0].innerText = _domData.CHNTitle
            el.children[index].childNodes[0].children[2].innerText = _domData.ENGTitle
            if (that1.recoData[index].ColumnType != 8) { //如果是下拉菜单 则不设置下拉框，否则将失去内容（OPTION 会被INNERTEXT 覆盖掉）
              el.children[index].childNodes[0].children[1].innerText = _domData.CHNValue
              el.children[index].childNodes[0].children[3].innerText = _domData.ENGValue

            }
            console.log(that1.recoData);
            that.focusInput(that1.recoData[index], index, el.children[index].childNodes[0].children[1], el.children[index].childNodes[0].children[3])
            // }, 10);

            // that.matchAllStr = true

          }
        }
        if (match) {
          //如果没有相同项，质控，清除时间条插件
          that.recoData[index].ColumnType = 0
          that.recoData[index].CHNTitle = el.children[index].childNodes[0].children[0].innerText
          var t = setTimeout(function() {
            el.children[index].childNodes[0].children[2].contentEditable = true
            // console.log('here', index, el.children[index].childNodes[0].children[2]);
          }, 10);
          if (el.children[index].childNodes[0].children[1].id != '') {
            $("#" + el.children[index].childNodes[0].children[1].id).mobiscroll('getInst').destroy()
            el.children[index].childNodes[0].children[1].id = ''
          }
          if (el.children[index].childNodes[0].children[3].id != '') {
            $("#" + el.children[index].childNodes[0].children[3].id).mobiscroll('getInst').destroy()
            el.children[index].childNodes[0].children[3].id = ''
          }
          // that.recoData[index].CHNValue = el.children[index].childNodes[0].children[1].innerText
          // that.recoData[index].ENGTitle = el.children[index].childNodes[0].children[2].innerText
          // that.recoData[index].ENGValue = el.children[index].childNodes[0].children[3].innerText

          // if (that.sicneDateId1 != '') {
          //   $("#" + that.sicneDateId1).mobiscroll('getInst').destroy()
          //   $("#" + that.sicneDateId2).mobiscroll('getInst').destroy()
          //   that.sicneDateId1 = ''
          //   that.sicneDateId2 = ''
          // }
        }
        // console.log(that.recoData);
        // that.focusInput(that.recoData[index], index,event)
        if (that.tipData.length > 0) {
          that.tipData = []
        }
      }, 0);

    },
    selectChange() {
      var that = this
      var _parentNode = event.currentTarget.parentNode
      var _currentTargetIndex = event.currentTarget.selectedIndex
      //同步两个SELECT框
      var t = setTimeout(function() {
        for (var i = 0; i < _parentNode.getElementsByTagName('select').length; i++) {
          _parentNode.getElementsByTagName('select')[i].selectedIndex = _currentTargetIndex
        }
      }, 10);
      //   for (var i = 0; i < _parentNode.getElementsByTagName('select').length; i++) {
      //     _parentNode.getElementsByTagName('select')[i].selectedIndex = _currentTargetIndex
      //   }

    },
    tipMouseOut(index) {
      console.log(index);
      this.ttt = false
      this.matchAllStr = false
      //设置选择框样式
      if (this.$root.hasClass(event.currentTarget, 'seletip')) {
        this.$root.removeClass(event.currentTarget, 'seletip')
      }
    },
    tipMouseOver(index) {
      this.ttt = true;
      this.matchAllStr = true
      //设置选择框样式
      console.log('over', this.matchAllStr);
      if (!this.$root.hasClass(event.currentTarget, 'seletip')) {
        this.$root.addClass(event.currentTarget, 'seletip')
      }
    },
    seleTip(obj) {
      // alert(1)
      var el = document.getElementsByClassName('data')[0]
      console.log(11, JSON.parse(JSON.stringify(this.tipData[obj.index])));
      this.recoData[this.selerecoDataIndex] = JSON.parse(JSON.stringify(this.tipData[obj.index]))
      // this.seleDom.innerText = this.recoData[this.selerecoDataIndex].CHNTitle
      el.children[this.selerecoDataIndex].childNodes[0].children[2].contentEditable = false
      el.children[this.selerecoDataIndex].childNodes[0].children[0].innerText = JSON.parse(JSON.stringify(this.tipData[obj.index])).CHNTitle
      el.children[this.selerecoDataIndex].childNodes[0].children[1].innerText = JSON.parse(JSON.stringify(this.tipData[obj.index])).CHNValue
      el.children[this.selerecoDataIndex].childNodes[0].children[2].innerText = JSON.parse(JSON.stringify(this.tipData[obj.index])).ENGTitle
      el.children[this.selerecoDataIndex].childNodes[0].children[3].innerText = JSON.parse(JSON.stringify(this.tipData[obj.index])).ENGValue
      this.matchAllStr = true;
      //记录是TIP选择的条目，这个时候 输入框失去焦点 则不执行 失去焦点的操作。
      this.focusInput(this.recoData[this.selerecoDataIndex], this.selerecoDataIndex, el.children[this.selerecoDataIndex].childNodes[0].children[1], el.children[this.selerecoDataIndex].childNodes[0].children[3])
      //判断是否要增加时间插件

      this.tipData = []

      // if (this.sicneDateId1 != '') {
      //   $("#" + this.sicneDateId1).mobiscroll('getInst').destroy()
      //   $("#" + this.sicneDateId2).mobiscroll('getInst').destroy()
      //   this.sicneDateId1 = ''
      //   this.sicneDateId2 = ''
      // }
    },
    keyEnter() {
      //阻止回车
      if (window.event && window.event.keyCode == 13) {
        window.event.returnValue = false;
        console.log('hc');
        return
      }
    },
    inputChange(index) {
      this.matchAllStr = false
      console.log('get jd');
      console.log(this.recoData);
      var index = typeof(index) == 'object' ? index.index : index
      var myEvent = event
      // console.log(document.documentElement.scrollTop, event.target.offsetTop, event.target.offsetLeft, event.target.offsetWidth, event.target.offsetHeight);
      // this.seleDom = event.currentTarget

      var str = event.currentTarget.innerText
      // alert(str)
      console.log(str, 'MMMMMMMMMMMMM');
      this.selerecoDataIndex = index;
      // var tipel = document.getElementsByClassName('tipsplane')[0]
      // for (var i = 0; i < tipel.children.length; i++) {
      //   tipel.removeChild(tipel.children[0])
      // }

      // this.tipData = []
      var div = document.getElementsByClassName('tipsplane')[0]
      var el = document.getElementsByClassName('data')[0]
      // this.tipData=[]
      if (str == '') {
        this.tipData = []
        // if (this.tipData.length == 0) {
        // this.tipData = JSON.parse(JSON.stringify(this.domData))
        for (var i = 0; i < this.domData.length; i++) {
            if(this.domData[i].NewColumn==0){
            this.tipData.push(this.domData[i])
          }
        }
        // for (var i = 0; i < this.domData.length; i++) {
        //   this.tipData.push(this.domData[i])
        // }
        // }

      } else {
        this.tipData = []
        // if (this.tipData.length < this.domData.length) {
        var t = true
        var tempI = 0
        for (var i = 0; i < this.domData.length; i++) {
          if (this.domData[i].CHNTitle.indexOf(str) > -1) {
            if(this.domData[i].NewColumn==0){
              this.tipData.push(this.domData[i])
            }
            if (this.domData[i].CHNTitle == str) {

              //   this.recoData[this.selerecoDataIndex].ColumnType = this.domData[i].ColumnType
              //   this.focusInput(this.recoData[this.selerecoDataIndex], this.selerecoDataIndex, el.children[this.selerecoDataIndex].childNodes[0].children[1], el.children[this.selerecoDataIndex].childNodes[0].children[3])
              //   el.children[this.selerecoDataIndex].childNodes[0].children[0].innerText = str

              t = false
              tempI = i
              //***这里的逻辑 判断TIP只有为一个相同的选项。如果出现多个，默认使用最后的一个
              //只负责判断是否为时间插件，目的是为了解决，输入后直接点击插件绑定的Dom 如果是失去焦点绑定，则帮不上。这里判断 输入的时候就绑定好
            }
          }
        }
        if (t) {
          if (el.children[index].childNodes[0].children[1].id != '') {
            $("#" + el.children[index].childNodes[0].children[1].id).mobiscroll('getInst').destroy()
            el.children[index].childNodes[0].children[1].id = ''
          }
          if (el.children[index].childNodes[0].children[3].id != '') {
            $("#" + el.children[index].childNodes[0].children[3].id).mobiscroll('getInst').destroy()
            el.children[index].childNodes[0].children[3].id = ''
          }
        } else {
          // this.recoData[this.selerecoDataIndex].ColumnType = this.domData[tempI].ColumnType
          this.focusInput(this.recoData[this.selerecoDataIndex], this.selerecoDataIndex, el.children[this.selerecoDataIndex].childNodes[0].children[1], el.children[this.selerecoDataIndex].childNodes[0].children[3], this.domData[tempI].ColumnType)

          // el.children[this.selerecoDataIndex].childNodes[0].children[0].innerText = str
        }
        // }
        // return

        console.log('end ');
        // for (var i = 0; i < this.domData.length; i++) {
        //
        //   if (this.domData[i].CHNTitle.indexOf(str) > -1 && false) {
        //     el.children[index].childNodes[0].children[2].contentEditable = false
        //
        //     t = false
        //     if (this.domData[i].CHNTitle == str && false) {
        //       // alert(1)
        //       // console.log('333+',i,this.recoData[i].CHNValue,'-',el.children[index].childNodes[0].children[1].innerText);
        //       if (el.children[index].childNodes[0].children[1].innerText == this.recoData[index].CHNValue && el.children[index].childNodes[0].children[2].innerText == this.recoData[index].ENGTitle && el.children[index].childNodes[0].children[3].innerText ==
        //         this.recoData[index].ENGValue && this.recoData[index].ENGTitle != '' && this.recoData[index].ColumnType == this.domData[i].ColumnType) {
        //         console.log('okokokok');
        //         break;
        //       } else if (this.recoData[index].ColumnType == 8) {
        //         console.log('okokokok');
        //
        //         break;
        //       } else if (this.recoData[index].ColumnType == 1 || this.recoData[index].ColumnType == 6) {
        //         if (this.sicneDateId != '') {
        //
        //           $("#" + this.sicneDateId).mobiscroll('getInst').destroy()
        //           this.sicneDateId = ''
        //         }
        //       }
        //       console.log('44');
        //       el.children[index].childNodes[0].children[0].innerText = this.domData[i].CHNTitle
        //       el.children[index].childNodes[0].children[1].innerText = this.domData[i].CHNValue
        //       el.children[index].childNodes[0].children[2].innerText = this.domData[i].ENGTitle
        //       el.children[index].childNodes[0].children[3].innerText = this.domData[i].ENGValue
        //       this.recoData[index] = JSON.parse(JSON.stringify(this.domData[i]))
        //
        //       // this.recoData[index] = JSON.parse(JSON.stringify(this.domData[i]))
        //       // this.seleDom.innerText = this.recoData[index].CHNTitle
        //     }
        //   }
        // }
        // if (t) {
        //
        //   while (div.hasChildNodes()) //当div下还存在子节点时 循环继续
        //   {
        //     // div.removeChild(div.firstChild);
        //   }
        // }
        // if (div.children.length == 0 && false) {
        //   if (this.sicneDateId != '') {
        //
        //     $("#" + this.sicneDateId).mobiscroll('getInst').destroy()
        //     this.sicneDateId = ''
        //   }
        //   el.children[index].childNodes[0].children[2].contentEditable = true
        //   // if (el.children[index].childNodes[0].children[1].innerText == '' && el.children[index].childNodes[0].children[2].innerText == '' && el.children[index].childNodes[0].children[3].innerText == '') {
        //   //   console.log('okokokok11111');
        //   //   return
        //   // }
        //   console.log('kkkk', this.recoData[index].CHNTitle, str);
        //   if (this.recoData[index].CHNTitle == str) {
        //     console.log('34');
        //     return
        //   }
        //   // this.tipData=[]
        //   this.recoData[index].CHNTitle = str
        //   // this.recoData[index].CHNValue = ''
        //   // this.recoData[index].ENGTitle = ''
        //   // this.recoData[index].ENGValue = ''
        //   // this.recoData[index].ENGOption=[]
        //   // this.recoData[index].CHNOption=[]
        //   this.recoData[index].ColumnType = 0
        //
        //   // el.children[index].childNodes[0].children[0].innerText = str
        //   // el.children[index].childNodes[0].children[1].innerText = ''
        //   // el.children[index].childNodes[0].children[2].innerText = ''
        //   // el.children[index].childNodes[0].children[3].innerText = ''
        //
        //
        //   console.log('123', this.recoData);
        //
        // }

      }
      //设置tips 位置
      var el = document.getElementsByClassName('tipsplane')[0]
      var that = this
      var t = setTimeout(function() {
        if (myEvent.target.offsetTop - document.documentElement.scrollTop < that.pageLoc) {
          el.style.left = myEvent.target.offsetLeft + 'px'
          el.style.top = myEvent.target.offsetTop + myEvent.target.offsetHeight + 'px'
        } else {
          el.style.left = myEvent.target.offsetLeft + 'px'
          el.style.top = myEvent.target.offsetTop - el.offsetHeight + 'px'
        }
      }, 1);


    },
    focusInput(info, index, tar1, tar2, type) {
      // this.clearTipDom()
      // console.log(event);
      // var mev = event==undefined?ev:event
      // var e = mev
      console.log(type);

      console.log(info.ColumnType);
      console.log(index);
      console.log(tar1);
      console.log(tar2);
      var myType = type == undefined ? info.ColumnType : type
      var currYear = new Date().getFullYear();
      var el = document.getElementsByClassName('data')[0];
      //如果有旧插件则删除旧插件
      console.log(tar1.id);
      if (tar1.id != '') {
        $("#" + tar1.id).mobiscroll('getInst').destroy()
        tar1.id = ''
      }
      if (tar2.id != '') {
        $("#" + tar2.id).mobiscroll('getInst').destroy()
        tar2.id = ''
      }
      // if (this.sicneDateId1 != tar1.id && this.sicneDateId1 != '') {
      //   $("#" + this.sicneDateId1).mobiscroll('getInst').destroy()
      //   this.sicneDateId1 = ''
      // }
      // if (this.sicneDateId2 != tar2.id && this.sicneDateId2 != '') {
      //   $("#" + this.sicneDateId2).mobiscroll('getInst').destroy()
      //   this.sicneDateId2 = ''
      // }
      if (myType == 6) {
        var that = this
        $(tar1).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          endYear: currYear + 50,
          dateFormat: "yyyy-mm",
          dateOrder: "yyyymm",
          onSelect: function(event, inst) {
            if (event) {
              info.CHNValue = event
              info.ENGValue = event
              el.children[index].childNodes[0].children[1].innerText = event
              el.children[index].childNodes[0].children[3].innerText = event
            }
          }
        });
        $(tar2).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          endYear: currYear + 50,
          dateFormat: "yyyy-mm",
          dateOrder: "yyyymm",
          onSelect: function(event, inst) {
            if (event) {
              info.CHNValue = event
              info.ENGValue = event
              el.children[index].childNodes[0].children[1].innerText = event
              el.children[index].childNodes[0].children[3].innerText = event
            }
          }
        });
      } else if (myType == 1) {
        var that = this
        // alert(1)
        $(tar1).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          endYear: currYear + 50,
          dateFormat: "yyyy-mm-dd",
          dateOrder: "yyyymmdd",
          onSelect: function(event, inst) {
            if (event) {
              info.CHNValue = event
              info.ENGValue = event
              el.children[index].childNodes[0].children[1].innerText = event
              el.children[index].childNodes[0].children[3].innerText = event
            }
          }
        });
        // alert(12)
        $(tar2).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          endYear: currYear + 50,
          dateFormat: "yyyy-mm-dd",
          dateOrder: "yyyymmdd",
          onSelect: function(event, inst) {
            if (event) {
              info.CHNValue = event
              info.ENGValue = event
              el.children[index].childNodes[0].children[1].innerText = event
              el.children[index].childNodes[0].children[3].innerText = event
            }
          }
        });
      }
      //记录当前唯一插件的ID
      this.sicneDateId1 = tar1.id
      this.sicneDateId2 = tar2.id
      console.log(this.recoData);
    },
    getAllData() {
      this.$http.get(this.$store.state.app.host + 'api/Manage/GetDefineTemplateColumns', {
        params: {
          userVisaId: '',
          visaFileId: ''
          // versionId:7,
          // page: 53
        },
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime - 7000
      }).then(
        function(res) {
          if (res.data.Code == 0) {
            // for (var i = 0; i < res.data.Result.length; i++) {
            //   res.data.Result
            // }
            this.domData = [];
            this.recoData = [];
            for (var i = 0; i < res.data.Result.length; i++) {
              if(res.data.Result.Base!=1){
                this.domData.push(res.data.Result[i])
                this.recoData.push(res.data.Result[i])
              }
            }
          }
        })
    }
  },
  updata() {

  },
  mounted() {
    // this.getAllData();
    this.recoData = JSON.parse(JSON.stringify(this.domData))

  },
  created() {

  }

}
</script>

<style lang="scss" src='./css/input.scss' type='text/css'>
Error:Source sample is missing.
</style>
