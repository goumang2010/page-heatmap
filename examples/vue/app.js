import Vue from 'vue';
import Heatmap from './heatmap.vue';
import Heatmap2 from './heatmap2.vue';

/* eslint-disable no-new */
const component = new Vue({...Heatmap2}).$mount();
document.getElementsByTagName('body')[0].appendChild(component.$el);