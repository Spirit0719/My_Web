<script>
    import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
    import Logger from '../TsData/Logger';
    import AxiosBaseApi from '../TsData/Base/AxiosBaseApi';
    import config from '../../Build/config'
    import UserApi from '../TsData/Api/UserApi';

    export default {
        data() {
            return {
                Account: "admin",
                Password: '123',
                UserName: "0719",
            }
        },
        created() {
            AxiosBaseApi.GetBaseUrl(config);
        },
        mounted() {

        },
        activated() {

        },
        // 所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。
        computed: {
            ...mapState({State: state => state})
        }
        , methods: {
            BtnLoginClick() {
                let self = this;
                // let user = new UserApi();
                UserApi.GetUserAll(ret=>{
                    Logger.Log("获取所有用户数据",ret)
                });

                if (self.Account === "admin" && self.Password === "123") {

                    self.$message({
                        message: '登陆成功',
                        type: 'success'
                    });
                    // 设置cookies和store中的值
                    self.State.UserData.Account = self.Account;
                    self.State.UserData.UserName = self.UserName;
                    // self.State.actions.CookiesSet("Account", self.State.UserData.Account);
                    Logger.Log("登陆User数据", self.State.UserData);
                    // 跳转到主页面
                    // self.$router.push({path: '/Home', params: {}, query: {}})

                } else {
                    this.$message.error('登录名密码错误');
                }
            }
            , Register() {
                this.$message({
                    message: '注册功能暂时关闭,有需求请联系管理员!',
                    type: 'warning'
                });
            }
        }
        ,
    }
</script>
<template>
    <div :class="[$style.CurrentComponent]">
        <div :class="[$style.BigLoginDiv]">
            <div :class="[$style.backimgBox]">
                <div></div>
                <div>
                    <p>室内导航项目</p>
                </div>
                <div style="border: none">

                </div>
                <div>
                    室内导航项目
                </div>
            </div>

            <div :class="[$style.Content]">
                <div :class="[$style.loginBox]">
                    <div :class="[$style.lodinmianban]">
                        <div :class="[$style.lodinmianban_t]">
                            室内导航项目
                        </div>
                        <div :class="[$style.lodinmianban_c]">
                            <div :class="[$style.lodinminame]">用户名</div>
                            <input :class="[$style.lodinmianban_c_input]" v-model="Account"/>
                            <div :class="[$style.lodinminame]">请输入密码</div>
                            <input :class="[$style.lodinmianban_c_input]" v-model="Password"
                                   type="password" @keyup.enter="BtnLoginClick"/>
                        </div>
                        <div :class="[$style.lodinmianban_b]">
                            <div :class="[$style.b_btn]" @click="BtnLoginClick">
                                登录
                            </div>
                            <!-- 注册按钮 -->
                            <div :class="[$style.btnRegister]">
                                <p @click="Register" :class="[$style.RegisterT]">立即注册</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

    .backimgBox {
        box-sizing border-box;
        padding 30px

        width 48%
        float left
        background-image url("../../static/img/bg.png")
        background-position center
        background-repeat no-repeat
        background-size cover
        height 100%
        position relative

    }

    .backimgBox div:nth-child(1) {
        width: 132px;
        height: 43px;
        background-image url("../../static/img/logo.png")
        background-size cover
    }

    .backimgBox div:nth-child(2) {
        width 100%
        height 100px
        margin 280px auto
        margin-bottom 150px
        text-align center
    }

    .backimgBox div:nth-child(2) p {
        color: #d4d2d2;
        font-size: 22px;
        width: 100%;
        margin-bottom: 25px;
    }

    .backimgBox div:nth-child(3) {
        width: 21%;
        height: 40px;
        line-height: 38px;
        margin: 0 auto;
        border: 1px solid #ddbf61;
        font-size: 17px;
        border-radius: 24px;
        color: #f0f0f0;
        text-align: center;
    }

    .backimgBox div:nth-child(4) {
        position absolute
        bottom 30px
        left 50%
        width 300px
        margin-left -150px
        text-align center
        color #cecece
    }

    .Content {
        width 52%
        height 100%
        float left
        background #fff
    }

    .loginBox {
        box-sizing: border-box;
        padding: 100px 180px;
        width 100%
        height 100%
        position relative
    }

    .lodinmianban {
        font-family: "微软雅黑 Regular";
    }

    .lodinmianban_t {
        width: 100%;
        color: #040609;
        font-size: 25px;
        font-weight: bold;
        font-family: "微软雅黑 Regular";
        margin-top: 100px;
    }

    .lodinmianban_c {
        width 100%
    }

    .lodinmianban_c_input {
        width: 100%;
        height: 45px;
        background: rgba(0, 0, 0, 0);
        padding-left: 10px;
        border: solid 0.5px #9E9E9E;
        font-size: 21px;
        color: rgba(0, 0, 0, 0.8);
        font-family: "微软雅黑 Regular";
        -moz-box-sizing: content-box;
        box-sizing: content-box;
        border-radius: 5px;
    }

    .lodinmianban_b {
        width 100%
        margin-top 50px
    }

    .b_btn {
        width: 100%;
        margin: 0 auto;
        height: 50px;
        background: #42475d;
        line-height: 50px;
        text-align: center;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        border-radius: 8px;
    }

    .lodinminame {
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        margin-top: 10px;
    }

    .lodinmianban_f {
        margin-top 35px
        font-size 15px
        font-family "微软雅黑 Light"
        color rgba(0, 0, 0, 0.6)
        margin-bottom 35px
        text-align center
    }

    .btnRegister {
        width: 100%;
        height: 50px;
        line-height 50px
        text-align center
        text-decoration none
        font-size 15px
        color #0d69ca
        cursor pointer
    }

    .btnRegister a:visited {
        color: #0d69ca;
    }

    .btnRegister a:link {
        color: #0d69ca;
    }
</style>
