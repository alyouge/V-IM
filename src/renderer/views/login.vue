<template>
    <div class="login">
        <Top></Top>
        <div class="login-panel" style="-webkit-app-region: no-drag">
            <div class="title">{{app_name}} 登录</div>
            <Alert v-if="showErr" type="error">{{err}}</Alert>
            <div class="item">
                <label>手机：</label>
                <Input prefix="ios-contact-outline" v-model="username" placeholder="手机" class="item-input"/>
            </div>
            <div class="item">
                <label>密码：</label>
                <Input prefix="ios-lock-outline" type="password" v-model="password" placeholder="密码"
                       class="item-input"/>
            </div>
            <div class="btn item">
                <Button type="success" @click="login()">登录</Button>
            </div>
            <div class="item register">
                <a type="info" class="pull-right" @click="showRegister = true">注册</a>
            </div>
        </div>
        <Modal closable class="user-model" v-model="showSetting"
               footer-hide title="设置" width="300">
            <Input v-model="host" class="setting-item" placeholder="主机地址"/>
            <Button type="primary" ghost long @click="saveSetting" style="margin: 1rem 0">保存</Button>
        </Modal>
        <Modal closable class="user-model" v-model="showRegister"
               footer-hide title="注册新用户" width="300">
            <Input v-model="registerPhone" class="setting-item" placeholder="手机"/>
            <Input v-model="registerUsername" class="setting-item" placeholder="名称"/>
            <Input v-model="registerPassword" type="password" class="setting-item" placeholder="密码"/>
            <Button type="primary" ghost long @click="saveRegister" style="margin: 1rem 0">保存</Button>
        </Modal>
        <Icon type="ios-settings-outline" class="setting" @click="showSetting = true"/>
        <vue-particles color="#dedede" :particlesNumber="50" class="bg-login"></vue-particles>
    </div>
</template>

<script>
  import Top from './im/components/top.vue';
  import conf from './im/conf';
  import RequestUtils from '../utils/RequestUtils';
  import StoreUtils from '../utils/StoreUtils';

  export default {
    name: 'login',
    data() {
      return {
        app_name: conf.app_name,
        username: '',
        password: '',
        registerPhone: '',
        registerUsername: '',
        registerPassword: '',
        err: '',
        showErr: false,
        showSetting: false,
        showRegister: false,
        host: '127.0.0.1'
      };
    },
    components: {
      Top
    },
    methods: {
      saveSetting() {
        let self = this;
        localStorage.setItem('host', self.host);
        self.$Message.success('保存成功！');
        self.showSetting = false;
      },
      clickUser() {
        location.reload();
      },
      saveRegister: function() {
        let self = this;
        if (!/^1[34578]\d{9}$/.test(self.registerPhone)) {
          self.$Message.error('手机号码有误，请重填');
          return;
        }
        let formData = new FormData();
        // 请求参数 ('key',value)
        formData.set('phone', self.registerPhone);
        formData.set('name', self.registerUsername);
        formData.set('password', self.registerPassword);
        fetch(conf.getRegisterUrl(), {
          method: 'POST',
          model: 'cros', //跨域
          headers: {
            Accept: 'application/json'
          },
          body: formData
        })
          .then(response => response.json())
          .then(json => {
            if ('0' === json.resultCode) {
              self.$Message.success('注册成功');
              self.showRegister = false;
            } else {
              self.$Message.error(json.message);
            }
          })
          .catch(() => {
            self.$Message.error('与服务器通讯失败');
          });
      },
      login: function() {
        let self = this;
        let param = new FormData();
        param.set('client_id', 'v-client');
        param.set('client_secret', 'v-client-ppp');
        param.set('grant_type', 'password');
        param.set('scope', 'select');
        param.set('username', self.username.trim());
        param.set('password', self.password.trim());
        let requestApi = RequestUtils.getInstance();
        requestApi
          .login(self.username.trim(), self.password.trim(),self)
          .then(token => {
            console.log("token",token);
            StoreUtils.setToken(token);
            // 获取当前登录的用户，存入store
            return requestApi.request(conf.getInitUrl(), new FormData());
          })
          .then(response=>{
            return response.json();
          })
          .then(json=>{
            console.log("json",json);
            //个人信息
            self.$store.commit('setUser', json.me);
            //好友
            self.$store.commit('setUserFriendList', json.friends);

            //群
            self.$store.commit('setChatGroupList', json.groups);

            //把群组封装到map中
            let chatMap = new Map();
            json.groups.forEach(group => {
              chatMap.set(group.id,group);
            });
            self.$store.commit('setChatMap', chatMap);

            // 跳转到index 页面
            self.$router.push({
              path: '/index/chatBox',
              params: {}
            });
          })
          .catch(function(error) {
            console.log(error);
            self.showErr = true;
            if (error.toString() === 'TypeError: Failed to fetch') {
              self.err = '服务通讯失败，请检查服务设置';
            } else {
              self.err = error.toString();
            }
          });
      }
    },
    created: function() {
      let self = this;
      let host = localStorage.getItem('host');
      if (host) {
        self.host = host;
      } else {
        localStorage.setItem('host', self.host);
      }
    }
  };
</script>

<style lang="scss" scoped>
    @import "./../styles/theme.scss";

    .login {
        height: 100%;
        background: url("../assets/bg.png") no-repeat;
        background-size: 100% 100%;
        position: relative;

        .bg-login {
            height: 100%;
            position: absolute;
            top: 0;
            width: 100%;
            z-index: 1;
        }

        .login-panel {
            width: 33rem;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 2rem 3rem 5rem 3rem;
            position: absolute;
            right: 8rem;
            top: 15rem;
            z-index: 2;

            .item {
                margin-top: 2rem;

                label {
                    width: 5rem;
                    text-align: right;
                    display: inline-block;
                }

                .item-input {
                    width: auto !important;
                }
            }

            .btn {
                text-align: center;

                button {
                    width: 86%;
                }
            }

            .title {
                color: $color-default;
                font-size: 20px;
                font-weight: bold;
                text-align: center;
            }
        }

        .setting {
            color: #fff;
            font-size: 2rem;
            display: block;
            right: 1rem;
            position: absolute;
            bottom: 1rem;
            cursor: pointer;
            z-index: 3;
        }

        .save-setting-btn {
            margin: 1rem 0 !important;
        }

        .register {
            padding: 0 2.2rem;
        }
    }

    .setting-item {
        margin-bottom: 1rem;

        .ivu-input {
            border: 1px solid #84eeba !important;
            background-color: #2baee9;
        }
    }
</style>
