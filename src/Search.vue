<template>
    <div id="search" class="container">
        <navbar @search="bookSearch"></navbar>
        <booklist :booklist="Books"></booklist>
        <button class="btn-block btn btn-primary" id="morebooks" @click="fetchMoreBooks">更多</button>
    </div>
</template>
<script>
    import navbar from './navbar.vue'
    import booklist from './booklist.vue'
    import axios from 'axios'
    export default {
        props: ["name", "isbn"],
        components: {
            navbar, booklist
        },
        data(){
            return {
                Books: [],
                currentPage: 0,
                lasturl:''
            }
        },
        methods: {
            findcase(str){
                return (str.length > 9) && (str.length <= 13) && str.split("").reduce((sum, value) => {
                        return sum && ("0" <= value && value <= "9")
                    }, true)
            },
            bookSearch(searchword){
                this.Books = [];
                console.log("Search Word:" + searchword);
                this.searchword = searchword;
                let pageSize = 20;
                this.currentPage = 0;
                let url = ""
                if (! this.findcase(this.searchword)) {
                    url = "/books/search/findBooksByBookNameContains?" + "bookName=" + this.searchword + "&page=";
                } else {
                    url = "/books/search/findBooksByIsbn?" + "isbn=" + this.searchword + "&page=";
                }
                this.lasturl = url;
                url = url + this.currentPage;
                this.fetchBooks(url, pageSize);
            },
            fetchMoreBooks(){
                this.currentPage += 1;
                this.fetchBooks();
            },
            fetchBooks(){
                var self = this;
                axios({
                    url: this.lasturl + self.currentPage,
                    method: "get",
                    responseType: "json"
                }).then(function (response) {
                    let bs = response.data._embedded.books;
                    console.log("Books:");
                    console.log(bs);
                    self.Books = self.Books.concat(bs);
                    console.log(self.Books)
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        created(){
            this.fetchBooks()
        }
    }
</script>
<style>
    #morebooks {
        margin-bottom: 100px;
        font-size: 35px;
    }

</style>