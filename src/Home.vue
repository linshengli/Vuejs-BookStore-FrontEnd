<template>
<div id="home" class="container">
    <navbar @search="bookSearch"></navbar>
    <booklist :booklist="Books"></booklist>
    <button class="btn-block btn btn-primary" :disabled="!hasMore" id="morebooks" @click="fetchMoreBooks">
            {{ languageFilter(moreWord) }}
        </button>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex"
import navbar from './navbar.vue'
import booklist from './booklist.vue'
import axios from 'axios'
export default {
    components: {
        navbar,
        booklist
    },
    data() {
        return {
            Books: [],
            currentPage: 0,
            currentSearchPage: 0,
            moreWord: "更多",
            searchword: "",
            lasturl: "",
            hasMore: true
        }
    },
    computed: {
        ...mapGetters({
            language: 'getLanguage'
        })
    },
    methods: {
        languageFilter(value) {
            if (this.language == "English") {
                switch (value) {
                    case "更多":
                        return "More Books";
                    case "已经没有更多了":
                        return "No More Books"
                }

            }
            return value;
        },
        findcase(str) {
            return (str.length > 9) && (str.length <= 13) && str.split("").reduce((sum, value) => {
                return sum && ("0" <= value && value <= "9")
            }, true)
        },
        bookSearch(searchword) {
            console.log("Search Word:" + searchword);
            this.searchword = searchword;
            let pageSize = 20;
            this.currentPage = 0;
            let url = ""
            if (!this.findcase(this.searchword)) {
                url = "/books/search/findBooksByBookNameContains?" + "bookName=" + this.searchword + "&page=";
            } else {
                url = "/books/search/findBooksByIsbn?" + "isbn=" + this.searchword + "&page=";
            }
            this.lasturl = url;
            url = url + this.currentPage;
            this.Books = [];
            console.log(url)
            console.log("url")
            this.fetchBooks(url, pageSize);
        },
        fetch() {
            this.searchword = "";
            console.log("Fetch book");
            this.Books = []
            let pageSize = 20;
            this.currentPage = 0;
            let url = "/books?" + "page=";
            this.lasturl = url;
            url = url + this.currentPage;
            this.fetchBooks(url, pageSize);
        },
        fetchMoreBooks() {
            this.currentPage += 1;
            let pageSize = 20;
            let url = this.lasturl + this.currentPage;
            this.fetchBooks(url, pageSize);
        },

        fetchBooks(url, pageSize) {
            url += "&size=" + pageSize;
            var self = this;
            axios({
                url: url,
                method: "get",
                responseType: "json"
            }).then(function (response) {
                let bs = response.data._embedded.books;
                if (bs.length === 0 || bs.length != pageSize) {
                    self.hasMore = false;
                    self.moreWord = "已经没有更多了"
                } else {
                    self.hasMore = true;
                    self.moreWord = "更多"
                }
                console.log(bs);
                self.Books = self.Books.concat(bs);
                console.log(self.Books)
            }).catch(function (error) {
                self.hasMore = false;
                self.moreWord = "已经没有更多了"
                console.log(error);
            });
        }
    },
    mounted() {
        this.fetch();
    }
}
</script>

<style>
#morebooks {
    margin-bottom: 100px;
    font-size: 35px;
}
</style>
