<template>
  <div class="resource-view">
    <div class="toolbar">
      <el-button-group>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">编辑</el-button>
        <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
        <el-button type="danger">删除</el-button>
      </el-button-group>
    </div>
    <el-table ref="multipleTable"
            :data="userList"
            border
            tooltip-effect="dark"
            style="width: 100%"
            :max-height="maxHeight"
            class="table"
            @selection-change="handleSelectionChange">
      <el-table-column
              type="selection"
              width="55">
      </el-table-column>
      <el-table-column
              type="expand"
              width="55">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="姓名">
              <span>{{ props.row.userCnName }}</span>
            </el-form-item>
            <el-form-item label="手机号码">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
              label="日期"
              width="120">
        <template scope="scope">{{ scope.row.workNum }}</template>
      </el-table-column>
      <el-table-column
              prop="userCnName"
              label="姓名"
              width="120">
      </el-table-column>
      <el-table-column
              prop="email"
              label="邮箱"
              show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import httpService from '@/client/services/HttpService'
  import dateUtilService from '@/client/services/CommonUtilService'

  export default {
    data() {
      return {
        userList: [],
        multipleSelection: [],
        maxHeight: 600
      }
    },
    mounted() {
      this.maxHeight = dateUtilService.getClientHeight() - 116;
      this.$http = httpService.getAxios;
      this.findAllUsers();
    },
    methods: {
      findAllUsers() {
        this.$http.get('/user/getAllUsers').then((res) => {
          if(res && res.data){
          this.userList = res.data;
        }
      }, () => {

        });
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
        });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style lang="scss">
  .resource-view{

    .table{
      margin-top: 10px;
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
      width: 50%;
    }
  }
</style>