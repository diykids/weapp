import { sync,login,getSetting,getUserInfo } from '../utils'
import { registerApi,authApi } from '../api'

export default {
  loginAction({commit}){
    sync(function * () {
      let res = yield login()
      let ret = yield authApi({code: res.code})

      if(!ret.access_token) {
        throw "登录失败"
      }

      wx.setStorageSync('access_token', ret.access_token)

      if(ret.access_token !== "" ){
        if (ret.user_info === null) {
          let res = yield getSetting()
          if (res.authSetting['scope.userInfo']) {
            let user = yield getUserInfo()
            let ret = yield registerApi(user.userInfo)
            self.setUserInfo(ret)
            commit("setUserInfo",ret)
          }
        }else{
          commit("setUserInfo",ret.user_info)
        }
      }
    })
  }
}
