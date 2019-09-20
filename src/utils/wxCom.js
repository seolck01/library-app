export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false,
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      }
    }
  })
}
