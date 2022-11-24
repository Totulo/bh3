<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
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
        <!-- 管理员列表区 -->
        <el-table :data="items" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="ID" prop="_id"></el-table-column>
          <el-table-column label="管理员名称" prop="username"></el-table-column>
          <!-- 编辑 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="$router.push(`admin_users/edit/${scope.row._id}`)">编辑</el-button>
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
          items: []
        }
      },
      created() {
        this.getItems()
      },
      methods: {
        async getItems() {
          const res = await this.$http.get('rest/admin_users')
          this.items = res.data
        },
        async remove(row) {
          this.$confirm(`是否确定删除该管理员"${row.username}"`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            const res = await this.$http.delete(`rest/admin_users/${row._id}`)
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