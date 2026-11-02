<template>
  <view>
    <page-meta>
      <navigation-bar
        :front-color="navFrontColor"
        :background-color="navBgColor"
      />
    </page-meta>
    <slot />
  </view>
</template>

<script>
export default {
  data() {
    return {
      navFrontColor: "#000000",
      navBgColor: "#F8F8F8",
    };
  },
  onLaunch() {
    // 应用启动时初始化
  },
};
</script>

<style>
/* 每个页面公共 CSS */
</style>
