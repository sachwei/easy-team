<template>
  <el-row class="home-view">
    <el-row class="toolbar">
      <el-col :span="4" class="toolbar-logo">
        <img src="" alt="">
      </el-col>
      <div class="toolbar-left">
        <p class="toolbar-title">日常工作辅助系统</p>
      </div>
      <div class="toolbar-right">
        <img class="img-head" :src="headUrl" alt="">
        <el-dropdown trigger="click" class="main-menu" @command="handleCommand">
            <span class="el-dropdown-link">
              {{ userInfo.userName }}<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setting">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </el-dropdown-item>
            <el-dropdown-item divided command="exit">
              <i class="el-icon-delete2"></i>
              <span>退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
    <el-row class="main-container">
      <el-col :span="4" class="left">
        <el-menu default-active="/home/summary" router>
          <template v-for="(item,index) in menus">
            <el-submenu :index="item.path" :key="item.path" v-if='item.children'>
              <template slot="title">
                <i class="el-icon-message"></i>
                <span slot="title">{{ item.name }}</span>
              </template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key='child.path'>
                <i class="el-icon-message"></i>
                <span slot="title">{{child.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.path" :key='item.path'>
              <i class="el-icon-message"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <el-col :span="20" class="content">
        <router-view></router-view>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
  import httpService from '@/client/services/HttpService'
  import local from '@/client/services/LocalStore'

  const menus = [
    { name: '首页', path:'/home/summary' },
    { name: '调休申请', path:'/home/apply'},
    { name: '项目管理', path: '1', children: [
      { name: '产品管理', path: '/home/projects' },
      { name: '项目管理', path: '/home/items'},
      { name: '资源管理', path: '/home/resource'}
    ]},
    { name: '售前运营', path:'/home/apply'},
    { name: '商务', path:'/home/apply'},
    { name: '设置', path: '2', children: [
      { name: '个人设置', path: '/home/personal' },
      { name: '系统设置', path: '/home/userSetting'}
    ]}
  ];

  export default {
    data() {
      return {
        $http: null,
        headUrl: '',
        userInfo: {},
        menus: menus
      };
    },
    mounted() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.$http = httpService.getAxios
      console.log(this.$router);
//      this.$router.push({ path: '/home/summary' })
    },
    methods: {
      menuSelect(index) {
        let path;
        switch (index) {
          case 1:          
            break;
        
          default:
            break;
        }
      },
      collapse() {
        console.log(this.isCollapse);
        this.isCollapse = !this.isCollapse;
      },
      handleCommand(command){
        if(command === 'exit'){
          this.$router.push({ path: '/' })
        }
      }
    }
  }
</script>

<style lang='scss' scoped>

  .home-view {
    position: absolute;
    top:0;
    bottom:0;
    width:100%;

    .toolbar{
      height: 50px;
      width: 100%;
      background-color: #333333;
      display: flex;
      align-items: center;

      .toolbar-logo{
        min-width: 180px;
        height: 50px;
        display: flex;
        align-items: center;
        border-right: 1px solid black;

        img{
          height:100%;
          flex:1 1 auto;
        }
      }

      .toolbar-title{
        color: white;
        font-weight: bold;
      }

      .toolbar-left {
        margin-left: 10px;
        flex: 1 1 auto;
      }

      .toolbar-right{
        cursor: pointer;
        margin-right: 20px;
        display: flex;
        align-items: center;
      }

      .img-head{
        height: 36px;
        border-radius: 18px;
        margin-right: 10px;
      }

      .toolbar-right span{
        color: white;
      }
    }

    .main-container{
      position: absolute;
      top:50px;
      bottom:0;
      overflow: hidden;
      width:100%;
      display: flex;

      .left{
        overflow: hidden;
        min-width: 180px;

        .el-menu {
          height: 100%;
          border-radius: 0;
        }
      }

      .content {
        padding: 10px 10px 1px 10px;
        overflow-y: auto;
        min-width: 800px;
      }
    }
  }

</style>