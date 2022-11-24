<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>女武神管理</el-breadcrumb-item>
        <el-breadcrumb-item >装甲编辑</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片区域 -->
      <el-card>
        <h1>{{ id ? '编辑' : '添加' }}装甲</h1>
        <el-form label-width="100px" @submit.native.prevent="save">
          <el-tabs>
            <el-tab-pane label="基础信息">
              <el-form-item label="名称">
                <el-select v-model="model.parent">
                  <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生日">
                <el-input  v-model="model.birth"></el-input>
              </el-form-item>
              <el-form-item label="装甲">
                <el-input  v-model="model.armor"></el-input>
              </el-form-item>
              <el-form-item label="作战方式">
                <el-input  v-model="model.weapon"></el-input>
              </el-form-item>
              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :headers="getAuthHeaders()"
                  :on-success="handleAvatarSuccess">
                  <img v-if="model.avater" :src="model.avater" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="原画">
                <el-upload
                  class="upload-pic"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :headers="getAuthHeaders()"
                  :on-success="handlePicSuccess"
                  >
                  <img v-if="model.pic" :src="model.pic" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="技能">
              <el-button type="primary" plain icon="el-icon-plus" @click="model.skills.push({})" style="margin-bottom: 10px">添加技能</el-button>
              <el-row type="flex" style="flex-wrap: wrap" :gutter="20">
                <el-col :md="12" v-for="(item, i) in model.skills" :key="i"  >
                  <el-form-item label="名称">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item label="图标">
                    <el-upload
                      class="avater-uploader"
                      :action="$http.defaults.baseURL + '/upload'"
                      :headers="getAuthHeaders()"
                      :show-file-list="false"
                      :on-success="res => $set(item, 'icon', res.url)">
                      <img v-if="item.icon" :src="item.icon" class="icon">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="描述">
                    <el-input v-model="item.description" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item label="演示视频">
                    <el-upload
                      class="avatar-uploader"
                      :action="$http.defaults.baseURL + '/upload'"
                      :show-file-list="false"
                      :on-success="res => $set(item, 'video', res.url )"
                      :headers="getAuthHeaders()">
                    <video width="100%" v-if="item.video" controls="controls" :key="menuKey">
                      <source :src="item.video" type="video/mp4" />
                    </video>
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item >
                    <el-button type="danger" size="small" @click="model.skills.splice(i, 1)">删除</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        <el-form-item>
          <el-button type="primary" native-type="submit" style="margin-top: 20px">保 存</el-button>
        </el-form-item>
  
        </el-form> 
      </el-card>
    </div>
  </template>
  
  <script>
  
    export default {
      props: {
        id: {}
      },
      data() {
        return {
          model: {skills :[{icon: null, video: null}]},
          parents: [],
          imageUrl: '',
          menuKey: 1, // 用来强制刷新
          videoFlag: false,  // 进度条相关的
          videoUploadPercent: 0,  // 进度条相关的
        }
      },
      methods: {
        async save() {
          if (this.id) {
            const res = await this.$http.put(`rest/armor/${this.id}`, this.model)
          } else {
            const res = await this.$http.post('rest/armor', this.model)
          }
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.$router.push('/armor')
  
        },
        async getValkyrieList() {
          const res = await this.$http.get(`rest/armor/${this.id}`)
          this.model = res.data
        },
        handleAvatarSuccess(res) {
          this.$set(this.model, 'avater', res.url)
        },
        handlePicSuccess(res) {
          this.$set(this.model, 'pic', res.url )
        },
        
        async getParents() {
        const res = await this.$http.get('rest/categories')
        this.parents = res.data
        },
        handleVideoSuccess(req ,res, file) {
          this.$set(req, 'video', res.url )
          this.imageUrl = res.url
          // 进度条恢复到初始状态
          this.videoFlag = false;
          this.videoUploadPercent = 0;
          ++this.menuKey;
          console.log(res);
          
        }
       
      },
      created() {
        this.getParents()
        if(this.id) {
          this.getValkyrieList()
        }
      }
    }
  </script>
  
  <style>
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .icon {
      width: 89px;
      height: 89px;
      display: block;
    }
    .box {
      /* box-sizing: border-box; */
      border: 2px solid #409EFF;
      border-radius: 2px;
    }
  </style>