const answer = {
    namespaced: true,
    state: {
        currentItem: {},
        showAnswerFlag: false
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
        }
    },
    actions: {
        setCurrentItem({ commit }, item) {
            commit('setCurrentItem', item)
        },
        showAnswerBottom({ commit }) {
            commit('showAnswerBottom')
        },
        hideAnswerBottom({ commit }) {
            commit('hideAnswerBottom')
        },
    }
}
export default answer