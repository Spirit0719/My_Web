import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import Cookies from 'js-cookie'

import {AxiosBaseApi} from './TsData/Base/AxiosBaseApi'

export default new Vuex.Store({
    state: {
        IsReadUserContext: false,
        IsApp: false,
        UserData: {
            Account: "",
            UserId: '00-00-00-00',
            UserName: "",
            Token: "00-00-00-00",
            CurrentUserPermissionList: [],
        },

        //公用方法
        actions: {
            GetFileUrl(object) {
                let self = this;
                object.fileName = object.fileName ? '?name=' + object.fileName : '';
                return baseFilesHostUrl + 'file-server/api/GetFile/' + object.fileId + object.fileName
            },

            getModelFilePackageAndDownloadUrl(object) {
                let self = this;
                return baseFilesHostUrl + 'file-server/api/files/modelFilePackageAndDownload?fileId=' + object.fileId + "&fileName=" + object.fileName + "&operationType=" + object.type
            },

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
    actions: {

        //
        // //region 用户登录
        //
        // Login({state, commit, rootState}, object) {
        //     let self = this;
        //     return new Promise((resolve, reject) => {
        //         axios.post(state.Ums + 'user/login', object).then(function (response) {
        //             resolve(response.data)
        //         })
        //             .catch(function (error) {
        //                 console.log(error);
        //                 reject()
        //             });
        //     })
        // },
        // //endregion
        // //region 注册用户
        // register({state, commit, rootState}, object) {
        //     let self = this;
        //     return new Promise((resolve, reject) => {
        //         axios.post(state.Ums + 'user/register', object).then(function (response) {
        //             resolve(response.data)
        //         })
        //             .catch(function (error) {
        //
        //                 console.log(error);
        //                 reject()
        //             });
        //     })
        // },
        // //endregion
        //
        // //region 调用接口示例
        // ApiTestUpdateFiles({state, commit, rootState}, object) {
        //     let self = this;
        //     return new Promise((resolve, reject) => {
        //         axios.post('/info/register', object, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
        //             resolve(response.data)
        //         })
        //             .catch(function (error) {
        //                 console.log(error);
        //                 reject()
        //             });
        //     })
        // },
        // ApiTestPost({state, commit, rootState}, object) {
        //     let self = this;
        //     return new Promise((resolve, reject) => {
        //         axios.post('/project/save', object).then(function (response) {
        //             resolve(response.data)
        //         })
        //             .catch(function (error) {
        //                 console.log(error);
        //                 reject()
        //             });
        //     })
        // },
        // ApiTestPut({state, commit, rootState}, object) {
        //     let self = this;
        //     return new Promise((resolve, reject) => {
        //         axios.put('project/save', object).then(function (response) {
        //             resolve(response.data)
        //         })
        //             .catch(function (error) {
        //                 console.log(error);
        //                 reject()
        //             });
        //     })
        // },
        // ApiTestDel({state, commit, rootState}, object) {
        //     let self = this;
        //     return new Promise((resolve, reject) => {
        //         axios.delete('permission', {
        //             data: object
        //         }).then(function (response) {
        //             resolve(response.data)
        //         })
        //             .catch(function (error) {
        //                 console.log(error);
        //                 reject()
        //             });
        //     })
        // },
        // ApiTestGet({state, commit, rootState}, object) {
        //     let self = this;
        //     return new Promise((resolve, reject) => {
        //         axios.get('project/listByUserId', {
        //             params: object
        //         }).then(function (response) {
        //             resolve(response.data)
        //         })
        //             .catch(function (error) {
        //
        //                 console.log(error);
        //                 reject()
        //             });
        //     })
        // },
        // //endregion/get

    },
    getters: {
        IsLogin: (state, getters) => {
            return state.UserId !== 0 && state.UserId !== '' && state.UserId !== '0' && state.UserId !== undefined
        },
    },
    modules: {
        //CimOperate: CimOperateStore,
    }
})
