<template>
  <div class="index">
    <book-bar v-for="item in booklist"
              :key="item.id"
              :content="item" />
  </div>

</template>

<script>
import BookBar from '@/components/book-bar.vue'
import { get } from '@/utils/request'
export default {
  data () {
    return {
      booklist: []
    }
  },
  components: {
    BookBar
  },
  mounted () {
  },
  async onShow () {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      await get('/booklist', {
        openid: userInfo.openId
      }).then((res) => {
        this.booklist = res
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

</style>
