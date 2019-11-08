//Styles
import './assets/styles/main.scss';

//Libraries
import Vue from "vue";
import $ from "jquery";

//Templates
import Main from "./assets/templates/Main.vue";

//Start Vue
Vue.config.productionTip = false;

new Vue({
  render: h => h(Main)
}).$mount("#app");

console.log('hello');