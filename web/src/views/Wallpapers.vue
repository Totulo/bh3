<template>
  <div class="page">
    <div class="wallpapers-title">
      <span>动画 </span><span>/</span><span>ANIMATIONS</span>
    </div>
    <div class="animate-swiper">
      <div class="swiper-container w-swiper">
        <swiper class="swiper " :options="swiperOptions" >
          <swiper-slide class="swiper-slide"><img src="../assets/swiper/e1711495a7b803711e0fa1907d665551_7518678854448681603.png"></swiper-slide>
          <swiper-slide class="swiper-slide"><img src="../assets/swiper/2021020114084334134.jpg"></swiper-slide>
          <swiper-slide class="swiper-slide"><img src="../assets/swiper/2020070912381823441.jpg"></swiper-slide>
          <swiper-slide class="swiper-slide"><img src="../assets/swiper/2021072119142826586.jpg"></swiper-slide>
          <swiper-slide class="swiper-slide"><img src="../assets/swiper/2022012116375784415.jpg"></swiper-slide>
          <div class="swiper-pagination pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <div class="wallpapers-title">
      <span>壁纸 </span><span>/</span><span>WALLPAPERS</span>
    </div>
    <div class="paper-wrap">
      <div class="paper-list d-flex">
        <div class="paper-item" v-for="(item, i) in dataShow" :key="i">
          <router-link :to="item.pic" custom v-slot="{ navigate }">
            <a @click="navigate" @keypress.enter="navigate" role="link">
              <img :src="item.pic">
            </a>
          </router-link>
          <div>{{item.name}}</div>
        </div>
      </div>
      <el-pagination
        class="pag"
        background
        layout="prev, pager, next"
        :total="this.wallpaperNum"
        @current-change="handleCurrentChange"
        :current-page="this.nowPage"
        :page-size="this.pageSize">
      </el-pagination>
      
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      swiperOptions: {
        loop: true,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true //允许分页点击跳转
        },
      },
      //获取的数据
      wallpaperList: [],
      wallpaperNum: 0,
      // 所有页面的数据
      totalPage: [],
      // 每页显示数量
      pageSize: 9,
      // 共几页
      pageNum: 1,
      // 当前显示的数据
      dataShow: "",
      // 默认当前显示第一页
      currentPage: 0,
      // 当前显示的页面
      nowPage: 1,
    }
    
  },
  methods: {
    async getWallpaperList() {
      const res = await this.$http.get('/wallpaper/list')
      this.wallpaperList = res.data
      this.wallpaperNum = this.wallpaperList.length

      // 根据后台数据的条数和每页显示数量算出一共几页,得0时设为1 ;
      this.pageNum = Math.ceil(this.wallpaperNum / this.pageSize) || 1;

      for (let i = 0; i < this.pageNum; i++) {
      // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
      this.totalPage[i] = this.wallpaperList.slice(this.pageSize * i, this.pageSize * (i + 1))
      }
      // 获取到数据后显示第一页内容
      this.dataShow = this.totalPage[this.currentPage];
      
    },
    handleCurrentChange(newpage) {
      this.nowPage = newpage
      this.currentPage = newpage - 1
      this.getWallpaperList()
    }

  },
  created() {
    this.getWallpaperList()
  }
}
</script>

<style lang="scss" scoped>
@import '../css/Wallpapers.scss'


</style>

<style lang="scss">
.w-swiper {
  .swiper-pagination {
    margin-left: 25%;
    .swiper-pagination-bullet {
      width: 105px;
      height: 65px;
      border-radius: 0;
      opacity: 1;
      border: 2px solid rgba(255,255,255,.3);
    }
    .swiper-pagination-bullet-active {
      border: 2px solid #33c8ff;
    }
  }
  .swiper-pagination .swiper-pagination-bullet:nth-child(1){
    background: url(../assets/swiper/5cc9e7d9e5b59529f786801c97414e56_8642774847250475530.png) center center no-repeat;
    background-size: 100%;
  
  }
  .swiper-pagination .swiper-pagination-bullet:nth-child(2){
    background: url(../assets/swiper/2021020114084526332.jpg) center center no-repeat;
    background-size: 100%;
  }
  .swiper-pagination .swiper-pagination-bullet:nth-child(3){
    background: url(../assets/swiper/2020070912382251731.jpg) center center no-repeat;
    background-size: 100%;
  }
  .swiper-pagination .swiper-pagination-bullet:nth-child(4){
    background: url(../assets/swiper/2021072119143479921.jpg) center center no-repeat;
    background-size: 100%;
  
  }
  .swiper-pagination .swiper-pagination-bullet:nth-child(5){
    background: url(../assets/swiper/2022012116380715763.jpg) center center no-repeat;
    background-size: 100%;
  }
}
  
</style>
