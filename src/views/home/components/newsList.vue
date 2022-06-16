<template>
  <div class="newsList">
    <van-list
      @load="onload"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多数据"
    >
      <van-cell
        v-for="(item, index) in newsList"
        :key="index"
        :title="item.title"
      >
        <template #label>
          <!-- 图片区域 -->
          <van-grid
            v-if="item.cover.type !== 0"
            :border="false"
            :column-num="3"
          >
            <van-grid-item
              v-for="(subitem, subindex) in item.cover.images"
              :key="subindex"
            >
              <van-image :src="subitem" />
            </van-grid-item>
          </van-grid>
          <!-- 文章详情 -->
          <div class="detail">
            <span>{{ item.aut_name }}</span>
            <span>{{ item.comm_count }}评论</span>
            <span>{{ item.pubdate | timeFromNow }}</span>
            <van-icon name="cross" class="myicon" />
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getNewsListApi } from '@/api'
export default {
  // 接收外界传入的参数
  props: ['channel_id'],
  data() {
    return {
      // 文章数据源列表
      newsList: [],
      // 控制组件加载状态
      loading: false,
      // 判断数据是否加载完毕
      finished: false,
      // 定义一个时间
      timestamp: Date.now(),
    }
  },
  methods: {
    // list 组件的加载方法
    async onload() {
      const res = await getNewsListApi({
        channel_id: this.channel_id,
        timestamp: this.timestamp,
      })
      // 保存数据
      this.newsList = [...this.newsList, ...res.data.data.results]
      console.log
      // 保存时间
      this.timestamp = res.data.data.pre_timestamp
      // 修改v-model
      this.loading = false
      // 判断是否还有后续数据
      if (this.timestamp === null) {
        // 将 list 设置未数据源
        this.finished = true
      }
    },
  },
}
</script>

<style lang="less">
.newsList {
  position: fixed;
  top: 90px;
  bottom: 50px;
  left: 0;
  width: 100%;
  overflow: auto;
  .detail {
    span {
      margin-right: 10px;
    }
    .myicon {
      float: right;
      color: #999;
    }
  }
}
</style>
