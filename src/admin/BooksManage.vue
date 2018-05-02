<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" class="pull-left">
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>


        <el-table :data="Books" highlight-current-row style="width: 100%;">
            <el-table-column type="index" width="80" fixed="left" label="序号"></el-table-column>
            <el-table-column prop="isbn" width="160" label="ISBN"></el-table-column>
            <el-table-column prop="bookName" label="书名" width="180"></el-table-column>
            <el-table-column label="书籍" width="120">
                <template scope="prop">
                    <img :src="'image/'+prop.row.image" class="img-responsive cartimage" style="margin: 15px;">
                </template>
            </el-table-column>
            <el-table-column prop="author" width="120" label="作者"></el-table-column>
            <el-table-column prop="price" width="80" label="价格"></el-table-column>
            <el-table-column label="数量" width="80" prop="total"></el-table-column>
            <el-table-column label="出版社" prop="publish" width="180"></el-table-column>
            <el-table-column label="出版时间" prop="publishDate" width="160"></el-table-column>
            <el-table-column label="介绍" ref="longtext" id="longtext" width="340">
                <template scope="prop">
                    <p>{{ prop.row.introduce.slice(0, 100) }}</p>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template scope="scope">
                    <el-col :span="24" style="margin-top: 10px">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </el-col>
                    <el-col :span="24">
                        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    </el-col>
                </template>
            </el-table-column>

        </el-table>
        <el-col :span="24" class="toolbar">
            <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!-- 新增 -->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">

                <el-form-item label="书名" style="text-align: left">
                    <el-input type="text" v-model="addForm.bookName"></el-input>
                </el-form-item>
                <el-form-item label="ISBN" style="text-align: left">
                    <el-input type="text" v-model="addForm.isbn"></el-input>
                </el-form-item>
                <el-form-item label="作者" style="text-align: left">
                    <el-input type="text" v-model="addForm.author"></el-input>
                </el-form-item>
                <el-form-item label="出版社" style="text-align: left">
                    <el-input type="text" v-model="addForm.publish"></el-input>
                </el-form-item>
                <el-form-item label="价格" style="text-align: left">
                    <el-input type="number" :min="0" v-model="addForm.price"></el-input>
                </el-form-item>
                <el-form-item label="数量" style="text-align: left">
                    <el-input type="number" :min="0" v-model="addForm.total"></el-input>
                </el-form-item>
                <el-form-item label="出版日期" style="text-align: left">
                    <el-input type="date" v-model="addForm.createDate"></el-input>
                </el-form-item>
                <el-form-item label="介绍" style="text-align: left">
                    <el-input type="textarea" :rows="5" v-model="addForm.introduce"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload
                            class="avatar-uploader"
                            action="image"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="addForm.image" :src="'image/'+addForm.image" class="avatar">
                        <i v-else class="el-icon-plus
                    avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit">提交</el-button>
            </div>
        </el-dialog>
        <!--<a class="btn btn-primary" @click="">Click</a>-->

        <!-- 编辑 -->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="书名" style="text-align: left">
                    <el-input type="text" v-model="editForm.bookName"></el-input>
                </el-form-item>
                <el-form-item label="作者" style="text-align: left">
                    <el-input type="text" v-model="editForm.author"></el-input>
                </el-form-item>
                <el-form-item label="出版社" style="text-align: left">
                    <el-input type="text" v-model="editForm.publish"></el-input>
                </el-form-item>
                <el-form-item label="价格" style="text-align: left">
                    <el-input type="number" :min="0" v-model="editForm.price"></el-input>
                </el-form-item>
                <el-form-item label="数量" style="text-align: left">
                    <el-input type="number" :min="0" v-model="editForm.total"></el-input>
                </el-form-item>
                <el-form-item label="出版日期" style="text-align: left">
                    <el-input type="date" v-model="editForm.createDate"></el-input>
                </el-form-item>
                <el-form-item label="介绍" style="text-align: left">
                    <el-input type="textarea" :rows="5" v-model="editForm.introduce"></el-input>
                </el-form-item>
                <!--<el-form-item label="图片" style="text-align: left">-->
                <!--<el-input type="text" name="bookName"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="图片">
                    <el-upload
                            class="avatar-uploader"
                            action="image"
                            :show-file-list="false"
                            :on-success="handleEditAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="editForm.image" :src="'image/'+editForm.image" class="avatar">
                        <i v-else class="el-icon-plus
                        avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit">提交</el-button>
            </div>
        </el-dialog>

    </section>
