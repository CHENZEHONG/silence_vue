<style>
    .one {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 50px 0;
        background: #212732;

    }

    .one-img img {
        max-width: 250px;
        max-height: 300px;
        margin-right: 80px;
    }

    .one-msg {
        align-self: flex-start;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 400px;
        height: 100px;
    }
</style>
<template>
    <div class="one animated fadeIn" v-show="img">
        <div class="one-img">
            <img alt="one-img" :src="img"/>
        </div>
        <div class="one-msg">
            <div>
                {{word}}
            </div>
            <div style="align-self: flex-end">
                - from{{word_from}}
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapMutations, mapActions} from 'vuex'

    export default {
        data() {
            return {}
        },
        computed: {
            ...mapState({
                img: state => state.one.img,
                word: state => state.one.word,
                word_from: state => state.one.word_from,
            })
        },
        created() {
            if (this.img === '') {
                this.getOneInfo();
            }
        }
        ,
        methods: {
            ...mapMutations([
                'setOneInfo'
            ]),
            ...mapActions([
                'getOneInfo'
            ])
        }
    }
</script>