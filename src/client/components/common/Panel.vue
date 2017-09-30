<template>
  <div class="panel">
    <div class="title">
      <label>{{ title }}</label>
      <div class="operator">
        <i class="el-icon-view" @click="onExpand"></i>
        <i class="el-icon-circle-close" @click="onClose"></i>
      </div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Panel',
    data() {
      return {

      }
    },
    props: [
      'title'
    ],
    methods: {
      onClose() {
        this.$emit('onClose');
      },
      onExpand() {
        this.$emit('onExpand');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .panel{
    transition: all 1s;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    box-sizing: content-box;
    width:100%;
    height: 260px;
    border:1px solid #f6e7f6;

    .title{
      display: flex;
      background-color: #F9FAFC;
      height: 30px;
      border-bottom: 1px solid #f6e7f6;
      line-height: 30px;

      label{
        margin-left: 10px;
        font-weight: bold;
        flex:1 1 auto;
      }

      .operator{
        color: grey;

        i{
          cursor: pointer;
          margin-right: 5px;
        }
      }
    }

    .content{
      width:100%;
      flex: 1 1 auto;
      overflow-y: auto;
    }
  }
</style>

