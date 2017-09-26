<template>
  <div class="apply-view">
    <el-table :data="tableData" class="table1">
        <el-table-column type="expand">
            <template scope="props">
                {{ props.row.date }}
            </template>
        </el-table-column>
        <el-table-column label="年月" prop="date"></el-table-column>
        <el-table-column label="加班天数" prop="name"> </el-table-column>
        <el-table-column label="调休天数" prop="address"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
       tableData: [{
          date: '2016-05',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  }
}
</script>

<style>
  .apply-view {
      padding: 10px;
  }

  .table1 {
      width: 100%;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    /* width: 50%; */
  }
</style>
