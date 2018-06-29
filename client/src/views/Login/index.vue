<template>
    <div class="login">
	    <div class="title">CHAT</div>
	    <el-form :model="user" label-width="3rem">
		    <el-form-item label="账号">
			    <el-input v-model="user.username" placeholder="请输入用户名或邮箱"></el-input>
		    </el-form-item>
		    <el-form-item label="密码">
			    <el-input type="password" v-model="user.password" placeholder="请输入密码"></el-input>
		    </el-form-item>
		    <el-form-item>
			    <el-button @click="login">登录</el-button>
		    </el-form-item>
	    </el-form>
	    <div class="nav">
		    <router-link to="/signup">创建一个新账户>>></router-link>
	    </div>
	    <div class="footer">
		    <i class="icon-github" @click="loginByGitHub">GitHub登录</i>
	    </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
interface User {
  username: String;
  password: String;
}

@Component
export default class login extends Vue {
  // data
  public user: User = {
    username: "",
    password: ""
  };

  // methods
  public login() {
    let { username, password } = this.user;
    this.axios
      .post("/user/signin", {
        username,
        password
      })
      .then((res: any) => {
        localStorage.setItem("token", res.token);
        this.$message({
          message: "登录成功",
          type: "success"
        });
        this.$router.push("/");
      })
      .catch((err: any) => {
        if (err.response.status === 401) {
          this.$message("用户名或密码错误");
        }
      });
  }
  public loginByGitHub() {
    window.location.href =
      "https://github.com/login/oauth/authorize?client_id=55b07150945744c997bf";
  }
}
</script>

<style scoped lang="scss">
@import url("../../scss/iconfont.scss");
@import "index";
</style>
