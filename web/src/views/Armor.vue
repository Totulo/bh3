<template>
  <div class="page" v-if="armor">
    <div class="armor-wrap">
      <router-link custom v-slot="{ navigate }" class="back-btn" :to="`/valkyries`">
        <a @click="navigate" @keypress.enter="navigate" role="link" >
          <span>返回列表</span>
        </a>
      </router-link>
      <div class="armor-detail-content">
        <div class="big-img">
          <img :src="armor.pic" >
        </div>
        <div class="armor-detail-bd">
          <div class="bd-title">{{armor.parent.name}}</div>
          <div class="bd-card">
            <div class="wrap">
              <div class="armor-name">{{armor.armor}}</div>
              <div class="title"> 背景资料 </div>
              <div class="info-item">姓名: {{armor.parent.name}}</div>
              <div class="info-item">生日：{{armor.birth}}</div>
              <div class="info-item">装甲：{{armor.armor}}</div>
              <div class="info-item">作战方式：{{armor.weapon}}</div>
              <div class="title"> 角色招式 </div>
              <div class="skills d-flex" >
                <div class="skill" v-for="(skill, i) in armor.skills" :key="i" >
                  <img :src="skill.icon" @click="getIndex(i)">
                </div>
                
              </div>
              <div class="video d-flex" >
                <div class="video-info">
                  <div>
                    {{armor.skills[index].name}}
                    <div class="line"></div>
                  </div>
                  <p>{{armor.skills[index].description}}</p>
                </div>
                <div class="video-poster">
                  <video autoplay="autoplay" loop="loop" muted="muted" :src="armor.skills[index].video">
                    <!-- <source src="" type="audio/mp4"> -->
                  </video>
                  <div class="pv-btn" @click="dialogVisible = true"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="armor-detail-action">
          <div class="action-title">
            <span>{{armor.parent.name}}</span>
          </div>
          <div class="action-btns" >
            <div ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="Dialog">
      <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      >
        <video id="video" controls width="100%" :src="armor.skills[index].video">
        </video>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      armor: [],
      armorList: [],
      index: 0,
      dialogVisible: false,
      
    }
  },
  methods: {
    async getArmor() {
      const res = await this.$http.get(`armor/${this.id}`)
      this.armor = res.data
      console.log(this.armor);
      
    },
    
    getIndex(i) {
      this.index = i
    },
    handleClose() {
      this.dialogVisible = false
      // 关闭弹出框时 视频关闭播放
      const video = document.getElementById('video')
      video.pause()
    },
    
  },
  created() {
    this.getArmor()
    
  }

}
</script>

<style lang="scss" scoped>
@import '../css/Armor.scss';
.Dialog {
    ::v-deep .el-dialog {
      background-color: #091f2cee;
      border: 1px solid rgb(13, 210, 236);
      .el-dialog__body{
        padding: 0 ;
      }
      
    }
  }
</style>