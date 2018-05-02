<template>
    <div id="detail" class="container">
        <navbar></navbar>
        <div class="container-fluid row">
            <div class="col-md-4">
                <el-card :body-style="{ padding: '20px' }">
                    <!--<a :href="detaillink">-->
                    <img :src="img" class="image">
                    <div style="padding: 0px;">
                        <div>
                            <div><span>作者：{{Book.author}}</span></div>
                        </div>

                    </div>
                </el-card>
            </div>
            <div class="col-md-8">
                <div style="text-align: left;"><strong><h2>书名：{{Book.bookName}}</h2></strong></div>
                <br/>
                <div style="text-align: left;">介绍：{{ Book.introduce }}</div>
                <br/>
                <div class="pull-left">
                    <span>作者：{{Book.author}}</span>
                    <span>出版社：{{Book.publish}}</span>
                    <span>出版日期：{{Book.publishDate}}</span>
                </div>
                <br/>
                <div style="text-align: left;">
                    <span>价格（元)：<strong>{{Book.price}}</strong></span>
                    <span>总数：<strong>{{Book.total}}</strong></span>
                </div>
                <br/>
                <div style="text-align: left;">
                    <div>
                        <span>
                            <!-- <input type="number" v-model="num" :min="0" :max="Book.total"> -->
                            <el-input-number hidden=true size="large" v-model="num" :min="0" :max="Book.total"></el-input-number>
                        </span>
                        <span>
                            <a class="btn-primary btn">
                                <span class="glyphicon glyphicon-shopping-cart" @click="addtocart">加入购物车</span>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import navbar from './navbar.vue'
    import axios from 'axios'
    import URL from 'url-parse'
    import qs from 'qs'
    export default{
        components: {
            navbar
        },
        data(){
            return {
                Book: {},
                num: 0,
            }
        },
        watch: {},
        methods: {
            addtocart(){
                let item = {
//                    book:this.Book,
                    bookId: this.getUrl(this.Book._links.self.href),
                    num: this.num,
                    price: this.Book.price,
                    createDate: new Date()
                };
                console.log("AddtoCart")
                console.log(item);
                let self = this;
                axios.post("addtocart", qs.stringify(item))
                    .then(response => {
                        let data = response.data;
                        if (data.status == '1') {
                            self.$message.success("成功添加到购物车！")
                            self.$route.push("/cart");
                        } else {
                            self.$message.error("请先登录！")
                        }
                    })
            },
            getUrl(str){
                return str.slice(str.lastIndexOf('/')+1)
            }
        },
        watch: {

        },
        computed: {
            id: function () {
                return this.$route.params.id;
            },
            detaillink: function () {
                return (new URL(this.Book._links.book.href)).pathname
            },
            img: function () {
                return "image/" + this.Book.image
            },
        },
        created(){
            console.log(this.id);
            let self = this;
            let url = "/books/" + self.id;
            axios.get(url).then(function (response) {
                self.Book = response.data;
                console.log(self.Book);
            }).catch(function (error) {
                console.log(error);
            });
            console.log("THIS IS THE BOOK");
            console.log(this.Book)
        },

    }
</script>
<style>
    /*.el-input-number_decrease{*/
    /*padding-top: 10px;*/
    /*padding-bottom: 15px;*/
    /*}*/

    /* #detail {
    } */

    .row {
        padding: 50px;
    }
</style>