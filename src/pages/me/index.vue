<template>
  <div class="user-center">
    <div class="user-info">
      <img :src="userInfo.avatarUrl"
           alt="">
      <p>{{ userInfo.nickName }}</p>
    </div>
    <year-progress />
    <button v-if="getUserInfoVisible"
            open-type="getUserInfo"
            class="btn"
            @getuserinfo="bindGetUserInfo"
            @click="getUserInfo1">登陆</button>
    <button class="btn"
            @click="scanBook">添加图书</button>
  </div>
</template>

<script>
import YearProgress from '@/components/year-progress'
import config from '@/utils/config'
import { post } from '@/utils/request'
import { showModal } from '@/utils/wxCom'
import qcloud from 'wafer2-client-sdk'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      getUserInfoVisible: true,
      userInfo: {
        avatarUrl: require('_img/unlogin.png')
      }
    }
  },
  mounted () {
    this.getSetting()
  },
  methods: {
    getSetting (state) {
      const that = this
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            if (state === 1) {
              that.userInfo = null
              that.userInfo = wx.getStorageSync('userInfo')
              that.getUserInfoVisible = false
              // console.log('用户已经授权过')
            }
          } else {
            return false
          }
        }
      })
    },
    async addBook (isbn) {
      post('/addbook', {
        isbn,
        openid: this.userInfo.openId
      }).then(res => {
        showModal('添加成功', `${res.title}`)
      }).catch(err => {
        showModal('添加失败', `${err.msg}`)
      })

      // if (res.code === 0 && res.data.title) {
      //   showSuccess('添加成功', `${res.data.titl}e`)
      // }
    },
    // 扫描图书
    scanBook () {
      if (!this.userInfo.openId) {
        showModal('错误', `请登陆`)
        return
      }
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    },
    getUserInfo1 () {
      // console.log('click事件首先触发')
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (!wx.canIUse('button.open-type.getUserInfo')) {
        // 用户版本不可用
        showModal('添加失败', `请升级微信版本`)
      }
    },
    bindGetUserInfo (e) {
      const that = this
      // console.log(e.mp.detail.rawData)
      // console.log(config.loginUrl);
      qcloud.setLoginUrl(config.loginUrl)
      if (e.mp.detail.rawData) {
        // console.log(e);
        // 用户按了允许授权按钮
        // console.log('用户按了允许授权按钮')
        qcloud.login({
          // 获取code
          success (res) {
            if (res) {
              wx.setStorageSync('userInfo', res)
              that.getUserInfoVisible = null
              that.getUserInfoVisible = false
              that.userInfo = null
              that.userInfo = res
              // 这里可以把code传给后台，后台用此获取openid及session_key
            }
          },
          fail: function (err) {
            showModal('登录失败', '登陆失败，请检查网络或稍后再试')
            console.log('登录失败', err)
          }
        })
      } else {
        // 用户按了拒绝按钮
        // console.log('用户按了拒绝按钮')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.user-center {
  padding: 0 30rpx;
  .user-info {
    margin-top: 100rpx;
    text-align: center;
    img {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      margin: 20rpx;
    }
  }
}
</style>
