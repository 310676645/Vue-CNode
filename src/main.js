import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css'
import './assets/css/global.css';
import routes from './routes/index';
import './filters/index';
Vue.use(VueRouter);
Vue.use(MintUi);
Vue.use(VueRouter);
Vue.use(VueResource);

/**
 * 全局请求处理
 */

Vue.http.options.emulateJSON = true;
Vue.http.options.root = ' https://cnodejs.org/api/v1';
Vue.http.interceptors.push((request, next)  => {
  MintUi.Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  });
  next((response) => {
    MintUi.Indicator.close();
  });
});



const router = new VueRouter({
  routes
});
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App }
});
