import Vue from 'vue'
import App from './App.vue'
import Vex from 'vexflow';

Vue.config.productionTip = false;

Vue.use(Vex);

new Vue({
  render: h => h(App),
}).$mount('#app');
