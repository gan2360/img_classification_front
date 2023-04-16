<template>
    <div id="home">
        <div id="load" v-show="isUpload">
            <el-upload 
                action="http://localhost:5000/process_img" 
                :auto-upload='false'
                class="upload-demo el-load"
                drag=""
                :limit="1"
                ref="upload"
                :file-list="fileList"
                :data="{'user_id':user.user_id}"
                :on-success="handleRes"
                :on-error="handleErr"
            >
                
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件, 且一次只能上传一张</div>
            </el-upload>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" class="submit-btn">开始识别</el-button>
        </div>
        <div id="show" v-show="!isUpload">
            <el-button @click="isUpload = true" class="go-back-btn"><i class="el-icon-arrow-left"></i>继续识别</el-button>
            <h3>原图像</h3>
            <div class="original img-zone1" >
                <img :src="originalImgUrl" alt="">
            </div>
            <h3>预测结果</h3>
            <div class="predict img-zone2">
                <img :src="predictImgurl" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import 'animate.css'
export default {
    name:'Home',
    data() {
        return {
            baseUrl1:'http://localhost:5000/static/file/',
            baseUrl2:'http://localhost:5000/static/outputs/',
            user:JSON.parse(localStorage.getItem('user')) || {},
            fileList:[],
            isUpload:true,
            originalImgUrl:'',
            predictImgurl:'',
            file_name:'',

        }
    },
    methods:{
        submitUpload(){
            this.$refs.upload.submit();
        },
        handleRes(res, file, fileList){
            this.originalImgUrl = this.baseUrl1 + res.data.filename
            this.predictImgurl = this.baseUrl2 + res.data.filename
            this.isUpload = false
        },
        handleErr(err, file, fileList){
            alert('上传失败，请稍后再试')
        },
        toHistory(){
            this.$router.push(
                '/history'
            )
        }
    },
    beforeMount(){
        this.file_name = this.$route.query['file_name']
        if(this.file_name){
            this.isUpload = false
            this.originalImgUrl = this.baseUrl1 + this.file_name
            this.predictImgurl = this.baseUrl2 + this.file_name
        }
    }
}
</script>
<style scoped>
#home{
    padding: 30px;
    padding-top: 50px;
}
.top{
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid gainsboro;
}
.top h3{
    margin-left: 25px;
} 
.his-btn{
    /* float: right; */
    line-height: 65px;
    color: orange;
    cursor: pointer;
}
.load-btn{
    line-height: 65px;
    color: orange;
    cursor: pointer;
}
#load{
    /* margin-top: 50px; */
    display: flex;
    padding: 25px;
    border: 1px solid orange;
    align-items: center;
    justify-content: space-around;
}
.submit-btn{
    margin-left: 35px;
    width: 150px;
    height: 55px;
}
.el-load{
    width: 350px;
}
.img-zone{
    width: 100%;
}
.img-zone1 img{
    width: 400px;

}
.img-zone2 img{
    width: 100%;
}
.show h3{
    display: block;
    padding: 2px;
    border-bottom: 1px solid gainsboro;
}
.img-zone1, .img-zone2{
    border: 1px solid orange;
}
.go-back-btn{
    width: 300px;
    margin-bottom: 15px;
}

</style>