<template>
    <div class="chat-panel">
        <div class="chat-box-list">
            <Search class="search-box" @showChat="showChat"></Search>
            <div class="group-box">
                <ul class="user-list">
                    <li class="user" v-for="chat in chatList">
                        <a href="javascript:" @click="showChat(chat)"
                           :class="currentChat&&currentChat.id===chat.id?'active':''">
                            <i v-if="chat.unReadCount>0">{{ chat.unReadCount }}</i>
                            <img :src="chat.avatar" alt="头像">
                            <b>{{ chat.name }}</b>
                            <p>{{ chat.sign }}</p>
                        </a>
                        <Icon type="md-close" @click="delChat(chat)"></Icon>
                    </li>
                </ul>
            </div>
        </div>
        <div class="chat-box">
            <Top></Top>
            <UserChat :chat="currentChat" @showChat="showChat"></UserChat>
        </div>
    </div>
</template>
<script>
  import Search from '../components/search.vue';
  import Top from '../components/top.vue';
  import UserChat from '../components/chat.vue';
  import WebsocketHeartbeatJs from '../utils/WebsocketHeartbeatJs';
  import conf from '../conf';
  import winControl from '../../../../main/windowControl';
  import RequestUtils from '../../../utils/RequestUtils';
  import { ChatListUtils, ErrorType, imageLoad, logout, MessageInfoType, MessageTargetType } from '../utils/chatUtils';
  import StoreUtils from '../../../utils/StoreUtils';

  export default {
    components: {
      Search,
      Top,
      UserChat
    },
    data() {
      return {};
    },
    computed: {
      currentChat: {
        get: function() {
          return this.$store.state.currentChat;
        },
        set: function(currentChat) {
          this.$store.commit('setCurrentChat', JSON.parse(JSON.stringify(currentChat)));
        }
      },
      chatList: {
        get: function() {
          return this.$store.state.chatList;
        },
        set: function(chatList) {
          this.$store.commit('setChatList', chatList);
        }
      }
    },
    methods: {
      showChat: function(chat) {
        this.$store.commit('resetUnRead');
        this.currentChat = chat;
        // 每次滚动到最底部
        this.$nextTick(() => {
          imageLoad('message-box');
        });
      },
      delChat(chat) {
        this.$store.commit('delChat', chat);
      }
    },
    activated: function() {
      let self = this;
      // 当前聊天室
      if (self.$route.query.chat) {
        self.$store.commit('setCurrentChat', JSON.parse(JSON.stringify(self.$route.query.chat)));
      }
      // 重新设置chatList
      self.$store.commit('setChatList', ChatListUtils.getChatList(self.$store.state.user.id));
      // 每次滚动到最底部
      self.$nextTick(() => {
        imageLoad('message-box');
      });
    },
    mounted: function() {
      let self = this;
      let websocketHeartbeatJs = new WebsocketHeartbeatJs({
        url: conf.getWsUrl()
      });
      websocketHeartbeatJs.onopen = function() {
        websocketHeartbeatJs.send('{"code":' + MessageInfoType.MSG_READY + '}');
      };
      websocketHeartbeatJs.onmessage = function(event) {
        let data = event.data;
        let sendInfo = JSON.parse(data);
        // 真正的消息类型
        if (sendInfo.code === MessageInfoType.MSG_MESSAGE) {
          winControl.flashIcon();
          let message = sendInfo.message;
          if (message.avatar && message.avatar.indexOf('http') === -1) {
            message.avatar = conf.getHostUrl() + message.avatar;
          }
          message.timestamp = self.formatDateTime(new Date(message.timestamp));
          // 发送给个人
          if (message.type === MessageTargetType.FRIEND) {
            // 接受人是当前的聊天窗口
            if (String(message.fromid) === String(self.$store.state.currentChat.id)) {
              self.$store.commit('addMessage', message);
            } else {
              self.$store.commit('setUnReadCount', message);
              self.$store.commit('addUnreadMessage', message);
            }
          } else if (message.type === MessageTargetType.CHAT_GROUP) {
            // message.avatar = self.$store.state.chatMap.get(message.id);
            // 接受人是当前的聊天窗口
            if (String(message.id) === String(self.$store.state.currentChat.id)) {
              if (String(message.fromid) !== self.$store.state.user.id) {
                self.$store.commit('addMessage', message);
              }
            } else {
              self.$store.commit('setUnReadCount', message);
              self.$store.commit('addUnreadMessage', message);
            }
          }
          winControl.flashFrame();
          self.$store.commit('setLastMessage', message);
          // 每次滚动到最底部
          self.$nextTick(() => {
            imageLoad('message-box');
          });
        }
      };

      websocketHeartbeatJs.onreconnect = function() {
        console.log('reconnecting...');
      };

      let count = 0;
      websocketHeartbeatJs.onerror = function(error) {

        let param = new FormData();
        param.set('client_id', 'v-client');
        param.set('client_secret', 'v-client-ppp');
        param.set('grant_type', 'refresh_token');
        param.set('scope', 'select');
        param.set('refresh_token', StoreUtils.getToken().refresh_token);
        let requestApi = RequestUtils.getInstance();
        requestApi
          .request(conf.getTokenUrl(), param)
          .then(response => {
            return response.json();
          })
          .then(json => {
            count = 0;
            StoreUtils.setToken(json);
          })
          .catch(error => {
            count++;
            if ('TypeError: Failed to fetch' === error.toString()) {
              self.$Message.error('网络断开，正在重连...');
            } else if (ErrorType.FLUSH_TOKEN_ERROR === error) {
              count = 25;
            }
          });
        //重连次数大于24 退出登录
        if (count > 24) {
          count = 0;
          logout(self);
        }
      };

      self.$store.commit('setWebsocket', websocketHeartbeatJs);
    }
  };
</script>
<style lang="scss" scoped>
    @import '../../../styles/theme';

    .ivu-tabs-content {
        height: 100%;
    }

    .chat-panel {
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
        }

        .chat-box-list {
            height: 100%;
            width: 22rem;
            display: flex;
            flex-direction: column;

            .search-box {
                margin: 1.5rem;
                width: 19rem;
            }
        }
    }

    .group-box {
        height: 100%;
        overflow-y: scroll;

        .count {
            color: #aaaaaa;
        }

        li {
            list-style: none;
            position: relative;
            font-size: 1.2rem;
            cursor: pointer;
            font-weight: 200;
            margin-bottom: 2rem;

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
                position: absolute;
                top: 0.4rem;
                left: 2rem;
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
            height: 5.2rem;
            position: relative;

            a {
                display: block;
                width: 100%;
                height: 100%;
                color: $color-default;
                position: relative;

                i {
                    display: inline-block;
                    width: 1.8rem;
                    height: 1.6rem;
                    background-color: #ff0000;
                    border-radius: 50%;
                    color: $color-write;
                    text-align: center;
                    font-style: normal;
                    position: absolute;
                    left: 1rem;
                    top: 0;
                    z-index: 99999999999;
                }

                p {
                    width: 12rem;
                }
            }

            &:hover {
                background-color: $color-gray !important;

                & > i {
                    color: $color-default;
                    background-color: $color-write;
                }
            }

            .active {
                background-color: $color-gray !important;
            }

            & > i {
                position: absolute;
                right: 1rem;
                bottom: 1.6rem;
                cursor: pointer;
                border-radius: 50%;
                padding: 0.2rem;
                text-align: center;
                color: $color-light-gray;

                &:hover {
                    color: $color-default;
                    background-color: $color-write;
                }
            }
        }
    }
</style>
