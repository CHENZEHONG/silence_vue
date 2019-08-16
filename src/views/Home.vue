<style>
    .home {
        height: 100vh;
        width: 84vw;
        background: #48515F;
        color: #FFF;
        overflow: auto;
    }

    .home-title {
        padding: 12px 16px;
    }

    .home-wrap {
        display: grid;
        grid-template-columns: 70% 28%;
        grid-column-gap: 2%;
        grid-row-gap: 20px;
        margin: 0 16px;
    }

    .home-wrap-one {
        grid-column-start: 1;
        grid-column-end: 3;

    }
</style>
<template>
    <div class="home">
        <div class="home-title">Home</div>
        <div class="home-wrap">
            <calendar></calendar>
            <todobox></todobox>
            <onebox class="home-wrap-one"></onebox>
        </div>
    </div>
</template>

<script>
    import calendar from '../components/Calendar.vue'
    import todobox from '../components/TodoBox.vue'
    import onebox from '../components/OneBox.vue'

    export default {
        name: 'home',
        data() {
            return {}
        },
        components: {
            calendar,
            todobox,
            onebox,
        }
    }
</script>
