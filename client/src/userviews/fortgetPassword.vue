<template>
  <div class="fillcontain">
    <el-row>
      <el-col :span="8" :offset="8">
        <div class="login">
          <div class="title">
            <span>{{title}}</span>
          </div>
          <!-- <header class="form_header">{{title}}</header> -->
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="110px"
            class="form food_form"
          >
            <el-form-item v-if="mode === 'username'" label="用户名" prop="username">
              <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="mode==='answer'" label="密保问题" prop="question">
              <el-select v-model="ruleForm.question" placeholder="请选择密保问题" style="width: 100%;">
                <el-option
                  v-for="(item, index) in questionList"
                  :key="index"
                  :value="index"
                  :label="item"
                >{{item}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="mode==='answer'" label="密保答案" prop="answer">
              <el-input type="text" v-model="ruleForm.answer"></el-input>
            </el-form-item>
            <el-form-item v-if="mode==='password'" label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item v-if="mode==='password'" label="确认密码" prop="checkpassword">
              <el-input type="password" v-model="ruleForm.checkpassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-row type="flex" justify="center">
                <el-button type="primary" @click="onSubmit('ruleForm')">确认</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
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
      mode: "username",
      activeName2: "first",
      questionList: [],
      ruleForm: {
        username: "",
        password: "",
        checkpassword: "",
        question: 0,
        answer: ""
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
        case "username":
          return "检查用户名";
        case "answer":
          return "确认密保答案";
        case "password":
          return "更改新密码";
      }
    }
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      this.loading = true;
      let question = await this.$fetch("user/question");
      this.questionList = question.data;
      this.loading = false;
    },
    handleClick(tab, event) {
      if (tab.index === "0") {
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
    async username() {
      let data = await this.$fetch("user/checkusername", {
        method: "POST",
        body: JSON.stringify({
          username: this.ruleForm.username
        })
      });
      if (data.err) {
        this.$message({
          showClose: true,
          message: data.msg,
          type: "error"
        });
      } else {
        this.mode = "answer";
      }
    },
    async answer() {
      let data = await this.$fetch("user/checkquestion", {
        method: "POST",
        body: JSON.stringify({
          username: this.ruleForm.username,
          question: this.ruleForm.question,
          answer: this.ruleForm.answer
        })
      });
      if (data.err) {
        this.$message({
          showClose: true,
          message: data.msg,
          type: "error"
        });
      } else {
        this.mode = "password";
      }
    },
    async password() {
      let data = await this.$fetch("user/resetpassword", {
        method: "POST",
        body: JSON.stringify({
          username: this.ruleForm.username,
          question: this.ruleForm.question,
          answer: this.ruleForm.answer,
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
        // this.mode = "password";
        this.$message({
          showClose: true,
          message: "修改密码成功",
          type: "success"
        });
        this.$router.push({ path: "/login" });
      }
    },
    async operation() {
      await this[this.mode]();
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
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
.fillcontain {
  height: 100%;
  width: 100%;
  background-color: #ffd84d;
}
.login {
  background-color: white;
  margin-top: 150px;
}
.forgetpassword {
  margin-left: 10px;
  font-size: 12px;
  color: gray;
}
.title {
  height: 40px;
  text-align: center;
}
.title span {
  line-height: 40px;
  text-align: center;
}
</style>