<template>
  <div class="user-center">
    <button v-if="getUserInfoVisible"
            open-type="getUserInfo"
            @getuserinfo="bindGetUserInfo"
            @click="getUserInfo1">获取用户权限</button>
    <div class="user-info">
      <img :src="userInfo.avatarUrl"
           alt="">
      <p>{{ userInfo.nickName }}</p>
    </div>
    <year-progress />
    <button class="btn"
            @click="scanBook">添加图书</button>
  </div>

</template>

<script>
import YearProgress from '@/components/year-progress'
import config from '@/utils/config'
import qcloud from 'wafer2-client-sdk'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      getUserInfoVisible: true,
      userInfo: {}
    }
  },
  created () {
    this.getSetting()
  },
  methods: {
    getSetting () {
      const that = this
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                // console.log(res.userInfo)
                that.userInfo = null
                that.getUserInfoVisible = false
                that.userInfo = res.userInfo
                // 用户已经授权过
                console.log('用户已经授权过')
              }
            })
          } else {
            console.log('用户还未授权过')
          }
        }
      })
    },
    scanBook () {
      console.log('添加的了图书')
      wx.scanCode({
        success (res) {
          console.log(res)
        }
      })
    },
    getUserInfo1 () {
      console.log('click事件首先触发')
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (wx.canIUse('button.open-type.getUserInfo')) {
        // 用户版本可用
      } else {
        console.log('请升级微信版本')
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
        console.log('用户按了允许授权按钮')
        qcloud.login({
          // 获取code
          success (res) {
            if (res) {
              // wx.setStorageSync('userInfo', res)
              that.getUserInfoVisible = null
              that.getUserInfoVisible = false
              that.userInfo = null
              that.userInfo = res
              console.log(res)
              // 这里可以把code传给后台，后台用此获取openid及session_key
            }
          },
          fail: function (err) {
            console.log('登录失败', err)
          }
        })
      } else {
        // 用户按了拒绝按钮
        console.log('用户按了拒绝按钮')
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
