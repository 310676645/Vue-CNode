<template>
  <div>
    <mt-header :title="topicData.title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="topic">
      <div class="topic__header">
        <h4>{{ topicData.title }}p</h4>
        <p class="topic__info">发布时间:{{ topicData.create_at | createDate }}</p>
        <p class="topic__info"><img :src="topicData.author.avatar_url" class="topic__headImg"><span>作者:{{ topicData.author.loginname }}</span></p>
      </div>
      <div class="topic__content" v-html="topicData.content"></div>
    </div>
  </div>
</template>
<style>
  .topic{
    width: 100%;
    overflow: hidden;
  }
  .topic img{
    max-width: 100%;
  }
  .topic code{
    white-space: normal;
  }
  .topic__header, .topic__content{
    background: #fff;
    padding: 10px;
  }
  .topic__header{
    margin-bottom: 10px;
  }
  .topic__headImg{
    border-radius: 50%;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    vertical-align:middle;
  }
  .topic__info{
    color: #666;
    font-size: 12px;
    margin-bottom: 5px;
  }
</style>
<script>
  import {Toast} from 'mint-ui';
  export default{
    data(){
        return {
          topicData: {
            author: {}
          }
        }
    },
    created() {
      let id = this.$route.params.id;
      this.$http.get(`topic/${id}`).then((res) => {
        let body = res.body;
        if(body.success) {
          this.topicData = JSON.parse(JSON.stringify(body.data));
        } else {
          Toast('数据获取失败');
        }
      });
    }
  }
</script>
