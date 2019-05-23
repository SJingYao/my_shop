<template>
  <div>
    <div class="search">
      <!-- 搜索框区域 -->
      <div class="search-hd">
        <div class="search-input">
          <icon type="search" size="16"/>
          <input
            @confirm="savekeyWord(keyword)"
            @input="handleinput()"
            v-model="keyword"
            placeholder="请输入关键字"
          >
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
    <!-- 搜索历史关键字 -->
    <div class="history">
      <h4>搜索历史</h4>
      <icon @click="clearkeyWord()" type="clear" size="16"/>
    </div>
    <div class="history-list">
      <div :key="index" v-for="(item, index) in keywordHistory" class="history-item">
        <!-- 使用navigator组件实现历史关键字跳转 -->
        <navigator :url="'/pages/search_list/main?query=' + item">{{item}}</navigator>
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
      timer: null,
      isLoading: false,
      keywordHistory: mpvue.getStorageSync("keyword") || []
    };
  },
  methods: {
    cancels() {
      /* 清空关键字,和搜索结果 */
      this.keyword = "";
    },
    /* 发送请求获取对应的搜索列表数据 */
    // *函数防抖的方式
    // handleinput() {
    //   /* 控制接口调用的频率 函数防抖 */
    //   // 销毁原来的定时任务
    //   /* 在特定时间内没有触发执行条件(关键字变化)才执行一次代码（接口调用） */
    //   clearTimeout(this.timer);
    //   this.timer = setTimeout(async () => {
    //     /* 调用接口需要传递参数 */
    //     let inputRes = await this.request("goods/qsearch", "get", {
    //       query: this.keyword
    //     });
    //     // console.log(inputRes);
    //     this.searchList = inputRes.data.message;
    //     console.log(this.searchList);
    //   }, 1000);
    // }
    // *函数节流的方式
    handleinput() {
      /* 判断标志类的状态值 */
      if (this.isLoading) {
        return;
      }
      /* 控制接口调用的频率 函数节流 */
      /* 固定时间内无论触发几次，仅执行一次 */
      // 设置标志类为true
      this.isLoading = true;
      setTimeout(async () => {
        /* 调用接口需要传递参数 */
        let inputRes = await this.request("goods/qsearch", "get", {
          query: this.keyword
        });
        // console.log(inputRes);
        this.searchList = inputRes.data.message;
        // console.log(this.searchList);
        // 设置标志类为false 重新打开发送请求的开关
        this.isLoading = false;
      }, 1000);
    },
    /* 用户搜索历史关键字 */
    savekeyWord(keyword) {
      // 当用户回车时记录关键字到本地存储
      this.keywordHistory.unshift(keyword);
      // console.log(this.keywordHistory);

      /* 数组去重，同样的关键字只保留一个 */
      let keyH = [...new Set(this.keywordHistory)];
      // console.log(keyH);

      /* 存储到本地存储中 */
      mpvue.setStorageSync("keyword", keyH);
      // console.log(this.keywordHistory);
      // console.log(mpvue.getStorageSync('keyword'));
      /* 重新更新页面数据 */
      this.keywordHistory = keyH;

      // 输入关键字后，回车触发跳转并携带参数
      mpvue.navigateTo({
        url: "/pages/search_list/main?query=" + this.keyword
      });
      // 跳转页面后，将搜索框中的内容清空
      this.keyword = "";
    },
    /* 清空历史关键字 */
    clearkeyWord() {
      // 清空的是本地存储的数据（清空本地存储的数据并不会影响data中的数据）
      mpvue.clearStorageSync();
      // 清空的是data中的数据
      this.keywordHistory = [];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "main.scss";
</style>
