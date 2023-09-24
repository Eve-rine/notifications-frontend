import Vue from 'vue'
import Vuex from 'vuex'
import instance from "@/service";
import router from '../router'
Vue.use(Vuex)
export default new Vuex.Store({
    namespaced: true,
    state: {
        user: null,
        token: null,
        notifications: [],

    },
    getters: {
        notifications: state => state.notifications,

    },
    mutations: {
        MUTATE: (state, payload) => {
            state[payload.state] = payload.data
        }
    },
    actions: {
        login({commit}, payload) {
            console.log(commit)
            instance('post', `auth/login`, payload)
                .then(res => {
                    localStorage.setItem('Fikisha_user', JSON.stringify(res.data.data))
                    localStorage.setItem('Fikisha_token', res.data.token)
                    Event.$emit('ApiSuccess', 'Logging In...')
                    window.location.replace('/dashboard')
                })
                .catch(() => {
                    Event.$emit('ApiError', 'Incorrect credentials')
                })
        },
        logout() {
            instance('post', `logout`)
                .then(() => {
                    localStorage.clear();
                    router.push('/login')
                })
                .catch(() => {
                    Event.$emit('ApiError', 'Unable to log out')
                })
        },
    },
    modules: {
        notification: {}
    }
})


