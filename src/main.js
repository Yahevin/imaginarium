import './assets/styles/main.scss';
import Vue from "vue";
import Main from "./assets/templates/Main.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(Main)
}).$mount("#app");

console.log('hello');