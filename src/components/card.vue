<template>
  <div class="i-card">
    <div class="i-card-header">
      <div class="i-card-header-content">
        <img class="i-card-header-thumb" :src="item.user.avatar"/>
        {{ item.user.nickname }}
      </div>
      <div class="i-card-header-extra">{{ humanTime }}</div>
    </div>
    <div class="i-card-body">
      {{ item.content }}
    </div>
    <div class="i-card-photo" v-if="item.photos && item.photos.length > 0">
      <div class="i-card-imgs">
        <div class="i-card-img" v-for="(v,k) in item.photos" :key="k">
          <image :src="v.url+'!thumb'" mode="aspectFill" @click="preview(v.url)"></image>
        </div>
        <div v-if="isShow" class="pub-plus" hover-class="pub-plus-hover" @click="choose"><span>+</span></div>
      </div>
    </div>
    <div class="i-card-footer">
      <div class="i-card-handle" hover-class="hover"><i class="iconfont icon-forward"></i></div>
      <div v-if="!hiddenCmtBtn" class="i-card-handle" hover-class="hover" @click="toDetail"><i class="iconfont icon-liuyan"></i><span v-if="item.comment_total > 0">{{item.comment_total}}</span></div>
      <div class="i-card-handle" hover-class="hover" @click="like"><i class="iconfont" :class="{'icon-xihuanfill':item.is_like,'icon-xihuan':!item.is_like}"></i><span class="i-card-num" v-if="item.like_total > 0">{{item.like_total}}</span></div>
    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  import isBetween from 'dayjs/plugin/isBetween'
  import {likeApi} from "../api"
  import {sync} from "../utils"

  export default {
    name: "card",
    props:{
      item:{},
      hiddenCmtBtn: {
        default:false
      }
    },
    computed:{
      humanTime(){
        dayjs.extend(isBetween)
        let currTime = dayjs().add(1,"second")
        let itemTime = dayjs(this.item.created_at)

        if(itemTime.isBetween(currTime.subtract(60,'second'),currTime)){
          return currTime.diff(itemTime,'second')+'秒前'
        }else if(itemTime.isBetween( currTime.subtract(60,'minute'),currTime.subtract(1,'minute'))){
          return currTime.diff(itemTime,'minute')+'分钟前'
        }else if(itemTime.isBetween(currTime.startOf('day'),currTime.endOf('day'))){
          return '今天'+itemTime.format("HH:mm")
        }else if(itemTime.isBetween(currTime.subtract(1,'day').startOf('day'),currTime.subtract(1,'day').endOf('day'))){
          return '昨天'+itemTime.format("HH:mm")
        }else if(itemTime.isBetween(currTime.startOf("year"),currTime.subtract(1,'day').endOf('day'))){
          return itemTime.format("MM月DD日 HH:mm")
        }else{
          return itemTime.format("YYYY-MM-DD HH:mm")
        }
      }
    },
    methods:{
      like(){
        let self = this
        sync(function* () {
          if(self.item.is_like){
            self.item.like_total--
            self.item.is_like = false
          }else {
            self.item.like_total++
            self.item.is_like = true
          }
          let ret = yield likeApi({id:self.item.id})
        })
      },
      toDetail(){
        let self = this
        wx.navigateTo({
          url: '/pages/detail/main?id='+self.item.id
        })
      },
      preview(src){
        let self = this
        let ps = []
        self.item.photos.forEach(function (v) {
          ps.push(v.url+"!preview")
        })
        wx.previewImage({
          current: src+"!preview", // 当前显示图片的http链接
          urls: ps
        })
      },
    }
  };
</script>

<style>
  .i-card {
    margin: 0;
    font-size: 32rpx;
    overflow: hidden;
    position: relative;
    background: #fff;
    border: 1rpx solid #dddee1;
    border-left: none;
    border-right: none;
    margin-bottom:20rpx;
  }

  .i-card-header {
    display: flex;
    padding: 20rpx;
    align-items: center
  }

  .i-card-header-content {
    flex: 1;
    text-align: left;
  }

  .i-card-header-thumb {
    display: inline-block;
    position: relative;
    margin-left: auto;
    overflow: hidden;
    background-size: cover;
    vertical-align: middle;
    border-radius: 50%;
    width: 60rpx;
    height: 60rpx;
    margin-right: 5rpx;
  }

  .i-card-header-extra {
    flex: 1;
    text-align: right;
    font-size: 26rpx;
    color: #80848f
  }

  .i-card-body {
    position: relative;
    padding: 20rpx;
    color: #495060;
  }

  .i-card-body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(.5);
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    border: 0 solid #e9eaec;
    border-top-width: 1px
  }

  .i-card-footer {
    position: relative;
    color: #80848f;
    display: flex;
    border-top:1rpx solid #dddee1;
  }

  .i-card-handle{
    flex: 1;
    padding: 15rpx 0;
    text-align: center;
    font-size: 36rpx;
  }

  .i-card-handle.hover{
    background: #dddee1;
  }

  .i-card-imgs {
    padding: 20rpx;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .i-card-imgs .i-card-img image {
    width: 100%;
    height: 100%;
    border-radius: 10rpx;
  }

  .i-card-imgs .i-card-img {
    border: 1px solid #dcdee2;
    width: 215rpx;
    height: 215rpx;
    display: inline-block;
    padding: 2rpx;
    border-radius: 10rpx;
    margin-right:10rpx;
    margin-bottom:10rpx;
  }

  .i-card-handle .iconfont {
    display: inline;
    vertical-align: center;
  }

  .i-card-handle .icon-xihuanfill{
    color: #e25139
  }

  .i-card-num{
    margin-left: 10rpx;
    font-size: 32rpx;
  }

</style>
