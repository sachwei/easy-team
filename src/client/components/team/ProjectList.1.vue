<template>
  <div class="items-view">
    <div class="toolbar">
      <div class="left">
        <el-button type="primary" @click="addProject">新增产品</el-button>
      </div>
      <div class="right">
        <el-button-group>
          <el-button size="small">列表</el-button>
          <el-button size="small">卡片</el-button>
        </el-button-group>
      </div>
    </div>
    <div>
      <el-table :data="tableData" highlight-current-row class="table1">
        <el-table-column type="expand" expand="true">
            <template scope="props">
                <div class="project-detail">
                  {{ props.row.summary }}
                </div>
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
            <el-button size="small" @click="handleEdit(props.$index, props.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(props.$index, props.row)">删除</el-button>
            <el-button size="small" type="danger" @click="handleDelete(props.$index, props.row)">停用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新增产品" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" style="width:90%" label-width="100px">
        <el-form-item label="编码">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-select v-model="value" style="width:200px" placeholder="请选择">
          <el-option
            v-for="item in userList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
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
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import httpService from '@/client/services/HttpService'

export default {
  data() {
    return {
      $http: httpService.getAxios,
      userList: [],
      dialogFormVisible: false,
      form: {
        code: '20160801',
        name: '财务家园',
        owner: '陆春里',
        ownerId: "123",
        summary: '财务人员工作办公交流平台',
        createDate: '2016-8',
        sealCount: '2',
        totalMoney: '1,500,000'
      },
      tableData: [
        {
          code: '20160801',
          name: '财务家园',
          owner: '陆春里',
          ownerId: "123",
          summary: '财务人员工作办公交流平台',
          createDate: '2016-8',
          sealCount: '2',
          totalMoney: '1,500,000'
        },
        {
          code: '20140801',
          name: 'YGCC',
          owner: '向婷',
          ownerId: "123",
          summary: '企业沟通协作平台',
          createDate: '2014-8',
          sealCount: '5',
          totalMoney: '500,000'
        },
        {
          code: '20160801',
          name: '移动报销',
          owner: '林美君',
          ownerId: "123",
          summary: '财务管控的移动端报销',
          createDate: '2015-11',
          sealCount: '4',
          totalMoney: '600,000'
        }
      ]
    }
  },
  mounted() {
    console.log(this.$http);
    this.$http.get('/user/getAllUsers').then((res) => {
      console.log(res.data);
    }, () => {

    });
  },
  methods: {
    addProject() {
      tihs.dialogFormVisible = true;
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
    margin-top: 10px;
    width: 100%;
    max-height: 100%;
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
      align-items: flex-end;
    }
  }
  
</style>
