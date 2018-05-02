import Vue from "vue";
import App from "./App.vue";
import "../dist/jquery-3.1.1.min.js";
import "font-awesome/css/font-awesome.css";
import "../dist/bootstrap/css/bootstrap.min.css";
import "clamp-js"
import ElementUI from "element-ui";
import VueRouter from "vue-router";
import Vuex from "vuex";
import "element-ui/lib/theme-default/index.css";
import Bar from "./Bar.vue";
import Home from "./Home.vue";
import DetailPage from "./DetailPage.vue";
import store from "./vuex/store";
import login from "./user/login.vue";
import register from "./user/register.vue";
import cart from "./cart.vue";

import mytest from "./mytest.vue";
import Admin from "./admin/index.vue";
import Personal from "./user/personal.vue";
import UserManage from "./admin/UsersManage.vue";
import OrderManage from "./admin/OrdersManage.vue";
import test from "./admin/orderItem.vue"
import BookManage from "./admin/BooksManage.vue"
import upload from './uploadimg.vue'
import statisticChart from './admin/statistic.vue'
import echarts from 'echarts'
import encry from './en.vue'

Vue.prototype.$echarts = echarts 
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Vuex);

const routes = [
    {path: '/', component: Home,hidden: true},
    {path: '/books/:id', component: DetailPage,hidden: true},
    {path: '/search', component: Bar,hidden: true},
    {path: '/login', component: login,hidden: true},
    {path: '/register', component: register,hidden: true},
    {path: '/test', component: mytest,hidden: true},
    {path: '/cart', component: cart,hidden: true},
    {
        path: '/admin',
        name:"管理员管理界面",
        iconCls:"fa fa-pencil fa-fw",
        component: Admin,
        children:[
            {path:'/users',component:UserManage,name:"Users Manage"},
            {path:'/orders',component:OrderManage,name:"Orders Manage"},
            {path:'/books',component:BookManage,name:"Books Manage"},
            {path:'/statistic',component:statisticChart,name:"Statistic Manage"}
        ]
    },
    {path: '/personal', component: Personal,hidden: true},
    {path:'/tt',component:upload},
    {path:'/testen',component:encry}
    // {path:'/up',component:upload}
];


const router = new VueRouter({
    routes
});



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");