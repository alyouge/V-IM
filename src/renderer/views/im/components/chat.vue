<template>
    <div class="im-chat" v-if="chat.name">
        <div class="im-chat-top" v-if="chat">
            <span>{{ chat.name }}</span>
            <a href="javascript:;" @click="modal = true" class="pull-right menu">
                <Icon type="md-menu"/>
            </a>
        </div>
        <div class="im-chat-main">
            <div class="im-chat-main-left">
                <div class="im-chat-main-box messages" id="message-box">
                    <ul>
                        <li v-for="item in messageList" :class="{'im-chat-mine': item.mine}">
                            <div class="im-chat-user">
                                <img :src="item.avatar" alt="头像">
                                <cite v-if="item.mine"><i>{{ item.timestamp }}</i>{{ item.username }}</cite>
                                <cite v-else="item.mine">{{ item.username }}<i>{{ item.timestamp }}</i></cite>
                            </div>
                            <div class="im-chat-text">
                                <pre v-html="item.content" v-on:click="openImageProxy($event)"></pre>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="im-chat-footer">
                    <div class="im-chat-tool">
                        <Icon type="ios-happy-outline" @click="showFaceBox()"></Icon>
                        <Upload :action="action" name="file"
                                :format="imgFormat"
                                :data="tokenImg"
                                :show-upload-list="false"
                                :headers="headers"
                                :max-size="5120"
                                :with-credentials="true"
                                :before-upload="beforeUpload"
                                :on-progress="handleStart"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleImgMaxSize"
                                :on-success="handleSuccess"
                                :on-error="handleError">
                            <Icon type="ios-image-outline"></Icon>
                        </Upload>
                        <Upload :action="action" name="file"
                                :format="fileFormat"
                                :data="tokenFile"
                                :show-upload-list="false"
                                :headers="headers"
                                :max-size="102400"
                                :with-credentials="true"
                                :before-upload="beforeUpload"
                                :on-progress="handleStart"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleFileMaxSize"
                                :on-success="handleSuccess"
                                :on-error="handleError">
                            <Icon type="ios-folder-open-outline"></Icon>
                        </Upload>
                        <Faces v-show="showFace" @click="showFace = true" class="faces-box"
                               @insertFace="insertFace"></Faces>
                        <Button class="history-message-btn" @click="getHistoryMessage()">聊天记录</Button>
                    </div>
                    <textarea v-model="messageContent" class="textarea" @keyup.enter="mineSend()"></textarea>
                    <div class="im-chat-send">
                        <Button @click="mineSend()">发送</Button>
                    </div>
                </div>
            </div>
            <div v-if="chat.type === '1'" class="im-chat-users">
                <ul class="chat-user-list">
                    <li v-for="item in userList" @dblclick="showChat(item)" @click="showUser(item)">
                        <span class="im-chat-avatar">
                            <img :src="[host + item.avatar]" alt=""/>
                        </span>
                        {{item.name}}
                    </li>
                </ul>
            </div>
        </div>
        <Modal closable class="user-model" v-model="modal"
               footer-hide :title="chat.name" width="300">
            <p class="user-model-img">
                <img :src="chat.avatar" class="img"/>
            </p>
            <div v-if="chat.type === '0'">
                <p class="user-model-item">
                    <label>姓名：</label>
                    <span>{{chat.name}}</span>
                </p>
                <p class="user-model-item">
                    <label>手机：</label>
                    <span>{{chat.mobile}}</span>
                </p>
                <p class="user-model-item">
                    <label>邮箱：</label>
                    <span>{{chat.email}}</span>
                </p>
            </div>
            <div v-if="chat.type === '1'">
                <p class="user-model-item">
                    <label>群名称：</label>
                    <span>{{chat.name}}</span>
                </p>
            </div>
        </Modal>
        <Drawer title="聊天记录" :closable="true" v-model="showHistory" class="history-message" width="60%">
            <div class="im-chat-main">
                <div class="messages" id="his-chat-message">
                    <ul>
                        <li v-for="item in hisMessageList" :class="{'im-chat-mine': item.mine}">
                            <div class="im-chat-user" id="historyMessageBox">
                                <img :src="[host + item.avatar]">
                                <cite v-if="item.mine"><i>{{ item.timestamp }}</i>{{ item.username }}</cite>
                                <cite v-else="item.mine">{{ item.username }}<i>{{ item.timestamp }}</i></cite>
                            </div>
                            <div class="im-chat-text">
                                <pre v-html="item.content" v-on:click="openImageProxy($event)"></pre>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <Page :total="count" size="small" show-total class="page" :page-size="pageSize"
                  @on-change="getHistoryMessage"/>
        </Drawer>
    </div>
