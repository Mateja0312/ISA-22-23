<template>
  <div class="home flex">
    <homepage-image
      id="cottage"
      img="cottages.jpg"
      page="product-search/cottages"
      title="COTTAGES"
    />
    <homepage-image
      id="cottage"
      img="cottages.jpg"
      page="product-search/cottages"
      title="COTTAGES"
    />
    ALOOOOOOOOOOOOOO
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
