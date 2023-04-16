<template>
    <div class="w">
        <h3>用户信息</h3>
        <el-divider></el-divider>
        <el-descriptions class="margin-top" title="" :column="4" direction="vertical" border>
            <el-descriptions-item label="用户名">{{user.user_name}}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{user.user_phone}}</el-descriptions-item>
            <el-descriptions-item label="性别" :span="2">{{user.user_sex}}</el-descriptions-item>
            <el-descriptions-item label="识别次数">{{filelength}}</el-descriptions-item>
            <el-descriptions-item label="密码">{{user.user_psw}}</el-descriptions-item>
        </el-descriptions>
    </div>
</template>
<script>
export default {
    name:'UserInfo',
    data() {
        return {
            user:JSON.parse(localStorage.getItem('user')),
            filelength:0
        }
    },
    mounted() {
        this.$axios.get(`http://localhost:5000/get_file_num?user_id=${this.user.user_id}`).then(
            res => {
                this.filelength = res.data
            },
            err => {
                console.log(err);
            }
        )
    },
}
</script>
<style scoped>
.w{
    margin-top: 20px;
    padding: 20px;
}
</style>