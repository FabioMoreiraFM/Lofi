import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/templates/Home'
import Admin from '@/components/templates/Admin'
import Login from '@/components/auth/Login'
import Archives from '@/components/templates/Archives'
import Article from '@/components/templates/Article'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
},{
    name: 'login',
    path: '/login',
    component: Login
},{
    name: 'noticias',
    path: '/noticias',
    component: Archives
}, {
    name: 'articleById',
    path: '/articles/:id',
    component: Article    
}, {
    name: 'admin',
    path: '/admin',
    component: Admin
}]

export default new VueRouter( {
    mode: 'history',
    routes: routes
})