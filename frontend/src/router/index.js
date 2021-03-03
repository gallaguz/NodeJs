import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home.vue');
const About = () => import(/* webpackChunkName: "About" */ '../views/About.vue');
const News = () => import(/* webpackChunkName: "News" */ '../views/News.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/news',
    name: 'News',
    component: News
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
