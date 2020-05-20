/**
 * 初始化Babylon基础功能,后续Babylon其他类都会继承此基础类功能
 * init Babylon
 */

import Store from '../../Store'
import Logger from '../../TsData/Logger';

export default class BabylonBaseApi {
    public static _viewer: any = undefined;

    /**
     * init Babylon engine
     * @param Babylon Babylon
     */
    public static init(Babylon) {
        let self = this;
        self._viewer = Babylon;
    }
}

