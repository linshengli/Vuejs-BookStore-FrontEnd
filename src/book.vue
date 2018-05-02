<template>
<el-card :body-style="{ padding: '20px' }">
    <a :href="detaillink">
            <img :src="image" class="image img-responsive">
            <div style="padding: 0px;">
                <div>
                    <div><span>{{languageFilter('书名')}}：{{bookName}}</span></div>
                    <div><span>{{languageFilter('作者')}}：{{author}}</span></div>
                </div>
                <div>
                    <div><span>{{ languageFilter('价格（元)') }}：{{price}}</span></div>
                    <!--<div><span>总数：{{total}}</span></div>-->
                </div>
            </div>
        </a>
</el-card>
</template>

<script>
import URL from 'url-parse'
import {
    mapGetters
} from "vuex"
export default {
    props: {
        book: {
            required: true
        },
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
                    case "书名":
                        return "Book";
                    case "作者":
                        return "Author"
                    case "价格（元)":
                        return "Price(yuan)"
                    default:
                        return ""
                }

            }
            return value;
        },
    },
    data() {
        return {
            id: this.book.id,
            bookName: this.book.bookName,
            author: this.book.author,
            total: this.book.total,
            price: this.book.price,
            image: "image/" + this.book.image,
            detaillink: "/#" + new URL(this.book._links.book.href).pathname,
        }
    },
    created() {}
}
</script>

<style>
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.el-card {
    margin: 20px;
    height: 350px;
}
</style>
