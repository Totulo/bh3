import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Categories from '../views/Categories.vue'
import CategoriesEdit from '../views/CategoriesEdit'

import Valkyrie from '../views/Valkyrie'
import ValkyrieEdit from '../views/ValkyrieEdit'

import ArmorEdit from '../views/ArmorEdit'
import Armor from '../views/Armor'

import Article from '../views/Article'
import ArticleEdit from '../views/ArticleEdit'

import Wallpaper from '../views/Wallpaper'
import WallpaperEdit from '../views/WallpaperEdit'

import AdminUser from '../views/AdminUser'
import AdminUserEdit from '../views/AdminUserEdit'

import Login from '../views/Login'

Vue.use(VueRouter)
const router = new VueRouter({
  routes : [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login, meta: {isPublic: true} },
  { path: '/home', name: 'Home', component: Home, 
  children: [
    { path: '/categories',component: Categories },
    { path: '/Createcategories',component: CategoriesEdit },
    { path: '/categories/edit/:id', component: CategoriesEdit, props: true },

    { path: '/valkyrie',component: Valkyrie },
    { path: '/valkyrie/edit',component: ValkyrieEdit },
    { path: '/valkyrie/edit/:id', component: ValkyrieEdit, props: true },

    { path: '/armorEdit', component: ArmorEdit },
    { path: '/armor', component: Armor },
    { path: '/armor/edit/:id', component: ArmorEdit, props: true },

    { path: '/articles/create', component: ArticleEdit },
    { path: '/articles', component: Article },
    { path: '/articles/edit/:id', component: ArticleEdit, props: true },

    { path: '/wallpaper/create', component: WallpaperEdit },
    { path: '/wallpaper', component: Wallpaper },
    { path: '/wallpaper/edit/:id', component: WallpaperEdit, props: true },

    { path: '/admin_users/create', component: AdminUserEdit },
    { path: '/admin_users', component: AdminUser },
    { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
  ]},

]
})

router.beforeEach((to, from, next ) => {
  if(!to.meta.isPublic && !localStorage.token) {
    return next
  }
  next()
})

export default router
