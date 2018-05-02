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
        <!--列表-->
        <el-table :data="orders"
                  style="width: 100%;">
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column type="expand">
                <template scope="props">
                    <el-table :data="props.row.orderItems">
                        <el-table-column type="index" width="60">
                        </el-table-column>
                        <el-table-column prop="book.bookName" label="书名" sortable></el-table-column>
                        <el-table-column prop="num" label="数量"></el-table-column>
                        <el-table-column prop="price" label="价格"></el-table-column>
                        <el-table-column label="操作" width="150">
                            <template scope="scope">
                                <el-button size="small" @click="handleItemEdit(props.row.id, scope.row)">编辑</el-button>
                                <el-button type="danger" size="small" @click="handleItemDel(props.row.id, scope.row)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column prop="user.username" label="创建者" width="200" sortable></el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="250" sortable>
            </el-table-column>
            <el-table-column label="订单总价" width="200" prop="total"></el-table-column>
            <el-table-column label="操作" width="350">
                <template scope="scope">
                    <el-button size="small" @click="handleAddItem(scope.$index, scope.row)">新增订单子项目</el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" ref="editForm">

                <el-form-item label="订单用户" style="text-align: left">
                    <el-select v-model="editForm.userId" placeholder="请选择" style="text-align: left">
                        <el-option
                                v-for="item in userIds"
                                :key="item.id"
                                :label="item.username"
                                :value="item.id">
                            <span style="float: left">{{ item.username }}</span>
                            <!--<span style="float: right; color: #8492a6; font-size: 13px">UserId: {{ item.id }}</span>-->
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创建日期" style="text-align: left">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.createDate"></el-date-picker>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">

                <el-form-item label="订单用户" style="text-align: left">
                    <el-select v-model="addForm.user" placeholder="请选择" style="text-align: left">
                        <el-option
                                v-for="item in userIds"
                                :key="item.id"
                                :label="item.username"
                                :value="item">
                            <span style="float: left">{{ item.username }}</span>
                            <!--<span style="float: right; color: #8492a6; font-size: 13px">UserId: {{ item.id }}</span>-->
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="text-align: left" label="创建日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.createDate"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit">提交</el-button>
            </div>
        </el-dialog>

        <!--新增Item界面-->
        <el-dialog title="新增" v-model="addItemFormVisible" :close-on-click-modal="false">
            <el-form :model="addItemForm" label-width="80px" ref="addItemForm">

                <el-form-item label="书籍" style="text-align: left" class="additem">
                    <el-select v-model="addItemForm.book" placeholder="请选择">
                        <el-option
                                v-for="item in bookIds"
                                :key="item.id"
                                :label="item.bookName"
                                :value="item">
                            <span style="float: left">{{ item.bookName }}</span>
                            <!--<span style="float: right; color: #8492a6; font-size: 13px">bookName: {{ item.id }}</span>-->
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数量" style="text-align: left" class="additem">
                    <el-input size="small" type="number" :min="1" :max="addItemForm.book.total"
                              v-model="addItemForm.num"></el-input>
                </el-form-item>
                <el-form-item label="价格" style="text-align: left" class="additem">
                    <el-input size="large" v-model="addItemForm.price" :min="0" type="number"></el-input>
                </el-form-item>
                <el-form-item style="text-align: left" class="additem" label="创建日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addItemForm.createDate"></el-date-picker>
                </el-form-item>
                <br/>
                <p style="text-align: left">总价：{{ addItemForm.num * addItemForm.price || 0 }}</p>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addItemFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addItemSubmit">提交</el-button>
            </div>
        </el-dialog>

        <!--编辑Item界面-->
        <el-dialog title="新增" v-model="editItemFormVisible" :close-on-click-modal="false">
            <el-form :model="editItemForm" label-width="80px" ref="addItemForm">
                <el-form-item label="数量" style="text-align: left" class="additem">
                    <el-input size="small" type="number" :min="1" :max="editItemForm.book.total"
                              v-model="editItemForm.num"></el-input>
                </el-form-item>
                <el-form-item label="价格" style="text-align: left" class="additem">
                    <el-input size="large" v-model="editItemForm.price" :min="0" type="number"></el-input>
                </el-form-item>
                <el-form-item style="text-align: left" class="additem" label="创建日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editItemForm.createDate"></el-date-picker>
                </el-form-item>
                <br/>
                <p style="text-align: left">总价：{{ editItemForm.num * editItemForm.price || 0 }}</p>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editItemFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editItemSubmit">提交</el-button>
            </div>
        </el-dialog>

    </section>
