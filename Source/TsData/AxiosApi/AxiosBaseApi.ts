/**
 * 获取基础api接口信息----与后端进行交互-----之后所有api信息都继承于这里
 * 允许对用户信息进行增删改查
 */


import Store from '../../Store'
import axios from 'axios'
import Logger from '../../TsData/Logger';

export default class AxiosBaseApi {
    private static baseUrl: string;
    private static config: any;
    private static axiosSelf: any;

    public static GetBaseUrl(config, BUILD_FLAG__ApiHostUrl) {
        let self = this;
        self.config = config;

        self.baseUrl = BUILD_FLAG__ApiHostUrl;
        // 请求延迟
        axios.defaults.timeout = 500000;
        // 添加headers表头
        axios.defaults.headers = {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS"
        };
        // 添加基础编辑类
        axios.defaults.baseURL = self.baseUrl;


        // console.log("AxiosBaseApi默认接口", self.config);
        self.axiosSelf = axios.create({
            baseURL: self.baseUrl,
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        });

        // 添加响应拦截器,发起请求-----时候执行
        self.axiosSelf.interceptors.request.use(function (response) {

            self.config.headers["access-userid"] = Store.state.UserData.UserId;
            self.config.headers["access-token"] = Store.state.UserData.Token;
            return response;
        }, function (error) {
            return Promise.reject(error);
        });

        // 添加响应拦截器,返回请求得到的数据-----时候执行     ---可以用来解决用户重复登录的问题
        self.axiosSelf.interceptors.response.use(function (response) {
            if (response.data.code === 'GW0001') {
            } else if (response.data.code === '000000') {
            } else {
            }
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
    }

    /**
     * Get方法获取数据
     * @param url
     * @param object
     * @param str
     */
    public static Get(url, object, str) {
        let self = this;
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: object
            }).then(function (response) {
                Logger.AxiosLog(str, url, response.data);
                resolve(response.data)
            })
                .catch(function (error) {
                    Logger.Error("Get方法获取数据错误(" + self.baseUrl + url + "):", error);
                    reject()
                });
        })
    }

    /**
     * Post方法传递数据
     * @param url
     * @param object
     * @param str
     */
    public static Post(url, object, str) {
        let self = this;
        return new Promise((resolve, reject) => {
            axios.post(url, object).then(function (response) {
                Logger.AxiosLog(str, url, response.data);
                resolve(response.data)
            })
                .catch(function (error) {
                    Logger.Error("Post方法获取/提交数据错误(" + self.baseUrl + url + "):", error);
                    reject()
                });
        })
    }

    /**
     * Put方法传递数据
     * @param url
     * @param object
     * @param str
     */
    public static Put(url, object, str) {
        let self = this;
        return new Promise((resolve, reject) => {
            axios.put(url, object).then(function (response) {
                Logger.AxiosLog(str, url, response.data);
                resolve(response.data)
            })
                .catch(function (error) {
                    Logger.Error("Put方法修改数据错误(" + self.baseUrl + url + "):", error);
                    reject()
                });
        })
    }

    /**
     * Delete 删除数据
     * @param url
     * @param object
     * @param str
     */
    public static Delete(url, object, str) {
        let self = this;
        return new Promise((resolve, reject) => {
            axios.delete(url, {
                data: object
            }).then(function (response) {
                Logger.AxiosLog(str, url, response.data);
                resolve(response.data)
            })
                .catch(function (error) {
                    Logger.Error("Delete方法删除数据错误(" + self.baseUrl + url + "):", error);
                    reject()
                });
        })
    }

    /**
     * upload 上传数据
     * @param url
     * @param object
     * @param str
     */
    public static Upload(url, object, str) {
        let self = this;
        return new Promise((resolve, reject) => {
            axios.post(url, object, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
                Logger.AxiosLog(str, url, response.data);
                resolve(response.data)
            })
                .catch(function (error) {
                    Logger.Error("Upload上传文件错误(" + self.baseUrl + url + "):", error);
                    reject()
                });
        })
    }

    /**
     * 获取GeoJson数据
     * @param url
     * @param object
     * @param str
     */
    public static GeoJson(url, object, str) {
        let self = this;
        return new Promise((resolve, reject) => {
            axios.get(url).then(function (response) {
                Logger.AxiosLog(str, url, response.data);
                resolve(response.data)
            })
                .catch(function (error) {
                    Logger.Error("GeoJson数据获取错误(" + self.baseUrl + url + "):", error);
                    reject()
                });
        })
    }


}
