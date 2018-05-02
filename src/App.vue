<template>
    <div id="app">
        <transition name="fade"
                    mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import login from './user/login.vue'
    import {mapActions,mapGetters} from 'vuex'
    import navbar from './navbar.vue'
    import book from './book.vue'
    import test from './uploadimg.vue'
    import booklist from './booklist.vue'
    import myfooter from './footernav.vue'
    import items from './cart.vue'
    export default {
        name: 'app',
        components: {
            navbar, book, test, booklist, myfooter, items,login
        },
        computed:
            mapGetters({
                "count": "getCount"
            }),
        methods:mapActions([
            "increment",
            "decrement"
        ]),
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 480px;
    }

</style>
