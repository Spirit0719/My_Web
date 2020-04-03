<script>
    import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
    import Logger from '../../TsData/Logger';
    import AxiosBaseApi from '../../TsData/Base/AxiosBaseApi';
    import config from '../../../Build/config'
    import UserApi from '../../TsData/Api/UserApi';
    import GeoJosn from '../../TsData/AxiosApi/GeoJson/GeoJson';
    import MapBox from '../../TsData/MapBox/MapBoxBaseApi';

    let self = undefined;
    export default {
        data() {
            return {}
        },
        created() {
            AxiosBaseApi.GetBaseUrl(config);
            self = this;
        },
        mounted() {
            self.initMopBox();
        },
        activated() {

        },
        // 所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。
        computed: {
            ...mapState({State: state => state})
        }
        , methods: {
            /**
             * init  mopBox service
             */
            initMopBox() {
                MapBox.init(mapboxgl);


                // map.flyTo(
                //     {
                //         center: [116.90480908806899, 36.695808203785646],
                //         zoom: 16,
                //         speed: 1.2,
                //     });
                //
                // GeoJosn.GeoJson1(ret => {
                //     Logger.Log("GeoJson--Hospital数据:", ret);
                //     map.on('load', function () {       /* 为map添加load事件监听器 */
                //         map.addLayer({
                //             "id": "Hospital",
                //             "type": "fill",
                //             "layout": {},
                //             "paint": {
                //                 // "fill-color": "#ff0c07",
                //                 "fill-color": ["get", "Color"],
                //             },
                //             source: {
                //                 "type": "geojson",
                //                 /* GeoJSON格式数据 */
                //                 "data": ret
                //             }
                //
                //         });
                //     });
                //
                //
                // });
                //
                // map.on('mouseenter', 'Hospital', function() {
                //     map.getCanvas().style.cursor = 'pointer';
                // });
                //
                //
                // // 点击 线 图层的符号，显示信息
                // map.on('click', 'Hospital', function (e) {
                //     let coordinates = e.lngLat;
                //     let description = "房间名称:"+e.features[0].properties.name;
                //
                //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                //     }//防止数据越界
                //
                //     new self._mapbox.Popup()
                //         .setLngLat(coordinates)
                //         .setHTML(description)
                //         .addTo(map);
                //
                // });
            }
        }

    }
</script>
<template>
    <div :class="[$style.CurrentComponent]">
        MapBox测试页面
        <div :class="[$style.BigLoginDiv]" id="map">
        </div>
    </div>
</template>

<style lang="stylus" module>
    .CurrentComponent {
        width 100%
        height 100%
        background #efefef
    }

    .BigLoginDiv {
        width 1400px
        height 800px
        overflow hidden
        position absolute
        top: 50%
        left 50%
        margin-top -400px
        margin-left -700px
        box-shadow: 0 5px 40px #c5c3c3;
    }

</style>
