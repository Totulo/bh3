<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 登录 -->
      <el-form  :model="loginForm"  class="login_form" @submit.native.prevent="login">
        <!-- 用户名 -->
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" >
          <el-input v-model="loginForm.password"  type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
    }
  },
  methods: {
    async login() {
      const res = await this.$http.post('login', this.loginForm)
      localStorage.token = res.data.token
      this.$router.push('/home')
      this.$message({
        type: 'success',
        message: '登陆成功'
      })
    }
  }
}
</script>

<style >
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }
  .login_box {
    width: 400px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .btns {
      display: flex;
      justify-content: flex-end;
    }
</style>
