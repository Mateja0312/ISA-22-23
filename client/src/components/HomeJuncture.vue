<template>
  <component :is="userHome" />
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import Home from "../views/Landing.vue";
import AdminHome from "../views/AdminHome.vue";
import ClientHome from "../views/Browse.vue";
import ProviderHome from "../views/ProviderHome.vue";

export default Vue.extend({
  name: "HomeJuncture",
  components: {
    Home,
    AdminHome,
    ClientHome,
    ProviderHome,
  },
  props: {},
  computed: {
    ...mapGetters(["userRole"]),
    userHome() {
      return `${this.userRole}Home`;
    },
  },
});
</script>

<style scoped lang="scss"></style>
