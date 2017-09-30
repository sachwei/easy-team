<template>
  <div class="summary-view">
    <el-row :gutter="10">
      <el-col :span="expand" style="transition: all .6s" v-show="isShow">
        <panel title="测试" @onExpand="onExpand" @onClose="onClose">
          <div id="main"></div>
        </panel>
      </el-col>
      <el-col :span="12">
        <panel title="测试1">

        </panel>
      </el-col>
      <el-col :span="12">
        <panel title="测试2">

        </panel>
      </el-col>
      <el-col :span="12">
        <panel title="表格">
          <el-table :data="tableData" style="width: 100%" height="260">
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
        </panel>
      </el-col>

    </el-row>


  </div>
</template>

<script>
  import echarts from 'echarts'
  import Panel from '@/client/components/common/Panel'

  export default {
    components:{
      Panel
    },
    data() {
      return {
        isShow: true,
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
        }],
        expand: 12
      }
    },
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));
      // 绘制图表
      myChart.setOption({
        title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
    },
    methods: {
      onExpand(){
        this.expand = 24;
      },
      onClose() {
        this.isShow = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .summary-view {
    width: 100%;
    height: 100%;
  }

  #main{
    height: 200px;
    width:100%;
  }
</style>

