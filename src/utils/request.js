import config from './config.js'

export function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      method,
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

export function post (url, data) {
  return request(url, 'POST', data)
}
export function get (url, data) {
  return request(url, 'GET', data)
}