</template>
<script>
    import axios from 'axios'
    import qs from 'qs'
    //    import clamp from 'clamp-js'
    export default{
        data(){
            return {
                Books: [],
                page: 1,
                total: 0,

                addFormVisible: false,
                addForm: {
                    isbn: "",
                    image: "",
                    bookName: "",
                    author: "",
                    introduce: "",
                    price: "",
                    total: "",
                    publish: "",
                    publishDate: ""
                },
                addFormRules: {
                    bookName: [
                        {required: true, message: "请输入书名", trigger: "blur"}
                    ]
                },

                editFormVisible: false,
                editForm: {
                    id: "",
                    image: "",
                    bookName: "",
                    author: "",
                    introduce: "",
                    price: "",
                    total: "",
                    publish: "",
                    publishDate: ""
                },
                editFormRules: {},
                imageUrl: ""
            }
        },
        computed(){

        },
        methods: {
            truc(str){
                return str.slice(0, 100)
            },
            handleAdd(){
                this.imageUrl = ""
                this.addFormVisible = true;
            },
            handleEdit(index, row){
                this.imageUrl = ""
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
                let pos = (row._links.self.href).lastIndexOf('/') + 1;
                let id = (row._links.self.href).slice(pos);
                this.editForm.id = id;
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
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log("FFFFFFFFFFFFFFFFFFFF")
                console.log(res)
                this.addForm.image = res.imageId;
                console.log("Success:");
                console.log(this.addForm.image);
            },
            handleEditAvatarSuccess(res, file){
                this.imageUrl = URL.createObjectURL(file.raw);
                this.editForm.image = res.imageId;
            },
            handleCurrentChange(val){
                this.page = val;
                let self = this;
                let url = "books?page=" + (this.page - 1)
                axios.get(url).then(response => {
                    let data = response.data
                    self.Books = data._embedded.books
                    self.total = data.page.totalElements
                    console.log("Books Manage")
                    console.log(self.Books)
                }).catch(err => {
                    console.log(err)
                })
            },
            addSubmit(){
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(
                            () => {
                                let self = this
                                let para = Object.assign({}, this.addForm)
                                axios({
                                    url: 'books',
                                    method: 'post',
                                    data: para,
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then(
                                    response => {
                                        let data = response.data;
                                        console.log(data)
                                        self.addFormVisible = false
                                    }
                                )
                            }
                        )
                    }
                })
            },
            editSubmit(){
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(
                            () => {
                                let para = Object.assign({}, this.editForm)
                                let self = this
                                delete para._links;
                                axios({
                                    url: 'books/' + para.id,
                                    method: 'put',
                                    data: para,
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then(
                                    response => {
                                        let data = response.data;
                                        console.log(data)
                                        self.editFormVisible = false
                                    }
                                )
                            }
                        )
                    }
                })
            },
            handleDel(index, row){
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let self = this;
                    let pos = (row._links.self.href).lastIndexOf('/') + 1
                    let id = (row._links.self.href).slice(pos)
                    axios.delete("books/" + id)
                        .then(res => {
                            let data = res.data;
                            console.log(data)
                            self.$message.success("删除成功！")
//                            console.log(page)
                            self.handleCurrentChange(self.page)
                        }).catch(err => {
                        console.log(err)
                    })
                }).catch(err => {
                    console.log(err)
                });

            }
        },
        mounted()
        {
            this.handleCurrentChange(1);
//            $clamp(this.$refs.longtext, {clamp: 3})
        }

    }
</script>
<style>
    #longtext {
        height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        -webkit-max-logical-height: 140px;
    }

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