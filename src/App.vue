<template>
    <div id="app">
        <div v-show="$route.name !== 'login'" class="app-main">
            <SideBar></SideBar>
            <router-view></router-view>
        </div>

        <Login v-show="$route.name === 'login'"></Login>
    </div>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*color: #2c3e50;*/
        margin: 0;
        display: flex;
        height: 100vh;
    }

    .app-main {
        display: flex;
    }
</style>
<script>
    import SideBar from './components/SideBar.vue'
    import Login from './views/Login.vue'

    export default {
        components: {
            SideBar,
            Login
        }
    }
</script>
