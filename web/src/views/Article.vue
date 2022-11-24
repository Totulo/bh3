<template>
  <div class="page" v-if="article">
    <div class="news-wrap">
      <div class="news-detail">
        <router-link custom v-slot="{ navigate }" class="btn" :to="`/news`"><div @click="navigate" @keypress.enter="navigate" role="link">返回列表</div></router-link>
        <div class="banner"><img :src="article.pic" alt=""></div>
        <div class="article">
          <div class="article-hd">
            <div class="line"></div>
            <div class="article-title">
              <span>【{{article.categories[0].name}}】</span>
              {{article.title}}
            </div>
            <div class="article-date">
              发布于
              <span>{{article.createdAt | date}}</span>
            </div>
          </div>
          <div class="article-bd" v-html="article.body"></div>
          <div class="line-box">
            <div class="line"></div>
          </div>
        </div>
      </div>
      <a href="javascript:scroll(0,0)" class="top-btn"></a>
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
  props: {
    id: { required: true }
  },
  data() {
    return {
      article: null,
      
    }
  },
  methods: {
    async getArticle() {
      const res = await this.$http.get(`articles/${this.id}`)
      this.article = res.data
      
      console.log(this.article);
    }
  },
  created() {
    this.getArticle()
  }
}
</script>

<style lang="scss" scoped>
@import '../css/Article.scss'
</style>