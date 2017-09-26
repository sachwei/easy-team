<template>
  <div class="home-view">
    <div class="left">
      <div class="left-head" :class="{ 'left-head-collapse': isCollapse }">
        <div class="head" :class="{ 'head-collapse': isCollapse }">
          <img :src="headUrl" v-loading='true'>
        </div>
        <p class="user-info" :class="{ 'user-info-collapse': isCollapse }">
          {{ userInfo.level }}
        </p>
        <div class="collapse" @click='collapse' :class="{ 'collapse-collapse': isCollapse }">
          <i class='el-icon-d-arrow-right' v-if='isCollapse'></i>
          <i class='el-icon-d-arrow-left' v-else></i>
        </div>
      </div>
      <el-menu default-active="0" router :collapse="isCollapse">
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
    </div>
    <div class="right">
      <div class="toolbar">
        <div class="toolbar-left">
          <p class="toolbar-title">日常工作系统</p>
        </div>
        <div class="toolbar-right">
          <el-dropdown trigger="click" class="main-menu">
            <span class="el-dropdown-link">
              {{ userInfo.userName }}<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i class="el-icon-setting"></i>
                <span>系统设置</span>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <i class="el-icon-delete2"></i>
                <span>退出系统</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import httpService from '@/client/services/HttpService'
  import local from '@/client/services/LocalStore'

  const menus = [
    { name: '首页', path:'/home' },
    { name: '调休申请', path:'/home/apply'},
    { name: '系统设置', children: [
      { name: '个人设置', path: '/home/personal' },
      { name: '用户设置', path: '/home/userSetting'}
    ]}
  ];

  export default {
    data() {
      return {
        isCollapse: false,
        $http: null,
        headUrl: '',
        userInfo: {},
        menus: menus
      };
    },
    mounted() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      console.log(httpService.getBaseUrl);
      this.$http = httpService.getAxios
      this.headUrl = httpService.getBaseUrl + `/userimage/head/${this.userInfo.email}`
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
      }
    }
  }
</script>

<style lang='scss' scoped>

  .el-menu{
    background-color: transparent;
  }

  .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
    background-color: #7ed2df;
  }

  .el-menu-item, .el-submenu__title {
    color: #fff;
  }

  .el-menu .el-menu-item, .el-submenu .el-submenu__title {
    height: 46px;
    line-height: 46px;
  }

  .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
    background-color: #7ed2df;
  }

  .el-submenu .el-menu-item {
    background-color: #333744
  }

  .el-submenu .el-menu-item:hover {
    background-color: #333744
  }

  .el-submenu .el-menu-item.is-active, .el-menu-item.is-active,
  .el-submenu .el-menu-item.is-active:hover, .el-menu-item.is-active:hover {
    background-color: #00C1DE;
    color: #fff;
  }

  .el-menu .iconfont {
    vertical-align: baseline;
    margin-right: 6px;
  }

  .el-submenu__title span,i{
    color:white;
  }

  .el-menu-item, .el-submenu__title{
    color: white !important;
  }

  .home-view {
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .left {
    background-color: #373D41;
    height: 100%;
  }
  .left-head-collapse {
    width: 64px !important;
    height: 50px !important;
  }

  .left-head {
    height: 80px;
    width: 260px;
    background-color: #373D41;
    display: flex;    
    align-items: center;
    justify-content: center;
    transition: all .3s ease-in-out;

    .head-collapse {
      display: none;
    }
    .head {
      margin-left: 20px;      
      width: 70px;
      height: 50px;
      border: 2px solid white;
      border-radius: 100px;
      transition: all .3s;
      overflow: hidden;

      img{
        height: 100%;
        width: 100%;
      }
    }

    .user-info-collapse {
      display: none;
    }
    .user-info{
      font-size: .7rem;
      margin-left: 10px;      
      color: white;
    }

    .collapse-collapse{
       margin-right: 0 !important;
    }
    .collapse{
      margin-right: 20px;
      margin-left: 10px;
      color: grey;
      cursor: pointer;
    }
  }

  .right{
    height: 100%;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;

    .toolbar{
      flex: 0 0 50px;
      height: 50px;
      width: 100%;
      background-color: #373D41;
      display: flex;
      align-items: center;

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
      }

      .toolbar-right span{
        color: white;
      }
    }

    .content{
      flex: 1 1 auto;
      overflow-y: auto;
      width: 100%;
    }
  }
</style>