<template>
  <div>
    <!-- 搜索框 -->
    <div class="search">
      <div class="search-bar">
        <navigator url="/pages/search/main">
          <icon type="search" size="20"/>&nbsp;
          <span>搜索</span>
        </navigator>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.search {
  background-color: #ff2d4a;
  padding: 10rpx;
  .search-bar {
    width: 100%;
    padding: 6rpx 0;
    color: #b4b2b2;
    text-align: center;
    background-color: #fff;
    border-radius: 10rpx;
    icon {
      vertical-align: middle;
    }
  }
}
</style>
