<template>
  <el-container class="home-container">
  <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="" alt="">
        <span>后台管理系统</span>
      </div>
      <el-button type="info">退出</el-button>
    </el-header>
    <!-- 内容主体区 -->
  <el-container>
    <!-- 侧边栏 -->
    <el-aside :width="isCollpase ? '64px' : '200px'">
      <div class="toggle-button" @click="toggleCollapse">|||</div>
      <el-menu background-color="#003153" text-color="#fff" active-text-color="#409EFF" 
      :unique-opened="true" :collapse="isCollpase" :collapse-transition="false" :router="true" >
        <!-- 分类管理一级菜单 -->
        <el-submenu index="a" >
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-setting"></i>
            <!-- 文本 -->
            <span>分类管理</span>
          </template> 
          <!-- 二级菜单 -->
          <el-menu-item index="/categories" >
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>分类列表</span>
            </template> 
          </el-menu-item>
          <el-menu-item index="/createcategories" >
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-edit"></i>
              <!-- 文本 -->
              <span>新建分类</span>
            </template> 
          </el-menu-item>
          
        </el-submenu>
        <!-- 角色管理一级菜单 -->
        <el-submenu index="b" >
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-setting"></i>
            <!-- 文本 -->
            <span>女武神管理</span>
          </template> 
          <!-- 二级菜单 -->
          <!-- <el-menu-item index="/valkyrie" > -->
            <!-- <template slot="title"> -->
              <!-- 图标 -->
              <!-- <i class="el-icon-menu"></i> -->
              <!-- 文本 -->
              <!-- <span>女武神列表</span> -->
            <!-- </template>  -->
          <!-- </el-menu-item> -->
          <!-- <el-menu-item index="/valkyrie/edit" > -->
            <!-- <template slot="title"> -->
              <!-- 图标 -->
              <!-- <i class="el-icon-edit"></i> -->
              <!-- 文本 -->
              <!-- <span>添加女武神</span> -->
            <!-- </template>  -->
          <!-- </el-menu-item> -->
          <el-menu-item index="/armor" >
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-edit"></i>
              <!-- 文本 -->
              <span>女武神装甲列表</span>
            </template> 
          </el-menu-item>
          <el-menu-item index="/armorEdit" >
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-edit"></i>
              <!-- 文本 -->
              <span>添加女武神装甲</span>
            </template> 
          </el-menu-item>
          
        </el-submenu>
        <!-- 文章管理一级菜单 -->
        <el-submenu index="c" >
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-setting"></i>
            <!-- 文本 -->
            <span>文章管理</span>
          </template> 
          <!-- 二级菜单 -->
          <el-menu-item index="/articles" >
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>分类列表</span>
            </template> 
          </el-menu-item>
          <el-menu-item index="/articles/create" >
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-edit"></i>
              <!-- 文本 -->
              <span>新建文章</span>
            </template> 
          </el-menu-item>
          
        </el-submenu>
        <!-- 壁纸管理一级菜单 -->
        <el-submenu index="d" >
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-setting"></i>
            <!-- 文本 -->
            <span>壁纸管理</span>
          </template> 
          <!-- 二级菜单 -->
          <el-menu-item index="/wallpaper" >
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>壁纸列表</span>
            </template> 
          </el-menu-item>
          <el-menu-item index="/wallpaper/create" >
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-edit"></i>
              <!-- 文本 -->
              <span>添加壁纸</span>
            </template> 
          </el-menu-item>
          
        </el-submenu>
        <!-- 管理员管理一级菜单 -->
        <el-submenu index="e" >
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-setting"></i>
            <!-- 文本 -->
            <span>管理员</span>
          </template> 
          <!-- 二级菜单 -->
          <el-menu-item index="/admin_users" >
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>管理员列表</span>
            </template> 
          </el-menu-item>
          <el-menu-item index="/admin_users/create" >
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-edit"></i>
              <!-- 文本 -->
              <span>新建管理员</span>
            </template> 
          </el-menu-item>
          
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 右侧边栏 -->
    <el-main>
      <router-view :key="$router.path"></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  export default {
    data() {
      return {
        isCollpase: false,
      }
    },
    created() {
      
    },
    methods: {
      // 折叠菜单
      toggleCollapse() {
        this.isCollpase = !this.isCollpase
      }
    },
    
  };
</script>

<style >
  .home-container {
    height: 100%;
  }
  .el-header {
    display: flex;
    background-color: #003153;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    
  }
  .el-header div {
    display: flex;
    align-items: center;
      
  }
  .el-header div span {
    margin-left: 15px;
  }
  .el-aside {
    background-color: #003153;
    
  }
  .el-aside .el-menu {
    border-right: 0;
  }
  .el-main {
    background-color: #eaedf1;
  }
  .iconfont {
    margin-right: 10px;
  }
  .toggle-button {
    background-color: #000026;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
