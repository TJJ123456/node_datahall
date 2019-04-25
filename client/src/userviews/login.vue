<template>
  <div>
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="登陆" name="first"></el-tab-pane>
          <el-tab-pane label="注册" name="second"></el-tab-pane>
        </el-tabs>
        <!-- <header class="form_header">{{title}}</header> -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="110px"
          class="form food_form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item v-if="mode==='signup'" label="确认密码" prop="checkpassword">
            <el-input type="password" v-model="ruleForm.checkpassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center">
              <el-button type="primary" @click="onSubmit('ruleForm')">{{title}}</el-button>
              <!-- <el-button type="success" @click="mode = 'signup'">注册</el-button> -->
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    var validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (this.ruleForm.checkpassword !== this.ruleForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        if (this.ruleForm.checkpassword !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      mode: "login",
      activeName2: "first",
      ruleForm: {
        username: "",
        password: "",
        checkpassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkpassword: [
          { required: true, validator: validateCheckPass, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    title() {
      switch (this.mode) {
        case "login":
          return "登录";
        case "signup":
          return "注册";
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      if (tab.index === '0') {
        this.mode = "login";
      } else {
        this.mode = "signup";
      }
      console.log(this.mode);
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.operation();
          //   alert("sumit");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async operation() {
      await this[this.mode]();
    },
    async login() {
      const data = await this.$fetch("user/login", {
        method: "POST",
        body: JSON.stringify({
          username: this.ruleForm.username,
          password: this.ruleForm.password
        })
      });
      console.log(data);
      if (data.err) {
        this.$message({
          showClose: true,
          message: data.msg,
          type: "error"
        });
      } else {
        this.$message({
          showClose: true,
          message: "登录成功",
          type: "success"
        });
        this.$state.user = data;
        localStorage.setItem("user", JSON.stringify(data));
        if (this.$route.params.wantedRoute) {
          this.$router.replace(this.$route.params.wantedRoute);
        } else {
          this.$router.replace("/");
        }
      }
    },
    async signup() {
      const data = await this.$fetch("user/signup", {
        method: "POST",
        body: JSON.stringify({
          username: this.ruleForm.username,
          password: this.ruleForm.password
        })
      });
      if (data.err) {
        this.$message({
          showClose: true,
          message: data.msg,
          type: "error"
        });
      } else {
        this.$message({
          showClose: true,
          message: "注册账号成功",
          type: "success"
        });
        this.resetForm("ruleForm");
        this.mode = "login";
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
@import "../style/mixin";
.form {
  min-width: 400px;
  margin-bottom: 30px;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border-radius: 6px;
    transition: all 400ms;
  }
}
.food_form {
  border: 1px solid #eaeefb;
  padding: 10px 10px 0;
}
.form_header {
  text-align: center;
  margin-bottom: 10px;
}
</style>