
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '', component: () => import('../views/Login'), meta: { title: '登陆' } },
        { path: '/Login', name: 'Login', component: () => import('../views/Login'), meta: { title: '登陆' } },
        { path: '/Register', name: 'Register', component: () => import('../views/Register'), meta: { title: '注册' } },
        { path: '/List', name: 'List', component: () => import('../views/List'), meta: { title: '留言列表' } },
        { path: '/Detail', name: 'Detail', component: () => import('../views/Detail'), meta: { title: '详情' } },
        { path: '/Search', name: 'Search', component: () => import('../views/Search'), meta: { title: '搜索' } }
    ]
})

router.beforeEach((to, from, next) => {
    let name = to.name
    if (name === 'Login' || name === 'Register') {
        return next()
    } else {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo') || "{}")
        if (userInfo && userInfo.access_token) {
            return next()
        } else {
            return next({ name: 'Login' })
        }
    }
})

export default router
