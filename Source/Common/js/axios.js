import axios from 'axios'
// @ts-ignore
import config from '../../../build/config'
import {Notification} from 'element-ui';
import store from "../../Store";
import Cookies from 'js-cookie'
import router from '../../Router'

axios.defaults.timeout = 500000;
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.delete['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers = {
    "Content-Type": "application/json;charset=UTF-8"
};
//axios.defaults.withCredentials = true  //设置这个允许跨域访问Cookies  该XMLHttpRequest.withCredentials属性Boolean指示是否Access-Control应使用cookie



let baseUrl = "";
if(process.env.NODE_ENV === "development"){
    baseUrl = config.dev.BUILD_FLAG__ApiHostUrl
}else if(process.env.NODE_ENV === "qa"){
    baseUrl = config.qa.BUILD_FLAG__ApiHostUrl
}else if(process.env.NODE_ENV === "rc"){
    baseUrl = config.rc.BUILD_FLAG__ApiHostUrl
}
console.log("axios默认接口",JSON.stringify(process.env),config,baseUrl);
let axiosSelf = axios.create({
    baseURL: baseUrl,
    headers: {'Content-Type': 'application/json;charset=UTF-8'}
});
// Add a request interceptor
axiosSelf.interceptors.request.use(function (config) {
    // 网管
    // config.headers["access-userid"] = store.state.UserId;
    // 暂时无网管
    // config.headers["access-userid"] = '1fcf54fefa6941b8a2cd2bbf4cb4ef0f';
    config.headers["access-userid"] = store.state.UserId;
    config.headers["access-token"] = store.state.Token;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosSelf.interceptors.response.use(function (response) {
    // Do something with response data
    if (response.data.code === 'GW0001') {
        store.state.UserId = "";
        store.state.Token = "";
        store.state.actions.CookiesRemove('UserId');
        store.state.actions.CookiesRemove('Token');
        router.push({name: 'Login', params: {}, query: {}})
    } else if (response.data.code === '000000') {

    } else {
        debugger
        console.log("请求返回", response);
        Notification({
            title: '提示',
            message: response.data.errorMsg,
            type: 'warning'
        });
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default axiosSelf;
