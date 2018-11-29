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
  import {mapState,mapMutations} from "vuex"

  export default {
    data () {
      return {
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
      ...mapMutations(['setNeedReloadList']),
      load(){
        let self = this
        sync(function* () {
          self.items = yield mommentListApi({prev_id:0})
          self.setNeedReloadList(false)
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        })
      }
    },
    mounted () {
      this.load()
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
      this.load()
    }
  };
</script>

<style scoped>
  .container {
    background: #eee;
  }
</style>
