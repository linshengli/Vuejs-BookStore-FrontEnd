<template>
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <a class="navbar-header" href="/#/">
                <img class="navbarimg" src="image/596c96fab15e133b29962284"><span id="brand">BookStore</span></a>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form class="navbar-form navbar-left">
                <div class="form-group">
                    <input type="text" id="searchinput" class="form-control" v-model="searchword" :placeholder="placeword">
                </div>
                <button type="submit" class="btn btn-default" @click="$emit('search',searchword)">{{ languageFilter('搜索') }}</button>
            </form>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="/#/cart" id="cart">{{ languageFilter('购物车') }}</a></li>
                <el-dropdown trigger="hover" style="text-align: center" v-if="loged">
                    <a href="/#/personal" class="btn btn-outline">{{ languageFilter('个人中心') }}</a>
                    <button @click="logout" class="logoutlink btn btn-outline">{{ languageFilter('退出登录') }}</button>
                    <a href="/#/admin" class="logoutlink btn btn-outline" v-if="admin">Admin</a>
                    <span class="el-dropdown-link userinfo-inner">
                            <img class="navbarimg" :src="getImg"/>
                            {{ username}}
                        </span>
                </el-dropdown>
                <el-dropdown trigger="hover" style="text-align: center" v-if=" !loged " class="dl">
                    <span> <a href="/#/login">{{ languageFilter('登录') }}</a></span>
                </el-dropdown>
                <el-dropdown style="text-align: center; font-size:25px;padding-left:10px" @command="changeLanguage">
                    <span class="el-dropdown-link">{{ languageFilter("语言") }}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='中文'> 中文</el-dropdown-item>
                        <el-dropdown-item command='English'>English</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
</nav>
</template>

<script>
import axios from 'axios'
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    props: {

    },
    name: "navbar",
    components: {},
    data() {
        return {
            // language: "English", //Chinese
            searchContent: "",
            role: 0,
            searchword: "",
            username: '',
            loged: false,
            admin: false
        };
    },
    computed: {
        ...mapGetters({
            language: 'getLanguage'
        }),
        getImg() {
            let user = sessionStorage.getItem("user")
            if (user) {
                user = JSON.parse(user);
                return "image/" + user.picture
            }
        },
        placeword: {
            get() {
                return this.searchword || this.languageFilter("搜索（您可以输入书名或者书籍的isbn号）")
            },
            set(newValue) {
                this.placeword = newValue;
            }
        }
    },
    methods: {
        changeLanguage(value) {
            this.$store.dispatch('setLanguage', value)
        },
        languageFilter(value) {
            if (this.language == "English") {
                switch (value) {
                    case "搜索":
                        return "Search";
                    case "搜索（您可以输入书名或者书籍的isbn号）":
                        return "Search(Input the name or isbn of the book)"
                    case "购物车":
                        return "Cart";
                    case "个人中心":
                        return "Personal Center";
                    case "退出登录":
                        return "log out";
                    case "登录":
                        return "log in";
                    case "语言":
                        return "Language"
                }

            }
            return value;
        },
        logout() {
            sessionStorage.removeItem("user")
            this.username = ''
            this.loged = false
            this.admin = false
            axios.get('logout')
                .then(response => {
                    console.log(response)
                })
        }
    },
    mounted() {
        let user = sessionStorage.getItem("user")
        if (user) {
            user = JSON.parse(user);
            this.username = user.username
            this.loged = true;
            this.admin = user.isAdmin
        }
    }
}
</script>

<style>
nav {
    position: fixed;
    top: 0px !important;
}

#brand {
    font-size: 40px;
    margin-top: 15px;
}

#searchinput {
    width: 320px;
}

.userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;
}

.userinfo-inner {
    cursor: pointer;
    color: blue;
    vertical-align: middle;
    align-content: center;
    font-size: 40px;
}

.navbarimg {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    float: right;
}

#cart {
    font-size: 25px;
    padding-top: 20px;
}

.dl {
    font-size: 25px;
    margin-top: 12px;
}

.logoutlink {
    color: blue;
}
</style>
