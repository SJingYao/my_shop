<template>
  <div>
    <div class="search">
      <!-- 搜索框区域 -->
      <div class="search-hd">
        <div class="search-input">
          <icon type="search" size="16"/>
          <input @input="handleinput()" v-model="keyword" placeholder="请输入关键字">
        </div>
        <button @click="cancels()" v-if="keyword" class="cancel">取消</button>
      </div>
      <!-- 搜索结果展示区域 -->
      <div class="search-content">
        <div v-if="keyword" class="search-modal">
          <div
            v-for="(item, index) in searchList"
            :key="index"
            class="search-item"
          >{{ item.goods_name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /* 关键字 */
      keyword: "",
      /* 存储搜索列表数据 */
      searchList: [],
      timer: null
    };
  },
  methods: {
    cancels() {
      /* 清空关键字,和搜索结果 */
      this.keyword = "";
    },
    /* 发送请求获取对应的搜索列表数据 */
    handleinput() {
      /* 控制接口调用的频率 函数防抖 */
      // 销毁原来的定时任务
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        /* 调用接口需要传递参数 */
        let inputRes = await this.request("goods/qsearch", "get", {
          query: this.keyword
        });
        // console.log(inputRes);
        this.searchList = inputRes.data.message;
        console.log(this.searchList);
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "main.scss";
</style>
