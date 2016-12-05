<template>
  <div>
    <mt-navbar v-model="active" class="navbar">
      <mt-tab-item id="all">全部</mt-tab-item>
      <mt-tab-item id="good">精华</mt-tab-item>
      <mt-tab-item id="share">分享</mt-tab-item>
      <mt-tab-item id="ask">问答</mt-tab-item>
      <mt-tab-item id="job">招聘</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="all">
        <mt-cell
          v-for="item in list.all"
          is-link>
            <span slot="title">
              {{ item.title }}
             <mt-badge size="small" color="#888">{{ item.tab | formatTab }}</mt-badge>
            </span>
            <img slot="icon" v-lazy="item.author.avatar_url" width="24" height="24">
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="good">
        <mt-cell v-for="n in 5" title="tab-container 2"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="share">
        <mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="ask">
        <mt-cell v-for="n in 5" title="tab-container 2"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="job">
        <mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<style scoped>
  .navbar{
    margin-bottom: 15px;
  }
</style>
<script>
    export default{
        data(){
            return {
              active: 'all',
              list:{
                all:[],
                good:[],
                share:[],
                ask:[],
                job:[]
              }
            }
        },
        methods: {
          getTopics(tab) {
            this.$http.get('topics').then((res) => {
              this.list[tab] = res.body.data;
            })
          }
        },
        created() {
          this.getTopics('all');
        }
    }
</script>
