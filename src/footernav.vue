<template>
    <footer id="footernav" v-if="total != 0">
        <div class="block" >
            <!--<span class="demonstration">直接前往</span>-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="current"
                    :page-size="30"
                    layout="prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </footer>
</template>
<!--
 PAGE-SIZE:30
-->
<script>
    export default {
        props: {
            currentPage: {
                required: true,
                type: Number,
                default: 0
            }, totalSize: {
                required: true,
                type: Number
            }
        },
        methods: {
//            TODO
            handleSizeChange(val)
            {
                console.log(`每页 ${val} 条`);
            }
            ,
//            TODO
            handleCurrentChange(val)
            {
                console.log(`当前页: ${val}`);
            }
        }
        ,
        data()
        {
            return {
                current:this.currentPage,
                total:this.totalSize
            };
        }
    }
</script>
<style>

</style>