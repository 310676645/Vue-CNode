/**
 * Created by songjd on 16/12/5.
 * 路由配置文件
 */

import Topics from './../views/Topics.vue';
import Topic from './../views/Topic.vue';
export default [
  {
    path: '/',
    component: Topics
  },
  {
    path: '/topic/:id',
    component: Topic
  }
];
