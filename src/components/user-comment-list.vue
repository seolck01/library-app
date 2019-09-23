<template>
  <div @click="toDetail(content.id)"
       class="user-comment-list">
    <div>
      <img mode="aspectFit"
           :src="content.pic">
    </div>
    <div class="text">
      <span>{{content.comment}}</span>
      <img :src="content.user_info.avatarUrl">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  methods: {
    async toDetail (id) {
      wx.navigateTo({
        url: `/pages/detail/main?id=${id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-comment-list {
  padding: 4px;
  background-color: rgb(235, 235, 235);
  border-bottom: 1px solid #beb3b3;
  display: flex;
  img {
    height: 180rpx;
    width: 180rpx;
  }
  .text {
    font-size: 14px;
    padding: 8px;
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
}
</style>