<template>
  <div>
    <button open-type="getUserInfo" @getUserInfo="getUserInfo" lang="zh_CN">获取用户信息</button>
    <button @click="showUserInfo">查看用户信息</button>
  </div>

</template>

<script>
import qcloud from 'wafer2-client-sdk'
export default {
  data () {
    return {
    }
  },
  components: {
  },
  created () {
    this.login()
  },
  methods: {
    showUserInfo () {
      let res = wx.getStorageInfoSync()
      console.log(res.keys)
    },
    getUserInfo (e) {
      console.log('111', e.mp.detail.userInfo)
    },
    login () {
      const session = qcloud.Session.get()
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            console.log(res)
            wx.setStorageSync('userInfo', `${res.nickName}`)
            wx.showModal({
              title: '登陆成功',
              content: `用户${res.nickName}`,
              showCancel: false
            })
          },
          fail: err => {
            console.error(err)
            wx.showModal({
              title: '登陆错误',
              content: `${err}`,
              showCancel: false
            })
          }
        })
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
            wx.setStorageSync('userInfo', res)
            console.log(res)
            wx.showModal({
              title: '登陆成功',
              content: `${res}`,
              showCancel: false
            })
          },
          fail: err => {
            console.error(err)
            wx.showModal({
              title: '登陆错误',
              content: `${err}`,
              showCancel: false
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
