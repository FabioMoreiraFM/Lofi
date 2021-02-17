import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue'
import App from './App'

import './config/msgs'
import './config/filters'
import './config/axios'
import './config/bootstrap'
import './config/vuelidate'
import router from './config/router'
import store from './config/store'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
    router,
    store,
    validations: {},
    render: h => h(App)
}).$mount("#app")