<template>
  <div class="panel-box">
    <div class="panel-box-list">
      <div class="dept-box">
        <Tree
          :data="treeData"
          @on-select-change="change"
          class="demo-tree-render"
        ></Tree>
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
import RequestUtils from "../../../utils/RequestUtils";
import Tools from "../../../utils/Tools";

const render = (h, { data }) => {
  return h(
    "span",
    {
      style: {
        display: "inline-block",
        width: "100%"
      }
    },
    [
      h("span", [
        h("Icon", {
          props: {
            type: "md-home"
          },
          style: {
            marginRight: "8px",
            fontSize: "18px"
          }
        }),
        h("span", data.title)
      ])
    ]
  );
};

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
      treeData: [
        {
          id: "aaa",
          title: "AMD信息技术有限公司",
          expand: true,
          render: render,
          children: [
            {
              title: "技术部",
              expand: true,
              render: render,
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
              render: render,
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

  methods: {
    change(data) {
      console.log(data);
    }
  },

  mounted() {
    let self = this;
    let param = new FormData();
    param.set("parentId", "0");

    RequestUtils.request(conf.getHostUrl() + "/api/dept/list", param)
      .then(json => {
        console.log(json)
        self.treeData = Tools.list2tree(json, "0",render);
        console.log(self.treeData)
      })
      .catch(err => {
        console.error(err);
      });
  }
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
