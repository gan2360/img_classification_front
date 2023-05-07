<template>
    <div class="w">
        <h3>历史信息</h3>
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
                    <div class="buttons">
                        <el-button
                        size="mini"
                        @click="handleLook(scope.$index, scope.row)">查看</el-button>
                        <el-button 
                        type="danger"
                        size="mini"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import dayjs from'dayjs'
import {Loading} from 'element-ui'

export default {
    name:'MyHistory',
    data() {
        return {
            user:JSON.parse(localStorage.getItem('user'))||{},
            fileList:[],
            search:'',
            loading:true
        }
    },
    beforeMount() {
        this.getFileList()
    },
    methods:{
        toHome(file_name){
            this.$router.push(`/home?file_name=${file_name}`)
        },
        handleLook(index, file){
            this.$router.push(`/home?file_name=${file.file_name}`)
        },
        getFileList(){
            let local = new Date()
            let offsetTime = local.getTimezoneOffset() * 60000
            this.$axios.post('http://localhost:5000/get_files',{'user_id':this.user.user_id}).then(
                res => {
                    this.fileList = res.data
                    this.fileList.forEach((file)=>{
                        file.add_time = file.add_time ? dayjs(new Date(file.add_time).getTime() + offsetTime).format('YYYY-MM-DD HH:mm:ss') : '未记录'
                    })
                    this.loading = false
                },
                err=>{
                    alert('网络错误')
                }
            )
        },
        handleDelete(index, file){
            let flag= confirm('是否删除该记录')
            if (flag){
                this.$axios.post(
                    'http://localhost:8080/api/delete_record',{'file_id':file.file_id}
                ).then(res=>{
                    console.log(res);
                    this.getFileList()
                    alert('删除成功')
                },err=>{
                    console.log(err);
                })
            }
        },
    },
    mounted(){
        this.user = JSON.parse(localStorage.getItem('user'))||{}
    }
}
</script>
<style scoped>
.w{
    margin-top: 20px;
    padding: 15px;
}
body {
    margin: 0;
  }
</style>