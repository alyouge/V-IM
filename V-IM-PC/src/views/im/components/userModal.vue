<template>
   <div>
     <div>
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
      user: {}
    };
  },
  mounted() {
    console.log(this.userId);
    let param = new FormData();
    param.set('id',this.userId)
    RequestUtils.getInstance().request(conf.getHostUrl()+'/api/user/get',param)
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log(json)
        })

  }
};
</script>

<style scoped></style>
