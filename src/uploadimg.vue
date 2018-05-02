<template>
    <div>
        <form action="image" method="post" enctype="multipart/form-data"  >
            <input type="file" name="file" accept="image/*">
            <button type="submit">Submit</button>
        </form>

        <el-upload class="avatar-uploader" action="image"
                   :show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1">
            <img v-if="buffer.photoId!=undefined" :src="'image/'+buffer.photoId" class="avatar">
            <i v-else class="el-icon-plus
            avatar-uploader-icon"></i>
        </el-upload>

        <el-upload
                class="avatar-uploader"
                action="image"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus
    avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                imageUrl: '',
                buffer:''
            };
        },
        methods: {
            handleAvatarSuccess1(res, file) {
                Vue.set(this.buffer, "photoId", res.imageId);
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload1(file) {
                const isJPG = file.type === "image/jpeg" || file.type === "image/png";
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
                }
                if (!isLt2M) {
                    this.$message.error("上传头像图片大小不能超过 2MB!");
                }
                return isJPG && isLt2M;
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
//                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

//                if (!isJPG) {
//                    this.$message.error('上传头像图片只能是 JPG 格式!');
//                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            }
        }
    }
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

