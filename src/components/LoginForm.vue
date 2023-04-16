<template>
    <div class="login-form">
        <div class="top">
            <h2>用户登录<span class="register-btn" @click="getRegister">用户注册</span></h2> 
        </div>
        <el-form label-position="left" label-width="70px" :model="logInfo" :rules="rules" ref="login-form">
            <el-form-item label="用户名" prop="user_name">
                <el-input v-model="logInfo.user_name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="user_psw">
                <el-input v-model="logInfo.user_psw" type="password"></el-input>
            </el-form-item>
            <el-button type="primary" plain class="log-btn" @click="submitForm">登录</el-button>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'LoginForm',
    data() {
        return {
            logInfo:{
                user_name:'',
                user_psw:'',
            },
            rules:{
                user_name:[
                    {required:true, message:'请输入用户名', trigger:'blur'} 
                ],
                user_psw:[
                    {required:true, message:'请输入密码', trigger:'blur'}
                ]
            }
        }
    },
    methods: {
        login(){
            axios.post('http://localhost:5000/login',this.logInfo).then(
                res =>{
                    console.log(res);
                    if(res.data.code === 0){
                        localStorage.setItem('user',JSON.stringify(res.data.data))
                        this.$bus.$emit('changeLoginState', false)
                        this.$router.push({
                            name:'Home'
                        })
                    }else{
                        alert('用户名或密码错误！')
                    }

                },
                err =>{
                    alert('网络错误！')
                    console.log(err);
                }
            )
        },
        submitForm() {
            this.$refs['login-form'].validate((valid) => {
            if (valid) {
                this.login()
            } else {
                alert('请正确输入信息');
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getRegister(){
            this.$bus.$emit('getRegisterForm')
        }
    },
}
</script>
<style scoped>

.log-btn{
    width: 100%;
}
.login-form{
    /* margin-top: 70px; */
    width: 550px;
    background-color: #fff;
    padding: 45px;
}
input{
    background-color: none;
}
h2{
    display: block;
    margin: 0 0 0 0;
    /* margin-top: 50px; */
    border-bottom: 1px solid gainsboro;
    padding: 10px;
    margin-bottom: 30px;
    background-color: #fff;
}
.register-btn:hover{
    color: rgb(104, 104, 233);
    cursor:pointer
}
.register-btn{
    border-left: 1px solid gainsboro;
    font-weight: normal;
    font-size: 15px;
    padding-left: 25px;
    margin-left: 10px;
    color: rgb(160, 160, 160);
}

</style>