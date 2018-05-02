<template>
    <el-row class="book-list">
        <el-col :span="5" v-for="(book, index) in booklist" :key="book" :offset="index > 1 ? 1 : 1">
            <book :book="book"></book>
        </el-col>
    </el-row>
</template>
<script>
    import book from './book.vue'
    export default{
        props:{
            booklist:{
                required:true
            }
        },
        data(){
            return {
                
            }
        },
        components:{
            book
        }
    }
</script>
<style>
    .book-list{
        margin-left: -50px;
    }
</style>