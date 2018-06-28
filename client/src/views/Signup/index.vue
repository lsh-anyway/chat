<template>
	<div class="login">
		<div class="title">CHAT</div>
		<el-form :model="user" label-width="4rem">
			<el-form-item label="用户名">
				<el-input v-model="user.username" placeholder="请输入用户名"></el-input>
			</el-form-item>
			<el-form-item label="昵称">
				<el-input v-model="user.nickname" placeholder="请输入昵称"></el-input>
			</el-form-item>
			<el-form-item label="邮箱">
				<el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input type="password" v-model="user.password" placeholder="请输入密码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="signup">注册</el-button>
			</el-form-item>
		</el-form>
		<router-link to="/login">返回登录>>></router-link>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
interface User {
  username: String;
  nickname: String;
  email: String;
  password: String;
}

@Component
export default class login extends Vue {
  // data
  public user: User = {
    username: "",
    nickname: "",
    email: "",
    password: ""
  };

  // methods
  public signup() {
    let { username, nickname, email, password } = this.user;
    this.axios
      .post("/user/signup", {
        username,
        nickname,
        email,
        password
      })
      .then((res: Object) => {
        localStorage.setItem("token", res.token);
        this.$message({
          message: "注册成功",
          type: "success"
        });
        setTimeout(() => {
          this.$router.push('/');
        }, 3000);
      })
      .catch((err: Object) => {
        if (err.response.status === 400) {
          const data = err.response.data;
          const detail = data.details[0].path[0];
          switch (detail) {
            case "username":
              this.$message("用户名必须为4-16位的英文字母和数字的组合");
              break;
            case "nickname":
              this.$message("昵称不能为空");
              break;
            case "email":
              this.$message("请输入正确的邮箱");
              break;
            case "password":
              this.$message("密码必须为6-16位的英文字母和数字的组合");
              break;
          }
        }
      });
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
