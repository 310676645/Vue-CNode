<template>
  <span>
    <mt-badge size="small" type="primary" v-if="type === 'good'">{{ type | formatTab }}</mt-badge>
    <mt-badge size="small" type="success" v-if="type === 'share'">{{ type | formatTab }}</mt-badge>
    <mt-badge size="small" type="error" v-if="type === 'ask'">{{ type | formatTab }}</mt-badge>
    <mt-badge size="small" type="warning" v-if="type === 'job'">{{ type | formatTab }}</mt-badge>
  </span>
</template>
<script>
  export default{
    props: {
      type: {
        type: String,
        required:true,
        default: 'default'
      }
    }
  }
</script>
