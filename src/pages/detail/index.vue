<template>
  <div v-if="item.id">
    <card :item="item" hiddenCmtBtn="true"></card>
  </div>
</template>

<script>
import card from '@/components/card'
import {momentDetailApi} from "../../api"
import {sync} from "../../utils"

export default {
  components: {
    card
  },

  data () {
    return {
      qs:{},
      item: {}
    }
  },
  methods:{
  },
  onLoad(qs){
    this.item = {}
    this.qs = qs
  },
  mounted (){
    let self = this
    sync(function* () {
      self.item = yield momentDetailApi({id:parseInt(self.qs.id)})
    })
  }
}
</script>

<style>
</style>
