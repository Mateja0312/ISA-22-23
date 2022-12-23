<template>
  <div>
    <nav id="navbar">
      <router-link to="/">Početna</router-link>
      <router-link to="/about">O nama</router-link>
      <router-link to="/profile" v-if="isLoggedIn">Profil</router-link>
      <router-link to="/login" v-if="!isLoggedIn">Prijava</router-link>
      <a href="/" v-if="isLoggedIn" @click.prevent="logout">Odjava</a>
      <router-link to="/registration" v-if="!isLoggedIn"
        >Registracija</router-link
      >
    </nav>
    <main>
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "Navbar",
  props: {},
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    logout() {
      this.$store.commit("setToken", null);
      this.$store.commit("setUser", { role: "" });
      if (this.$route.name != "Home") this.$router.push("/");
    },
  },
});
</script>

<style scoped lang="scss">
#navbar {
  padding: 30px;
  background-color: #2c3e50;

  a {
    font-weight: bold;
    color: white;
    margin: 0px 5px;

    &.router-link-exact-active {
      color: black;
    }
  }
}
</style>
