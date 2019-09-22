<template>
  <div class="book">
    <swiper indicator-dots="true"
            indicator-color="#fa5a4988"
            indicator-active-color="#fa5a49"
            autoplay="true">
      <div class="slide-block"
           v-for="top in tops"
           :key="top.id">
        <swiper-item>
          <image :src="top.pic"
                 @click="toDetail(top.id)"
                 mode="aspectFit"
                 class="slide-image" />
        </swiper-item>
      </div>
    </swiper>
    <book-bar v-for="item in booklist.data"
              :key="item.id"
              :content="item" />
    <div class="none"
         v-if="noneVisible">没有更多了</div>
  </div>

</template>

<script>
import BookBar from '@/components/book-bar.vue'
import { get } from '@/utils/request'
export default {
  data () {
    return {
      // 用户信息
      userInfo: {},
      // 图书列表
      booklist: {},
      // 当前页码
      page: 1,
      // 没有更多显示隐藏
      noneVisible: false,
      // 获取当前轮播图
      tops: []
    }
  },
  components: {
    BookBar
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.getList()
  },
  // 上拉滚动
  onReachBottom () {
    this.getMoreList()
  },
  async onShow () {
    this.userInfo = wx.getStorageSync('userInfo')
    if (this.userInfo.openId) {
      this.getList()
    }
    this.getBanner()
  },
  methods: {
    // 首页轮播图去详情页
    async toDetail (id) {
      wx.navigateTo({
        url: `/pages/detail/main?id=${id}`
      })
    },
    async getBanner () {
      const tops = await get('/top')
      this.tops = tops.list
    },
    // 获取列表
    async getList (openid) {
      wx.showNavigationBarLoading()
      const res = await get('/booklist', {
        openid: this.userInfo.openId,
        page: this.page
      })
      if (this.page !== 1) {
        let list = this.booklist.data
        res.data = list.concat(res.data)
      }
      this.booklist = res
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    },
    // 向下滚动获取更多
    getMoreList () {
      if (this.booklist.maxPage === this.booklist.currentPage) {
        this.noneVisible = true
      } else {
        this.page++
        this.getList()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.book {
  .slide-block {
    .slide-image {
      display: inline-block;
      margin-top: 10rpx;
      width: 100%;
      height: 250rpx;
    }
  }
  .none {
    text-align: center;
    font-size: 12px;
    color: #fa5a49;
  }
}
</style>
