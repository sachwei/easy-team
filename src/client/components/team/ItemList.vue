<template>
  <div class="items-view">
    <div class="toolbar">
      <el-button-group>
        <el-button type="primary" icon="arrow-left">上一页</el-button>
        <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
    </div>  
    <div>
      <el-table :data="tableData" highlight-current-row class="table1">
        <el-table-column type="expand" expand="true">
            <template scope="props">
                {{ props.row.date }}
            </template>
        </el-table-column>
        <el-table-column label="产品编码" prop="code" width="120px"></el-table-column>
        <el-table-column label="产品名称" prop="name" width="100px"> </el-table-column>
        <el-table-column label="产品负责人" prop="owner" width="100px"> </el-table-column>
        <el-table-column label="产品摘要" prop="summary"> </el-table-column>
        <el-table-column label="立项日期" prop="createDate" width="100px"> </el-table-column>
        <el-table-column label="销售单数" prop="sealCount" width="100px"> </el-table-column>
        <el-table-column label="销售金额" prop="totalMoney" width="100px"> </el-table-column>
        <el-table-column label="操作" width="200px">
          <template scope="props">
            <el-button
              size="small"
              @click="handleEdit(props.$index, props.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(props.$index, props.row)">删除</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(props.$index, props.row)">停用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
          code: '20160801',
          name: '财务家园',
          owner: '陆春里',
          summary: '财务人员工作办公交流平台',
          createDate: '2016-8',
          sealCount: '2',
          totalMoney: '1,500,000'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .items-view {
    padding: 10px;
    width: 100%;
  }
  .table1 {
    width: 100%;
    max-height: 100%;
  }
</style>
