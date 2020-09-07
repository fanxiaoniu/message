const toast = {
    namespaced: true,
    state: {
        toastText: '',
        interId: null
    },
    mutations: {
        showToast(state, payload) {
            state.toastText = payload.text
            if (this.interId !== null) {
                clearTimeout(this.interId)
            }
            this.interId = setTimeout(() => {
                this.commit('toast/removeToast')
                if (payload.afterFn && typeof payload.afterFn === "function") {
                    payload.afterFn()
                }
            }, payload.time || 1000)
        },
        removeToast(state) {
            state.toastText = ''
        }
    },
    actions: {
        showToast({ commit }, payload) {
            commit('showToast', payload)
        }

    }
}
export default toast