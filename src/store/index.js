import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const actions = {
    getUserInfo(context, value) {

    }
}
const mutations = {
    UPDATE_USER_INFO(state, value) {

    }
}
const state = {
    user: JSON.parse(localStorage.getItem('user'))

}
export default new Vuex.Store({
    actions,
    mutations,
    state
})