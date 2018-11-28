export const dialog = {
  alert(msg,fn = null,title="提示"){
    wx.showModal({
      title: title,
      showCancel: false,
      confirmColor:"#118CE2",
      content: msg,
      success:function (res) {
        if(res.confirm) {
          fn && fn()
        }
      }
    })
  },
  confirm(msg,fn=null,title="提示"){
    wx.showModal({
      title: title,
      confirmColor:"#118CE2",
      content: msg,
      success:function (res) {
        if(res.confirm) {
          fn && fn(true)
        }else if(res.cancel){
          fn && fn(false)
        }
      }
    })
  },
}
