import Vue from 'vue'
import Vuex from 'vuex'
import one from  './modules/one'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        one
    }
})