</template>
<script>
    import axios from 'axios'
    import URL from 'url-parse'
    import qs from 'qs'
    import {addItem, addOrder, editItem, editOrder, removeItem, removeOrder} from "../api/api";
    export default{
        data() {
            return {
                userIds: [],
                bookIds: [],

                orders: [],
                page: 1,
                baseurl: "orders?page=",
                total: 0,

                editFormVisible: false,//编辑界面是否显示
                //编辑界面数据
                editForm: {
//                    id: 0,
                    userId: '0',
                    createDate: '',
                    orderid: ''
                },


                addFormVisible: false,
                addForm: {
                    user: {},
                    createDate: ''
                },
                addFormRules: {},

                addItemFormVisible: false,

                addItemForm: {
                    orderId: '',
                    book: {},
                    num: 0,
                    price: 0,
                    createDate: ''
                },


                editItemFormVisible: false,

                editItemForm: {
                    orderId: '',
                    book: {},
                    num: 0,
                    price: 0,
                    createDate: ''
                }
            }
        },
        computed: {},
        methods: {
            getuserIds(){
                let self = this;
                axios.get("/userIds")
                    .then(response => {
                        console.log("UUUU")
                        console.log(response.data)
                        self.userIds = response.data;
                    })
                    .catch(err => console.log(err))
                console.log(this.userIds)
            },
            handleAddItem(index, row){
                this.addItemFormVisible = true;
                console.log("order row:")
                console.log(row);
                this.addItemForm.orderId = row.id;
            },
            addItemSubmit(){
                let para = Object.assign({}, this.addItemForm);
                para.bookId = this.addItemForm.book.id
                console.log("this.addItemForm:");
                console.log(this.addItemForm);
                addItem(qs.stringify(para))
                    .then(data => {
                        console.log("ITEMADD:")
                        console.log(data)
                        if (data.status == "1") {
                            this.addItemFormVisible = false;
                            this.addItemForm = {
                                orderId: '',
                                book: {},
                                num: 0,
                                price: 0,
                                createDate: ''
                            }
                            this.$message.success("添加成功！")
                        } else {
                            this.$message.error("添加失败！")
                        }
                    }).catch(err => console.log(err))
            },

            addSubmit(){
                let para = Object.assign({}, this.addForm);
                para.userId = this.addForm.user.id
                console.log("this.addForm:");
                console.log(this.addForm);
//                axios.post("/")
                addOrder(qs.stringify(para))
                    .then(data => {
                        console.log("ADD:")
                        console.log(data)
                        if (data.status == "1") {
                            this.addFormVisible = false;
                            this.addForm = {
                                user: {},
                                createDate: ''
                            }
                            this.$message.success("添加成功！")
                        } else {
                            this.$message.error("添加失败！")
                        }
                    }).catch(err => console.log(err))
            },

            editSubmit(){
                let para = Object.assign({}, this.editForm);
                editOrder(qs.stringify(para))
                    .then(
                        date => {
                            console.log("jjjj")
                            console.log(date);
                            this.$message.success("提交成功")
                        })
                    .catch(err => {
                        console.log(err);
                        this.$message.error("提交失败")
                    })

                this.editFormVisible = false;

            },
            getBookIds(){
                let self = this;
                axios.get("/bookIds")
                    .then(response => {
                        console.log("UUUU")
                        console.log(response.data)
                        self.bookIds = response.data;
                    })
                    .catch(err => console.log(err))
                console.log(this.bookIds)
            },
            handleCurrentChange(val){
                this.page = val;
                this.getMoreOrders();
            },
            getMoreOrders(){
                let url = this.baseurl + (this.page - 1);
                let self = this;
                axios.get(url)
                    .then(response => {
                        let data = response.data;
                        console.log(data)
                        self.orders = data.content;
                        self.total = data.totalElements;
                    }).catch(err => console.log(err))
            },
            handleItemDel(orderId, row){
                console.log("index::::")
                console.log(row)
                let param = {
                    orderId: orderId,
                    bookId: row.book.id
                }
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        console.log("EEEEEEEEEE")
                        console.log(param)
                        removeItem(qs.stringify(param))
                            .then(data => {
                                console.log(data)
                            })
                            .catch(err => console.log(err))
                    })
            },
            handleItemEdit(orderId, row){
                this.editItemFormVisible = true;
                console.log("edit Item:::")
                console.log(row)
                this.editItemForm.book = row.book
                this.editItemForm.createDate = row.createDate
                this.editItemForm.price = row.price
                this.editItemForm.num = row.num
                this.editItemForm.orderId = orderId
            },

            editItemSubmit(){
                console.log("EEEEEEEEEEESSSS");
                this.editItemForm.bookId = this.editItemForm.book.id   ;
                console.log(this.editItemForm);
                editItem(qs.stringify(this.editItemForm))
                    .then(
                        data => console.log(data)
                    )
                    .catch(err => console.log(err))

                this.editItemFormVisible = false;
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    console.log("row");
                    console.log(row);
                    let para = {id: row.id};
                    console.log("DEL");
                    console.log(para);
                    removeOrder(para)
                        .then(data => {
                            this.page = 1;
                            this.$message.success("删除成功!")
                            this.getMoreOrders();
                        }).catch(err => {
                        console.log(err)
                        this.$message.error("删除失败")
                    })
                }).catch(err => {
                    console.log(err)
                });
            },

            handleEdit: function (index, row) {
                this.editFormVisible = true;
//                this.editForm = Object.assign({}, row);
                this.editForm.userId = row.user.id
//                this.editForm.id = row.id
                this.editForm.orderId = row.id
                this.editForm.createDate = row.createDate
                console.log("this.editForm");
                console.log(this.editForm);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
            },
        },
        mounted()
        {
            this.page = 1;
            this.getMoreOrders();
            this.getuserIds();
            this.getBookIds();
        }
    }
</script>
<style>

    .additem {
        width: 220px;
    }
</style>