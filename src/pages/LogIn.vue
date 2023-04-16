<template>
    <div class="login">
        <!-- <div class="top" v-show="isLogin">
            <h2>用户登录<span class="register-btn" @click="getRegister">用户注册</span></h2> 
        </div> -->
        <div class="login-main">
            <LoginForm v-show="isLogin"/>
            <RegisterForm v-show="!isLogin" @showLogin="isLogin = true"/>
        </div>

    </div>
</template>
<script>
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'
export default {
    name:'Login',
    components:{LoginForm, RegisterForm},
    data() {
        return {
            isLogin:true
        }
    },
    methods:{
        getRegister(){
            this.isLogin = false
        },

    },

    beforeMount() {
         if(localStorage.getItem('user')) this.$router.push('./home')
    },
    mounted(){
        this.$bus.$on('getRegisterForm',()=>{
            this.isLogin = false
        })
    }
}
</script>
<style scoped>



h2{
    display: block;
    margin: 0 0 0 0;
    margin-top: 50px;
    border-bottom: 1px solid gainsboro;
    padding: 10px;
    background-color: #fff;
}
.login{
    height: 100%;
    /* background: url('../assets/bgc.JPG') ; */
    background-size:90%; 
    background-position: center center;
}
.login-main{
    margin: 60px auto ;
    width: 500px;
    border: 1px solid rgb(64,158,255);
    display: flex;
    justify-content: space-around;
}
</style>