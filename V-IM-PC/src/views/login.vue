<template>
  <div class="login">
    <Top></Top>
    <div class="logo">
      <img src="~@/static/icon.png" alt="icon" />
    </div>
    <div class="login-panel" style="-webkit-app-region: no-drag">
      <div class="title">{{ app_name }} 登录</div>
      <Alert v-if="showErr" type="error">{{ err }}</Alert>
      <div class="item">
        <label>手机：</label>
        <Input
          prefix="ios-contact-outline"
          v-model="username"
          placeholder="手机"
          class="item-input"
        />
      </div>
      <div class="item">
        <label>密码：</label>
        <Input
          prefix="ios-lock-outline"
          type="password"
          v-model="password"
          placeholder="密码"
          class="item-input"
        />
      </div>
      <div class="item">
        <label>服务：</label>
        <Input
          prefix="ios-settings-outline"
          v-model="host"
          placeholder="服务"
          class="item-input"
        />
      </div>
      <div class="btn item">
        <Button type="primary" @click="login()" icon="md-contact">登录</Button>
      </div>
      <div class="item register">
        <a type="info" class="pull-right" @click="showRegister = true">
          <Icon type="ios-cloud-circle" />
          <span>注册</span>
        </a>
      </div>
      <div>
        <a href="javascript:;" @click="open">
          https://gitee.com/lele-666/V-IM
        </a>
      </div>
    </div>

    <Modal
      closable
      class="user-model"
      v-model="showRegister"
      footer-hide
      title="注册新用户"
      width="300"
    >
      <Input v-model="registerPhone" class="setting-item" placeholder="手机" />
      <Input
        v-model="registerUsername"
        class="setting-item"
        placeholder="名称"
      />
      <Input
        v-model="registerPassword"
        type="password"
        class="setting-item"
        placeholder="密码"
      />
      <Button
        type="primary"
        ghost
        long
        @click="saveRegister"
        style="margin: 1rem 0"
        >保存</Button
      >
    </Modal>
  </div>
</template>

<script>
import Top from "./im/components/top.vue";
import conf from "./im/conf";
import RequestUtils from "../utils/RequestUtils";
import StoreUtils from "../utils/StoreUtils";
import { ErrorType } from "../utils/ChatUtils";

export default {
  name: "login",
  data() {
    return {
      app_name: conf.app_name,
      username: "wangwu",
      password: "123456",
      registerPhone: "",
      registerUsername: "",
      registerPassword: "",
      err: "",
      showErr: false,
      showSetting: false,
      showRegister: false,
      host: "101.200.151.183"
    };
  },
  components: {
    Top
  },
  methods: {
    open() {
      this.winControl.openURL("https://gitee.com/lele-666/V-IM");
    },
    clickUser() {
      location.reload();
    },
    saveRegister: function() {
      let self = this;
      if (!/^1[34578]\d{9}$/.test(self.registerPhone)) {
        self.$Message.error("手机号码有误，请重填");
        return;
      }
      let formData = new FormData();
      // 请求参数 ('key',value)
      formData.set("phone", self.registerPhone);
      formData.set("name", self.registerUsername);
      formData.set("password", self.registerPassword);
      fetch(conf.getRegisterUrl(), {
        method: "POST",
        model: "cros", //跨域
        headers: {
          Accept: "application/json"
        },
        body: formData
      })

        .then(json => {
          if (json.code) {
            self.$Message.error(json.message);
          } else {
            self.$Message.success("注册成功");
            self.showRegister = false;
          }
        })
        .catch(() => {
          self.$Message.error("与服务器通讯失败");
        });
    },
    login: function() {
      let self = this;
      localStorage.setItem("host", self.host);

      let param = new FormData();
      param.set("client_id", "v-client");
      param.set("client_secret", "v-client-ppp");
      param.set("grant_type", "password");
      param.set("scope", "select");
      param.set("username", self.username.trim());
      param.set("password", self.password.trim());
      let requestApi = RequestUtils.getInstance();
      requestApi
        .login(self.username.trim(), self.password.trim(), self)
        .then(token => {
          StoreUtils.setToken(token);
          // 获取当前登录的用户，存入store
          return requestApi.request(conf.getInitUrl(), new FormData());
        })

        .then(json => {
          console.log(json)
          //个人信息
          self.$store.commit("setUser", json.me);
          //好友
          self.$store.commit("setUserFriendList", json.friends);

          //群
          self.$store.commit("setChatGroupList", json.groups);

          //把群组封装到map中
          let chatMap = new Map();
          json.groups.forEach(group => {
            chatMap.set(group.id, group);
          });
          self.$store.commit("setChatMap", chatMap);

          // 跳转到index 页面
          self.$router.push({
            path: "/index/chatBox",
            params: {}
          });
        })
        .catch(function(error) {
          console.error(error)
          self.showErr = true;
          if (ErrorType.NET_ERROR === error.toString()) {
            self.err = "服务通讯失败，请检查服务设置";
          } else {
            self.err = error.toString();
          }
        });
    }
  },
  created: function() {
    let self = this;
    let host = localStorage.getItem("host");
    if (host) {
      self.host = host;
    } else {
      localStorage.setItem("host", self.host);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/static/styles/theme.scss";

.login {
  height: 100%;
  background: url("../static/bg.png") no-repeat;
  background-size: 100% 100%;
  position: relative;

  .bg-login {
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  .logo {
    width: 33rem;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }

  .logo > img {
    width: 10rem;
    height: 10rem;
    margin-left: 15rem;
  }

  .login-panel {
    width: 33rem;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 2rem 3rem 3rem 3rem;
    position: absolute;
    right: 8rem;
    top: 12rem;
    z-index: 2;
    box-shadow: 0 0 5px 3px rgba(186, 186, 186, 0.3);

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
    a {
      color: #ffffff;
      i {
        font-size: 14px;
        letter-spacing: 5px;
      }
    }
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
