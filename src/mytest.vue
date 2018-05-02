<template>
    <div>
        <ul>
            <li v-bind:key="index" v-for="(item , key , index) in getItems">
                <input type="text" :value="item.num" @input="ch($event,key)">
            </li>
        </ul>
    </div>
</template>
<script>
    import axios from 'axios'

    import {mapGetters, mapActions} from 'vuex'
    //    import * as $ from "webpack-dev-server/client/web_modules/jquery/jquery-1.8.1";
    export default{
        computed: {
            ...mapGetters([
                'getItems'
            ])
        },
        methods: {
            ...mapActions([
                'change'
            ]),
            ch(event,e){

                let payload = {
                    index: e,
                    value:event.target.value,
                };
                console.log("HERE")
                console.log(payload)
                this.$store.commit("CHANGE",payload)
            }
        },


        created()
        {
//            let obj = {
//                "firstName": 'Fred',
//                "lastName": 'Flintstone'
//            };
//            axios({
//                url: "/people",
//                method: "post",
//                data: obj,
//                headers: {"Content-Type": "application/json"}
//            }).then(function (response) {
//                console.log(response.data)
//            }).catch(function (error) {
//                console.log(error);
//            });
//            console.log("-------------------")


        }
    }
</script>