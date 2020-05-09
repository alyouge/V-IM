<template>
  <div class="user-box">
    <div class="user-box-list">
      <Search class="search-box" @showChat="showChat"></Search>
      <div class="group-box">
        <ul class="group-list">
          <li v-for="(group, index) in userFriendList" :key="index">
            <h5 v-on:click="group.expansion = !group.expansion">
              <Icon type="ios-arrow-forward" />
              <span>{{ group.name }} </span>
              <span class="count">({{ group.userList.length }})</span>
            </h5>
            <transition name="fade">
              <ul class="userList" v-if="group.expansion">
                <li
                  class="user"
                  v-for="(user, index) in group.userList"
                  :key="index"
                >
                  <a href="javascript:;" @click="showUser(user)">
                    <img :src="host + user.avatar" />
                    <b>{{ user.name }}</b>
                    <p>{{ user.sign }}</p>
                  </a>
                </li>
              </ul>
            </transition>
          </li>
        </ul>
      </div>
    </div>
    <div class="chat-box">
      <Top></Top>
      <Welcome v-if="first"></Welcome>
      <UserInfo
        class="user-box-view"
        v-if="!first"
        v-bind:user="user"
      ></UserInfo>
    </div>
  </div>
</template>
<script>
import Search from "../components/search.vue";
import Top from "../components/top.vue";
import Welcome from "../components/welcome.vue";
import UserInfo from "../components/userInfo.vue";
import conf from "../conf";
import { MessageTargetType } from "../../../utils/ChatUtils";

const { ChatListUtils } = require("../../../utils/ChatUtils.js");

export default {
  components: {
    Search,
    Top,
    Welcome,
    UserInfo
  },
  computed: {
    userFriendList: {
      get: function() {
        return this.$store.state.userFriendList;
      },
      set: function(userFriendList) {
        this.$store.commit("setUserFriendList", userFriendList);
      }
    }
  },
  data() {
    return {
      chat: {},
      user: {},
      currentUser: {},
      host: conf.getHostUrl(),
      userFriends: [],
      first: true
    };
  },

  methods: {
    // 打开一个聊天对话框
    showChat: function(user) {
      let self = this;
      self.$router.push({
        path: "/index/chatBox/",
        query: {
          chat: ChatListUtils.resetChatList(
            self,
            user,
            conf.getHostUrl(),
            MessageTargetType.FRIEND
          )
        }
      });
    },
    // 打开一个用户信息对话框
    showUser: function(user) {
      let self = this;
      self.$router.push({
        path: "/index/userBox/"
      });

      self.first = false;
      self.user = user;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/static/styles/theme";

.ivu-tabs-content {
  height: 100%;
}

.user-box {
  width: 26rem;
  background-color: $color-light-gray;
  height: 100%;
  display: flex;
  flex-direction: row;

  .chat-box {
    flex: 1;
    background-color: $color-box-bg;
    display: flex;
    flex-direction: column;
    position: relative;

    .user-box-view {
      position: absolute;
      width: 100%;
      top: 40px;
      padding: 100px;
    }
  }

  .user-box-list {
    height: 100%;
    width: 22rem;
    display: flex;
    flex-direction: column;

    .search-box {
      margin: 1.5rem;
      width: 19rem;
    }

    .group-box {
      overflow-y: scroll;
      flex: 1;

      .group-list {
        margin: 0 1rem;

        .count {
          color: #aaaaaa;
        }

        li {
          list-style: none;
          position: relative;
          font-size: 1.2rem;
          cursor: pointer;
          font-weight: 200;

          h5 {
            padding: 0.5rem 0;
            cursor: pointer;
            font-size: 1.3rem;
            font-weight: 200;

            i {
              vertical-align: baseline;
            }
          }

          img {
            width: 4.4rem;
            height: 4.4rem;
            border-radius: 50%;
            position: absolute;
            top: 0.4rem;
            left: 2.5rem;
          }

          .outline {
            filter: grayscale(100%);
          }

          b {
            position: absolute;
            font-size: 1.3rem;
            left: 7.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 600;
            top: 0.6rem;
          }

          p {
            position: absolute;
            left: 7.5rem;
            bottom: 0.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 75%;
            font-size: 1.1rem;
            color: #aaaaaa;
          }
        }

        .user {
          padding-left: 1.3rem;
          height: 5.2rem;

          a {
            display: block;
            width: 100%;
            height: 100%;
            color: $color-default;
          }
        }

        > li:hover {
          /*background-color: #efefef;*/
        }

        > li > ul {
          /*background-color: #ffffff;*/
        }

        li.user:hover {
          /*background-color: #efefef;*/
        }
      }
    }
  }
}
</style>
