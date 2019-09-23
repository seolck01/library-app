<template>
  <div class="counter-warp">
    <!-- <comment-list></comment-list> -->
  </div>

</template>

<script>

import CommentList from '@/components/comment-list'
import { post } from '@/utils/request'
export default {
  data () {
    return {
      // 用户信息
      userInfo: {}
    }
  },

  components: {
    CommentList
  },
  mounted () {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userInfo = userInfo
      this.getUserComment()
    }
  },
  methods: {
    getUserComment () {
      post('/usercomment', {
        openid: this.userInfo.openId
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
