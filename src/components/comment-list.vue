<template>
  <div class="comment-list">
    <div class="user">
      <img :src="content.user_info.avatarUrl">
      <div class="name">{{ content.user_info.nickName }}</div>
    </div>
    <div class="text">{{content.comment}}</div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => { }
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-list {
  background-color: #cccc;
  margin-bottom: 6px;
  border-radius: 10px;
  padding: 4px;
  .user {
    display: flex;
    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    .name {
      font-size: 12px;
      text-align: center;
      margin-left: 8px;
    }
  }
  .text {
    font-size: 14px;
    margin-top: 6px;
    text-indent: 2em;
  }
}
</style>