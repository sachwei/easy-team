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
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
              prop="date"
              label="日期">
      </el-table-column>
      <el-table-column
              prop="name"
              label="姓名">
      </el-table-column>
      <el-table-column
              prop="address"
              label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    data() {
      return {
        value7: 0,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .summary-view {
    width: 100%;
  }
</style>

