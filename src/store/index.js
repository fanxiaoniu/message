import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentItem: {},
        showAnswerFlag: false,
        toast: ''
    },
    mutations: {
        setCurrentItem(state, item) {
            state.currentItem = item
        },
        showAnswerBottom(state) {
            state.showAnswerFlag = true
        },
        hideAnswerBottom(state) {
            state.showAnswerFlag = false
        },
        showToast(state, text) {
            state.toast = text
        },
        removeToast(state) {
            state.toast = ''
        }
    }
})

export default store