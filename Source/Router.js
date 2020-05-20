import Vue from 'vue'
import Router from 'vue-router'
import store from './Store'

Vue.use(Router);

//打包到App.js
import Login from './Page/WebPage/Login'
//分别打包
//const Login = resolve => require(['./page/Login.vue'], resolve)
//按组打包
//const Home = r => require.ensure([], () => r(require('./page/Index.vue')), 'main')
//const Home = r => require.ensure([], () => r(require('./page/Index.vue')), 'main')
//const Home = r => require.ensure([], () => r(require('./page/Index.vue')), 'main')

let routeList = undefined;

const PcRouteList = [
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

const AppRouteList = [];

if (BUILD_FLAG__NODE_ENV === "dev") {
    routeList = PcRouteList;
} else if (BUILD_FLAG__NODE_ENV === "devApp") {
    routeList = AppRouteList;
} else if (BUILD_FLAG__NODE_ENV === "pc") {
    routeList = PcRouteList;
} else if (BUILD_FLAG__NODE_ENV === "app") {
    routeList = AppRouteList;
}


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