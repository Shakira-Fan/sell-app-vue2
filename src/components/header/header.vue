<template>
  <div class="header">
    <!-- 頂部通欄 -->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>
      <div class="search-wrapper">
        <span class="search-icon"></span>
        <input class="search-bar" type="text" placeholder="搜索店內商品" />
      </div>
      <div class="more-wrapper">
        <a href="#" class="spelling-bt">團購</a>
        <div class="more-bt">
          <i class="s-radius"></i><i class="s-radius"></i
          ><i class="s-radius"></i>
        </div>
      </div>
    </div>

    <!-- 主體內容 -->
    <div class="content-wrapper">
      <div class="icon" :style="head_bg"></div>
      <div class="name">
        <h3>{{ poiInfo.name }}</h3>
      </div>
      <div class="collect">
        <img src="../../../resource/img/star.png" />
        <span>收藏</span>
      </div>
    </div>
    <!-- 公告內容 -->
    <div class="bulletin-wrapper">
      <img
        v-if="poiInfo.discounts2"
        :src="poiInfo.discounts2[0].icon_url"
        class="icon"
      />
      <span class="text" v-if="poiInfo.discounts2">{{
        poiInfo.discounts2[0].info
      }}</span>

      <div class="detail" v-if="poiInfo.discounts2" @click="showBulletin">
        {{ poiInfo.discounts2.length }}個活動
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>

    <!-- 背景 -->
    <div class="bg-wrapper" :style="content_bg"></div>

    <!-- 公告詳情 -->
    <transition name="bulletin-detail">
      <div class="bulletin-detail" v-show="isShow">
        <div class="detail-wrapper">
          <div class="main-wrapper" :style="detail_bg">
            <div class="icon" :style="head_bg"></div>
            <h3 class="name">{{ poiInfo.name }}</h3>
            <!-- 評價  -->
            <div class="score">
              <Star :score="poiInfo.wm_poi_score" />
              <span>{{ poiInfo.wm_poi_score }}</span>
            </div>
            <p class="tip">
              {{ poiInfo.min_price_tip }} <i>|</i> {{ poiInfo.shipping_fee_tip
              }}<i>|</i>
              {{ poiInfo.delivery_time_tip }}
            </p>
            <p class="time">
              配送時間：
              {{ poiInfo.shipping_time }}
            </p>
            <div class="discounts" v-if="poiInfo.discounts2">
              <p>
                <img :src="poiInfo.discounts2[0].icon_url" />
                <span>{{ poiInfo.discounts2[0].info }}</span>
              </p>
            </div>
          </div>

          <div class="close-wrapper">
            <span class="icon-close" @click="closeBulletin"></span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
//導入Star
import Star from "components/Star/Star";

export default {
  data() {
    return {
      isShow: false, //公告詳情是否顯示，默認是不顯示的
    };
  },
  components: {
    Star,
  },
  props: {
    //組件傳值
    poiInfo: {
      type: Object,
      default: {},
    },
  },
  computed: {
    //計算屬性
    content_bg() {
      return `background-image:url(${this.poiInfo.head_pic_url})`;
    },
    head_bg() {
      return `background-image:url(${this.poiInfo.pic_url})`;
    },
    detail_bg() {
      return `background-image:url(${this.poiInfo.poi_back_pic_url})`;
    },
  },
  methods: {
    showBulletin() {
      this.isShow = true;
    },
    closeBulletin() {
      this.isShow = false;
    },
  },
};
</script>

<style>
/* 導入字體圖標 */
@import "../common/styles/icon.css";
/* 導入css樣式 */
@import "Header.css";
</style>