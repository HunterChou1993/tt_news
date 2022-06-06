<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 表单区域 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        label="手机号"
        placeholder="请输入手机号"
        :rules="rules.mobile"
      />
      <van-field
        v-model="code"
        name="code"
        label="验证码"
        placeholder="请输入验证码"
        :rules="rules.code"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="loading"
          loading-text="加载中..."
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 导入网络请求
import { loginApi } from '@/api'
import { Toast } from 'vant'
export default {
  data() {
    return {
      mobile: '', // 手机号
      code: '', // 验证码
      loading: false, // 加载状态
      rules: {
        // 手机号码校验规则
        mobile: [
          // 验证是否填写手机号码
          { required: true, message: '请填写手机号', trigger: 'onBlur' },
          // 验证是否符号手机号码规则
          {
            pattern:
              /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'onBlur',
          },
        ],
        // 验证码验证规则
        code: [
          // 验证是否填写验证码
          { required: true, message: '请填写验证码' },
          // 验证是否是六位数的验证码
          { oattern: /^\d{6}$/, message: '验证码长度为6', trigger: 'onBlur' },
        ],
      },
    }
  },
  methods: {
    onSubmit(value) {
      // 设置按钮为加载状态
      this.loading = true
      // value是以{key: value}
      // key相当于 组件的name属性
      // 提交数据到服务器
      loginApi(value)
        .then((res) => {
          // 提示登录成功
          console.log('登录成功')
          this.$toast.success('登录成功')
        })
        .catch((error) => {
          this.$toast.fail('登录失败')
        })
        .finally(() => {
          // 关闭加载状态
          this.loading = false
        })
    },
  },
}
</script>

<style lang="less">
.login {
}
</style>
