<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.username" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUsers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <!--<el-table-column type="selection" width="55">-->
            <!--</el-table-column>-->
            <el-table-column type="index" width="60">
            </el-table-column>
            <!--<el-table-column width="1" label="sh" prop="getId(_links.self.href)"></el-table-column>-->
            <el-table-column type="expand">
                <template scope="props">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <p style="text-align: left">头像：</p>
                            <span><img :src="getImg(props.row.picture)" alt=""></span>
                        </el-col>
                        <el-col :span="20">
                            <p>个人介绍：</p>
                            <p>{{props.row.signature}}</p>
                        </el-col>
                    </el-row>
                    <div class="text-center video">
                        <p>个人视频介绍：</p>
                        <video :src="getVideo(props.row.video)" controls="controls"></video>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="120" sortable>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="160" sortable>
            </el-table-column>
            <el-table-column prop="phone" label="电话号码" width="160" sortable>
            </el-table-column>
            <el-table-column prop="money" label="余额" width="130" sortable>
            </el-table-column>
            <el-table-column prop="address" label="地址" min-width="180" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="姓名" prop="username">
                    <el-input v-model="editForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item style="text-align:left" label="余额" prop="money">
                    <el-input type="number" v-model="editForm.money" :min="0" :step="100"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="phone">
                    <el-input v-model="editForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input type="text" v-model="editForm.address"></el-input>
                </el-form-item>
                <el-form-item label="个人介绍:" prop="signature">
                    <el-input type="textarea" :rows="5" v-model="editForm.signature"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="姓名" prop="username">
                    <el-input v-model="addForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item style="text-align:left" label="余额" prop="money">
                    <el-input type="number" v-model="addForm.money" :min="0" :step="100"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="phone">
                    <el-input v-model="addForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input type="text" v-model="addForm.address"></el-input>
                </el-form-item>
                <el-form-item label="个人介绍:" prop="signature">
                    <el-input type="textarea" :rows="5" v-model="addForm.signature"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
    import axios from 'axios'
    import qs from 'qs'
    import {addUser, batchRemoveUser, editUser, getUserListPage, removeUser, requestRegister} from "../api/api";
    export default{
        data() {
            return {
                filters: {
                    username: ''
                },
                users: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    username: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入正确的邮箱', trigger: 'blur', type: 'email'}
                    ],
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    username: '',
                    money: 0,
                    address: '',
                    email: '',
                    phone: '',
                    signature: '',
                    picture: '',
                    video: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    username: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入正确的邮箱', trigger: 'blur', type: 'email'}
                    ],
                },
                //新增界面数据
                addForm: {
                    username: '',
                    money: 0,
                    address: '',
                    email: '',
                    phone: '',
                    signature: '',
                    picture: '',
                    video: ''
                },
                lasturl: ""
            }


        },
        methods: {
            getId(str){
                console.log("GETID")
                console.log(str)
                return str.slice(str.lastIndexOf('/') + 1);
            },
            getImg(picture){
                return "image/" + picture;
            },
            getVideo(video){
                return "video/" + video;
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getMoreUsers();
            },
            //获取用户列表
            getUsers() {
                let url = "";
                if (this.filters.username != "") {
                    url = "/users/search/findByUsernameContains?username=" + this.filters.username + "&page="
                } else {
                    url = "/users?page="
                }
                this.lasturl = url;
                this.getMoreUsers();
            },
            getMoreUsers(){
                let url = this.lasturl;
                url += (this.page - 1);
                this.listLoading = true;
                getUserListPage(url).then((res) => {
                    console.log("THE RES:")
                    console.log(res)
                    let pageSize = 20;
                    if (url.startsWith("/users/search/findByUsernameContains")) {
                        this.total = res._embedded.users.length;
                        this.users = res._embedded.users.slice(pageSize * (this.page - 1), this.page * pageSize);
                    } else {
                        this.total = res.page.totalElements;
                        this.users = res._embedded.users;
                    }
                    this.listLoading = false;
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = {id: this.getId(row._links.self.href)};
                    console.log("DEL");
                    console.log(para);
                    removeUser(para).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(err => {
                    console.log(err)
                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
                console.log("DDDDDDDDDDDD");
                console.log(this.editForm);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    username: '',
                    money: 0,
                    address: '',
                    email: '',
                    phone: '',
                    signature: '',
                    picture: '',
                    video: ''
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                        if (valid) {
                            this.$confirm('确认提交吗？', '提示', {}).then(() => {
                                this.editLoading = true;
                                let param = Object.assign({}, this.editForm);
                                let params = {
                                    id: this.getId(param._links.self.href),
                                }
                                let user = {
                                    "username": param.username,
                                    "email": param.email,
                                    "phone": param.phone,
                                    "money": param.money,
                                    "picture": param.picture,
                                    "address": param.address,
                                    "signature": param.signature,
                                    "video": param.video
                                }
                                console.log("PARA:");
                                console.log(params);
                                let url = '/users/' + params.id;
                                axios({
                                    method: "put",
                                    url: url,
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    data: qs.stringify(user)
                                }).then(response => {
                                    let data = response.data;
                                    if (data.status == "1") {
                                        this.$message({
                                            message: '提交成功',
                                            type: 'success'
                                        });
                                        this.$refs['editForm'].resetFields();
                                        this.editFormVisible = false;
                                        this.getUsers();
                                    } else {
                                        this.$message({
                                            message: '提交失败',
                                            type: 'error'
                                        });
                                    }
                                }).catch(err => {
                                    console.log(err), this.$message({
                                        message: '提交失败',
                                        type: 'error'
                                    });
                                });
                                this.editLoading = false;
                            });
                        }
                    }
                );
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            let registerParams = {
                                username: para.username,
                                email: para.email,
                                phone: para.phone,
                                money: para.money,
                                picture: para.picture,
                                address: para.address,
                                signature: para.signature,
                                video: para.video
                            };
                            axios({
                                url: '/user',
                                method: 'post',
                                data: qs.stringify(registerParams),
                                headers: {
                                    "Content-Type": "application/json"
                                },
                            })
                                .then(response => {
                                    let data = response.data;
                                    console.log("ddddd")
                                    console.log(data)
                                    if (data.status == "1") {
                                        this.$message.success("添加成功！")
                                        this.addFormVisible = false;
                                        this.getUsers();
                                    } else {
                                        this.$message.error("抱歉，无法添加，可能已经存在该邮箱！")
                                    }
                                }).catch(err => {
                                console.log(err);
                                this.$message.error("请检查网络！");
                            });
                            this.addLoading = false;


                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
        },
        mounted()
        {
            this.getUsers()
        }
    }
</script>
<style>
    .video {
        text-align: center;
        margin-top: 50px;
    }
</style>