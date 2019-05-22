<template>
  <div>
    <!-- 搜索框 -->
    <search-bar></search-bar>
    <div class="content">
      <!-- 分类左侧导航栏 -->
      <div class="left">
        <ul>
          <li
            @click="sidebar(index)"
            :class="{active:currentIndex === index}"
            class="menu-item"
            v-for="(item,index) in cate"
            :key="item.cat_id"
          >
            <span></span>
            {{ item.cat_name }}
          </li>
        </ul>
      </div>
      <!-- 分类右侧数据列表 -->
      <div class="right">
        <div class="brand-item" v-for="rightItem in getRightData" :key="rightItem.cat_id">
          <div class="brand-title">{{ rightItem.cat_name }}</div>
          <div class="brand-list">
            <div v-for="(img,i) in rightItem.children" :key="i" class="brand">
              <img :src="img.cat_icon" mode="aspectFill">
              <p>{{ img.cat_name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
import searchBar from "../../components/search_bar";
export default {
  // 注册搜索框组件
  components: {
    "search-bar": searchBar
  },
  data() {
    return {
      // 存储分类数据
      cate: [],
      // 定义索引值
      currentIndex: 0
    };
  },
  computed: {
    getRightData() {
      // 从cate数组中获取一部分数据，根据当前的索引得到的
      // 计算属性的应用场景：从既有数据中获取几部分数据或者对已有数据进行加工处理形成新的格式，计算属性的结果依赖于data中数据的变化
      let ret = this.cate.length > 0 && this.cate[this.currentIndex].children;
      return ret;
    }
  },
  created() {
    this.getCate();
  },
  methods: {
    /* 获取分类数据 */
    async getCate() {
      let res = await request("categories");
      this.cate = res.data.message;
      // console.log(this.cate);
    },
    /* 给侧边栏按钮事件 */
    sidebar(index) {
      this.currentIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "main.scss";
</style>

