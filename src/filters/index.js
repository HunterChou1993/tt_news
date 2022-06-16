// 处理相对时间的过滤器
import Vue from 'vue'
// 导入moment
import moment from 'moment'
moment.locale('zh-cn')
Vue.filter('timeFromNow', function (value) {
  return moment(value).fromNow()
})
