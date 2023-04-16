<template>
    <div class="register-form">
        <h2>
            用户注册 <span class="register-btn" @click="trigerShowLogin">登录</span>
        </h2>
        <el-form label-position="left" label-width="70px" :model="registerInfo" :rules="rules" ref="register-form">
            <el-form-item label="用户名" prop="user_name">
                <el-input v-model="registerInfo.user_name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="user_psw">
                <el-input v-model="registerInfo.user_psw" type="password"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="user_phone">
                <el-input v-model="registerInfo.user_phone" ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="user_sex">
                <el-select v-model="registerInfo.user_sex" placeholder="请选择">
                    <el-option
                    v-for="item in sexOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" plain class="log-btn" @click="submitForm">点击注册</el-button>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'RegisterForm',
    methods: {
        trigerShowLogin(){
            this.$emit('showLogin')
        },
        submitForm() {
            this.$refs['register-form'].validate((valid) => {
            if (valid) {
                this.postRegisterInfo()
            } else {
                alert('请正确输入信息');
            }
            });
        }, 
        postRegisterInfo(){
            this.$axios.post('http://localhost:5000/register',this.registerInfo).then(
                res => {
                    if(res.data.code == 0){
                        this.user = res.data.data
                        localStorage.setItem('user', JSON.stringify(this.user))
                        this.$bus.$emit('changeLoginState',false)
                        alert('注册成功！进入首页')
                        this.$router.push('/home')
                    }
                    else{
                        alert('此用户名已存在！')
                    }
                },
                err => {
                    
                    console.log(err);
                }
            )
        }
    },
    data() {
        return {
            sexOptions:[{value:'男', label:'男'}, {value:'女', value:'女'}],
            rules:{
                user_name:[
                    {required:true, message:'请输入用户名', trigger:'blur'} 
                ],
                user_psw:[
                    {required:true, message:'请输入密码', trigger:'blur'}
                ],
                user_phone:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'change' }
                ],
                user_sex:[
                    {required:true, message:'不可为空', trigger:'change'}
                ],
            },
            registerInfo:{
                user_name:'',
                user_psw:'',
                user_phone:'',
                user_sex:''
            },
            user:{}
        }
    },

}
</script>
<style scoped>
.register-btn{
    border-left: 1px solid gainsboro;
    font-weight: normal;
    font-size: 15px;
    padding-left: 25px;
    margin-left: 10px;
    color: rgb(160, 160, 160);
}
.register-btn:hover{
    color: rgb(104, 104, 233);
    cursor:pointer
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
.register-form{
    /* margin-top: 20px; */
    width: 550px;
    background-color: #fff;
    padding: 45px;
}
.log-btn{
    width: 100%;
}
</style>