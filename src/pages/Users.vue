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
                        <div class="buttons">
                            <el-button
                            size="mini"
                            @click="handleLook(scope.$index, scope.row)">查看识别记录</el-button>
                            <el-button type="primary" @click="editInfo(scope.$index,scope.row)" circle icon="el-icon-edit"></el-button>
                        </div>

                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="user-history" v-show="showHistory">
            <router-view></router-view>
            <!-- <router-link :to="{name:'UserHistory'}"></router-link> -->
        </div>
        <div class="edit-bgc" v-show="isEdit">
            <div class="editform" >
                <div class="edit-form-head">
                    <h3>编辑信息</h3>
                    <el-button type="danger" plain class="log-btn " @click="isEdit=false" ><i class="el-icon-close"></i></el-button>
                </div>
                <el-divider></el-divider>
                <el-form label-position="left" label-width="70px" :model="editData" :rules="rules" ref="register-form">
                    <el-form-item label="用户名" prop="user_name">
                        <el-input v-model="editData.user_name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="user_psw">
                        <el-input v-model="editData.user_psw" type="text"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="user_phone">
                        <el-input v-model="editData.user_phone" ></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="user_sex">
                        <el-select v-model="editData.user_sex" placeholder="请选择">
                            <el-option
                            v-for="item in sexOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-button type="primary" plain class="log-btn edit-btn" @click="submitForm" >提交修改</el-button>
                </el-form>
            </div>
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
            showHistory:false,
            isEdit:false,
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
            sexOptions:[{value:'男', label:'男'}, {value:'女', value:'女'}],
            editData:{
                user_id:'',
                user_name:'',
                user_psw:'',
                user_phone:'',
                user_sex:'',
                user_portrait_file:'',
                user_type:''
            }
        }
    },

    methods: {
        handleLook(index, user){
            this.showHistory = true
            this.$router.push({
                path:'/users/user_history',
                query:{'user_id':user.user_id}
            })
        },
        submitForm() {
            this.$refs['register-form'].validate((valid) => {
            if (valid) {
                this.postEditInfo()
            } else {
                alert('输入信息格式不正确');
            }
            });
        }, 
        postEditInfo(){
            this.$axios.post('http://localhost:5000/update_user_info',this.editData).then(
                res => {
                    if(res.data.code == 0){

                        alert('修改成功！')
                        this.isEdit=false
                    }
                    else{
                        alert('此用户名已存在！，无法更改')
                    }
                },
                err => { 
                    alert('此用户名已存在！，无法更改')     
                    console.log(err);
                }
            )
        },
        editInfo(index,user){
            this.editData = user
            this.isEdit = true
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
.buttons{
    display: flex;
}
.edit-bgc{
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 550px;
    background-color:rgba(0, 0, 0, 0.25);
}
.editform{
    width: 450px;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
}
.edit-form-head{
    display: flex;
    justify-content: space-between;
}
.edit-btn{
    width: 100%;
}
</style>