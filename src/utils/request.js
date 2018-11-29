import Vue from 'vue'
import co from 'co'
import { request,uploadFile } from './wxapi'

const baseApi = 'https://api.fifsky.com/api'


const getAccessToken = function () {
  let accessToken = ''
  try {
    accessToken = wx.getStorageSync('access_token')
  } catch (e) {}

  return accessToken
}

export const createApi = (url, data) => {
  let header = {
    'Access-Token': getAccessToken(),
  }

  return co(function * () {
    let res = yield request({
      url: baseApi + url,
      data: data,
      method: 'POST',
      header: header,
    })

    if (res.data.code === 200) {
      return res.data.data
    } else {
      throw res.data
    }
  })
}


export const createUpload = (file, data) => {
  let header = {
    'Access-Token': getAccessToken(),
    "Content-Type": "multipart/form-data"
  }

  return co(function * () {
    let res = yield uploadFile({
      url: baseApi + "/user/upload",
      data: data,
      filePath:file,
      name:"file",
      formData:data,
      header: header,
    })

    res.data = JSON.parse(res.data)

    if (res.data.code === 200) {
      return res.data.data
    } else {
      throw res.data
    }
  })
}
