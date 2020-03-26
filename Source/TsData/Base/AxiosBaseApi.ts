/**
 * 获取基础api接口信息----与后端进行交互-----之后所有api信息都继承于这里
 * 允许对用户信息进行增删改查
 */

// @ts-ignore

import Store from '../../Store'
import axios from 'axios'
import Logger from '../../TsData/Logger';

export default class AxiosBaseApi {
    private static baseUrl: string;
    private static config: any;

    public static GetBaseUrl(config) {
        let self = this;
        self.config = config;
        if (process.env.NODE_ENV === "development") {
            self.baseUrl = self.config.dev.BUILD_FLAG__ApiHostUrl
        } else if (process.env.NODE_ENV === "qa") {
            self.baseUrl = self.config.qa.BUILD_FLAG__ApiHostUrl
        } else if (process.env.NODE_ENV === "rc") {
            self.baseUrl = self.config.rc.BUILD_FLAG__ApiHostUrl
        }

        // 请求延迟
        axios.defaults.timeout = 500000;
        // 添加headers表头
        axios.defaults.headers = {
            "Content-Type": "application/json;charset=UTF-8"
        };

        console.log("AxiosBaseApi默认接口", self.config);
        let axiosSelf = axios.create({
            // baseURL: AxiosBaseApi.url,
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        });

        // 添加响应拦截器,发起请求-----时候执行
        axiosSelf.interceptors.request.use(function (response) {

            self.config.headers["access-userid"] = Store.state.UserData.UserId;
            self.config.headers["access-token"] = Store.state.UserData.Token;
            return response;
        }, function (error) {
            return Promise.reject(error);
        });

        // 添加响应拦截器,返回请求得到的数据-----时候执行     ---可以用来解决用户重复登录的问题
        axiosSelf.interceptors.response.use(function (response) {
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
     */
    public static Get(url, object) {
        let self = this;
        return new Promise((resolve, reject) => {
            axios.get(self.baseUrl + url, {
                params: object
            }).then(function (response) {
                resolve(response.data)
            })
                .catch(function (error) {
                    Logger.Error("Get方法获取数据错误:", error);
                    reject()
                });
        })
    }

    /**
     * Post方法传递数据
     * @param url
     * @param object
     */
    public static Post(url, object) {
        let self = this;
        return new Promise((resolve, reject) => {
            axios.post(self.baseUrl + url, object).then(function (response) {
                resolve(response.data)
            })
                .catch(function (error) {
                    Logger.Error("Post方法获取/提交数据错误:", error);
                    reject()
                });
        })
    }

    /**
     * Put方法传递数据
     * @param url
     * @param object
     */
    public static Put(url, object) {
        let self = this;
        return new Promise((resolve, reject) => {
            axios.put(self.baseUrl + url, object).then(function (response) {
                resolve(response.data)
            })
                .catch(function (error) {
                    Logger.Error("Put方法修改数据错误:", error);
                    reject()
                });
        })
    }

    /**
     * Delete 删除数据
     * @param url
     * @param object
     */
    public static Delete(url, object) {
        let self = this;
        return new Promise((resolve, reject) => {
            axios.delete(self.baseUrl + url, {
                data: object
            }).then(function (response) {
                resolve(response.data)
            })
                .catch(function (error) {
                    Logger.Error("Delete方法删除数据错误:", error);
                    reject()
                });
        })
    }

    /**
     * upload 上传数据
     * @param url
     * @param object
     */
    public static Upload(url, object) {
        let self = this;
        return new Promise((resolve, reject) => {
            axios.post(self.baseUrl + url, object, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
                resolve(response.data)
            })
                .catch(function (error) {
                    Logger.Error("Upload上传文件错误:", error);
                    reject()
                });
        })
    }

}