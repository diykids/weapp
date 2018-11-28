import co from 'co'
import { get } from './maping'
import { dialog } from './dialog'

const coProcess = (fn, options = {notLoading: false, errHandle: null}) => {
  if(!options.notLoading) {
    wx.showLoading({
      title: '加载中...',
    })
  }

  co(function* () {
    yield fn()
    wx.hideLoading()
  }).catch(e => {
    wx.hideLoading()
    if (options.errHandle) {
      co(function * () {
        yield options.errHandle(e)
      })
    }else{
      let msg = get(e,"message","")
      if(msg === "") {
        msg = get(e,"msg","")
      }

      if(msg === "") {
        msg = get(e,"errMsg","未知错误")
      }

      dialog.alert(msg)
    }
  })
}

export const sync = (fn,options) => coProcess(fn,options)
