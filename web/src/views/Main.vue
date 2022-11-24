<template>
  <div class="page d-flex">
    <div class="nav d-flex bg-rgb-1 text-l-blue">
      <div class="nav-warp d-flex">
        <div class="nav-left d-flex text-center">
          <div class="nav-item" >
            <router-link to="/home" custom v-slot="{ navigate }">
              <div @click="navigate" @keypress.enter="navigate" role="link">官网首页</div>
            </router-link>
            <span>HOME</span>
          </div>
          <div class="nav-item">
            <router-link to="/news" custom v-slot="{ navigate }">
              <div @click="navigate" @keypress.enter="navigate" role="link">作战资讯</div>
            </router-link>
            <span>NEWS</span>
          </div>
          <div class="nav-item">
            <router-link to="/valkyries" custom v-slot="{ navigate }">
              <div @click="navigate" @keypress.enter="navigate" role="link">女武神</div>
            </router-link>
            <span>VALKYRIES</span>
          </div>
          <div class="nav-item">
            <router-link to="/wallpapers" custom v-slot="{ navigate }">
              <div @click="navigate" @keypress.enter="navigate" role="link">动画壁纸</div>
            </router-link>
            <span>WALLPAPERS</span>
          </div>
          <div class="nav-item">
            <router-link to="/" custom v-slot="{ navigate }">
              <div @click="navigate" @keypress.enter="navigate" role="link">周边商城</div>
            </router-link>
            <span>WERCH</span>
          </div>
          <div class="nav-item">
            <router-link to="/" custom v-slot="{ navigate }">
              <div @click="navigate" @keypress.enter="navigate" role="link">官方社区</div>
            </router-link>
            <span>COMMUNITY</span>
          </div>
        </div>
        <div class="nav-right d-flex text-center text-l-blue">
          <a href="#" class="nav-r-item">
            <div>成长关爱系统</div>
          </a>
          <a href="#" class="nav-r-item">
            <div>成长关爱系统</div>
          </a>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div class="footer">
      <div class="footer-contet d-flex">
        <div class="footer-logo d-flex">
          <div class="d-flex " style="align-items: center;">
            <img class="logo" src="../assets/logo.png" alt="">
            <span></span>
            <h1>
              <img class="game-logo" src="../assets/game-logo.png" alt="">
            </h1>
          </div>
        </div>
        <div class="footer-info">
          <div class="footer-link d-flex  jc-between">
            <div class="footer-lisnk-list text-white">
              <a href="javascript:;">用户协议</a>  |  
              <a href="javascript:;">隐私政策</a>  |  
              <a href="javascript:;">儿童隐私政策</a>  |  
              <a href="javascript:;">自律公约</a>  |  
              <a href="javascript:;">家长监理工程</a>  |  
              <a href="javascript:;">关于我们</a>  |  
              <a href="javascript:;">联系我们</a>  |  
              <a href="javascript:;">加入我们</a>  |  
            </div>
          </div>
        </div>
    </div>
   
          
    </div>
    
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
@import '../css/Main.scss'
  
  
</style>
