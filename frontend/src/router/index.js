import { createRouter, createWebHistory } from 'vue-router'

const home = () => import(/* webpackChunkName: "home" */ '../views/home.vue');
const about = () => import(/* webpackChunkName: "about" */ '../views/about.vue');
const news = () => import(/* webpackChunkName: "news" */ '../views/news.vue');
const toDo = () => import(/* webpackChunkName: "toDo" */ '../views/to-do.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/news',
    name: 'news',
    component: news
  },
  {
    path: '/todo',
    name: 'too-do',
    component: toDo
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || '/'),
  routes
})

export default router