</template>

<script>
  import Button from 'iview/src/components/button/button';
  import conf from '../conf';
  import Faces from './faces.vue';
  import winControl from '../../../../main/windowControl';
  import RequestUtils from '../../../utils/RequestUtils';

  const { imageLoad, transform, ChatListUtils } = require('../utils/chatUtils');

  export default {
    components: {
      Faces,
      Button
    },
    name: 'userChat',
    computed: {
      messageList: {
        get: function() {
          return this.$store.state.messageList;
        },
        set: function(messageList) {
          this.$store.commit('setMessageList', messageList);
        }
      }
    },
    data() {
      return {
        host: conf.getHostUrl(),
        count: 0,
        pageSize: 20,
        modal: false,
        showHistory: false,
        hisMessageList: [],
        // 保存各个聊天记录的map
        messageListMap: new Map(),
        messageContent: '',
        showFace: false,
        userList: [],
        imgFormat: ['jpg', 'jpeg', 'png', 'gif'],
        fileFormat: ['doc', 'docx', 'jpg', 'jpeg', 'png', 'gif', 'xls', 'xlsx', 'pdf', 'gif', 'exe', 'msi', 'swf', 'sql', 'apk', 'psd'],
        tokenImg: {
          access_token: sessionStorage.getItem('token'),
          type: 'image'
        },
        tokenFile: {
          access_token: sessionStorage.getItem('token'),
          type: 'file'
        },
        action: conf.getHostUrl() + '/api/upload',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      };
    },
    props: ['chat'],
    methods: {
      showChat(user) {
        let self = this;
        if (user.id !== self.$store.state.user.id) {
          let chat = ChatListUtils.resetChatList(self, user, conf.getHostUrl());
          self.$store.commit('setCurrentChat', chat);
        } else {
          self.$Message.warning('不能给自己说话哦');
        }
      },
      showUser: function() {
      },
      beforeUpload() {
        this.tokenImg = {
          access_token: sessionStorage.getItem('token'),
          type: 'image'
        };
        this.tokenFile = {
          access_token: sessionStorage.getItem('token'),
          type: 'file'
        };
        return new Promise(resolve => {
          this.$nextTick(function() {
            resolve(true);
          });
        });
      },

      // 错误提示
      openMessage(error) {
        this.$Message.error(error);
      },
      showFaceBox: function() {
        this.showFace = !this.showFace;
      },
      insertFace: function(item) {
        this.messageContent = this.messageContent + 'face' + item;
        this.showFace = false;
      },
      handleStart() {
        this.$Loading.start();
      },
      handleFormatError(file) {
        this.$Message.warning('文件 ' + file.name + ' 格式不正确。');
      },
      handleImgMaxSize(file) {
        this.$Message.warning('图片 ' + file.name + ' 太大，不能超过 512K！');
      },
      handleFileMaxSize(file) {
        this.$Message.warning('文件 ' + file.name + ' 太大，不能超过 10M！');
      },
      handleSuccess(res, file) {
        let self = this;
        if (res.msg === 'success') {
          let path = res.filePath;
          let fileName = file.name;
          // 文件后缀
          let suffix = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
          // 文件
          if (self.imgFormat.indexOf(suffix) === -1) {
            this.messageContent = this.messageContent + 'file(' + path + ')[' + fileName + ']';
          }
          // 图片
          else {
            this.messageContent = this.messageContent + 'img[' + path + ']';
          }
          this.$Loading.finish();
        } else {
          this.$Message.error('文件上传错误，请重试');
        }
      },
      handleError: function() {
        this.$Loading.finish();
        this.$Message.error('上传错误！');
      },
      // 附件和图片点击展开
      openImageProxy: function(event) {
        event.preventDefault();
        if (event.target.nodeName === 'IMG') {
          winControl.openURL(event.target.src);
        } else if (event.target.className === 'message-file') {
          winControl.openURL(event.target.href);
        }
      },
      // 本人发送信息
      mineSend() {
        let self = this;
        let currentUser = self.$store.state.user;
        let time = new Date().getTime();
        let content = self.messageContent;
        if (content !== '' && content !== '\n') {
          if (content.length > 2000) {
            self.openMessage('不能超过2000个字符');
          } else {
            let currentMessage = {
              mine: true,
              avatar: currentUser.avatar,
              username: currentUser.name,
              timestamp: time,
              content: self.messageContent,
              fromid: currentUser.id,
              id: self.chat.id,
              type: self.chat.type
            };
            self.send(currentMessage);
          }
        }
      },
      // 发送消息的基础方法
      send(message) {
        let self = this;
        self.$store.commit('sendMessage', message);
        message.timestamp = self.formatDateTime(new Date(message.timestamp));
        self.$store.commit('addMessage', message);
        self.messageContent = '';
        // 每次滚动到最底部
        self.$nextTick(() => {
          imageLoad('message-box');
        });
      },
      getHistoryMessage(pageNo) {
        let self = this;
        self.showHistory = true;
        if (!pageNo) {
          pageNo = 1;
        }
        let param = new FormData();
        param.set('chatId', self.chat.id);
        param.set('chatType', self.chat.type);
        param.set('fromId', self.$store.state.user.id);
        param.set('pageNo', pageNo);

        let requestApi = RequestUtils.getInstance();
        requestApi
          .request(conf.getHisUrl(), param)
          .then(response => {
            return response.json();
          })
          .then(json => {
            let list = json.messageList.map(function(element) {
              element.content = transform(element.content);
              return element;
            });
            let tempList = list.map(function(message) {
              message.timestamp = self.formatDateTime(new Date(message.timestamp));
              return message;
            });
            self.hisMessageList = tempList.reverse();
            self.count = json.count;
            self.pageSize = json.pageSize;
            // 每次滚动到最底部
            self.$nextTick(() => {
              imageLoad('his-chat-message');
            });
          });
      }
    },
    watch: {
      // 监听每次 user 的变化
      chat: function() {
        let self = this;
        self.messageList = [];
        // 从内存中取聊天信息
        let cacheMessages = self.$store.state.messageListMap.get(self.chat.id);
        if (cacheMessages) {
          self.messageList = cacheMessages;
        }
        // 每次滚动到最底部
        this.$nextTick(() => {
          imageLoad('message-box');
        });
        if (self.chat.type === '1') {
          let param = new FormData();
          param.set('chatId', self.chat.id);
          RequestUtils
            .getInstance()
            .request(conf.getChatUsersUrl(), param)
            .then(response => {
              return response.json();
            }).then(json => {
            self.userList = json;
          });
        }
      }
    },
    mounted: function() {
      // 每次滚动到最底部
      this.$nextTick(() => {
        imageLoad('message-box');
      });
    }
  };
