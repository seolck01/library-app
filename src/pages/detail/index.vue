<template>
  <div>
    {{id}}
  </div>
</template>

<script>
import { get } from '@/utils/request'
export default {
  data () {
    return {
      id: ''
    }
  },
  mounted () {
    this.id = this.$root.$mp.query.id
    this.getDetail()
  },
  methods: {
    async getDetail () {
      await get('/bookdetail', {
        id: this.id
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>