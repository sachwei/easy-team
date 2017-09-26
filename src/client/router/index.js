import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    { name: 'login', path: '/', component: require('../components/login/Login.vue') },
    { name: 'home', path: '/home', component: require('../components/home/Home.vue'), children: [
        { name: 'apply', path: 'apply', component: require('../components/personal/Apply.vue') },
        { name: 'userSetting', path: 'userSetting', component: require('../components/setting/UserSetting.vue') },
        { name: 'personal', path: 'personal', component: require('../components/setting/Personal.vue') },
        { name: 'summary', path: 'summary', component: require('../components/home/Summary.vue') }
    ]}
]

let router = new Router({
    routes: routes
})

router.beforeEach((to, from, next) => {
    let user = JSON.parse(window.localStorage.getItem('userInfo'))
    if (!user) {
        next({path: '/'})
    } else {
        next()
    }
})

export default router