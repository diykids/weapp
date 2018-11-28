<template>
  <button class="btn-login" open-type="getUserInfo" @getuserinfo="login">{{text}}</button>
</template>

<script>
  import { registerApi,authApi } from '../api'
  import { sync,dialog,login,getSetting,getUserInfo } from '../utils'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'login',
    props: ['text'],
    computed: {
     ...mapState(["userInfo","accessToken"])
    },
    methods: {
      ...mapMutations(['setUserInfo']),
      login () {
        let self = this
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
              }
            }else{
              self.setUserInfo(ret.user_info)
            }
          }
        })
      },
    },

  }
</script>

<style scoped>
</style>
