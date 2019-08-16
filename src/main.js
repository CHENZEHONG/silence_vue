import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import SvgIcon from './components/SvgIcon'
// import './libs/rem.js'
import moment from 'moment'
import axios from 'axios'
import animate from 'animate.css'
import VueSocketIO from 'vue-socket.io'
import './registerServiceWorker'
import store from './store/index.js'

// Vue.component('svg-icon', SvgIcon);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./assets/svg', true, /\.svg$/);
requireAll(req);            // import all svg

Vue.use(animate);
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'localhost:1113/'
}));

Vue.config.productionTip = false;
Vue.prototype.$moment = moment;
Vue.prototype.$axios = axios;


// todo 响应拦截器
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response) {
        const {status} = error.response;
        if (status === 50014) {
            // token 过期
            alert('登录状态过期');
            router.push('/login')
        } else if (status === 404) {
            console.log('404')
        }
    }
    return Promise.reject(error);
})

// 全局导航守卫 未登录则跳到登录页面
router.beforeEach((to, from, next) => {
    // 遍历$route.matched 数组 检查路由记录中的meta 字段
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 有requiresAuth 说明需要先登录 获得token
        const token = localStorage.getItem('token');
        if (token) {
            // 有了token 则正常访问
            // token 过期处理在服务端
            next();
        } else {
            // 没有则跳转到登录页面 并将跳转的路由path作为query参数 登录成功后跳转到该路由
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    } else {
        // 没有 requiresAuth 字段则正常访问
        next();
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
