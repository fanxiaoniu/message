import Vue from 'vue'
import Vuex from 'vuex'
import toast from '../store/toast'
import answer from '../store/answer'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        toast,
        answer
    }
})

export default store