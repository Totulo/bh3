<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>女武神管理</el-breadcrumb-item>
      <el-breadcrumb-item>女武神列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card >
      <!-- 搜索与添加 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" clearable >
            <el-button slot="append" icon="el-icon-search" ></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="dialogVisible = true ">添加女武神</el-button>
        </el-col>
      </el-row>
      <!-- 女武神列表区 -->
      <el-table :data="items" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="ID" prop="_id"></el-table-column>
        <el-table-column label="上级分类" prop="categories"></el-table-column>
        <el-table-column label="女武神名称" prop="name"></el-table-column>
        <!-- 编辑 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="$router.push(`valkyrie/edit/${scope.row._id}`)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="remove(scope.row)"
              >删除</el-button>
          </template>
          </el-table-column>
      </el-table>

      <!-- 添加女武神的对话框 -->
      <el-dialog
        title="添加女武神"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <el-form :model="model" >
          <el-form-item label="名称">
            <el-input  v-model="model.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addValkyrie">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 分页 -->
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination> -->
    </el-card>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        dialogVisible: false,
        model: {},
        currentPage4: 4,
        items: []
      }
    },
    created() {
      this.getItems()
    },
    methods: {
      async getItems() {
        const res = await this.$http.get('rest/valkyrie')
        this.items = res.data
        console.log(this.items);
      },
      async remove(row) {
        this.$confirm(`是否确定删除分类"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`rest/valkyrie/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getItems()
        })
      },
      async addValkyrie() {
        const res = await this.$http.post(`rest/valkyrie`,this.model)
        this.dialogVisible = false
        this.getItems()
      },
    }
  }
</script>

<style >

</style>