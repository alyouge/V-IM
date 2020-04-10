<template>
  <div class="welcome-message">
    <img src="~@/static/icon.png" alt="icon" />
  </div>
</template>
<script>
export default {
  name: "welcome",
  methods: {}
};
</script>

<style scoped lang="scss">
.welcome-message {
  display: table-cell !important;
  height: 100%;
  text-align: center;
  vertical-align: middle;
  & > img {
    width: 12rem;
    margin-top: 10rem;
  }
}
</style>
