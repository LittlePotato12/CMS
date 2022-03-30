import Vue from 'vue'
import App from './App.vue'
import { Button, Container, Aside, Header, Main, Menu, Submenu, MenuItem, MenuItemGroup, DropdownMenu, DropdownItem, Dropdown, Row, Col, Card, Table, TableColumn, Breadcrumb, BreadcrumbItem, Tag, Form, FormItem, Select, Option, Switch, Input, DatePicker, Dialog, Pagination, MessageBox, Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router/index.js'
import store from './store/index.js'
import http from 'axios'
import '../api/mock.js'

Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Container)
Vue.use(Aside);
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu);
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(Input)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)

Vue.prototype.$http = http;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
//路由导航守卫，来监测是否有token，跳转到首页
router.beforeEach((to, from, next) => {
  store.commit('getToken');
  const token = store.state.User.token;
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
