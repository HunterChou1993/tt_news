<template>
  <div class="my">
    <!-- 个人信息 -->
    <div class="info">
      <van-image
        class="myimg"
        width="90"
        height="90"
        round
        fit="cover"
        :src="userInfo.photo"
      />
      <div class="text">
        <div class="name">{{ userInfo.name }}</div>
        <div class="birth">{{ userInfo.birthday }}</div>
      </div>
    </div>
    <!-- 我的收藏 -->
    <van-grid class="mygrid" :column-num="3" :border="false" icon-size="24px">
      <van-grid-item icon="newspaper-o" text="我的作品" />
      <van-grid-item icon="star-o" text="我的收藏" />
      <van-grid-item icon="tosend" text="阅读历史" />
    </van-grid>
    <!-- 其他信息 -->
    <van-cell-group>
      <van-cell title="编辑资料" is-link icon="edit" />
      <van-cell title="小智同学" is-link icon="edit" />
      <van-cell title="系统设置" is-link icon="edit" />
      <van-cell title="退出登录" is-link icon="edit" />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserInfoApi } from '../../api'
export default {
  data() {
    return {
      userInfo: {},
    }
  },
  async created() {
    const res = await getUserInfoApi()
    this.userInfo = res.data.data
  },
}
</script>

<style lang="less">
.my {
  .info {
    height: 120px;
    background-color: #3296fa;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #fff;
    .myimg {
      margin: 0 20px;
    }
    .text {
      .name {
        font-weight: 700;
        margin-bottom: 6px;
      }
      .birth {
        background: #fff;
        color: #3296fa;
        font-size: 14px;
      }
    }
  }
  .mygrid {
    .van-icon-newspaper-o {
      color: #3296fa;
    }
    .van-icon-star-o {
      color: red;
    }
    .van-icon-tosend {
      color: orange;
    }
  }
}
</style>
