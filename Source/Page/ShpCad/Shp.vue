<script>
    import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
    import Logger from '../../TsData/Logger';
    import AxiosBaseApi from '../../TsData/Base/AxiosBaseApi';
    import config from '../../../Build/config'
    import UserApi from '../../TsData/Api/UserApi';

    let self = undefined;
    export default {
        data() {
            return {

            }
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
            initMopBox(){

            }
        }

    }
</script>
<template>
    <div :class="[$style.CurrentComponent]">
        <div :class="[$style.BigLoginDiv]">
            shp测试页面
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
