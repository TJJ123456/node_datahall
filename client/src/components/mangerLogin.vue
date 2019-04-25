<template>
  <div class="container">
    <div class="login-form">
      <h1>数据交易所管理员登录</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" @submit.native.prevent>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-button type="primary" @click="onSubmit('ruleForm')">立即登录</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import container from "element-ui";
export default {
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.username !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async login() {
      let data = await this.$fetch("managerlogin", {
        method: "POST",
        body: JSON.stringify(this.ruleForm)
      });
      if (data.manager === false) {
        this.resetForm("ruleForm");
        this.$message.error("账号或密码错误");
      } else {
        this.$state.manager = true;
        localStorage.setItem("manager", JSON.stringify(data));
        if (this.$route.params.wantedRoute) {
          this.$router.replace(this.$route.params.wantedRoute);
        } else {
          this.$router.replace("/manager");
        }
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #324057;
}
h1 {
  margin: auto;
  text-align: center;
  color: #606266;
}
.el-button {
  margin: 0 40;
}

.login-form {
  border-radius: 2px;
  background-color: #fff;
  width: 320px;
  margin: 120px auto;
  padding: 35px 35px 15px 35px;
}
</style>
