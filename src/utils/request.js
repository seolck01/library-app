import config from './config.js'

export default function requeset (url, mehtods, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      mehtods,
      data,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data.data)
        }
      }
    })
  })
}
