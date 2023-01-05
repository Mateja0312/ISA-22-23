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
    <homepage-image
      id="questionnaire"
      img="cottages.jpg"
      page="questionnaire"
      title="QUESTIONNAIRE"
    />
    <homepage-image
      id="feedback"
      img="cottages.jpg"
      page="feedback"
      title="FEEDBACK"
    />
  </div>
</template>

<script lang="ts">
import HomepageImage from "../components/HomepageImage.vue";
import Vue from "vue";

export default Vue.extend({
  name: "ClientHome",
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
