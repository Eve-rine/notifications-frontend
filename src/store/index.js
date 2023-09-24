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
        notification_stats:[],
        users: [],

    },
    getters: {
        notifications: state => state.notifications,
        notification_stats: state => state.notification_stats,
        users: state => state.users,
        user: state => state.user,

    },
    mutations: {
        MUTATE: (state, payload) => {
            state[payload.state] = payload.data
        }
    },
    actions: {
        login({commit}, payload) {
            instance('post', `auth/login`, payload)
                .then(res => {
                    localStorage.setItem('user', JSON.stringify(res.data.data))
                    commit('MUTATE', { state: 'user', data: res.data.data })
                    localStorage.setItem('token', res.data.token)
                    commit('MUTATE', { state: 'token', data: res.data.token })
                    Event.$emit('ApiSuccess', 'Logging In...')
                    router.push('/dashboard')
                })
                .catch(() => {
                    Event.$emit('ApiError', 'Incorrect credentials')
                })
        },
        register({commit}, payload) {
            instance('post', `auth/register`, payload)
                .then(res => {
                    Event.$emit('ApiSuccess', 'Registration Successful')
                    // login the user if registration is successful
                    instance('post', `auth/login`, payload)
                        .then(res => {
                            // set the user and token in the store
                            localStorage.setItem('user', JSON.stringify(res.data.data))
                            localStorage.setItem('token', res.data.token)
                            commit('MUTATE', { state: 'user', data: res.data.data })
                            router.push('/dashboard')
                        })
                        .catch(() => {
                            Event.$emit('ApiError', 'Incorrect credentials')
                        })

                })
                .catch((err) => {
                    Event.$emit('ApiError',err.response.data.message )
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
        getNotifications({commit}){
            instance('get','get-notifications-logs')
                .then((res)=>{
                    commit('MUTATE', { state: 'notifications', data: res.data.data })
                })
                .catch(()=>{
                    // console the error
                    Event.$emit('ApiError', 'Error getting notifications')

                })
        },
        getNotificationStats({commit}){
            instance('get','get-notifications-stats')
                .then((res)=>{
                    commit('MUTATE', { state: 'notification_stats', data: res.data })
                })
                .catch(()=>{
                    // console the error
                    Event.$emit('ApiError', 'Error getting stats')

                })
        },
        getUsers({commit}){
            instance('get','get-users')
                .then((res)=>{
                    commit('MUTATE', { state: 'users', data: res.data.data })
                })
                .catch(()=>{
                    // console the error
                    // Event.$emit('ApiError', 'Error getting users')

                })
        },
        sendNotification({dispatch}, payload){
            instance('post','send-notification',payload)
                .then(()=>{
                    Event.$emit('ApiSuccess', 'Notification Successfully sent')
                    dispatch('getNotifications')
                    router.push('/dashboard')

                })
                .catch(()=>{
                    Event.$emit('ApiError', 'Error sending notification')

                })
        }
    },

})


