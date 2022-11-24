<template>
  <div class="page">
    <div class="news-wrap">
      <div class="news-title">
        <span>作战资讯 </span><span>/</span><span>NEWS</span>
      </div>
      <div class="news-content">
        <div class="content-box">
          <div class="news-cates">
            <div class="news-cate"  v-for="(item, i) in newsCats" :class="{active: active === i}" :key="i" @click="active = i" ><span>{{ item.name }}</span></div>
            
          </div>
          <div class="news-list" >
            <div v-for="(item, i) in newsCats" >
              <router-link custom v-slot="{ navigate }" :to="`/articles/${news._id}`" class="news-item d-flex" v-for="(news, aindex) in item.newsList" :key="aindex" v-show="active == i">
                <a @click="navigate" @keypress.enter="navigate" role="link" >
                  <div class="news-item-img"><img :src="news.icon" alt=""></div>
                  <div class="news-item-msg">
                    <div class="news-item-title">
                      <div class="title-info">{{news.title}}</div>
                      <span>{{news.createdAt | date}}</span>
                      <div class="item-line"></div>
                    </div>
                    <p class="news-item-info">
                      {{news.introduce}}
                    </p>
                  </div>
                </a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
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
    }
  },
  methods: {
    async getNewsList() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
      console.log(this.newsCats);
    }
  },
  created(){
    this.getNewsList()
  }
}
</script>

<style lang="scss" scoped>
@import '../css/News.scss';

</style>
    