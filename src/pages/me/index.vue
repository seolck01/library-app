<template>
  <div class="container">
    <button open-type="getUserInfo"
            @getuserinfo="bindGetUserInfo"
            @click="getUserInfo1">获取权限</button>
    <div class="user-info">
      <!-- <img :src="userInfo.avatarUrl"
           alt=""> -->
    </div>
  </div>

</template>

<script>
import config from '@/utils/config'
import qcloud from 'wafer2-client-sdk'
export default {
  data () {
    return {
    }
  },
  components: {
  },
  mounted () {
    this.getSetting();
  },
  methods: {
    getSetting () {
      wx.getSetting({
        success: function (res) {
          if (res.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo);
                //用户已经授权过
                console.log("用户已经授权过");
              }
            });
          } else {
            console.log("用户还未授权过");
          }
        }
      });
    },
    getUserInfo1 () {
      console.log("click事件首先触发");
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (wx.canIUse("button.open-type.getUserInfo")) {
        // 用户版本可用
      } else {
        console.log("请升级微信版本");
      }
    },
    bindGetUserInfo (e) {
      // console.log(e.mp.detail.rawData)
      console.log(config.loginUrl);
      qcloud.setLoginUrl(config.loginUrl);
      if (e.mp.detail.rawData) {
        console.log(e);
        //用户按了允许授权按钮
        console.log("用户按了允许授权按钮");
        qcloud.login({
          //获取code
          success (res) {
            if (res.code) {
              console.log(res.code);
              // 这里可以把code传给后台，后台用此获取openid及session_key
            }
          },
          fail: function (err) {
            console.log("登录失败", err);
          }
        });
      } else {
        //用户按了拒绝按钮
        console.log("用户按了拒绝按钮");
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
