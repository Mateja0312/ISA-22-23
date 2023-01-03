<template>
  <div id="centers-page">
    <section class="mt-32 mx-auto">
      <label for="date">Date: </label>
      <input id="date" type="date" class="text-black" />
    </section>
    <section class="mx-auto">
      <search-result
        v-for="s in searchResults"
        :key="s.id"
        :center="s"
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
      allCenters: [],
    };
  },
  computed: {
    searchResults(): any[] {
      let searchResults;
      searchResults = this.allCenters.filter((center) =>
        this.satisfiesSearch(center)
      );
      return searchResults;
    },
  },
  mounted() {
    console.log(this.type);
    if (this.type == "provider") {
      getCenters().then((res) => {
        this.allCenters = res;
      });
    }
  },
  methods: {
    satisfiesSearch(center: any) {
      return true || center;
    },
  },
});
</script>

<style scoped lang="scss">
#center-search-page {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0%;
  left: 0%;
  background-image: url("../assets/home_screen.jpg");
  color: white;

  section,
  nav {
    width: fit-content;
  }
}
</style>