</script>

<style lang="scss">
    @import '../../../styles/theme';

    .im-chat {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-top: 4rem;

    }

    .im-chat-top {
        border-bottom: 1px solid #cccccc;
        color: $color-default;
        padding: 0 0 0.2rem 1rem;
        font-size: 1.6rem;
        font-weight: bold;

        .menu {
            color: $color-default;
            display: inline-block;
            padding: 0 10px;
        }
    }

    .user-model {
        .user-model-img {
            padding: 30px;
            text-align: center;

            img {
                border-radius: 50%;
            }
        }

        .user-model-item {
            display: flex;
            padding: 5px 0;

            label {
                flex: 2;
                font-weight: bold;
                text-align: right;
            }

            span {
                flex: 3;
            }
        }
    }

    .im-chat-main {
        flex: 1;
        display: flex;
        flex-direction: row;
        height: 100%;

        .im-chat-main-left {
            flex: 4;
            display: flex;
            flex-direction: column;

            .im-chat-main-box {
                flex: 1;
                padding-top: 1rem;
                overflow-x: hidden;
                overflow-y: auto;
            }
        }

        .message-img {
            max-width: 20rem;
        }

        .im-chat-users {
            flex: 1;
            border-left: 1px solid #cccccc;
            overflow-y: scroll;
        }

        .messages {
            width: 100%;
            height: calc(100% - 3rem);
            overflow-y: scroll;

            ul {
                width: 100%;

                li {
                    position: relative;
                    font-size: 0;
                    margin-bottom: 10px;
                    padding-left: 60px;
                    min-height: 68px;

                    .im-chat-text {
                        position: relative;
                        line-height: 22px;
                        margin-top: 25px;
                        padding: 0.8rem 1.5rem;
                        background-color: #e2e2e2;
                        border-radius: 3px;
                        color: #333;
                        word-break: break-all;
                        display: inline-block;
                        vertical-align: top;
                        font-size: 14px;

                        &:after {
                            content: '';
                            position: absolute;
                            left: -10px;
                            top: 13px;
                            width: 0;
                            height: 0;
                            border-style: solid dashed dashed;
                            border-color: #e2e2e2 transparent transparent;
                            overflow: hidden;
                            border-width: 10px;
                        }

                        pre {
                            width: 100%;
                            white-space: pre-wrap;
                            word-break: break-all;
                        }
                    }
                }
            }

            .im-chat-user {
                width: 4rem;
                height: 4rem;
                position: absolute;
                display: inline-block;
                vertical-align: top;
                font-size: 14px;
                left: 3px;
                right: auto;

                cite {
                    position: absolute;
                    left: 60px;
                    top: -2px;
                    width: 500px;
                    line-height: 24px;
                    font-size: 12px;
                    white-space: nowrap;
                    color: #999;
                    text-align: left;
                    font-style: normal;

                    i {
                        font-style: normal;
                        padding-left: 15px;
                    }
                }

                img {
                    width: 4rem;
                    height: 4rem;
                    border-radius: 100%;
                }
            }

            .im-chat-mine {
                text-align: right;
                padding-left: 0;
                padding-right: 60px;

                .im-chat-text {
                    margin-left: 0;
                    text-align: left;
                    background-color: $color-message-bg;
                    color: #fff;
                    display: inline-block;
                    vertical-align: top;
                    font-size: 14px;

                    &:after {
                        left: auto;
                        right: -10px;
                        border-top-color: $color-message-bg;
                    }
                }

                .im-chat-user {
                    left: auto;
                    right: 3px;

                    cite {
                        left: auto;
                        right: 60px;
                        text-align: right;

                        i {
                            padding-left: 0;
                            padding-right: 15px;
                        }
                    }
                }
            }
        }
    }

    .im-chat-footer {
        border-top: 1px solid $color-gray;
        height: 15rem;
        display: flex;
        flex-direction: column;

        .im-chat-tool {
            padding: 0.5rem 1rem;
            height: 3.4rem;
            position: relative;

            i {
                font-size: 2.4rem;
                cursor: pointer;
                margin-left: 1rem;
            }

            .faces-box {
                position: absolute;
                bottom: 3.8rem;
            }

            .ivu-upload {
                display: inline-block;
            }

            .history-message-btn {
                float: right;
            }


        }

        textarea {
            border: 0;
            padding: 0.5rem;
            width: 100%;
            flex: 1;
            resize: none;
            background-color: $color-box-bg !important;
            &:focus {
                border: 0;
            }
        }

        .im-chat-send {
            height: 4rem;
            text-align: right;
            padding: 0 1rem 1rem 0;
        }
    }

    .ivu-scroll-wrapper {
        margin: 0 !important;
    }

    .ivu-scroll-container {
        padding: 15px 15px 5px;
        overflow-y: visible !important;
    }

    /* 重新覆盖iview 里面的 model 小于768px 时候 宽度变100% 的问题 */
    @media (max-width: 768px) {
        .user-model {
            .ivu-modal {
                width: 30rem !important;
                margin: 0 auto;
            }
        }
    }

    .history-message {
        width: 80%;
        height: calc(100% - 30px);
    }

    .page {
        position: fixed;
        bottom: 0;
        width: 100%;
        margin: 0.5rem;
    }

    .ivu-drawer-body {
        padding: 0 !important;

        .messages {
            height: calc(100% - 3rem);
        }
    }

    .chat-user-list {
        list-style: none;
        margin: 0;
        padding: 1rem;

        & > li {
            margin-bottom: 1rem;
            cursor: pointer;

            & > .im-chat-avatar {
                width: 3.2rem;
                height: 3.2rem;
                display: inline-block;
                vertical-align: middle;

                & > img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
