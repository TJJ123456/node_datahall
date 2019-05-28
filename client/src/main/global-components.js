import Vue from 'vue';
import ElementUI from 'element-ui';
import headTop from '../components/headTop.vue';
import SvgIcon from '../components/SvgIcon'// svg component

Vue.use(ElementUI);
Vue.component('headTop', headTop);
Vue.component('svg-icon', SvgIcon)