<template>
  <div class="user-info">
    <Row>
      <Col span="12">
        <h5 class="username">{{ user.name }}</h5>
      </Col>
      <Col span="12" class="text-right">
        <Avatar size="large" :src="host + user.avatar" />
      </Col>
    </Row>
    <Divider />
    <Row>
      <Col span="3" class="label">手机</Col>
      <Col span="2">&nbsp;</Col>
      <Col span="18" class="value">{{ user.mobile }}</Col>
    </Row>
    <Row>
      <Col span="3" class="label">邮箱</Col>
      <Col span="2">&nbsp;</Col>
      <Col span="18">{{ user.email }}</Col>
    </Row>
    <Row>
      <Col span="18">&nbsp;</Col>
      <Col span="6" class="text-right">
        <i-button type="primary" shape="circle" size="large" @click="showChat()"
          >发送消息</i-button
        >
      </Col>
    </Row>
  </div>
</template>

<script>
import conf from "../conf";
import { MessageTargetType } from "../../../utils/ChatUtils";
const { ChatListUtils } = require("../../../utils/ChatUtils.js");

export default {
  name: "userInfo",
  props: ["user"],
  data() {
    return {
      host: conf.getHostUrl()
    };
  },
  methods: {
    // 打开一个聊天对话框
    showChat: function() {
      let self = this;
      console.log("self.user", self.user);
      let chat = ChatListUtils.resetChatList(
        self,
        self.user,
        conf.getHostUrl(),
        MessageTargetType.FRIEND
      );
      self.$router.push({
        path: "/index/chatBox/",
        query: { chat: chat }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.user-info {
  font-size: 16px;
  line-height: 200%;
  color: #666;

  .text-right {
    text-align: right;
  }

  .username {
    font-weight: bold;
    font-size: 20px;
  }

  .label {
    text-align: justify;
    text-align-last: justify;
    font-weight: bold;
  }
}
</style>
