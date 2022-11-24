<template>
  <div class="page">
    <div class="banner">
    <video class="bannerVedio" autoplay loop muted="" preload>
      <source src="../assets/background/pcbanner.mp4">
    </video>
    <div class="download d-flex ">
      <div class="pv d-flex">
        <video autoplay="autoplay" autobuffer loop="loop" muted="muted">
          <source src="../assets/video/pv.mp4" type="audio/mp4">
        </video>
        <div class="pv-btn" @click="dialogVisible = true"></div>
      </div>
      <div class="download-box d-flex jc-between">
        <div class="ewm d-flex jc-between">
          <div class="ewm-img">
            <img src="../assets/img/ewm.png" alt="">
            <div class="line"></div>
          </div>
          <a href="#">模拟器下载</a>
        </div>
        <div class="download-bts">
          <a href="#" class="tap">
            <img src="../assets/img/tap.png" alt="">
          </a>
          <a href="#" class="and d-flex">
            <img src="../assets/img/and.png" alt="">
            Android下载
          </a>
        </div>
        <img src="../assets/img/PCdownload.png" class="pc-down">
      </div>
      <div class="age">
        <img src="../assets/img/age.png" alt="">
      </div>
    </div>
    <div class="news d-flex jc-between">
      <swiper class="swiper" :options="swiperOptions" >
        <swiper-slide class="swiper-slide"><img src="../assets/img/2019111415040910416.png" alt=""></swiper-slide>
        <swiper-slide class="swiper-slide"><img src="../assets/img/2019111415062311645.png" alt=""></swiper-slide>
        <swiper-slide class="swiper-slide"><img src="../assets/img/2019111415075614503.png" alt=""></swiper-slide>
        <swiper-slide class="swiper-slide"><img src="../assets/img/2020012017544296758.jpg" alt=""></swiper-slide>
        <swiper-slide class="swiper-slide"><img src="../assets/img/2020050914430985995.jpg" alt=""></swiper-slide>
        <swiper-slide class="swiper-slide"><img src="../assets/img/ce1812d3be60ede80f412a94fab151a6_9038516203845049123.png" alt=""></swiper-slide>
        <div class="swiper-pagination pagination" slot="pagination"></div>
      </swiper>
      <div class="home-news-list">
        <div class="cates d-flex" >
          <div class="cate"  v-for=" (item, i) in newsCats" :class="{active: active === i}" :key="i" @click="active = i" >
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="home-news-content"  >
          <div v-for=" (item, i) in newsCats">
            <div v-for="(news, cindex) in item.newsList" :key="cindex" v-show="active == i">
              <router-link custom v-slot="{ navigate }" :to="`/articles/${news._id}`">
                <a @click="navigate" @keypress.enter="navigate" role="link" class="home-news-content-item d-flex" >
                  <div>[ {{ news.categoryName }} ] {{ news.title }}</div>
                  <div>{{ news.createdAt | date }}</div>
                </a>
              </router-link>
              
            </div>
          </div>
        </div>
        <div class="more d-flex">
          <router-link custom v-slot="{ navigate }" to="/news">
            <a @click="navigate" @keypress.enter="navigate" role="link" class="more-btn">查看全部</a>
          </router-link>
          
        </div>
      </div>
    </div>
    </div>
    
    <div class="roles" >
      <div class="roles-wrap">
        <div class="role-img">
          <img :src="this.valkyriesList[4].armorsList[0].pic" >
        </div>
        <div class="role-info d-flex">
          <div class="role-info-title">
            <h2>{{valkyriesList[4].name}}</h2>
            <p>{{valkyriesList[4].armorsList[0].armor}}</p>
          </div>
          <div class="role-info-weapon d-flex">
            <div class="msg">
              <div>姓名：{{valkyriesList[4].name}}</div>
              <div>装甲：{{valkyriesList[4].armorsList[0].armor}}</div>
              <div>作战方式：{{valkyriesList[4].armorsList[0].weapon}}</div>
            </div>
            <div class="video">
              <video autoplay="autoplay" loop="loop" muted="muted" :src="this.valkyriesList[4].armorsList[0].skills[0].video">
              <!-- <source src="" type="audio/mp4"> -->
              </video>
              <div class="role-btn" @click="roleDialogVisible = true"></div>
            </div>
          </div>
          <div class="role-info-intro">
            <div>
              <div class="role-info-intro-title d-flex">
                <div class="line"></div>
                <span >角色介绍</span>
                <span class="b">Character Overview</span>
              </div>
              <p>生物属性物理辅助角色</p>
            </div>
          </div>
        </div>
        <div class="role-change"></div>
      </div>
    </div>
    <div class="contart">
      <div class="contart-wrap">
        <div class="contart-wrap-content">
          <div class="official d-flex">
            <div class="official-item">
              <div>
                <img src="../assets/img/weibo.png" alt="">
              </div>
              <span>官方微博</span>
            </div>
            <div class="official-item">
              <div>
                <img src="../assets/img/weixn.png" alt="">
              </div>
              <span>官方微信</span>
            </div>
            <div class="official-item">
              <div>
                <img src="../assets/img/qq.png" alt="">
              </div>
              <span>客服QQ</span>
            </div>
            <div class="official-item">
              <div>
                <img src="../assets/img/miyo.png" alt="">
              </div>
              <span>官方社区</span>
            </div>
          </div>
          <div class="contart-info d-flex">
            <div class="contart-list">
              <div class="title d-flex">
                <div class="title-info">联系我们</div>
                <div class="title-line"></div>
              </div>
              <div class="contart-list-item">客服电话：400-666-6312</div>
              <div class="contart-list-item">未成年成长关爱热线：021-60371740</div>
              <div class="contart-list-item">不良信息举报热线：021-60371750</div>
              <div class="contart-list-item">投诉邮箱：tousu@mihoyo.com</div>
              <div class="contart-list-item">合作洽谈：bh3_contact@mihoyo.com</div>
            </div>
            <div class="contart-list ">
              <div class="title d-flex">
                <div class="title-info">官方QQ群</div>
                <div class="title-line"></div>
              </div>
              <div class="qqgroup-item d-flex">
                <div class="qqlist-item">崩坏3官方①群：579074091</div>
                <div class="qqlist-item">崩坏3官方③群：322530480</div>
                <div class="qqlist-item">崩坏3官方⑦群：486658559</div>
                <div class="qqlist-item">崩坏3官方⑧群：419960123</div>
                <div class="qqlist-item">崩坏3官方⑩群：586442980</div>
                <div class="qqlist-item">崩坏3官方⑫群：471316989</div>
                <div class="qqlist-item">崩坏3桌面服官方②群：872308494</div>
                <div class="qqlist-item">崩坏3桌面服官方③群：724886324</div>
              </div>
            </div>
          </div>
          <div class="contart-img">
            <img src="../assets/background/contract-img.png" alt="">
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
        <video id="video" controls width="100%" >
          <source src="../assets/video/pv.mp4" type="audio/mp4">
        </video>
      
      </el-dialog>
    </div>
    <div class="Dialog">
      <el-dialog
      :visible.sync="roleDialogVisible"
      width="50%"
      :before-close="handleClose"
      >
        <video id="video" controls width="100%" >
          <source :src="this.valkyriesList[4].armorsList[0].skills[0].video" type="audio/mp4">
        </video>
      
      </el-dialog>
    </div>
    
  </div>
</template>

<script>
import dayjs from 'dayjs'


export default {
  filters: {
    date(val) {
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  data() {
    return {
      active: 0,
      newsCats: [],
      valkyriesList: [],
      swiperOptions: {
        loop: true,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        
        
      },
      dialogVisible: false,
      roleDialogVisible: false,
    }
  },
  methods: {
    async getNewsList() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
      
    },
    async getVList() {
      const res = await this.$http.get('valkyries/list')
      this.valkyriesList = res.data
      console.log(this.valkyriesList);
    },

    handleClose() {
      this.dialogVisible = false
      this.roleDialogVisible = false
      // 关闭弹出框时 视频关闭播放
      const video = document.getElementById('video')
      video.pause()
    },
  },
  created(){
    this.getNewsList()
    this.getVList()
  }
}
</script>

<style lang="scss" scoped>
@import '../css/Home.scss';
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