import 'pepjs'
import Vue from 'vue'
import app from './App.vue'
import router from './Router'
import store from './Store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './Common/css/iconfont/iconfont.css'
// import aliyun icon library
// <i class="iconfont icon-footer-"></i>

import AxiosBaseApi from "./TsData/AxiosApi/AxiosBaseApi";
import config from "../Build/config";
import UserApi from "./TsData/AxiosApi/ToolApis/UserApi";
import BuildingApi from "./TsData/AxiosApi/ToolApis/BuildingApi";
import FloorApi from "./TsData/AxiosApi/ToolApis/FloorApi";
import RoomApi from "./TsData/AxiosApi/ToolApis/RoomApi";
import ApApi from "./TsData/AxiosApi/ToolApis/ApApi";
import UserEntity from "./TsData/Entity/UserEntity";


Vue.use(ElementUI);
Vue.config.productionTip = false;// 将此值设置为 false ,会关闭 Vue 启动时的提示信息，推荐

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
        // 聚焦元素
        el.focus()
    }
});
// 注册一个全局自定义指令 `v-blur`
Vue.directive('blur', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
        // 聚焦元素
        el.blur()
    }
});

//  注册全局api数据
AxiosBaseApi.GetBaseUrl(config,BUILD_FLAG__ApiHostUrl);
store.state.Axios.UserApi = new UserApi();
store.state.Axios.BuildingApi = new BuildingApi();
store.state.Axios.FloorApi = new FloorApi();
store.state.Axios.RoomApi = new RoomApi();
store.state.Axios.ApApi = new ApApi();

// 注册全局entity数据
store.state.UserData = new UserEntity();



store.vm = new Vue({
    el: '#root',
    router,
    store,
    template: '<app/>',
    components: {app},
});


