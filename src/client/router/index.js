import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    { name: 'login', path: '/', component: require('../components/login/Login.vue') },
    { name: 'home', path: '/home', component: require('../components/home/Home.vue'), children: [
    ]}
]

let router = new Router({
    routes: routes
})

router.beforeEach((to, from, next) => {
    let user = JSON.parse(window.localStorage.getItem('userInfo'))
    if (to.name !== 'login' && !user) {
        next({path: '/'})
    } else {
        next()
    }
})

export default router