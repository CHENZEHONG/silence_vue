<style>
    .wrap {
        display: flex;
        flex-direction: column;
        padding: 17px 30px;
        background: #212732;
    }

    .wrap-title {
        font-size: 2.25rem;
    }

    .wrap-content {
        margin-top: 15px;
        overflow: hidden;
    }

    .wrap-content-item {
        word-wrap: break-word;
    }

    .wrap-content-item + .wrap-content-item {
        margin-top: 13px;
    }
</style>
<template>
    <div class="wrap">
        <div class="wrap-title">TODO LIST</div>
        <div class="wrap-content">
            <div v-for="(item,index) in list" :key="item.id" class="wrap-content-item">{{index+1}}.{{item.task}}</div>
        </div>
        <!--        <div>-->
        <!--            <input placeholder="hello world"/>-->
        <!--        </div>-->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [
                    {id: 1, task: 'wake up'},
                    {id: 2, task: 'learn VUE '},
                    {id: 3, task: 'Deep Sleep'},
                ]
            }
        }
    }
</script>