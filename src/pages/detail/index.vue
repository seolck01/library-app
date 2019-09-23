<template>
  <div class="book-detail">
    <book-info :info="info"></book-info>
    <comment-list v-for="item in commentList"
                  :key="item.id"
                  :content="item">
    </comment-list>
    <div class="comment">
      <textarea v-model="comment"
                placeholder="输入您对本书的书评"
                maxlength="100"></textarea>
    </div>
    <div class="add-comment"
         @click="addComment">
      <button class="btn">发表书评</button>
    </div>
  </div>
</template>

<script>
import BookInfo from '@/components/book-info'
import CommentList from '@/components/comment-list'
import { showModal } from '@/utils/wxCom'
import { get, post } from '@/utils/request'
export default {
  components: {
    BookInfo,
    CommentList
  },
  data () {
    return {
      // 书本id
      id: '',
      // 书本详情
      info: {},
      // 评论页面
      comment: '',
      // 用户信息
      userInfo: {},
      commentList: []
    }
  },
  mounted () {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userInfo = userInfo
    }
    this.id = this.$root.$mp.query.id
    this.getDetail()
    this.getComment()
  },
  methods: {
    async getComment () {
      const commentList = await get('/commentlist', {
        bookid: this.id
      })
      console.log(commentList)
      if (commentList) {
        this.commentList = commentList
      }
    },
    // 添加评论
    async addComment () {
      if (!this.comment) {
        return
      }
      if (!this.userInfo.openId) {
        showModal('失败', '请登陆')
      }
      const data = {
        bookid: this.id,
        openid: this.userInfo.openId,
        comment: this.comment
      }
      try {
        await post('/addcomment', data)
        this.comment = ''
        showModal('成功', '发表书评成功')
        this.getComment()
      } catch (e) {
        showModal('失败', e.msg)
      }
    },
    async getDetail () {
      const detail = await get('/bookdetail', {
        id: this.id
      })
      this.info = detail
      wx.setNavigationBarTitle({
        title: detail.title
      })
    }
  }
}
</script>

<style scoped lang="scss">
.book-detail {
  padding: 10rpx;
  .comment {
    margin-top: 10px;
    border-radius: 10px;
    padding: 10px;
    background-color: #eee;
    textarea {
      width: 100%;
      height: 200rpx;
      font-size: 14px;
    }
  }
  .add-comment {
    width: 100%;
    text-align: right;
    margin-top: 10px;
    button {
      font-size: 14px;
      margin-right: 0;
      width: 300rpx;
    }
  }
}
</style>