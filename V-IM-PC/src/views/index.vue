<template>
  <div class="v-im">
    <div class="left-bar" style="-webkit-app-region: drag">
      <ul>
        <li class="userPhoto" @click="modal = true">
          <img :src="user.avatar"/>
        </li>
        <li title="会话">
          <router-link v-bind:to="'/index/chatBox'">
            <Icon type="ios-text-outline"/>
          </router-link>
        </li>
        <li title="好友">
          <router-link v-bind:to="'/index/userBox'">
            <Icon type="ios-contact-outline"/>
          </router-link>
        </li>
        <li title="组织">
          <router-link v-bind:to="'/index/dept'">
            <Icon type="ios-list-box-outline"/>
          </router-link>
        </li>
        <li title="群">
          <router-link v-bind:to="'/index/chatGroupBox'">
            <Icon type="ios-contacts-outline"/>
          </router-link>
        </li>
        <li title="退出" class="logout" @click="myLogout">
          <Icon type="ios-power-outline"/>
        </li>
      </ul>
    </div>
    <keep-alive>
      <router-view class="content"/>
    </keep-alive>
    <Modal
        closable
        class="user-model"
        v-model="modal"
        footer-hide
        :title="user.name"
        width="300"
    >
      <p class="user-model-img">
        <img :src="user.avatar" class="img"/>
      </p>
      <p class="user-model-item">
        <label>姓名：</label>
        <span>{{ user.name }}</span>
      </p>
      <p class="user-model-item">
        <label>手机：</label>
        <span>{{ user.mobile }}</span>
      </p>
      <p class="user-model-item">
        <label>邮箱：</label>
        <span>{{ user.email }}</span>
      </p>
      <p>
        <Button type="error" long @click="myLogout">退出</Button>
      </p>
    </Modal>
  </div>
</template>
<script>
import {logout} from "../utils/ChatUtils";

export default {
  data() {
    return {
      user: {},
      modal: false
    };
  },
  methods: {
    myLogout() {
      let self = this;
      logout(self);
    }
  },
  created: function () {
    this.user = this.$store.state.user;
  },
  mounted: function () {
  }
};
</script>
<style lang="scss">
@import "@/static/styles/theme.scss";
@import "@/static/styles/v-im.scss";

.v-im {
  display: flex;
  flex-direction: row;

  .left-bar {
    background-color: #1c2438;
    width: 6rem;
    height: 100%;

    ul {
      padding: 3rem 1.2rem 1.2rem 1.2rem;
      list-style: none;
      height: 100%;
      position: relative;

      li {
        -webkit-app-region: no-drag;
        display: block;
        width: 3.6rem;
        height: 3.6rem;
        text-align: center;
        margin-bottom: 2rem;
        cursor: pointer;

        .ivu-icon {
          font-size: 3rem !important;
          color: $color-default;
          margin: 0.3rem;
          cursor: pointer;

          &:hover {
            color: $color-write;
          }
        }

        .router-link-active {
          .ivu-icon {
            color: $color-write;
          }
        }
      }

      .logout {
        bottom: 0;
        position: absolute;
      }

      .userPhoto {
        margin-bottom: 2rem;

        img {
          width: 3.6rem;
          height: 3.6rem;
        }
      }
    }
  }

  .content {
    flex: 1;
  }
}
</style>
