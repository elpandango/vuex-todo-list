import Vue from 'vue';
// import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import {store} from './store';
import axios from 'axios';

axios.defaults.baseURL = 'https://vuex-todo-b6d91.firebaseio.com';

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  store: store,
  render: h => h(App)
});

