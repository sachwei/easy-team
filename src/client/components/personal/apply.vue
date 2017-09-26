<template>
  <div class="apply-view">
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="日期">
          <el-date-picker
            v-model="formInline.date"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions0">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目" v-model="formInline.project">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="formInline.project"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="formInline.note" placeholder="具体工作内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" highlight-current-row class="table1">
        <el-table-column type="expand" expand="true">
            <template scope="props">
                {{ props.row.date }}
            </template>
        </el-table-column>
        <el-table-column label="年月" prop="date"></el-table-column>
        <el-table-column label="加班天数" prop="name"> </el-table-column>
        <el-table-column label="调休天数" prop="address"> </el-table-column>
        <el-table-column label="操作">
          <template scope="props">
            <el-button
              size="small"
              @click="handleEdit(props.$index, props.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(props.$index, props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
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
        }
      ],
      formInline: {
        date: '',
        project: [],
        note: ''
      },

      options: [
        {
          "value": "zhinan",
          "label": "指南",
          "children": [
            {
              "value": "shejiyuanze",
              "label": "设计原则"
            },
            {
              "value": "daohang",
              "label": "导航"
            }
          ]
        },
        {
          "value": "zujian",
          "label": "组件",
          "children": [
            {
              "value": "basic",
              "label": "Basic"
            },
            {
              "value": "form",
              "label": "Form"
            }
          ]
        },
        {
          "value": "ziyuan",
          "label": "资源",
          "children": [
            {
              "value": "axure",
              "label": "Axure Components"
            },
            {
              "value": "sketch",
              "label": "Sketch Templates"
            },
            {
              "value": "jiaohu",
              "label": "组件交互文档"
            }
          ]
        }
      ]

    }
  },
  methods: {

  }
}
</script>

<style>
  .apply-view {
      padding: 10px;
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
  }
  .table1 {
      width: 100%;
      max-height: 100%;
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
  }
</style>
