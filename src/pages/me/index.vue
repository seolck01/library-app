<template>
  <div class="container">
    <button open-type="getUserInfo" @getuserinfo="bindgetuserinfo" lang="zh_CN">登录</button>
    <div class="user-info">
      <img :src="userInfo.avatarUrl" alt="">
    </div>
  </div>

</template>

<script>
import config from '@/utils/config'
import qcloud from 'wafer2-client-sdk'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  components: {
  },
  mounted () {
  },
  methods: {
    getUserInfo (e) {
      console.log('111', e.mp.detail.userInfo)
    },
    // getSetting () {
    //   wx.getSetting({
    //     success: function (res) {
    //       if (res.authSetting['scope.userInfo']) {
    //         wx.getUserInfo({
    //           success: function (res) {
    //             this.doLogin(res)
    //             // 用户已经授权过
    //             console.log('用户已经授权过')
    //             console.log(res.userInfo)
    //           }
    //         })
    //       } else {
    //         console.log('用户还未授权过')
    //       }
    //     }
    //   })
    // },
    bindgetuserinfo: function () {
      qcloud.setLoginUrl(config.loginUrl)
      const session = qcloud.Session.get()
      if (session) {
        // 第二次登录 或者本地已经有登录态 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            console.log(res)
            this.userInfo.avatarUrl = res.avatarUrl
            this.userInfo.nickName = res.nickName
            this.logged = true
            console.log(this.userInfo)
            // this.setData({ userInfo: res, logged: true })
            // wx.showSuccess('登录成功')
          },
          fail: err => {
            console.error(err)
            // wx.showModel('登录错误', err.message)
          }
        })
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
            this.userInfo.avatarUrl = res.avatarUrl
            this.userInfo.nickName = res.nickName
            this.logged = true
            console.log(this.userInfo)
            // this.setData({ userInfo: res, logged: true })
            wx.showSuccess('登录成功')
          },
          fail: err => {
            console.error(err)
            wx.showModel('登录错误', err.message)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
