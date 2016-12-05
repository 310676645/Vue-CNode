/**
 * Created by songjd on 16/12/5.
 * 全局过滤器
 */
import Vue from 'vue';
const filters = {
  formatTab(value) {
    switch (value){
      case 'share':
        return '分享';
        break;
      case 'ask':
        return '问答';
        break;
      case 'job':
        return '招聘';
        break;
      case 'good':
        return '分享';
        break;
      default:
        return '精华';
    }
  }
};
Object.keys(filters).forEach(function(item, index) {
  Vue.filter(item, filters[item]);
});
