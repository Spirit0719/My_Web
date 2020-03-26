import Vue from 'vue'
import Router from 'vue-router'
import store from './Store'

Vue.use(Router);

//打包到App.js
import Login from './page/Login'
//分别打包
//const Login = resolve => require(['./page/Login.vue'], resolve)
//按组打包
//const Home = r => require.ensure([], () => r(require('./page/Index.vue')), 'main')
//const Home = r => require.ensure([], () => r(require('./page/Index.vue')), 'main')
//const Home = r => require.ensure([], () => r(require('./page/Index.vue')), 'main')

const routeList = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: {
            title: '首页',
            requiresAuth: false,
            mainPage: false,
        },
    },
    {
        path: '/Home',
        name: 'Home',
        redirect: {
            name: 'RootPage'
        },
        meta: {
            title: '首页',
            requiresAuth: false,
            mainPage: false,
        },
    },
];
const router = new Router({
    routes: routeList
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

router.afterEach((to, from) => {
    //console.log("afterEach", to, from)
});

export default router