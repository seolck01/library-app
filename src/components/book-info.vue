<template>
  <div class="book-info">
    <div class="tumb">
      <img class="back"
           :src="info.pic"
           mode="aspectFill"
           alt="">
      <div class="content">
        <img :src="info.pic"
             mode="aspectFit"
             class="img"
             alt="">
        <span>
          《{{info.title}}》
        </span>
      </div>
    </div>
    <div class="book-text">
      <div>作者：{{info.author}}</div>
      <div>市场价格：{{info.price}}</div>
      <div class="keyword">
        <span v-for="(key, index) in infoKeyword"
              :key="index">{{key}}</span>
      </div>
      <div>
        出版地：{{ info.pubplace}}
      </div>
      <div>
        出版社： {{info.publisher}}
      </div>
      <div>
        书本简介： {{info.summary}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    infoKeyword () {
      if (this.info.keyword) {
        return this.info.keyword.split('－')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.book-info {
  .tumb {
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
    .back {
      width: 100%;
      filter: blur(20px);
    }
    .content {
      position: absolute;
      left: 10rpx;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      .img {
        height: 300rpx;
        width: 300rpx;
      }
      span {
        margin-left: 10px;
        line-height: 300rpx;
      }
    }
  }
  .book-text {
    padding: 10px;
    font-size: 12px;
    > div {
      margin-bottom: 10px;
    }
    .keyword {
      > span {
        display: inline-block;
        border: 1px solid #fa5a49;
        padding: 2px 4px;
        border-radius: 8px;
        &:nth-child(n + 2) {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
