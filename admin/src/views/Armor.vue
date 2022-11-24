<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>女武神管理</el-breadcrumb-item>
        <el-breadcrumb-item>女武神装甲列表</el-breadcrumb-item>
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
        </el-row>
        <!-- 女武神列表区 -->
        <el-table :data="items" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="ID" prop="_id"></el-table-column>
          <!-- <el-table-column label="女武神名称" prop="parent"></el-table-column> -->
          <el-table-column label="装甲名称" prop="armor"></el-table-column>
          <el-table-column label="生日" prop="birth"></el-table-column>
          <el-table-column label="头像" prop="avater">
            <template slot-scope="scope">
              <img :src="scope.row.avater" style="height: 50px">
            </template>
          </el-table-column>
          <!-- 编辑 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="$router.push(`armor/edit/${scope.row._id}`)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="remove(scope.row)"
                >删除</el-button>
            </template>
            </el-table-column>
        </el-table>
  
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
          currentPage4: 4,
          items: []
        }
      },
      created() {
        this.getItems()
      },
      methods: {
        async getItems() {
          const res = await this.$http.get('rest/armor')
          this.items = res.data
        },
        async remove(row) {
          this.$confirm(`是否确定删除分类"${row.name}"`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            const res = await this.$http.delete(`rest/armor/${row._id}`)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getItems()
          })
        },

      }
    }
  </script>
  
  <style >
  
  </style>