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
                        <el-input type="number" :min="0" :max="scop.row.book.total" v-model="scop.row.num"></el-input>
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
                        <a class="btn btn-primary" @click="handlePush(scop.row)">提交更新</a>
                        <a class="btn btn-danger" @click="handelDel(scop.row)">删除</a>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <a class="btn btn-primary pull-right" @click="checkout">提交</a>
                <p>{{ total }}</p>
            </div>
            <button @click="getPublicKey">GetPublicKey</button>
            <div>
                {{ publicKey }}
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import qs from "qs";
import { checkout, removeFromCart, getPublicKeyFromServer } from "./api/api";
export default {
  data() {
    return {
      cart: {},
      publicKey: {}
    };
  },
  mounted() {
    this.reload();
  },
  computed: {
    items() {
      console.log("computed");
      return this.cart.orderItems;
    },
    total: function() {
      console.log("this.cart.orderItems:");
      let s = 0;
      for (let item of this.cart.orderItems) {
        console.log(item);
        s += item.price * item.num;
      }
      return s;
    }
  },
  methods: {
    getPublicKey() {
      let self = this;
      getPublicKeyFromServer()
        .then(data => {
          console.log(data);
          console.log("Public Key:");
          self.publicKey = data;
        })
        .catch(err => console.log(err));
    },
    checkout() {
      let self = this;
      this.$confirm("确认购买?", "提示").then(() => {
        let param = {
          cart1: self.cart
        };
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(this.publicKey);
        var encrypted = encrypt.encrypt(JSON.stringify(self.cart));
        checkout(qs.stringify(param))
          .then(data => {
            console.log("MESS");
            console.log(data);
            if (data.status == "1") {
              this.$message.success("购买成功！");
            }
            if (data.status == "2") {
              this.$message.error("购买失败，余额不足！");
            }
            if (data.status == "3") {
              this.$message.error("库存不足！");
            }
            if (data.status == "0") {
              this.$message.error("请先登录！");
            }
            this.reload();
          })
          .catch(err => console.log(err));
      });
    },
    reload() {
      let self = this;
      let its = [];
      axios.get("getcart").then(response => {
        let data = response.data;
        console.log("datafff:");
        console.log(data);
        self.cart = data.cart;
      });
    },
    handlePush(row) {
      let para = { bookId: row.book.id, num: row.num };
      axios.post("pushnew", qs.stringify(para)).then(response => {
        let data = response.data;
        console.log(data);
      });
    },
    handelDel(row) {
      let para = { bookId: row.book.id };
      let self = this;

      this.$confirm("此操作将删除该物品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(row);
          removeFromCart(qs.stringify(para)).then(data => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            self.reload();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style>
td th {
  vertical-align: middle !important;
}

input {
  width: auto;
}

.cartimage {
  width: 150px;
}
</style>