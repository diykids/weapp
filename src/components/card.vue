<template>
  <div class="i-card">
    <div class="i-card-header">
      <div class="i-card-header-content">
        <img class="i-card-header-thumb" :src="item.thumb"/>
        {{ item.title }}
      </div>
      <div class="i-card-header-extra">{{ item.extra }}</div>
    </div>
    <div class="i-card-body">
      {{ item.content }}
    </div>
    <div class="i-card-photo" v-if="item.photos && item.photos.length > 0">
      <div class="i-card-imgs">
        <div class="i-card-img" v-for="(v,k) in item.photos" :key="k">
          <image :src="v" mode="aspectFill" @click="preview(v)"></image>
        </div>
        <div v-if="isShow" class="pub-plus" hover-class="pub-plus-hover" @click="choose"><span>+</span></div>
      </div>
    </div>
    <div class="i-card-footer">
      <div class="i-card-handle" hover-class="hover"><i class="iconfont icon-forward"></i></div>
      <div class="i-card-handle" hover-class="hover" @click="toDetail(item.id)"><i class="iconfont icon-liuyan"></i></div>
      <div class="i-card-handle" hover-class="hover"><i class="iconfont icon-xihuan"></i></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "card",
    props: ["item"],
    methods:{
      toDetail(id){
        wx.navigateTo({
          url: '/pages/detail/main?id='+id
        })
      },
      preview(src){
        let self = this
        wx.previewImage({
          current: src, // 当前显示图片的http链接
          urls: self.item.photos
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

</style>
