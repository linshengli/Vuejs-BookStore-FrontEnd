<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
             class="demo-ruleForm register-container">
        <h3 class="title">Register</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="email">
            <!--<input type="email" placeholder="email" v-model="ruleForm2.email">-->
            <el-input type="text" v-model="ruleForm2.email" auto-complete="off" placeholder="email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm2.password" auto-complete="off"
                      placeholder="password"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"
                      placeholder="confirm password"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="registering">
                Register
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {requestRegister} from '../api/api';
    import qs from 'qs'
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.password !== '') {
                        this.$refs.ruleForm2.validateField('password');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                registering: false,
                ruleForm2: {
                    account: '',
                    email: '',
                    password: '',
                    checkPass: '',
                },
                rules2: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur', validator: validatePass},
                        //{ validator: validaePass }
                    ],
                    password: [
                        {required: true, message: '请确认密码', trigger: 'blur'}
                    ],
                    checkPass: [
                        {required: true, message: '两次密码不一样', trigger: 'blur', validator: validatePass2},
                        //{ validator: validaePass2 }
                    ],
                    email: [
                        {type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            handleReset2()
            {
                this.$refs.ruleForm2.resetFields();
            },
            handleSubmit2(ev)
            {
                let _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        this.registering = true;
                        var registerParams = {
                            username: this.ruleForm2.account,
                            email: this.ruleForm2.email,
                            password: this.ruleForm2.password
                        };
                        requestRegister(qs.stringify(registerParams))
                            .then(data => {
                                if (data.status == "1") {
                                    sessionStorage.setItem("user", JSON.stringify(data.user));
                                    this.$message.success("注册成功！")
                                    this.$router.push({path: "/"})
                                } else {
                                    this.$message.error("抱歉，邮箱已被注册，请使用其他邮箱注册！")
                                    this.ruleForm2.email = ""
                                    this.ruleForm2.username = ""
                                    this.ruleForm2.password = ""
                                    this.ruleForm2.checkPass = ""
                                }
                            }).catch(err => {
                                console.log(error);
                                this.$message.error("请检查网络！");
                        });
                        this.registering = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }

                });
            }
        }
    }

</script>

<style lang="scss" scoped>
    .register-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>