/**
 * 获取用户信息api
 * 允许对用户信息进行增删改查
 */

import Logger from '../../TsData/Logger';
import AxiosBaseApi from "../Base/AxiosBaseApi";

export default class UserApi extends AxiosBaseApi {

    /**
     * 获取GeoJson数据
     */
    public static GeoJson1(callback, object = {}) {
        let url = "./static/GeoJson/hospital.json";
        this.GeoJson(url, object).then(ret => {
            callback(ret);
        })
    }


}