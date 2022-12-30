<template>
  <div id="home">
    <homepage-image
      id="centers"
      img="cottages.jpg"
      page="centers"
      title="CENTERS"
    />
    <homepage-image
      id="appointments"
      img="cottages.jpg"
      page="appointments"
      title="APPOINTMENTS"
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
#home {
  display: flex;
  height: 100vh;

  .homepage-image {
    width: calc(100vw / 2);
    height: 100%;
  }
}
</style>
