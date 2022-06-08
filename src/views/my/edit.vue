<template>
  <div class="edit">
    <!-- 头部区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- 图片区域 -->
    <div class="img">
      <van-image
        width="120"
        height="120"
        round
        fit="cover"
        :src="myInfo.photo"
      ></van-image>
    </div>
    <!-- 其他信息 -->
    <van-cell>
      <van-cell title="名称" is-link :value="myInfo.name"></van-cell>
      <van-cell
        title="性别"
        is-link
        :value="myInfo.gender ? '女' : '男'"
      ></van-cell>
      <van-cell title="生日" is-link :value="myInfo.birthday"></van-cell>
    </van-cell>
  </div>
</template>

<script>
export default {
  computed: {
    myInfo: function () {
      return this.$store.state.userInfo
    },
  },
  methods: {
    // 点击头部的左侧箭头触发
    onClickLeft() {
      this.$router.push('/layout/my')
    },
  },
  created() {
    this.$store.dispatch('setUserInfo')
  },
}
</script>

<style lang="less">
.edit {
  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }
  .img {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
