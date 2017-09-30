<template>
  <div class="login-view">
    <div class="wrapper">
      <div class="container">
        <h1>欢迎登录</h1>
        <form class="form">
          <input type="text" placeholder="用户名" v-model="loginInfo.userName">
          <input type="password" placeholder="密码" v-model="loginInfo.password">
          <button class="login-btn" @click="onSubmit"><i class="el-icon-loading" v-if="loading"></i> 登录</button>
        </form>
      </div>
      <ul class="bg-bubbles">
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import httpService from '@/client/services/HttpService'
  import EncryptService from '@/client/services/EncryptService'
  import local from '@/client/services/LocalStore'

  export default {
    data() {
      return {
        loginInfo: {
          userName: '',
          password: ''
        },
        loading: false,
        clientHeight: 0
      };
    },
    mounted() {
      let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      this.clientHeight = h - 200 + 'px';
    },
    methods: {
      onSubmit() {
        this.loading = true;
        const instance = httpService.getAxios
        const userName = encodeURIComponent(this.loginInfo.userName)
        const password = encodeURIComponent(EncryptService.encrypt(this.loginInfo.password, this.loginInfo.userName))
        const param = 'userName=' + userName + '&password=' + password + '&loginCode=&loginType=1&deviceId=00%3A15%3A5d%3A04%3A0f%3A00'
        instance.post('/user/login', param).then((response) => {
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
    display: flex;
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-weight: 300;
  }
  .login-view {
    font-family: 'Source Sans Pro', sans-serif;
    color: white;
    font-weight: 300;
  }
  .login-view ::-webkit-input-placeholder {
    /* WebKit browsers */
    font-family: 'Source Sans Pro', sans-serif;
    color: white;
    font-weight: 300;
  }
  .login-view :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-family: 'Source Sans Pro', sans-serif;
    color: white;
    opacity: 1;
    font-weight: 300;
  }
  .login-view ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-family: 'Source Sans Pro', sans-serif;
    color: white;
    opacity: 1;
    font-weight: 300;
  }
  .login-view :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    font-family: 'Source Sans Pro', sans-serif;
    color: white;
    font-weight: 300;
  }
  .wrapper {
    background: #50a3a2;
    background: -webkit-linear-gradient(top left, #3f4e4d 0%, #2e3d3d 100%);
    background: linear-gradient(to bottom right, #204140 0%, #353446 100%);
    opacity: 0.8;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wrapper.form-success .container h1 {
    -webkit-transform: translateY(85px);
    -ms-transform: translateY(85px);
    transform: translateY(85px);
  }
  .container {
    max-width: 600px;
    height: 400px;
    text-align: center;
    margin-top: -50px;
  }
  .container h1 {
    font-size: 40px;
    -webkit-transition-duration: 1s;
    transition-duration: 1s;
    -webkit-transition-timing-function: ease-in-put;
    transition-timing-function: ease-in-put;
    font-weight: 200;
    margin-bottom: 10px;
  }
  form {
    position: relative;
    z-index: 2;
  }
  form input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.2);
    width: 250px;
    border-radius: 3px;
    padding: 10px 15px;
    margin: 0 auto 15px auto;
    display: block;
    text-align: center;
    font-size: 18px;
    color: white;
    -webkit-transition-duration: 0.25s;
    transition-duration: 0.25s;
    font-weight: 300;
  }
  form input:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
  form input:focus {
    background-color: white;
    width: 300px;
    color: #53e3a6;
  }
  form .login-btn {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    background-color: white;
    border: 0;
    padding: 10px 15px;
    color: #53e3a6;
    border-radius: 3px;
    width: 250px;
    cursor: pointer;
    font-size: 18px;
    -webkit-transition-duration: 0.25s;
    transition-duration: 0.25s;
  }
  form .login-btn:hover {
    background-color: #f5f7f9;
    color: #53e3a6;
  }
  .bg-bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .bg-bubbles li {
    position: absolute;
    list-style: none;
    display: block;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.15);
    bottom: -160px;
    -webkit-animation: square 25s infinite;
    animation: square 25s infinite;
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
  }
  .bg-bubbles li:nth-child(1) {
    left: 10%;
  }
  .bg-bubbles li:nth-child(2) {
    left: 20%;
    width: 80px;
    height: 80px;
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
    -webkit-animation-duration: 17s;
    animation-duration: 17s;
  }
  .bg-bubbles li:nth-child(3) {
    left: 25%;
    -webkit-animation-delay: 4s;
    animation-delay: 4s;
  }
  .bg-bubbles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    -webkit-animation-duration: 22s;
    animation-duration: 22s;
    background-color: rgba(255, 255, 255, 0.25);
  }
  .bg-bubbles li:nth-child(5) {
    left: 70%;
  }
  .bg-bubbles li:nth-child(6) {
    left: 80%;
    width: 120px;
    height: 120px;
    -webkit-animation-delay: 3s;
    animation-delay: 3s;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .bg-bubbles li:nth-child(7) {
    left: 32%;
    width: 160px;
    height: 160px;
    -webkit-animation-delay: 7s;
    animation-delay: 7s;
  }
  .bg-bubbles li:nth-child(8) {
    left: 55%;
    width: 20px;
    height: 20px;
    -webkit-animation-delay: 15s;
    animation-delay: 15s;
    -webkit-animation-duration: 40s;
    animation-duration: 40s;
  }
  .bg-bubbles li:nth-child(9) {
    left: 25%;
    width: 10px;
    height: 10px;
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
    -webkit-animation-duration: 40s;
    animation-duration: 40s;
    background-color: rgba(255, 255, 255, 0.3);
  }
  .bg-bubbles li:nth-child(10) {
    left: 90%;
    width: 160px;
    height: 160px;
    -webkit-animation-delay: 11s;
    animation-delay: 11s;
  }
  @-webkit-keyframes square {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(-700px) rotate(600deg);
      transform: translateY(-700px) rotate(600deg);
    }
  }
  @keyframes square {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(-700px) rotate(600deg);
      transform: translateY(-700px) rotate(600deg);
    }
  }
</style>


