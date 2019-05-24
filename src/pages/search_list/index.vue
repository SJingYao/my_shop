<template>
  <div>
    <!-- 搜索框 -->
    <div class="search">
      <div class="search-input">
        <icon type="search" size="16" color="#999"/>
        {{keyword}}
      </div>
    </div>
    <!-- 商品列表tabs -->
    <div class="tabs">
      <div
        :class="{active:currentIndex==index}"
        @click="tabHandle(index)"
        v-for="(item, index) in tabsName"
        :key="index"
        class="tab-item"
      >{{ item }}</div>
    </div>
    <!-- 商品列表部分 -->
    <div class="goods-list">
      <navigator v-for="(item, index) in productList" :key="index" class="goods-item">
        <img :src="item.goods_small_logo" mode="aspectFill">
        <div class="goods-right">
          <h4>{{ item.goods_name }}</h4>
          <div class="price">
            <span>{{ item.goods_price }}￥</span>
          </div>
        </div>
      </navigator>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tabs标签
      tabsName: ["综合", "销量", "价格"],
      keyword: "",
      // 定义一个默认下标
      currentIndex: 0,
      // 存储商品列表
      productList: [],
      pagenum: 1,
      total: 0,
      // 保证接口调用完成之后才可以再次调用接口，如果接口正在获取数据，那么在这个过程中是不允许再次触发接口调用
      isLoading: false,
      hasMore: false
    };
  },
  methods: {
    // 标签切换index
    tabHandle(index) {
      this.currentIndex = index;
    },
    async loadData() {
      // 如果没有更多数据，就应该禁止发送请求调用接口
      // 本次接口调用是否已经加载完成
      if (this.isLoading && this.hasMore) {
        return;
      }
      // 作用：禁止再次触发接口调用
      this.isLoading = true;
      // 获取当前列表数据
      let res = await this.request("goods/search", "get", {
        query: this.keyword,
        pagenum: this.pagenum
      });
      let { message } = res.data;
      // 需要把新加载的一页数据添加到list中
      let goods = [...this.productList, ...message.goods];
      this.productList = goods;
      // console.log(this.productList);
      // 页数索引
      // *接收到的pagenmu为字符串类型，需要转换成数值类型
      this.pagenum = parseInt(message.pagenum);
      // 总共记录
      this.total = message.total;

      // 判断是否还有更多数据
      if (this.productList.length >= this.total) {
        // 没有更多数据
        this.hasMore = true;
      }

      // 加载完成数据之后，让页码加1
      this.pagenum = this.pagenum + 1;
      // 接口数据返回之后，才允许再次发出请求
      this.isLoading = false;
    }
  },

  // 小程序的生命周期函数
  onLoad(param) {
    // console.log(param);
    this.keyword = param.query;
    // 页面初次展示的时候，调用loadData加载数据
    this.loadData();
  },
  // 页面下拉触底事件
  onReachBottom() {
    this.loadData();
  }
};
</script>

<style lang="scss" scoped>
@import "main.scss";
</style>
