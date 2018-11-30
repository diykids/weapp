<template>
  <button class="btn-login" open-type="getUserInfo" @getuserinfo="login">{{text}}</button>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'login',
    props: ['text'],
    methods: {
      ...mapActions(['loginAction']),
      login () {
        let self = this
        this.loginAction()
      },
    },

  }
</script>

<style scoped>
</style>
