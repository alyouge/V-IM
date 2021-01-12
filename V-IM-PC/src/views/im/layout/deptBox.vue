<template>
  <div class="panel-box">
    <div class="panel-box-list">
      <div class="dept-box">
        <Tree :data="data1" class="demo-tree-render"></Tree>
      </div>
    </div>
    <div class="chat-box">
      <Top></Top>
      <Welcome v-if="first"></Welcome>
      <UserInfo
        class="panel-box-view"
        v-if="!first"
        v-bind:user="user"
      ></UserInfo>
    </div>
  </div>
</template>
<script>
import Top from "../components/top.vue";
import Welcome from "../components/welcome.vue";
import UserInfo from "../components/userInfo.vue";
import conf from "../conf";

export default {
  components: {
    Top,
    Welcome,
    UserInfo
  },

  data() {
    return {
      chat: {},
      user: {},
      currentUser: {},
      host: conf.getHostUrl(),
      userFriends: [],
      first: true,
      data1: [
        {
          title: "大连AMD信息技术有限公司",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1"
                },
                {
                  title: "leaf 1-1-2"
                }
              ]
            },
            {
              title: "parent 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1"
                },
                {
                  title: "leaf 1-2-1"
                }
              ]
            }
          ]
        }
      ]
    };
  },

  methods: {}
};
</script>
<style lang="scss" scoped>
@import "@/static/styles/theme";

.ivu-tabs-content {
  height: 100%;
}

.panel-box {
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

    .panel-box-view {
      position: absolute;
      width: 100%;
      top: 40px;
      padding: 100px;
    }
  }

  .panel-box-list {
    height: 100%;
    width: 22rem;
    display: flex;
    flex-direction: column;
    padding-top: 1rem;

    .dept-box {
      overflow-y: scroll;
      flex: 1;
      padding: 20px 10px;

      .ivu-tree-title {
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: break-word;
        white-space: nowrap;
        width: 100%;
      }
    }
  }
}
</style>
