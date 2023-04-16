<template>
    <div class="users">
        <div class="info" v-show="!showHistory">
            <h3>用户信息</h3>
            <el-divider></el-divider>
            <el-table
                :data="users.filter(data => !search || data.user_name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%"
                v-loading="loading"
            >
                <el-table-column label='用户id' prop="user_id">
                </el-table-column>
                <el-table-column
                    label="用户名"
                    prop="user_name">
                </el-table-column>
                <el-table-column
                    label="用户密码"
                    prop="user_psw">
                </el-table-column>
                <el-table-column
                    label="用户电话"
                    prop="user_phone">
                </el-table-column>
                <el-table-column
                    label="用户性别"
                    prop="user_sex">
                </el-table-column>
                <el-table-column align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                        size="medium"
                        @click="handleLook(scope.$index, scope.row)">查看识别记录</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="user-history" v-show="showHistory">
            <router-view></router-view>
            <!-- <router-link :to="{name:'UserHistory'}"></router-link> -->
        </div>
    </div>
</template>
<script>
export default {
    name:'Users',
    data() {
        return {
            users:[],
            loading:true,
            search:'',
            showHistory:false
        }
    },

    methods: {
        handleLook(index, user){
            this.showHistory = true
            this.$router.push({
                path:'/users/user_history',
                query:{'user_id':user.user_id}
            })
        }
    },
    beforeMount(){

        this.$axios.get('http://localhost:5000/get_users').then(
            res => {
                // console.log(res);
                this.loading = false
                this.users = res.data
                this.loading = false
            },
            err => {
                alert('网络错误')
                console.log(err);
            }
        )
    },
    mounted() {
        this.$bus.$on('changeShowState', ()=>{
            this.showHistory = false
        })
    },
    activated(){
        this.showHistory = false
    }
}
</script>
<style scoped>
body{
    margin: 0;
}
.users{
    margin-top: 20px;
    padding: 15px;  
}
</style>