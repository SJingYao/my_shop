<template>
  <div>
    <!-- 搜索框 -->
    <div class="search">
      <div class="search-bar">
        <icon type="search" size="20"/>&nbsp;
        <span>搜索</span>
      </div>
    </div>
    <!-- 轮播图 -->
    <swiper
      :indicatorDots="indicatorDots"
      :autoplay="autoplay"
      :indicatorColor="indicatorColor"
      :indicatorActiveColor="indicatorActiveColor"
    >
      <swiper-item :key="index" v-for="(item,index) in imgUrls">
        <img :src="item.image_src" class="slide-image">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrls: [
        // "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
        // "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640",
        // "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
      ],
      indicatorDots: true,  /* 是否开启轮播图小点 */
      autoplay: true , /* 自动播放 */
      indicatorColor: "#939393" , /* 小点的样式 */
      indicatorActiveColor: "#fff" /* 当前小点的样式 */
    };
  },
  created() {
    this.getslides();
  },
  methods: {
    // 获取首页轮播图数据
    getslides() {
      // 缓存this
      var that = this;
      // 发送请求获取首页轮播图数据
      mpvue.request({
        url: "https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata",
        // 获取数据成功的回调函数
        success: function(res) {
          // console.log(res.data)
          // 解构赋值获取到的数据
          let { message } = res.data;
          // 将获取好的数据存储到 imgUrls 中
          that.imgUrls = message;
          // console.log(that.imgUrls);
        }
      });
    }
  }
};
</script>

<style scoped>
.search {
  background-color: #ff2d4a;
  padding: 10px;
}
.search .search-bar {
  width: 100%;
  padding: 6px 0;
  color: #b4b2b2;
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
}
.search .search-tab icon {
  vertical-align: middle;
}
.slide-image {
  width: 750rpx;
}
</style>
