<template>
    <div class="container">
        <navbar></navbar>
        <div class="row" id="con">
            <div class="col-md-8">
                <div class="container" style="width: 800px">
                    <el-form v-model="user">
                        <div class="form-group">
                            <label for="exampleInputEmail1" class="pull-left">Email:</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" v-model="user.email">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1" class="pull-left">Username:</label>
                            <input type="text" class="form-control" id="exampleInputPassword1" v-model="user.username">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputFile" class="pull-left">Phone:</label>
                            <input type="text" class="form-control" id="exampleInputFile" v-model="user.phone">
                        </div>
                        <div class="form-group">
                            <label for="address" class="pull-left">Address:</label>
                            <input type="text" class="form-control" id="address" v-model="user.address">
                        </div>
                        <div class="form-group">
                            <label for="sig" class="pull-left">Signature:</label>
                            <textarea v-model="user.signature" rows="5" id="sig" class="form-control"></textarea>
                        </div>
                        <div class="container">
                        <div class="col-md-4">
                            <el-upload
                                    class="avatar-uploader"
                                    action="image"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="user.picture" :src="getImg(user.picture)" class="avatar">
                                <i v-else class="el-icon-plus
                                avatar-uploader-icon"></i>
                            </el-upload>
                        </div></div>
                        <button @click="submit" class="btn btn-default">Submit</button>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import navbar from "../navbar.vue";
import axios from "axios";
import qs from "qs";
export default {
  components: {
    navbar
  },
  data() {
    return {
      user: {
      },
      imageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.user.picture = res.imageId;
    },
    beforeAvatarUpload(file) {
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
    getImg(url) {
      return "image/" + url;
    },
    submit() {
      let para = {
        userId: this.user.id,
        username: this.user.username,
        email: this.user.email,
        phone: this.user.phone,
        address: this.user.address,
        signature: this.user.signature,
        picture: this.user.picture
      };
      console.log("editUser");
      console.log(para);
      let self = this;
      axios
        .post("eddituser", qs.stringify(para))
        .then(response => {
          let data = response.data;
          self.$message.success("修改成功！");
        })
        .catch(err => {
          self.$message.error("修改失败");
          console.log(err);
        });
    }
  },
  created() {
    let self = this;
    axios.get("user").then(response => {
      let data = response.data;
      if (data.status == "1") {
        self.user = data.user;
        console.log("HUJHU");
        console.log(self.user);
      } else {
        self.$message.error("请先登录！");
        sessionStorage.removeItem("user");
      }
    });
  }
};
</script>
<style>
#con {
  margin-top: 50px;
}
</style>