<template>
  <div class="book-bar">
    <div class="img">
      <img :src="content.pic"
           :alt="content.title"
           mode="aspectFit">
    </div>

    <div class="book-des">
      <div class="name">{{content.title}}</div>
      <div class="author">作者：{{content.author}}</div>
      <div class="summary">{{content.summary}}</div>
      <div><span>价格：{{content.price}}</span><span>浏览：{{content.price}}</span> </div>
      <div>添加人：{{ content.user_info.nickName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object
    }
  }
}
</script>

<style scoped lang="scss">
.book-bar {
  padding: 5px;
  overflow: hidden;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  .img {
    display: inline-block;
    width: 90px;
    height: 90px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .book-des {
    font-size: 14px;
    .name {
      color: #fa5a49;
    }
    .author {
      font-size: 12px;
    }
    .summary {
      width: 240px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>