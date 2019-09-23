<template>
  <div class="counter-warp">
    <user-comment-list v-for="item in userComment"
                       :key="item.id"
                       :content="item" />
  </div>

</template>

<script>

import UserCommentList from '@/components/user-comment-list'
import { post } from '@/utils/request'
export default {
  data () {
    return {
      // 用户信息
      userInfo: {},
      userComment: []
    }
  },

  components: {
    UserCommentList
  },
  onShow () {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userInfo = userInfo
      this.getUserComment()
    }
  },
  methods: {
    async getUserComment () {
      const userComment = await post('/usercomment', {
        openid: this.userInfo.openId
      })
      if (userComment) {
        this.userComment = userComment
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
