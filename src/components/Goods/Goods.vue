<template>
  <div class="goods">
    <!-- 分類列表 -->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <!-- 專場 -->
        <li
          class="menu-item"
          :class="{ current: currentIndex === 0 }"
          @click="selectMenu(0)"
        >
          <p class="text">
            <img
              :src="container.tag_icon"
              v-if="container.tag_icon"
              class="icon"
            />
            {{ container.tag_name }}
          </p>
        </li>
        <!-- 熱銷 -->
        <li
          class="menu-item"
          v-for="(item, index) in goods"
          :key="index"
          :class="{ current: currentIndex === index + 1 }"
          @click="selectMenu(index + 1)"
        >
          <p class="text">
            <img :src="item.icon" v-if="item.icon" class="icon" />
            {{ item.name }}
          </p>
        </li>
      </ul>
    </div>

    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!-- 專場 -->
        <li class="container-list food-list-hook">
          <div
            v-for="(item, index) in container.operation_source_list"
            :key="index"
          >
            <img :src="item.pic_url" />
          </div>
        </li>

        <!-- 具體分類 -->
        <li v-for="(item, index) in goods" :key="index" class="food-list">
          <h3 class="title">{{ item.name }}</h3>
          <!-- 具體商品列表 -->
          <ul>
            <li v-for="food in item.spus" :key="food.id" class="food-item">
              <div class="icon" :style="head_bg(food.picture)"></div>
              <div class="content">
                <h3 class="name">{{ food.name }}</h3>
                <p class="desc" v-if="food.description">
                  {{ food.description }}
                </p>
                <div class="extra">
                  <span class="saled">{{ food.month_saled_content }}</span>
                  <span class="praise">{{ food.praise_content }}</span>
                </div>
                <img :src="food.product_label_picture" class="product" />
                <div class="price">
                  <span class="text">￥{{ food.min_price }}</span>
                  <span class="unit">{{ food.unit }}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 导入BScroll
import BScroll from "better-scroll";
export default {
  data() {
    return {
      container: {},
      goods: [],
      listHeight: [],
      scrollY: 0,
      menuScroll: {},
      foodScroll: {},
    };
  },
  created() {
    let that = this; //為了要讓created()可以找到全域的this，故這樣宣告

    //透過axios發起get請求
    this.$axios
      .get("/api/goods")
      .then((resp) => {
        //獲取到數據
        let dataSource = resp.data;
        if (dataSource.code === 0) {
          that.container = dataSource.data.container_operation_source;
          that.goods = dataSource.data.food_spu_tags;

          //調用滾動初始化方法
          //that.initScroll();
          //開始時，DOM元素沒有渲染，即高度是問題
          //在獲取到數據後，並DOM已經被渲染，表示列表高度是沒問題的

          //nextTick
          that.$nextTick(() => {
            //DOM已經更新
            that.initScroll();

            //計算分類區間高度
            that.calculateHeight();
          });
        }
      })
      .catch((err) => console.log({ err }));
  },
  methods: {
    //computed不能傳遞參數，故使用methods
    head_bg(imgName) {
      return `background-image:url(${imgName})`;
    },
    //滾動的初始化
    initScroll() {
      //ref屬性就是用來綁定某個dom元素或某個組件，然後在this.$refs裏面
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true,
      });
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        probeType: 3, //probeType有分1,2,3,其默認值為0,其他數值則會派發scroll事件，0則不派發。
        click: true,
      });

      //添加滾動監聽事件
      this.foodScroll.on("scroll", (pos) => {
        //console.log(pos.y);
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    calculateHeight() {
      //透過$refs獲取到對應的元素
      let foodlist =
        this.$refs.foodScroll.getElementsByClassName("food-list-hook");

      //添加到數組區間
      //0~216 第一個區間（專場）
      //217~1342 第二個區間（熱銷）
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodlist.length; i++) {
        let item = foodlist[i];

        //累加
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index) {
      //console.log(index);
      let foodlist =
        this.$refs.foodScroll.getElementsByClassName("food-list-hook");

      //根據下標，滾動到相對應的元素
      let el = foodlist[index];

      //滾動到對應元素的位置
      this.foodScroll.scrollToElement(el, 250);
    },
  },
  computed: {
    currentIndex() {
      //根據右側滾動位置，確定對應的索引下標
      for (let i = 0; i < this.listHeight.length; i++) {
        //獲取商品區間的範圍
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];

        //是否在上述區間中
        if (this.scrollY >= height1 && this.scrollY < height2) {
          //console.log(i);
          return i;
        }
      }
      return 0;
    },
  },
  components: {
    BScroll,
  },
};
</script>

<style scoped>
/* 導入css樣式 */
@import "Goods.css";
</style>