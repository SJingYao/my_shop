<template>
  <div>{{ keyword }}</div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  // 小程序的生命周期函数
  onLoad(param) {
    // console.log(param);
    this.keyword = param.query;
  }
};
</script>

<style lang="scss" scoped>
</style>
