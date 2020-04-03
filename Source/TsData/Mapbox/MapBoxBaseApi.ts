/**
 * 初始化MapBox基础功能,后续MapBox其他类都会继承此基础类功能
 * init MapBox
 */

// @ts-ignore
import Store from '../../Store'
import Logger from '../../TsData/Logger';
import GeoJosn from "../AxiosApi/GeoJson/GeoJson";

export default class MapBoxBaseApi {
    public static _mapbox: any = undefined;
    public static _mapViewer: any = undefined;

    /**
     * 初始化MapBox页面
     * @param MapboxGL MapboxGL
     */
    public static init(MapboxGL) {
        let self = this;
        self._mapbox = MapboxGL;

        // self._mapbox.accessToken = 'pk.eyJ1Ijoic3Bpcml0MDcxOSIsImEiOiJjazd0dG9vY3gwdDZpM2ZyMjRsdDcwZXplIn0.9da9zNJYHawOscJ7P2YdBg';
        self._mapbox.accessToken = 'pk.eyJ1Ijoic3Bpcml0MDcxOSIsImEiOiJjazd0dG9vY3gwdDZpM2ZyMjRsdDcwZXplIn0.9da9zNJYHawOscJ7P2YdBg';
        self._mapViewer = new self._mapbox.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
        });
        let map = self._mapViewer;
        map.flyTo(
            {
                center: [116.90480908806899, 36.695808203785646],
                zoom: 16,
                speed: 1.2,
            });

        GeoJosn.GeoJson1(ret => {
            Logger.Log("GeoJson--Hospital数据:", ret);
            map.on('load', function () {       /* 为map添加load事件监听器 */
                map.addLayer({
                    "id": "Hospital",
                    "type": "fill",
                    "layout": {},
                    "paint": {
                        // "fill-color": "#ff0c07",
                        "fill-color": ["get", "Color"],
                    },
                    source: {
                        "type": "geojson",
                        /* GeoJSON格式数据 */
                        "data": ret
                    }

                });
            });


        });

        map.on('mouseenter', 'Hospital', function() {
            map.getCanvas().style.cursor = 'pointer';
        });


        // 点击 线 图层的符号，显示信息
        map.on('click', 'Hospital', function (e) {
            let coordinates = e.lngLat;
            let description = "房间名称:"+e.features[0].properties.name;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }//防止数据越界

            new self._mapbox.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);

        });
    }


}