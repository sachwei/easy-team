<template>
  <div class="login-view" v-loading="loading">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="userName">
        <el-input type="text" v-model="ruleForm2.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import httpService from '@/client/services/HttpService'
  import EncryptService from '@/client/services/EncryptService'
  import local from '@/client/services/LocalStore'

  export default {
    data() {
      var validateUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空'));
        } else {
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码不能为空'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          userName: '',
          password: ''
        },
        rules2: {
          userName: [
            { validator: validateUserName, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ]
        },
        loading: false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.handleSubmit();
          } else {
            return false;
          }
        });
      },
      handleSubmit() {
        this.loading = true;
        const instance = httpService.getAxios
        const userName = encodeURIComponent(this.ruleForm2.userName)
        const password = encodeURIComponent(EncryptService.encrypt(this.ruleForm2.password, this.ruleForm2.userName))
        const param = 'userName=' + userName + '&password=' + password + '&loginCode=&loginType=1&deviceId=00%3A15%3A5d%3A04%3A0f%3A00'
        instance.post('/login', param).then((response) => {
          const user = response.data
          if (user.errorCode === 0) {
            local.set('userInfo', user);
            this.$router.push({ path: '/home' })
          } else {
            this.$message({
              title: '警告',
              message: '用户名或密码错误',
              type: 'warning'
            });
          }
          this.loading = false;
        }, () => {
          this.loading = false;
          this.$message({
              title: '警告',
              message: '登录失败',
              type: 'warning'
            });
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-view{
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background:linear-gradient(to right bottom, lightgray, white);

    .demo-ruleForm{
      width: 400px;
    }
  }
</style>


