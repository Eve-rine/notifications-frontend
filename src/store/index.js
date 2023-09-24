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
        getNotifications({commit}){
            instance('get','get-notifications-logs')
                .then((res)=>{
                    commit('MUTATE', { state: 'notifications', data: res.data.data })
                })
                .catch(()=>{
                    // console the error
                    Event.$emit('ApiError', 'Error getting orders')

                })
        },
        getNotificationStats({commit}){
            instance('get','get-notifications-stats')
                .then((res)=>{
                    commit('MUTATE', { state: 'notification_stats', data: res.data })
                })
                .catch(()=>{
                    // console the error
                    Event.$emit('ApiError', 'Error getting orders')

                })
        },
        getUsers({commit}){
            instance('get','get-users')
                .then((res)=>{
                    commit('MUTATE', { state: 'users', data: res.data.data })
                })
                .catch(()=>{
                    // console the error
                    Event.$emit('ApiError', 'Error getting orders')

                })
        },
        sendNotification({dispatch}, payload){
            instance('post','send-notification',payload)
                .then(()=>{
                    Event.$emit('ApiSuccess', 'Notification Successfully sent')
                    dispatch('getNotifications')

                })
                .catch(()=>{
                    Event.$emit('ApiError', 'Error sending notification')

                })
        }
    },

})


