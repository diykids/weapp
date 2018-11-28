import { get } from './maping'
import Vue from 'vue'

const baseApi = "http://127.0.0.1:8989/api"

export const request = (url, data) => {
  return new Promise((resolve, reject) => {
    let accessToken = ""
    try {
      accessToken = wx.getStorageSync("access_token")
    }catch (e) {

    }

    let header = {
      'Access-Token': accessToken,
    }

    wx.request({
      url: baseApi + url,
      data: data,
      method: 'POST',
      header: header,
      success (res) {
        if (res.data.code === 200) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

export const createApi = (url, data) => {
  return request(url, data)
}
