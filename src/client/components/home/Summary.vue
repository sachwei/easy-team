<template>
  <div class="summary-view">
    <div class="block">
      <span class="demonstration">显示间断点</span>
      <el-slider
        v-model="value7"
        :step="10"
        show-stops>
      </el-slider>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value7: 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .summary-view {
    width: 100%;
    padding: 10px;
  }
</style>

