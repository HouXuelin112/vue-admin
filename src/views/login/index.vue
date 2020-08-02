<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li @click="toggleMenu(item)" :class="{'current': item.current}" v-for="item in menuTab" :key="item.id">{{item.txt}}</li>
            </ul>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">

                <el-form-item prop="username" class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="password" class="item-form">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                 <el-form-item prop="repassword" class="item-form" v-if="model == 'register'">
                    <label>重复密码</label>
                    <el-input type="password" v-model="ruleForm.repassword" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="code" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="11">
                        <el-col :span="15">
                            <el-input v-model.number="ruleForm.code"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="primary" class="block">获取验证码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
          
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="block login-btn">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { stripScript, validateEmail, validatePass, validateCode } from "@/utils/validate.js";
export default {
    name: "Login",
    data(){
        var checkCode = (rule, value, callback) => {
            if(value === ''){
                callback(new Error("验证码不能为空"));
            }else if(!validateCode(value)){
                callback(new Error("验证码格式有误"));
            }else{
                callback();
            }
      };
      var validateUsername = (rule, value, callback) => {
        // let reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if (!validateEmail(value)) {
          callback(new Error("用户名格式有误"));
        }else {
            callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        // console.log(stripScript(value));
        this.ruleForm.password = stripScript(value);
        value = this.ruleForm.password;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!validatePass(value)) {
          callback(new Error("密码为6到20位的字母加数字"));
        } else{
            callback();
        }
      };
      var validateRepassword = (rule, value, callback) => {
        if(this.model === 'login'){
            callback();
        }
        this.ruleForm.repassword = stripScript(value);
        value = this.ruleForm.repassword;
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error("两次密码不一致"));
        } else{
            callback();
        }
      };
        return{
            ruleForm: {
                usernaem: '',
                password: '',
                repassword: '',
                code: ''
            },
            rules: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                repassword: [
                    { validator: validateRepassword, trigger: 'blur'}
                ],
                code: [
                    { validator: checkCode, trigger: 'blur' }
                ]
            },
            menuTab: [
                {txt: "登录", current: true, type: 'login'},
                {txt: "注册", current: false, type: 'register'}
            ],
            model: 'login'
        };
    },
    methods: { //方法区
    //数据驱动视图渲染
        toggleMenu(item){
            this.model = item.type;
            this.menuTab.forEach(element => {
                element.current = false;
            });
            item.current = true;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    props: { //属性， 接收父组件的数据

    },
    watch: {

    },
    created(){ //加载完成之后
        // alert("created")
    },
    mounted(){ //挂载完成
        // alert("挂载完成")
    }
};
</script>
<style lang="scss" scoped>
#login{
    height: 100vh;
    background-color: #344a5f;
    color: white;
}
.login-wrap {
    width: 330px;
    margin: auto;
}
.menu-tab {
    text-align: center;
    li {
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
    }
}
.current {
    background-color: rgba(0, 0, 0, 1);
}
.login-form{
    margin-top: 29px;
    label{
        display: block;
        margin-bottom: 3px;
        font-size: 14px;
        color: #fff;
    }
    .item-form{
        margin-bottom: 13px;
    }
    .block{
        width: 100%;
        display: block;
    }
    .login-btn{
        margin-top: 19px;
    }
}
</style>