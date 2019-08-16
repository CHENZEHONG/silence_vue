import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Note from './views/Note.vue'
import Chat from './views/Chat.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('./views/Home.vue'),
            meta: {
                requiresAuth: true        //判断是否需要登录
            }
        },
        {
            path: '/note',
            name: 'note',
            component: Note,
        }, {
            path: '/chat',
            name: 'chat',
            component: Chat,
        }
    ]
})
// 全局导航守卫 未登录则跳到登录页面
// Router.beforeEach((to, from, next) => {
//     const nextRoute = ['home', 'note'];
//     let isLogin = localStorage.getItem('token');
//     if (nextRoute.indexOf(to.name) >= 0 && !isLogin) {
//         next({
//             path: '/login',
//             query: {
//                 redirect: to.fullPath
//             }
//         })
//     }else{
//         next();
//     }
//     // 已 登录状态 后的操作
//     if (to.name === 'login'){
//         if(isLogin){
//
//         }
//     }
// })
