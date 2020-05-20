import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import Cookies from 'js-cookie'

export default new Vuex.Store({
    state: {
        Axios: {
            UserApi: undefined,
            BuildingApi: undefined,
            FloorApi: undefined,
            RoomApi: undefined,
            ApApi: undefined,
        },
        UserData: undefined,

        //公用方法
        actions: {
            CookiesSet(key, value) {
                let self = this;
                Cookies.set(key, value + '', {expires: 365, domain: isProduction ? 'zhiutech.com' : undefined})
            },
            CookiesRemove(key) {
                let self = this;
                Cookies.remove(key, {expires: 365, domain: isProduction ? 'zhiutech.com' : undefined})
            },
        }
    },
    mutations: {
        isPaying(state, object) {
            state.isPaying = object
        },
    },
    actions: {},
    getters: {
        IsLogin: (state, getters) => {
            return state.UserId !== 0 && state.UserId !== '' && state.UserId !== '0' && state.UserId !== undefined
        },
    },
    modules: {
        //CimOperate: CimOperateStore,
    }
})
