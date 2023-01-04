

<template>
  <div id="profile">
    <header>
      <h2>Info</h2>
    </header>
    <div>
      <p>{{ user.email }}</p>
      <editable-field
        id="user.firstName"
        :text.sync="user.firstName"
        @save="saveUserInfo"
      />
      <editable-field
        id="user.lastName"
        :text.sync="user.lastName"
        @save="saveUserInfo"
      />
      <p>{{ user.gender ? "Male" : "Female" }}</p>
      <editable-field
        id="user.country"
        :text.sync="user.country"
        @save="saveUserInfo"
      />
      <editable-field
        id="user.city"
        :text.sync="user.city"
        @save="saveUserInfo"
      />
      <editable-field
        id="user.address"
        :text.sync="user.address"
        @save="saveUserInfo"
      />
      <editable-field
        id="user.phone"
        :text.sync="user.phone"
        @save="saveUserInfo"
      />
      <editable-field
        id="user.profession"
        :text.sync="user.profession"
        @save="saveUserInfo"
      />
      <editable-field
        id="user.institution"
        :text.sync="user.institution"
        @save="saveUserInfo"
      />
    </div>
    <button class="btn btn-red" @click="deleteAccount">Delete Account</button>
  </div>
</template>
<!--
Treba dodati sliku na pozadinu tako da cela stranica bude prekirvena 
-->
<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import EditableField from "../components/EditableField.vue";
import { updateClientInfo } from "../services/requests";

export default Vue.extend({
  components: { EditableField },
  name: "Profile",
  props: {},
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    saveUserInfo() {
      this.$store.commit("setUser", this.user);
      console.log(this.user.firstName + ' ' + this.user.lastName);
      updateClientInfo(this.user);
    },
    deleteAccount() {
      if (confirm("Are you sure you want to delete your account?")) {
        this.user.active = false;
        this.saveUserInfo();
        this.$emit("requestLogout");
      }
    },
  },
});
</script>

<style scoped lang="scss">
#profile {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 10%;

  .btn {
    @apply font-bold py-1 px-3 rounded;
    position: fixed;
    bottom: 10%;
    right: 10%;
  }
  .btn-red {
    @apply bg-red-500 text-white;
  }
  .btn-red:hover {
    @apply bg-red-700;
  }

  .base {
    background: rgba(27, 27, 27, 0.65);
    color: white;
    font-family: "Times New Roman";
  }

  #header {
    @extend .base;
  }
  #card {
    @extend .base;
  }

  #info {
    @extend .base;
  }
}
</style>