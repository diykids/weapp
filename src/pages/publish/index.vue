<template>
  <div class="pub">
    <div v-if="isLogin">
      <textarea placeholder="点点滴滴……" class="pub-input" v-model="content" auto-focus="true"></textarea>
      <div class="pub-imgs">
        <div class="pub-img" v-for="(v,k) in photos" :key="k">
          <image :src="v" mode="aspectFill" @click="preview(v)"></image>
          <div class="pub-img-del" @click="delPhoto(k)"><i class="iconfont icon-times"></i></div>
        </div>
        <div v-if="isShow" class="pub-plus" hover-class="pub-plus-hover" @click="choose"><span>+</span></div>
      </div>
      <div class="pub-submit">
        <button class="pub-btn-clean" type="default" :loading="loading"
                :disabled="disabled" bindtap="default" hover-class="hover" @click="clean"> 清空 </button>
        <button class="pub-btn-ok" type="default" :loading="loading"
                :disabled="disabled" bindtap="default" hover-class="hover" @click="publish"> 发布 </button>
      </div>
    </div>
    <div v-if="!isLogin" class="pub-login">
      <image src="../../static/images/logo.png" class="pub-logo"></image>
      <login text="登录"></login>
    </div>
  </div>
</template>

<script>
  import {dialog,sync,toTab} from "../../utils"
  import {uploadApi,momentPostApi} from "../../api"

  import {mapState,mapMutations,mapGetters} from "vuex"
  import login from "@/components/login"

  export default {
  data () {
    return {
      content:"",
      photos: [],
      loading:false,
    }
  },
  components: {
    login
  },
  computed:{
    ...mapState(['userInfo']),
    ...mapGetters(["isLogin"]),
    isShow() {
      return this.photos.length !== 9
    },
    disabled(){
      return !this.content.length
    }
  },
  methods:{
    ...mapMutations(['setUserInfo','setNeedReloadList']),
    choose(){
      let self = this
      let count = 9 - self.photos.length
      wx.chooseImage({
        count: count,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          self.photos.push(...res.tempFilePaths)
        }
      })
    },
    preview(src){
      let self = this
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: self.photos
      })
    },
    delPhoto(k){
      this.photos.splice(k,1)
    },
    cleanContent() {
      this.content = ""
      this.photos = []
    },
    clean () {
      let self = this
      if(self.content !== "" || self.photos.length > 0) {
        dialog.confirm("是否清空此次日记？",function (ok) {
          if(ok){
            self.cleanContent()
          }
        })
      }
    },
    publish(){
      let self = this

      if(self.content === ""){
        return
      }

      sync(function* () {
        let res = yield momentPostApi({content:self.content})

        if(self.photos.length > 0) {
          let up = []
          self.photos.forEach(function (v) {
            up.push(uploadApi(v,{moment_id:res.id}))
          })

          let ret = yield up
        }
        self.cleanContent()
        self.setNeedReloadList(true)
        toTab("/pages/index/main")
      })
    }
  }
}
</script>

<style>
.pub {
  position: relative;
}
.pub-input{
  height: 150rpx;
  padding: 50rpx;
  font-size: 32rpx;
  width: auto;
  word-wrap: break-word;
  word-break:break-all;
}

.pub-submit{
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.pub-submit button{
  width:100%;
  border-radius:0;
}

.pub-submit button::after{
  border: none;
}

.pub-submit .pub-btn-clean{
  background:#97D2E8;
  color:#fff;
}

.pub-submit .pub-btn-ok{
  background: #00B4EE;
  color: #fff;
}

.pub-submit button.pub-btn-clean[disabled][type=default] {
  color:rgba(0, 0, 0, 0.3);
  background-color:#97D2E8;
}

.pub-submit button.pub-btn-ok[disabled][type=default] {
  color:rgba(0, 0, 0, 0.3);
  background-color:#00B4EE;
}

.pub-submit .pub-btn-clean.hover {
  background: rgba(151,210,232,0.7);
}

.pub-submit .pub-btn-ok.hover {
  background: rgba(0,180,238,0.7);
}

.pub-imgs {
  padding: 50rpx;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.pub-imgs .pub-img image {
  width: 100%;
  height: 100%;
  border-radius: 10rpx;
}

.pub-imgs .pub-img,.pub-imgs .pub-plus {
  border: 1px solid #dcdee2;
  width: 160rpx;
  height: 160rpx;
  display: inline-block;
  padding: 2rpx;
  border-radius: 10rpx;
}

.pub-imgs .pub-img, .pub-imgs .pub-plus {
  margin-right:20rpx;
  margin-bottom:20rpx;
}

.pub-imgs .pub-plus {
  width: 156rpx;
  height: 156rpx;
  border: 2px dashed #dcdee2;
  text-align: center;
  color: #dcdee2;
}

.pub-imgs .pub-plus-hover {
  border: 2px dashed #aecce2;
  color: #aecce2;
}

.pub-imgs .pub-plus span {
  font-size: 54rpx;
  line-height: 150rpx;
  font-weight: bold;
}

.pub-img {
  position: relative;
}

.pub-img .pub-img-del {
  position:absolute;
  right:0;
  top:0;
  border-top-right-radius:10rpx;
  border-bottom-left-radius:10rpx;
  width:36rpx;
  height:36rpx;
  background:rgba(0,0,0,0.5);
  color:#fff;
  font-size:24rpx;
  text-align:center;
  line-height:30rpx;
  font-weight: bold;
}

.pub-login{
  text-align: center;
  padding: 40rpx;
}

.pub-logo{
  width: 200rpx;
  height:200rpx;
  border-radius: 100rpx;
  margin: 100rpx 0;
}
</style>
