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

  export default {
    data () {
      return {
        items: [
          {
            id:1,
            title: "aaaaa",
            thumb: "https://fifsky.com/static/public/images/avatar.jpg",
            extra: "1分钟前",
            content: "1140年，康拉德三世率军围攻巴伐利亚Weinsberg城堡。城破之后康拉德三世本要大开杀戒，但民众代表向他求情，恳请他慈悲为怀，放城中女眷们一条生路。康拉德三世同意了。他允许女性们在屠城的最后期限前带上自己能搬动的所有值钱东西出城。最后期限到来之际，康拉德三世惊呆了。",
            photos:[
              "https://fifsky.com/static/style/images/faceicon.jpg",
              "https://wx4.sinaimg.cn/mw690/a0b273afgy1fxhqbtq8xpj20bb077wgl.jpg",
              "https://wx4.sinaimg.cn/mw690/a0b273afgy1fxhqbtvo5vj20g80bxtdq.jpg",
              "https://wx2.sinaimg.cn/mw690/ec835d28gy1fxi0zf3n6ej23a4268kjm.jpg",
              "https://wx4.sinaimg.cn/mw690/ec835d28gy1fxi0zkftpuj23a42687wj.jpg",
              "https://wx3.sinaimg.cn/mw690/5d098bccly1fxi0zc3oixj209p0kiwhx.jpg",
              "https://wx1.sinaimg.cn/mw690/44d512fbly1fxi08bwe9jj20fo0dagnc.jpg",
              "https://wx2.sinaimg.cn/mw690/6694d955ly1fxhxwqcsm6j20u00z617a.jpg",
              "https://wx1.sinaimg.cn/mw690/76064dd8gy1fxh6x6kanxj20fi0b319i.jpg"
            ]
          }, {
            id:2,
            title: "aaaaa",
            thumb: "https://fifsky.com/static/public/images/avatar.jpg",
            extra: "1分钟前",
            content: "1140年，康拉德三世率军围攻巴伐利亚Weinsberg城堡。城破之后康拉德三世本要大开杀戒，但民众代表向他求情，恳请他慈悲为怀，放城中女眷们一条生路。康拉德三世同意了。他允许女性们在屠城的最后期限前带上自己能搬动的所有值钱东西出城。最后期限到来之际，康拉德三世惊呆了。"
          }, {
            id:3,
            title: "aaaaa",
            thumb: "https://fifsky.com/static/public/images/avatar.jpg",
            extra: "1分钟前",
            content: "1140年，康拉德三世率军围攻巴伐利亚Weinsberg城堡。城破之后康拉德三世本要大开杀戒，但民众代表向他求情，恳请他慈悲为怀，放城中女眷们一条生路。康拉德三世同意了。他允许女性们在屠城的最后期限前带上自己能搬动的所有值钱东西出城。最后期限到来之际，康拉德三世惊呆了。"
          }, {
            id:4,
            title: "aaaaa",
            thumb: "https://fifsky.com/static/public/images/avatar.jpg",
            extra: "1分钟前",
            content: "1140年，康拉德三世率军围攻巴伐利亚Weinsberg城堡。城破之后康拉德三世本要大开杀戒，但民众代表向他求情，恳请他慈悲为怀，放城中女眷们一条生路。康拉德三世同意了。他允许女性们在屠城的最后期限前带上自己能搬动的所有值钱东西出城。最后期限到来之际，康拉德三世惊呆了。"
          }],
        userInfo: {}
      };
    },

    components: {
      card
    },

    methods: {
      bindViewTap () {
        const url = "../logs/main";
        wx.navigateTo({ url });
      },
      getUserInfo () {
        // 调用登录接口
        wx.login({
          success: () => {
            wx.getUserInfo({
              success: (res) => {
                this.userInfo = res.userInfo;
              }
            });
          }
        });
      },
      clickHandle (msg, ev) {
        console.log("clickHandle:", msg, ev);
      }
    },

    created () {
      // 调用应用实例的方法获取全局数据
      // this.getUserInfo();
    }
  };
</script>

<style scoped>
  .container {
    background: #eee;
  }
</style>
