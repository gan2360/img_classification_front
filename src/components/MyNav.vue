<template>
    <div class="top">
        <h2>
            <transition-group
                apper		
                name="animate__animated animate__bounce" 
                enter-active-class="animate__swing"
                leave-active-class="animate__backOutUp"
            >
                <span  :key="1"       
                    >欢迎使用水果识别系统
                </span>
            </transition-group>
        </h2>
        <nav class="nav">
            <router-link active-class="a-active" to="/home">图片识别</router-link>
            <router-link active-class="a-active" to="/history">识别记录</router-link>
            <router-link active-class="a-active" to="/userinfo">我的信息</router-link>
            <router-link active-class="a-active" to='/users' v-show="user.user_type === 1">用户信息</router-link>
            <router-link active-class="a-active" :to="{name:'LogIn'}" exact @click.native="logout">退出登录</router-link>
        </nav>
    </div>
</template>
<script>
import 'animate.css'
export default {
    name:'MyNav',
    methods:{
        logout(){
            if(confirm('是否退出系统？')){
            localStorage.removeItem('user')
            this.$bus.$emit('changeLoginState', true)
            this.$router.push({name:'LogIn'})
            }
        }
    },
    data() {
        return {
            user:JSON.parse (localStorage.getItem('user'))||{type:0}
        }
    },

}
</script>
<style scoped>
h2{
    margin: 15px;
    padding: 20px;
}
a{
    font-size: 15px;
    color: #333;
    text-decoration: none;
}
a:hover{
    background-color: rgb(250, 227, 109);
}
.a-active{
    background-color: orange;
    color: #fff;
}
.nav{
    display: flex;
    height: 40px;
    text-align: center;
    border-bottom: 2px solid rgb(243, 178, 58);

}
.nav a{
    flex-grow:1 ;
    line-height: 40px;

}
</style>