<template>
    <div class="w">
        <h3>我的信息</h3>
        <el-divider></el-divider>
        <el-descriptions class="margin-top" title="" :column="4" direction="vertical" border>
            <el-descriptions-item label="用户名">{{user.user_name}}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{user.user_phone}}</el-descriptions-item>
            <el-descriptions-item label="性别" :span="2">{{user.user_sex}}</el-descriptions-item>
            <el-descriptions-item label="识别次数">{{filelength}}</el-descriptions-item>
            <el-descriptions-item label="密码">{{user.user_psw}}</el-descriptions-item>
            <el-descriptions-item ><el-button type="primary" @click="isEdit = true">编辑信息</el-button></el-descriptions-item>
        </el-descriptions>
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
    name:'UserInfo',
    methods:{
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
                        this.user = res.data.data
                        localStorage.setItem('user', JSON.stringify(this.user))
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
        getTimes(){
            this.$axios.get(`http://localhost:5000/get_file_num?user_id=${this.user.user_id}`).then(
                res => {
                    this.filelength = res.data
                },
                err => {
                    console.log(err);
                }
            )
        }
    },
    data() {
        return {
            user:JSON.parse(localStorage.getItem('user')),
            filelength:0,
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
    mounted() {
        this.user = JSON.parse(localStorage.getItem('user'))
        this.getTimes()
        this.editData = JSON.parse(localStorage.getItem('user'));
    },
}
</script>
<style scoped>
.w{
    position: relative;
    margin-top: 20px;
    padding: 20px;
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