<template>
  <div>
    <div>
      <p class="text-center">
        <img :src="[host + user.avatar]" class="img" />
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

    </div>
  </div>
</template>

<script>
import RequestUtils from "../../../utils/RequestUtils";
import conf from "../conf";
export default {
  name: "userModal",
  props: ["userId"],
  data() {
    return {
      title: "",
      host: conf.getHostUrl(),
      user: {}
    };
  },
  watch: {
    userId(id) {
      this.getUser(id);
    }
  },
  mounted() {
    this.getUser(this.userId);
  },
  methods: {

    getUser(id) {
      let self = this;
      let param = new FormData();
      param.set("id", id);

      RequestUtils.request(conf.getHostUrl() + "/api/user/get", param)
        .then(json => {
          self.user = json;
        })
        .catch(err => {
          self.user = {};
          console.error(err);
        });
    }
  }
};
</script>

<style scoped></style>
