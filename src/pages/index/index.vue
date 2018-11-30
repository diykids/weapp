<template>
  <div class="container">
    <div class="blog-list">
      <div v-for="(v,k) in items" :key="k">
        <card :item="v"></card>
      </div>
    </div>
  </div>
</template>

<script>
  import card from "@/components/card";
  import {dialog,sync} from "../../utils"
  import {mommentListApi} from "../../api"
  import {mapState,mapMutations,mapActions} from "vuex"

  export default {
    data () {
      return {
        isEnd:false,
        items: [],
      };
    },

    components: {
      card
    },
    computed: {
      ...mapState(['needReloadList']),
    },
    methods: {
      ...mapActions(['loginAction']),
      ...mapMutations(['setNeedReloadList']),
      load(prev_id = 0){
        let self = this
        sync(function* () {
          let items = yield mommentListApi({prev_id:prev_id})
          if(prev_id >0){
            self.items.push(...items)
          }else{
            self.items = items
            self.isEnd = false
          }
          if(items.length < 10){
              self.isEnd = true
          }
          self.setNeedReloadList(false)
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        })
      }
    },
    mounted () {
      this.load()
    },
    onLoad(){
      this.loginAction()
    },
    onShow(){
      if(this.needReloadList){
        this.load()
      }
    },
    onPullDownRefresh(){
      this.load()
    },
    onReachBottom(){
      if(!this.isEnd) {
        let prev_id = 0
        if (this.items.length > 0) {
          prev_id = this.items[this.items.length - 1].id
        }
        this.load(prev_id)
      }
    }
  };
</script>

<style scoped>
  .container {
    background: #eee;
  }
</style>
