<template>
  <div id="app">
    <!-- <LogIn/> -->
    <div class="w main">
      <MyNav v-show="!isLogin"></MyNav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import LogIn from './pages/LogIn.vue'
import MyNav from './components/MyNav.vue'
export default {
  name: 'App',
  components: {
    LogIn, MyNav
  },
  data() {
    return {
      isLogin:true    
    }
  },
  methods:{
    changeLoginState(value){
      this.isLogin = value
    }
  },
  beforeMount() {
    if(localStorage.getItem('user')){
      this.isLogin = false
    } else this.isLogin = true
  },
  mounted(){
    this.$bus.$on('changeLoginState', this.changeLoginState)
  }
}
</script>

<style>
*{
  padding:0;
  margin: 0;
  box-sizing: border-box;
}
#app{
  /* height: 100%; */
  min-height: 700px;
  width: 100%;
  background: url('./assets/bgc.JPG') ;
  background-position: center center;
  background-size:90%;
  display: flex;
  justify-content: space-around;
}
.main{
    width: 1200px;
    min-height: 700px;
    /* background-color: #fff; */
    background: transparent;
    box-shadow: 2px 2px 5px rgb(162, 162, 162);
}
</style>
