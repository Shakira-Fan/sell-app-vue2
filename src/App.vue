<template>
  <div id="app">
    <Header :poiInfo="poiInfo" />
    <Nav />
    <router-view></router-view>
  </div>
</template>

<script>
//1.導入
import Header from "components/Header/Header";
import Nav from "components/Nav/Nav";
export default {
  name: "App",
  components: {
    //2.註冊
    Header,
    Nav,
  },
  data() {
    return {
      //header組件需要的訊息（商家訊息）
      poiInfo: {},
    };
  },

  //發起異步請求，獲取數據
  created() {
    const that = this;

    //透過axios發起get請求
    this.$axios
      .get("/api/goods")
      .then((resp) => {
        //獲取到數據
        const dataSource = resp.data;
        if (dataSource.code === 0) {
          that.poiInfo = dataSource.data.poi_info;
        }
      })
      .catch((err) => console.log({ err }));
  },
};
</script>

<style>
</style>
