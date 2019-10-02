import Vue from 'vue'

import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { Button, NavBar, NoticeBar, Icon, Row, Col, Loading, Swipe, SwipeItem, Toast, Step, Steps, Uploader, Popup } from 'vant';

Vue.use(Button)
    .use(NavBar)
    .use(NoticeBar)
    .use(Icon)
    .use(Row)
    .use(Col)
    .use(Loading)
    .use(Swipe)
    .use(SwipeItem)
    .use(Toast)
    .use(Step)
    .use(Uploader)
    .use(Steps)
    .use(vueSwiper)
    .use(Popup);
