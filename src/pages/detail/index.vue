<template>
  <div>
    <card :item="item"></card>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card'

export default {
  components: {
    card
  },

  data () {
    return {
      item: {
        id:3,
        title: "aaaaa",
        thumb: "https://fifsky.com/static/public/images/avatar.jpg",
        extra: "1分钟前",
        content: "1140年，康拉德三世率军围攻巴伐利亚Weinsberg城堡。城破之后康拉德三世本要大开杀戒，但民众代表向他求情，恳请他慈悲为怀，放城中女眷们一条生路。康拉德三世同意了。他允许女性们在屠城的最后期限前带上自己能搬动的所有值钱东西出城。最后期限到来之际，康拉德三世惊呆了。",
        photos:[
          "https://fifsky.com/static/style/images/faceicon.jpg"
        ]
      }
    }
  },
  methods:{
  }
}
</script>

<style>
</style>
