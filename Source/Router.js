import Vue from 'vue'
import Router from 'vue-router'
import store from './Store'

Vue.use(Router);

//打包到App.js
import Login from './page/Login'
import Shp from './page/ShpCad/Shp'
import MapBox from './page/ShpCad/MapBox'


const routeList = [
    {
        path: '/',
        name: '',
        component: MapBox,
        meta: {
            title: '首页',
            requiresAuth: false,
            mainPage: false,
        },
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login,
        meta: {
            title: '首页',
            requiresAuth: false,
            mainPage: false,
        },
    },
    {
        path: '/Shp',
        name: 'Shp',
        component: Shp,
        meta: {
            title: 'Shp',
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