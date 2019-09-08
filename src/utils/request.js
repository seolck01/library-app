const host = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '/'

export default function requeset (url, data) {
  return new Promise((resolve, reject) => {
    wx.requeset({
      data,
      url: host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}
