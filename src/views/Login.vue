<style>
    .login {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #E1E1E1;
        opacity: 0.8;
    }

    .login-name {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        /*padding: 9px 0 9px 7px;*/
        border: 1px solid #b8b8b8;
        border-right: none;
        height: 40px;
        padding-left: 7px;
        width: 500px;
        margin: auto;
        background: #FFFFFF;
        display: flex;
        justify-content: space-between;
    }

    .login-name input {
        width: 80%;
        outline: none;
        border: none;
        font-size: 16px;
    }

    .login-btn {
        display: inline-block;
        width: 20%;
        background: #2cd07e;
        font-size: 16px;
        line-height: 40px;
        color: #FFFFFF;
        text-align: center;

    }
</style>
<template>
    <div class="login">
        <div class="login-name">
            <input placeholder="hello world" type="text" v-model="loginName" @keydown.enter="goLogin">
            <div class="login-btn" @click="goLogin">Go</div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loginName: ''
            }
        },
        methods: {
            goLogin() {
                this.$axios.post('/silence/user/login', {
                    username: this.loginName,
                    password: 123456
                }).then(res => {
                    let response = res.data;
                    if (response.code === 1) {
                        // code 1 表示成功登录 保存token
                        localStorage.setItem('token', response.data.token);
                        // 判断是从哪个路由跳转到登录页面的 登录成功跳转到该页面
                        if (this.$route.query.redirect) {
                            let redirect = this.$route.query.redirect;
                            this.$router.push(redirect.toString());
                        } else {
                            this.$router.push('/Home')
                        }
                    }
                    console.log(res)
                }).catch(err => {
                    alert('账号或密码错误')
                    console.log(err)
                })
            }
        }
        // created() {
        //     console.log(this.$router.meta)
        // }
    }
</script>