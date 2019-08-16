<style>
    .nav {
        display: flex;
        flex-direction: column;
        width: 16vw;
        height: 100vh;
        color: #607D8B;
        background: #212732;
        box-shadow: 2px 0 9px -2px #414854;
        overflow: auto;
    }

    .nav-head {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 16px 0 48px 0;
        width: 100%;
        flex: 0 0 auto;
    }

    .nav-head-logo {

    }

    .nav-head-img img {
        margin-top: 48px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .nav-head-name {

    }

    .nav-content {
        display: flex;
        flex-direction: column;
        flex: 1 0 auto;
    }

    .nav-content-item {
        display: flex;
        padding: 16px;
        border-top: 1px solid #E1E1E1;
    }

    .nav-content-item-active {
        /*border-left: 5px solid #A5D3ED;*/
        color: #FFF;
        /*F8B195 31425C 6C5B7B*/
        background: #31425C;
    }

    .nav-content-item-icon {
        width: 30px;
        height: 24px;
        margin-right: 5px;
    }

    .nav-content-item-text {

    }

    .nav-footer {
        flex: 0 0 auto;
        text-align: center;
    }
</style>
<template>
    <div class="nav">
        <div class="nav-head">
            <div class="nav-head-logo">LOGO</div>
            <div class="nav-head-img">
                <img src="../assets/images/headimg.jpg" alt="headimg"/>
            </div>
            <div class="nav-head-name">Zemun</div>
        </div>
        <div class="nav-content">
            <div class="nav-content-item" v-for="(item,index) in navData" :key="item.id"
                 :class="isActive===index?'nav-content-item-active':''" @click="selectNav(index)">
                <svg class="nav-content-item-icon">
                    <use :xlink:href='item.icon'></use>
                </svg>
                <div class="nav-content-item-text">{{item.text}}</div>
            </div>
        </div>
        <div class="nav-footer">
            <div @click="logout">logout</div>
            <div class="nav-footer-time">{{time}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                // todo isActive 在退出登录时未恢复默认状态 0
                isActive: 0,
                navData: [
                    {id: 1, text: 'Home', icon: '#user'},
                    {id: 2, text: 'Note', icon: '#detail'},
                    {id: 3, text: 'Chat', icon: '#customerservice'},
                    {id: 4, text: 'something', icon: '#star'},
                    {id: 5, text: 'something', icon: '#wifi'},
                    {id: 6, text: 'help', icon: '#question'},
                    {id: 7, text: 'question', icon: '#question'}
                ],
                time: this.$moment().format('MMMM Do YYYY, h:mm:ss a')
            }
        },
        computed: {},
        mounted() {
            setInterval(() => {
                this.time = this.$moment().format('MMMM Do YYYY, h:mm:ss a')
            }, 1000)
        }
        ,
        methods: {
            selectNav: function (index) {
                this.isActive = index;
                this.$router.push('/' + this.navData[index].text);
            }
            ,
            logout: function () {
                // 退出登录 清除token
                localStorage.clear();
                this.$router.push('/login')

            }
        }
    }
</script>