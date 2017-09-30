<template>
  <div class="items-view">
    <div class="toolbar">
      <div class="left">
        <el-button type="primary" @click="openDialog">新增产品</el-button>
      </div>
      <div class="right">
        <el-button-group>
          <el-button size="small" @click="findAllProjects">刷新</el-button>
          <el-button size="small">列表</el-button>
          <el-button size="small">卡片</el-button>
        </el-button-group>
        <el-checkbox v-model="showStopItem" class="check-show-stop">显示停用</el-checkbox>
      </div>
    </div>
    <div>
      <el-table :data="tableData" v-loading.body="loading" highlight-current-row fit="true" class="table1" :maxHeight="maxHeight">
        <el-table-column type="expand" expand="true">
            <template scope="props">
                <div class="project-detail">
                  {{ props.row.summary }}
                </div>
            </template>
        </el-table-column>
        <el-table-column label="编码" prop="code" width="120px"></el-table-column>
        <el-table-column label="名称" prop="name" width="100px"> </el-table-column>
        <el-table-column label="负责人" prop="owner" width="100px"> </el-table-column>
        <el-table-column label="摘要" prop="summary" min-width="200px"> </el-table-column>
        <el-table-column label="立项日期" prop="createDate" width="100px" :formatter="formatDate"> </el-table-column>
        <el-table-column label="销售单数" prop="sealCount" width="100px"> </el-table-column>
        <el-table-column label="销售金额" prop="totalMoney" width="100px"> </el-table-column>
        <el-table-column label="操作" width="200px">
          <template scope="props">
            <el-button size="small" @click="handleEdit(props.$index, props.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(props.$index, props.row)">删除</el-button>
            <el-button size="small" type="danger" @click="handleStop(props.$index, props.row)">停用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新增产品" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" style="width:90%" label-width="100px">
        <el-form-item label="编码">
          <el-input v-model="form.code" placeholder="请输入编码"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-select v-model="form.ownerId" style="width:200px" placeholder="请选择">
          <el-option
            v-for="item in userList"
            :key="item.email"
            :label="item.userCnName"
            :value="item.email">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="立项日期">
          <el-date-picker type="date" style="width:200px" placeholder="选择日期" v-model="form.createDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input type="textarea" v-model="form.summary"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAddProject">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import httpService from '@/client/services/HttpService'
import dateUtilService from '@/client/services/CommonUtilService'

export default {
  data() {
    return {
      $http: {},
      userList: [],
      dialogFormVisible: false,
      form: {},
      tableData: [],
      showStopItem: true,
      maxHeight: 0,
      loading: false
    }
  },
  mounted() {
    this.$http = httpService.getAxios;
    this.maxHeight = dateUtilService.getClientHeight() - 116;
    this.findAllProjects();
    this.findAllUsers();
  },
  methods: {
    formatDate(row, column, cellValue) {
      let date = new Date(cellValue);
      return date.getFullYear() + '-' + dateUtilService.fillZero(date.getMonth() + 1, 2);
    },
    findAllProjects() {
      this.loading = true;
      this.$http.get('/project/findAllProjects').then((res) => {
        if(res && res.data){
          this.tableData = res.data;
        }
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    },
    findAllUsers() {
      this.$http.get('/user/getAllUsers').then((res) => {
        if(res && res.data){
          this.userList = res.data;
        }
      }, () => {

      });
    },
    openDialog() {
      this.form = {
        code: '',
        name: '',
        ownerId: '',
        createDate: '',
        summary: ''
      };
      this.dialogFormVisible = true;
    },
    doAddProject() {
      this.form.createDate = new Date(this.form.createDate).getTime();
      this.$http.post('/project/saveProject', this.form).then((res) => {
        if(res && res.data) {
          this.$message({
            message: '新增成功',
            type: 'success'
          });
          this.findAllProjects();
        }
      }, () => {

      });
      this.dialogFormVisible = false;
    },
    handleEdit(index, row) {
      this.form = row;
      this.dialogFormVisible = true;
    }
  }
}
</script>

<style>
  textarea{
    font-family: "Microsoft YaHei" !important;
  }
</style>
<style lang="scss" scoped>

  .table1 {
    margin-top: 10px;
  }

  .toolbar {
    display: flex;

    .left{
      flex: 0 0 200px;
    }

    .right {
      flex: 1 1 auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .check-show-stop{
        margin-left: 10px;
      }
    }
  }
  
</style>
