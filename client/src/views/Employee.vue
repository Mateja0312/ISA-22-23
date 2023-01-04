<template>
  <div class="provider-home">
    {{ "provider " }}
    <homepage-image
      id="cottage"
      img="cottages.jpg"
      page="/product-search/provider"
      title="MY PRODUCTS"
    />
    <homepage-image
      id="boat"
      img="boat.jpg"
      page="/provider/reports"
      title="REPORTS"
    />
    <homepage-image
      id="fishing"
      img="fishing.jpg"
      page="/provider/mosa"
      title="ZA SAD NISTA"
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

<style scoped lang="scss">
.homepage-image {
  width: calc(100vw / 2);
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
