import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'
import Home from '../views/Home'
import News from '../views/News'
import Valkyries from '../views/Valkyries'
import Wallpapers from '../views/Wallpapers'
import Article from '../views/Article'
import Armor from '../views/Armor'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: '/home',
    children: [
      { path: '/home', name: 'home', component: Home },
      { path: '/news', name: 'news', component: News },
      { path: '/valkyries', name: 'valkyries', component: Valkyries },
      { path: '/Wallpapers', name: 'wallpapers', component: Wallpapers },
      { path: `/articles/:id`, name: 'articles' ,component: Article, props: true },
      { path: `/armor/:id`, name: 'armor', component: Armor, props: true },

    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
