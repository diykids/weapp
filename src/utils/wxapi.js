export const to = (url) => {
  wx.navigateTo({url: url})
}

export const toTab = (url) => {
  wx.switchTab({url: url})
}

const apiWrap = (api, param) => {
  return new Promise((resolve, reject) => {
    param = {
      ...param,
      success: res => resolve(res),
      fail: res => reject(res),
    }
    wx[api](param)
  })
}


export const showModal = param => apiWrap('showModal', param)
export const showToast = param => apiWrap('showToast', param)
export const showLoading = param => apiWrap('showLoading', param)
export const scanCode = param => apiWrap('scanCode', param)
export const login = param => apiWrap('login', param)
export const getSystemInfoSync = param => apiWrap('getSystemInfoSync', param)
export const getUserInfo = param => apiWrap('getUserInfo', param)
export const getSetting = param => apiWrap('getSetting', param)
export const requestPayment = param => apiWrap('requestPayment', param)
export const uploadFile = param => apiWrap('uploadFile', param)
export const request = param => apiWrap('request', param)
