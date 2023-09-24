import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import listener from './mixin/listener/listener'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueRouter from 'vue-router';
window.Event = new Vue();
Vue.config.productionTip = false
Vue.use(Toast)
Vue.use(VueRouter);


new Vue({
    router,
    store,
    vuetify,
    mixins: [listener],
    render: h => h(App)
}).$mount('#app')
