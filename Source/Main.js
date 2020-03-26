import 'pepjs'
import Vue from 'vue'
import app from './App.vue'
import router from './Router'
import store from './Store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false//将此值设置为 false ,会关闭 Vue 启动时的提示信息，推荐

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
        // 聚焦元素
        el.focus()
    }
})
// 注册一个全局自定义指令 `v-blur`
Vue.directive('blur', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
        // 聚焦元素
        el.blur()
    }
})
store.vm = new Vue({
    el: '#root',
    router,
    store,
    template: '<app/>',
    components: {app},
});


