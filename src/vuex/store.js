import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";

Vue.use(Vuex);

// 应用初始状态
const state = {
        count: 10,
        language:"中文",
        cart: sessionStorage.getItem("cart") || [],
        items: [
            {num: 11},
            {num: 12},
            {num: 13}
        ]
    }
;

// 定义所需的 mutations
const mutations = {
    INCREMENT(state, payload) {
        state.cart[payload.index].num++
    },
    DECREMENT(state, payload) {
        state.cart[payload.index].num--
    },
    CHANGE(state, payload){
        state.items[payload.index] = payload.value
    },
    CHANGENUM(state, payload){
        state.cart[payload.index].num = payload.value
    },
    DELETEITEM(state, payload){
        console.log(payload)
        state.cart.splice(payload.index, 1);
    },
    SETLANGUAGE(state,language){
        console.log("Change Language")
        state.language = language
    },
    ADDITEM(state, payload){
        let item = {};
        let flag = false;
        for (item in state.cart) {
            if (item.book.isbn == payload.payload.book.isbn) {
                item.num += payload.payload.num;
                flag = true;
                break;
            }
        }
        if (!flag) {
            state.cart.push({
                book: payload.payload.book,
                num: payload.payload.num || 1,
                price: payload.payload.price,
                createDate: payload.payload.createDate
            })
        }
    }
};

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})