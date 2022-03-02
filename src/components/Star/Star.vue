<template>
  <div class="star">
    <!-- itemClass:on,half,off -->
    <span
      v-for="(itemClass, index) in itemClasses"
      :class="itemClass"
      class="star-item"
      :key="index"
    >
    </span>
  </div>
</template>

<script>
//星星的長度
const LENGTH = 5;
//星星對應class
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";

export default {
  props: {
    score: {
      type: Number,
    },
  },
  computed: {
    itemClasses() {
      let result = [];
      //4.7=>4.5 3.9=>3.5 4.1=>4.0
      //對分數進行處理，向下取0.5的倍數，Math.floor() 函式會回傳小於等於所給數字的最大整數。
      let score = Math.floor(this.score * 2) / 2;
      //小數，控制半星
      let hasDecimal = score % 1 !== 0;
      //整數，控制全星
      let integer = Math.floor(score);
      //全星
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }

      //半星
      if (hasDecimal) {
        result.push(CLS_HALF);
      }

      //補齊
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }

      return result;
    },
    //另一種寫法
    // itemClasses() {
    //   const length = Math.floor(this.score);取得此數，整數最大值
    //   const result = new Array(length).fill(CLS_ON);new 一個array填滿length的長度，再將全星填滿
    //   //對分數進行處理 向下取0.5的倍數
    //   const score = Math.floor(this.score * 2) / 2;
    //   //若是分數除一不為零，則放半星
    //   if (score % 1 !== 0) {
    //     result.push(CLS_HALF);
    //   }
    //若是塞滿全星的長度小於固定LENGTH,則回傳一個result.concat(array+array)的方式，將一個新的塞滿灰色星星的array加到result舊的array上，成為一個完整星星的array
    //   if (result.length < LENGTH) {
    //     return result.concat(new Array(LENGTH - result.length).fill(CLS_OFF));
    //   }
    //   return result;
    // },
  },
};
</script>


<style>
.star {
  font-size: 0;
}
.star .star-item {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-repeat: no-repeat;
  background-size: 10px;
}
.star .star-item:last-child {
  margin-right: 0;
}
/* 三种图片类型*/
.star .on {
  background-image: url(img/star24_on@2x.png);
}
.star .half {
  background-image: url(img/star24_half@2x.png);
}
.star .off {
  background-image: url(img/star24_off@2x.png);
}
</style>          
