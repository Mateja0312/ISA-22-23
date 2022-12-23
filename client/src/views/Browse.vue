<template>
  <div class="home">
    <homepage-image id="cottage" img="cottages.jpg" page="product-search/cottages" title="COTTAGES" />
    <homepage-image
      id="boat"
      img="boat.jpg"
      page="product-search/boats"
      title="SHIPS AND BOATS"
    />
    <homepage-image
      id="fishing"
      img="fishing.jpg"
      page="product-search/lessons"
      title="FISHING LESSONS"
    />
  </div>
</template>

<script lang="ts">
import HomepageImage from "../components/HomepageImage.vue";
import Vue from "vue";

export default Vue.extend({
  name: "Browse",
  components: {
    HomepageImage,
  },
});
</script>

<style lang="scss">
.homepage-image {
  width: calc(100vw / 3);
  height: 100vh;
  float: left;
}

#boat img {
  object-position: 90%;
}

#fishing img {
  object-position: 40%;
}
</style>
