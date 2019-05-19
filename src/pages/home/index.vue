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
        <img :src="item" class="slide-image">
      </swiper-item>
    </swiper>
    <!-- 分类菜单 -->
    <div class="menu">
      <img :key="index" v-for="(menus,index) in menus" :src="menus.image_src" alt>
    </div>
    <!-- 商品列表楼层数据 -->
    <div class="shop-floor">
      <div :key="index" v-for="(item,index) in shopFloor">
        <div class="shop-title">
          <img :src="item.floor_title.image_src" alt>
        </div>
        <div class="classifys">
          <div class="classifys-lf">
            <img :src="item.product_list[0].image_src" alt>
          </div>
          <div class="classifys-rg">
            <img
              :key="i"
              v-for="(itemChild,i) in newFilterItem[index]"
              :src="itemChild.image_src"
              alt
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 回到顶部按钮 -->
    <div v-if="isShow" @click="goTop()" class="toTop">
      ︿
      <p>顶部</p>
    </div>
  </div>
</template>

<script>
// 导入通用接口模块
import request from "../../utils/request.js";
export default {
  data() {
    return {
      isShow: false,
      // 轮播图数据
      imgUrls: [
        // "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
        // "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640",
        // "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
      ],
      // 分类菜单数据
      menus: [],
      // 商品列表楼层数据
      shopFloor: [],
      indicatorDots: true /* 是否开启轮播图小点 */,
      autoplay: true /* 自动播放 */,
      indicatorColor: "#939393" /* 小点的样式 */,
      indicatorActiveColor: "#fff" /* 当前小点的样式 */
    };
  },
  // 页面滚动事件
  onPageScroll(event) {
    let tops = event.scrollTop;
    // console.log(tops)
    if (tops > 88) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  },
  computed: {
    // 计算属性,控制商品列表的数据
    newFilterItem: function() {
      // 判断 shopFloor是否为空，如果为空不进行处理
      if (this.shopFloor[0]) {
        // 不为空进行处理
        // 创建一个空数组
        var newArr = [];
        // 循环遍历 shopFloor
        this.shopFloor.forEach(item => {
          // 结构赋值遍历出来的每一项数据
          let { product_list } = item;
          // 截取遍历出来的每一项数据数组
          let mofi = product_list.slice(1, product_list.length);
          // 将截取好的数组添加到 newArr 中去
          newArr.push(mofi);
        });
      }
      console.log(newArr);
        // * 必须return返回 
      // if(newArr !== undefined){
      return newArr;
      // }
    }
  },
  async created() {
    // 缓存this
    var that = this;
    // 发送请求获取轮播图数据
    let getresSlide = await request("home/swiperdata");
    let slideList = getresSlide.data.message;
    slideList = slideList.map(item => {
      return item.image_src;
    });
    that.imgUrls = slideList;

    //发送请求获取分类菜单数据
    let getmenuList = await request("home/catitems");
    let { message } = getmenuList.data;
    that.menus = message;

    // 发送请求获取商品列表楼层数据
    let getshopList = await request("home/floordata");
    let shopList = getshopList.data.message;
    shopList = shopList.map(item => {
      return item;
    });
    that.shopFloor = shopList;

    /*  mpvue.request({
      url: "https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata",
      // 获取数据成功的回调函数
      success: function(res) {
        var list = res.data.message;
        // console.log(list )
        list = list.map(item => {
          return item.image_src;
        });
        that.imgUrls = list;
        // console.log(list);
      }
    });
    mpvue.request({
      url: "https://www.zhengzhicheng.cn/api/public/v1/home/catitems",
      success(res) {
        // console.log(res.data)
        var { message } = res.data;
        // console.log(message)
        that.menus = message;
      }
    }); */
  },
  methods: {
    /* 点击回到顶部 */
    goTop() {
      mpvue.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    }
  }
};
</script>

<style scoped>
.search {
  background-color: #ff2d4a;
  padding: 10rpx;
}
.search .search-bar {
  width: 100%;
  padding: 6rpx 0;
  color: #b4b2b2;
  text-align: center;
  background-color: #fff;
  border-radius: 5rpx;
}
.search .search-tab icon {
  vertical-align: middle;
}
.slide-image {
  width: 750rpx;
}
.menu {
  padding: 15rpx 0;
  display: flex;
  justify-content: space-around;
}
.menu img {
  flex: 1;
  width: 130rpx;
  height: 143rpx;
  padding: 0 8rpx;
  box-sizing: border-box;
}
.shop-floor {
  width: 100%;
}
.shop-title {
  background-color: #f4f4f4;
}
.shop-title img {
  height: 85rpx;
}
.classifys {
  display: flex;
  padding: 16rpx;
  justify-content: space-between;
  box-sizing: border-box;
}
.classifys-lf {
  flex: 1;
  display: flex;
}
.classifys-lf img {
  width: 232rpx;
}
.classifys-rg {
  flex: 2;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.classifys-rg img {
  width: 235rpx;
  height: 232rpx;
  border-radius: 10rpx;
}
.classifys-rg img:nth-child(1),
.classifys-rg img:nth-child(2) {
  margin-bottom: 14rpx;
}
.toTop {
  width: 120rpx;
  height: 120rpx;
  background-color: #fff;
  opacity: 0.8;
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  border-radius: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
