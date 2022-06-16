<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar>
      <template #left>
        <van-image
          fit="contain"
          width="100"
          :src="require('../../assets/logo.png')"
        ></van-image>
      </template>
      <template #right>
        <van-button> <van-icon name="search" class="myIcon" />搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 频道 -->
    <van-tabs>
      <van-tab
        v-for="(item, index) in channelList"
        :key="index"
        :title="item.name"
      >
        <!-- channel_id 要等子组件新建了再传 -->
        <news-list :channel_id="item.id"></news-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannelApi } from '../../api'
export default {
  data() {
    return {
      // 用来保存用户频道数组
      channelList: [],
    }
  },
  methods: {
    // 获取频道数据
    async getUserChannel() {
      const res = await getUserChannelApi()
      this.channelList = res.data.data.channels
    },
  },
  created() {
    this.getUserChannel()
  },
  components: {
    newsList: () => import('./components/newsList.vue'),
  },
}
</script>

<style lang="less">
.home {
  button.van-button.van-button--default.van-button--normal {
    background: #5aabfb;
    color: #fff;
    border: none;
    border-radius: 20px;
    height: 30px;
    padding: 0 30px;
  }
  .myIcon {
    color: #fff;
    margin-right: 6px;
  }
}
</style>
