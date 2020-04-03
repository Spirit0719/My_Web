/**
 * 初始化MapBox基础功能,后续MapBox其他类都会继承此基础类功能
 * init MapBox
 */

// @ts-ignore
import Store from '../../Store'
import Logger from '../../TsData/Logger';

export default class ThreeJsBaseApi {
    public static _viewer: any = undefined;
    public static _mapViewer: any = undefined;

    /**
     * init Three engine
     * @param ThreeJS ThreeJS
     */
    public static init(ThreeJS) {
        let self = this;
        self._viewer = ThreeJS;

        self._initScene()
    }


    /**
     * init Scene
     * @private
     */
    private static _initScene(){

    }

    /**
     * init Camera
     * @private
     */
    private static _initCamera(){

    }

    /**
     * init renderer
     * @private
     */
    private static _initRenderer(){

    }

    /**
     * init Light
     * @private
     */
    private static _initLight(){

    }

    /**
     * init OrbitControls
     * @private
     */
    private static _initOrbitControls(){

    }

    /**
     * init Stats
     * @private
     */
    private static _initStats(){

    }


}