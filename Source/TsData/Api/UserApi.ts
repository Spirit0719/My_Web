/**
 * 获取用户信息api
 * 允许对用户信息进行增删改查
 */

import Logger from '../../TsData/Logger';
import AxiosBaseApi from "../Base/AxiosBaseApi";

export default class UserApi extends AxiosBaseApi{

    /**
     * 获取所有用户数据
     */
    public static GetUserAll(callback,object = {}){
        let url = "indoor_nav/user";
        this.Get(url, object).then(ret =>{
            callback(ret);
        })
    }



}