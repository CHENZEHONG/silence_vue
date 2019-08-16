import axios from 'axios';

const state = {
    img: '',
    word: '',
    word_from: ''
}
const mutations = {
    setOneInfo(state, info) {
        state.img = info.img_url;
        state.word = info.word;
        state.word_from = info.word_from;
    }
}
const actions = {
    getOneInfo({commit}) {
        return axios.post('/one', {
            "TransCode": "030111", "OpenId": "123456789", "Body": ""
        }).then(res => {
            commit('setOneInfo', res.data.Body)
        })
    }

}

export default {
    state,
    mutations,
    actions
}