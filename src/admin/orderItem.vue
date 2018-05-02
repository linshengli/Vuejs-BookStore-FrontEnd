<template>
    <div class="container">
        <div class="panel panel-default">
            <el-table :data="items" style="width: 100%;">
                <el-table-column type="index" width="60"></el-table-column>
                <el-table-column label="书籍">
                    <template scope="prop">
                        <img :src="'image/'+prop.row.book.image" class="img-responsive cartimage" style="margin: 20px;">
                    </template>
                </el-table-column>
                <el-table-column label="书名" prop="book.bookName"></el-table-column>
                <el-table-column label="作者" prop="book.author"></el-table-column>
                <el-table-column label="数量">
                    <template scope="scop">
                        <el-input type="number" :min="1" :max="scop.row.book.total" v-model="scop.row.num"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="价格" prop="price"></el-table-column>
                <el-table-column label="金额（元）">
                    <template scope="scop">
                        {{ scop.row.price * scop.row.num }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scop">
                        <a class="btn btn-danger" @click="">删除</a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import URL from 'url-parse'
    export default{
        data(){
            return {
                items: [
                    {
                        price: 1400,
                        book: {
                            image: "5969a6ddb15e133bdb87ff5c",
                            total: 3,
                            author: "Silvana De Mari",
                            introduce: "",
                            price: 1400,
                            isbn: "9789580485445",
                            publish: " Norma S A Editorial",
                            publishDate: " 2008-07-27",
                            id: "5969a6ddb15e133bdb87ff5e",
                            bookName: "El Ultimo Elfo/the Last Elf (Spanish Edition)"
                        },
                        num: 1,
                        id: "",
                        createDate: {
                            date: 17,
                            hours: 8,
                            seconds: 40,
                            month: 6,
                            timezoneOffset: -480,
                            year: 117,
                            minutes: 7,
                            time: 1500250060938,
                            day: 1
                        }
                    },
                    {
                        price: 2200,
                        book: {
                            image: "5969a6ddb15e133bdb87ff5f",
                            total: 8,
                            author: "[法] 圣埃克苏佩里",
                            introduce: " 小王子是一个超凡脱俗的仙童，他住在一颗只比他大一丁点儿的小行星上。陪伴他的是一朵他非常喜爱的小玫瑰花。但玫瑰花的虚荣心伤害了小王子对她的感情。小王子告别小行星，开始了遨游太空的旅行。他先后访问了六个行星，各种见闻使他陷入忧伤，他感到大人们荒唐可笑、太不正常。只有在其中一个点灯人的星球上，小王子才找到一个可以作为朋友的人。但点灯人的天地又十分狭小，除了点灯人他自己，不能容下第二个人。在地理学家的指点下，孤单的小王子来到人类居住的地球。 小王子发现人类缺乏想象力，只知像鹦鹉那样重复别人讲过的话。小王子这时越来越思念自己星球上的那枝小玫瑰。后来，小王子遇到一只小狐狸，小王子用耐心征服了小狐狸，与它结成了亲密的朋友。小狐狸把自己心中的秘密——肉眼看不见事务的本质，只有用心灵才能洞察一切——作为礼物，送给小王子。用这个秘密，小王子在撒哈拉大沙漠与遇险的飞行员一...(展开全部)",
                            price: 2200,
                            isbn: "9787020042494",
                            publish: " 人民文学出版社",
                            publishDate: " 2003-8",
                            id: "5969a6ddb15e133bdb87ff61",
                            bookName: "小王子"
                        },
                        num: 1,
                        id: "",
                        createDate: {
                            date: 17,
                            hours: 8,
                            seconds: 11,
                            month: 6,
                            timezoneOffset: -480,
                            year: 117,
                            minutes: 9,
                            time: 1500250151997,
                            day: 1
                        }
                    }
                ]
            }
        },
        computed: {}

    }
</script>