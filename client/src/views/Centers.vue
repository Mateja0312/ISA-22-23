<template>
  <div id="centers-page">
    <form class="mt-32 mx-auto">
      <label for="date">Date: </label>
      <input id="date" type="date" />
      <label for="name">Name: </label>
      <input v-model="name" id="name" />
      <label for="address">Address: </label>
      <input v-model="address" id="address" />
      <label for="rating">Rating: </label>
      <input v-model="rating" id="rating" type="number" />
      <button @click.prevent="search">search</button>
    </form>
    <section class="mx-auto">
      <search-result
        v-for="center in centers"
        :key="center.id"
        :center="center"
      ></search-result>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SearchResult from "../components/SearchResult.vue";
import { getCenters } from "../services/requests";

export default Vue.extend({
  components: { SearchResult },
  name: "CenterSearch",
  data() {
    return {
      name: null,
      address: null,
      rating: null,
      centers: [],
    };
  },
  mounted() {
    getCenters({}).then((res) => {
      this.centers = res;
    });
  },
  methods: {
    search() {
      getCenters({
        name: this.name,
        address: this.address,
        rating: this.rating,
      }).then((res) => {
        this.centers = res;
      });
    },
  },
});
</script>

<style scoped lang="scss">
#centers-page {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0%;
  left: 0%;
  background-image: url("../assets/home_screen.jpg");
  color: white;

  padding-top: 120px;
  section,
  nav {
    width: fit-content;
  }
}
</style>
