<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <h1>{{ id ? '编辑' : '新建' }}分类</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select  v-model="items.categories" multiple value-key="id">
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input  v-model="items.title"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input  v-model="items.introduce"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avater-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="handleIconSuccess">
          <img v-if="items.icon" :src="items.icon" class="icon">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="大图">
        <el-upload
          class="pic-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="handlePicSuccess">
          <img v-if="items.pic" :src="items.pic" class="pic">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="items.body" useCustomImageHandler
        @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保 存</el-button>
      </el-form-item>

      </el-form> 
    </el-card>
  </div>
</template>

<script>
  import { VueEditor } from "vue2-editor";

  export default {
    components: {
      VueEditor
    },
    props: {
      id: {}
    },
    data() {
      return {
        items: {},
        categories: []
      }
    },
    methods: {
      async save() {
        if (this.id) {
          const res = await this.$http.put (`rest/articles/${this.id}`, this.items)
        } else {
          const res = await this.$http.post('rest/articles', this.items)
        }
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.$router.push('/articles')

      },
      async getItems() {
        const res = await this.$http.get(`rest/articles/${this.id}`)
        this.items = res.data
      },
      async getCategories() {
        const res = await this.$http.get('rest/categories')
        this.categories = res.data
      },
      async handleImageAdded(file, Editor, cursorLocation,  resetUploader) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await this.$http.post('upload', formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
      },
      handlePicSuccess(res) {
        this.$set(this.items, 'pic', res.url )
      },
      handleIconSuccess(res) {
        this.$set(this.items, 'icon', res.url )
      },
    
    },
    created() {
      this.getCategories()
      if(this.id) {
        this.getItems()
      }
    }
  }
</script>

<style>
  .pic {
    width: 300px;
  }
</style>