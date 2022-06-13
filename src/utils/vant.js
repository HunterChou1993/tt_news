// 负责用来按需导入 vant 中 组件
import Vue from 'vue'
import {
  NavBar,
  Form,
  Field,
  Button,
  Toast,
  Tabbar,
  TabbarItem,
  Image as VanImage,
  Grid,
  GridItem,
  Cell,
  CellGroup,
  Dialog,
  Popup,
  DatetimePicker,
  Uploader,
} from 'vant'

Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(VanImage)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(Popup)
Vue.use(DatetimePicker)
Vue.use(Uploader)
