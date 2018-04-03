import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login/login'
import main from '@/components/main/main'
import content from '@/components/content/content'
import visaList from '@/components/visaList/visaList'
import schedule from '@/components/schedule/schedule'
import jindu from '@/components/schedule/jindu'
import history from '@/components/history/history'
import personSet from '@/components/personSet/personSet.vue'
import personSafe from '@/components/personSafe/personSafe.vue'
import forgetPassword from '@/components/forgetPasw/forgetPsw.vue'

import printInfo from '@/components/printInfo/printInfo'

import allInfo from '@/components/infomation/allInfo'

import infomation from '@/components/infomation/infomation'
import checkInfo from '@/components/checkInfo/checkInfo'
import submitInfo from '@/components/submitInfo/submitInfo'
import test from '@/test/test.vue'
import input from '@/test/input.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: login
    }, {
      path: '/infomation',
      name: 'infomation',
      component: infomation
    }, {
      path: '/printInfo',
      name: 'printInfo',
      component: printInfo
    }, {
      path: '/main',
      component: main,
      children: [{
        path: "/main/content",
        component: content,
        children: [{
          path: "/main/content/checkInfo",
          component: checkInfo
        }, {
          path: "/main/content/info",
          component: allInfo
        }, {
          path: "/main/content/submitInfo",
          component: printInfo
        }]
      }, {
        path: "/main/visaList",
        component: visaList, //登录进入 表格列表
      }, {
        path: "/main/schedule",
        component: schedule, //进度查询
      }, {
        path: "/main/jindu",
        component: jindu, //进度查询
      }, {
        path: "/main/history",
        component: history, //签证历史
      }, {
        path: "/main/personal/setting",
        component: personSet
      }, {
        path: "/main/personal/safe",
        component: personSafe
      }, {
        path: "/main/forgetPassword",
        component: forgetPassword
      },{
        path: "/test",
        component: test
      },{
        path: "/test1",
        component: input
      }]
    }

  ]
})
