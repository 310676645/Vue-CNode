<template>
  <div>
    <mt-header title="Node.js专业中文社区"></mt-header>
    <mt-navbar v-model="active" class="navbar">
      <mt-tab-item
        @click.native="tabSwitch('')"
        id="all">
        全部
      </mt-tab-item>
      <mt-tab-item
        @click.native="tabSwitch('good')"
        id="good">
        精华
      </mt-tab-item>
      <mt-tab-item
        @click.native="tabSwitch('share')"
        id="share">
        分享
      </mt-tab-item>
      <mt-tab-item
        @click.native="tabSwitch('ask')"
        id="ask">
        问答
      </mt-tab-item>
      <mt-tab-item
        @click.native="tabSwitch('job')"
        id="job">
        招聘
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container
      v-model="active"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <mt-tab-container-item id="all">
        <mt-cell
          class="cell"
          v-for="item in list.all"
          :to="'/topic/' + item.id"
          is-link>
            <span slot="title">
              <tab :type="item.tab"></tab>
              {{ item.title }}
            </span>
            <img slot="icon" v-lazy="item.author.avatar_url" width="24" height="24">
        </mt-cell>
        <div class="text-center hidden" v-show="list.all.length <= 0">
          暂无数据
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="good">
        <mt-cell
          class="cell"
          :to="'/topic/' + item.id"
          v-for="item in list.good"
          is-link>
            <span slot="title">
              <tab :type="item.tab"></tab>
              {{ item.title }}
            </span>
          <img slot="icon" v-lazy="item.author.avatar_url" width="24" height="24">
        </mt-cell>
        <div class="text-center hidden" v-show="list.good.length <= 0">
          暂无数据
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="share">
        <mt-cell
          class="cell"
          :to="'/topic/' + item.id"
          v-for="item in list.share"
          is-link>
            <span slot="title">
              <tab :type="item.tab"></tab>
              {{ item.title }}
            </span>
          <img slot="icon" v-lazy="item.author.avatar_url" width="24" height="24">
        </mt-cell>
        <div class="text-center hidden" v-show="list.share.length <= 0">
          暂无数据
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="ask">
        <mt-cell
          class="cell"
          :to="'/topic/' + item.id"
          v-for="item in list.ask"
          is-link>
            <span slot="title">
              {{ item.title }}
              <tab :type="item.tab"></tab>
            </span>
          <img slot="icon" v-lazy="item.author.avatar_url" width="24" height="24">
        </mt-cell>
        <div class="text-center hidden" v-show="list.ask.length <= 0">
          暂无数据
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="job">
        <mt-cell
          class="cell"
          :to="'/topic/' + item.id"
          v-for="item in list.job"
          is-link>
            <span slot="title">
              <tab :type="item.tab"></tab>
              {{ item.title }}
            </span>
          <img slot="icon" v-lazy="item.author.avatar_url" width="24" height="24">
        </mt-cell>
        <div class="text-center hidden" v-show="list.job.length <= 0">
          暂无数据
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div v-if="loading" class="list-loading">
      <mt-spinner type="snake" color="#26a2ff"></mt-spinner>
    </div>
  </div>
</template>
<style>
  .navbar{
    margin-bottom: 15px;
  }
</style>
<script>
  import Tab from './../components/Tab.vue';
  import {Toast} from 'mint-ui';
  import Vue from 'vue';
  export default{
    data(){
      return {
        active: 'all',
        page: 1,
        isLoad: false,
        loading: false,
        list: {
          all: [],
          good: [],
          share:[],
          ask: [],
          job: []
        }
      }
    },
    methods: {
      loadMore() {
        this.getTopics();
      },
      tabSwitch(tab) {
        this.page = 1;
        this.list[tab] = [];
        this.getTopics(tab);
      },
      getTopics(tab = this.active) {
        this.$http.get('topics',{
          params: {
            tab: tab,
            page: this.page++
          }
        }).then((res) => {
          let body = res.body;
          if(body.success) {
            let data = res.body.data;
            if(data.length <= 0 ){
              this.isLoad = true;
            }
            this.list[tab] = this.list[tab].concat(data);
          } else {
            Toast('列表获取失败');
          }
        })
      }
    },
    components: {
      Tab
    },
    created() {
      console.log(Vue.http.interceptors);
      Vue.http.interceptors.pop();
      Vue.http.interceptors.push((request, next) => {
        this.loading = true;
        next(() => {
          this.loading = false;
        });
      });
      this.getTopics('all');
    }
  }
</script>
