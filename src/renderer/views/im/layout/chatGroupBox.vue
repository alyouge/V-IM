<template>
    <div class="chat-panel">
        <div class="chat-box-list">
            <Search class="search-box" @showChat="showChat"></Search>
            <div class="group-box">
                <ul class="user-list">
                    <li class="user" v-for="chatGroup in chatGroupList">
                        <a href="javascript:" @click="showChat(chatGroup)">
                            <img :src="[host + chatGroup.avatar]">
                            <b>{{ chatGroup.name }}</b>
                            <p>{{ chatGroup.name }}</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="chat-box">
            <Top></Top>
            <Welcome></Welcome>
        </div>
    </div>
</template>
<script>
  import Search from "../components/search.vue";
  import Top from "../components/top.vue";
  import UserChat from "../components/chat.vue";
  import Welcome from "../components/welcome.vue";
  import conf from "../conf";
  import { Chat, ChatListUtils, MessageTargetType } from "../utils/chatUtils";

  export default {
  components: {
    Search,
    Top,
    UserChat,
    Welcome
  },
  computed: {
    //需要展示的用户群组
    chatGroupList: {
      get: function() {
        return this.$store.state.chatGroupList;
      },
      set: function(chatGroupList) {
        this.$store.commit("setChatGroupList", chatGroupList);
      }
    }
  },
  data() {
    return {
      host: conf.getHostUrl()
    };
  },
  methods: {
    // 打开一个聊天对话框
    showChat: function(chatGroup) {
      let self = this;
      let chatList = ChatListUtils.getChatList(self.$store.state.user.id);
      // 删除当前用户已经有的会话
      let newChatList = chatList.filter(function(element) {
        return String(element.id) !== String(chatGroup.id);
      });
      // 重新添加会话，放到第一个
      let chat = new Chat(
        chatGroup.id,
        chatGroup.name,
        conf.getHostUrl() + chatGroup.avatar,
        0,
        "",
        "",
        "",
        MessageTargetType.CHAT_GROUP
      );
      newChatList.unshift(chat);
      // 存储到localStorage 的 chatList
      ChatListUtils.setChatList(self.$store.state.user.id, chatList);
      this.$store.commit("setChatList", newChatList);
      this.$router.push({
        path: "/index/chatBox",
        query: { chat: chat }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/theme";

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
    background-color: $color-write;
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
  }
}
</style>
