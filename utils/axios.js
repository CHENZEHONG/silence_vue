import axios from 'axios'

if (process.env.NODE_ENV === 'dev') {
    axios.defaults.baseURL = '/api'
} else if (process.env.NODE_ENV === 'production') {
    console.log('has no config axios production')
}
// axios.defaults.baseURL = 'localhost:1113'
axios.defaults.withCredentials = true;
//设置超时时间
axios.defaults.timeout = 10000;

//响应拦截器
// todo
axios.interceptors.response.use(function (response) {
    localStorage.setItem('token',response.token);
    return response;
}, function (error) {
    if (error.response) {
        const {status} = error.response;
        if (status === 50014) {
            history.push('/login')
        }
    }
    return Promise.reject(error);
})