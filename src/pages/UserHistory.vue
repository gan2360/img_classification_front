<template>
    <div class="w user-history">
        <h3>
        <el-button @click="goBack" class="go-back-btn"><i class="el-icon-arrow-left my-back-btn"></i>返回</el-button>
            用户历史信息
        </h3>
        <el-divider></el-divider>
        <el-table
            :data="fileList.filter(data => !search || data.file_name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            v-loading="loading"
        >
            <el-table-column label='预测日期' prop="add_time">

            </el-table-column>
            <el-table-column
                label="文件名"
                prop="file_name">
            </el-table-column>
            <el-table-column
                label="最佳预测结果"
                prop="class_name">
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
                    size="mini"
                    @click="handleLook(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:'UserHistory',
    data() {
        return {
            fileList:[],
            search:'',
            loading:true
        }
    },
    methods:{
        handleLook(index, file){
            this.$router.push(`/home?file_name=${file.file_name}`)
        },
        goBack(){
            this.$bus.$emit('changeShowState')
            this.$router.push('/users')
        }
    },
    beforeMount(){
        console.log(this.user_id);
        this.$axios.post('http://localhost:5000/get_files',{user_id:this.user_id}).then(
            res => {
                this.loading = false
                this.fileList = res.data
            },
            err => {
                alert('网络错误！')
                console.log(err);
            }
        )
    },
    props:['user_id'],
}
</script>
<style scoped>
body{
    margin: 0;
}
</style>