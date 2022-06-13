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
      <!-- 使用文件上次组件 -->
      <van-uploader class="myuploader" :after-read="afterRead"></van-uploader>
    </div>
    <!-- 其他信息 -->
    <van-cell>
      <van-cell
        @click="openName(myInfo.name)"
        title="名称"
        is-link
        :value="myInfo.name"
      ></van-cell>
      <van-cell
        @click="openGender"
        title="性别"
        is-link
        :value="myInfo.gender ? '女' : '男'"
      ></van-cell>
      <van-cell
        @click="openBirth(myInfo.birthday)"
        title="生日"
        is-link
        :value="myInfo.birthday"
      ></van-cell>
    </van-cell>
    <!-- 面板1：修改名称 -->
    <!-- v-model: 控制van-dialog显示隐藏 -->
    <van-dialog
      v-model="nameShow"
      title="修改名称"
      show-cancel-button
      @confirm="confirmName"
    >
      <van-field v-model="myname" ref="myfield"></van-field>
    </van-dialog>
    <!-- 面板2 修改性别 -->
    <van-popup
      v-model="genderShow"
      position="bottom"
      :style="{ height: '18%' }"
    >
      <!-- 导航栏 -->
      <van-nav-bar title="修改性别" left-text="取消" @click-left="cancel">
      </van-nav-bar>
      <!-- 性别区域 -->
      <van-cell-group>
        <van-cell @click="changeGender('0')" title="男" is-link></van-cell>
        <van-cell @click="changeGender('1')" title="女" is-link></van-cell>
      </van-cell-group>
    </van-popup>
    <!-- 面板3 修改生日 -->
    <van-popup v-model="birthShow" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
        @confirm="confirmBirthday"
        v-model="birthday"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <!-- 面板4：裁剪面板 -->
    <div v-if="myPanelShow" class="mypanel">
      <VueCropper
        ref="cropper"
        :img="cropperImg"
        autoCrop
        autoCropWidth="120px"
        autoCropHeight="120px"
      ></VueCropper>
      <van-button @click="cutImg" class="btnOne" type="primary"
        >裁剪</van-button
      >
      <van-button class="btnTwo" type="primary">取消</van-button>
    </div>
  </div>
</template>

<script>
// 导入修改的方法
import { editInfoApi, uploadApi } from '@/api'
// 导入 moment
import moment from 'moment'
// 导入裁剪组件
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      // 控制名称面板显示与隐藏
      nameShow: false,
      // 名称面板中输入双向绑定数据
      myname: '',
      // 控制性别面板显示
      genderShow: false,
      // 生日面板
      birthShow: false,
      // 当前日期组件的事件
      birthday: new Date(),
      // 日期组件的开始时间
      minDate: new Date('1900-1-1'),
      maxDate: new Date('2100-1-1'),
      myPanelShow: false, // 控制裁剪面板的显示与隐藏
      // 要裁剪的图片内容，可以是url地址 或者 base64
      cropperImg: '',
    }
  },
  computed: {
    myInfo: function () {
      return this.$store.state.userInfo
    },
  },
  methods: {
    // 开始裁剪图片
    cutImg() {
      this.$refs.cropper.getCropBlob(async (data) => {
        // 存在formData中
        const fd = new FormData()
        fd.append('photo', data)
        const res = await uploadApi(fd)
        // 接收放回图片
        const imgPath = res.data.data.photo
        // 关闭面板
        this.myPanelShow = false
        // 更新vuex中数据
        this.$store.commit('setUserInfo', {
          ...this.myInfo,
          photo: imgPath,
        })
      })
    },
    // file: 标识当选中文件对象
    afterRead(file) {
      // 打开裁剪面板
      this.myPanelShow = true
      // 保存将选中的图片内容保存为要裁剪的图片
      this.cropperImg = file.content
    },
    // 点击日期面板中确定时会触发
    confirmBirthday(value) {
      // 将时间对象转为字符串
      const mybirth = moment(value).format('YYYY-MM-DD')
      // 将时间提交到服务器
      editInfoApi({
        birthday: mybirth,
      })
      // 提示修改成功
      this.$toast.success('修改生日日期成功')
      this.$store.commit('setUserInfo', {
        ...this.myInfo,
        birthday: mybirth,
      })
      this.birthShow = false
    },
    // 打开生日面板
    openBirth(birth) {
      this.birthShow = true
      // 将用户的生日保存到birthday中
      this.birthday = new Date(birth)
    },
    // 将性别数据提交到服务器
    async changeGender(gender) {
      await editInfoApi({
        gender: gender,
      })
      // 提示成功
      this.$toast.success('修改性别成功')
      this.$store.commit('setUserInfo', {
        ...this.myInfo,
        gender,
      })
      this.genderShow = false
    },
    // 点击头部的左侧箭头触发
    onClickLeft() {
      this.$router.push('/layout/my')
    },
    // 打开修改名称面板
    openName(name) {
      this.nameShow = true
      // 给面板中的输入框赋值
      this.myname = name
      this.$nextTick(() => {
        // 给输入框添加dom.focus()
        this.$refs.myfield.focus()
      })
    },
    // 提交修改后的名称
    async confirmName() {
      // 提交数据到服务器
      await editInfoApi({
        name: this.myname,
      })
      this.$toast.success('修改成功')
      this.$store.commit('setUserInfo', {
        ...this.myInfo,
        name: this.myname,
      })
    },
    // 打开性别面板
    openGender() {
      this.genderShow = true
    },
    // 关闭性别面板
    cancel() {
      this.genderShow = false
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
    position: relative;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    .myuploader {
      opacity: 0;
      position: absolute;
      .van-uploader__upload {
        width: 120px;
        height: 120px;
      }
    }
  }
  .van-cell__value.van-cell__value--alone.van-field__value {
    border: 1px solid #ccc;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
  }
  span.van-nav-bar__text {
    color: #fff;
  }
  .mypanel {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: red;
    .btnOne {
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .btnTwo {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
