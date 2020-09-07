
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '', component: () => import('../views/Login'), meta: { title: '登陆', requireLogin: false } },
        { path: '/Login', name: 'Login', component: () => import('../views/Login'), meta: { title: '登陆', requireLogin: false } },
        { path: '/Register', name: 'Register', component: () => import('../views/Register'), meta: { title: '注册', requireLogin: false } },
        { path: '/List', name: 'List', component: () => import('../views/List'), meta: { title: '留言列表', requireLogin: true } },
        { path: '/Detail', name: 'Detail', component: () => import('../views/Detail'), meta: { title: '留言详情', requireLogin: true } },
        { path: '/Search', name: 'Search', component: () => import('../views/Search'), meta: { title: '搜索', requireLogin: true } }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireLogin) {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo') || "{}")
        if (userInfo && userInfo.access_token) {
            document.title = to.meta.title
            return next()
        } else {
            document.title = "登陆"
            return next({
                path: '/Login',
                query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        document.title = to.meta.title
        return next()
    }
})

export default router
