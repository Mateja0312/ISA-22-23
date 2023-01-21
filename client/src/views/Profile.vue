<template>
  <div id="profile">
    <header>
      <h2>Info</h2>
    </header>
    <div>
      <p>{{ user.email }}</p>
      <label for="user.firstName">Name</label>
      <editable-field
        id="user.firstName"
        :text.sync="user.firstName"
        @save="saveUserInfo"
      />
      <label for="user.lastName">Surname</label>
      <editable-field
        id="user.lastName"
        :text.sync="user.lastName"
        @save="saveUserInfo"
      />
      <p>{{ user.gender ? "Male" : "Female" }}</p>
      <label for="user.address">Address</label>
      <editable-field
        id="user.address"
        :text.sync="user.address"
        @save="saveUserInfo"
      />
      <label for="user.city">City</label>
      <editable-field
        id="user.city"
        :text.sync="user.city"
        @save="saveUserInfo"
      />
      <label for="user.lastName">Country</label>
      <editable-field
        id="user.country"
        :text.sync="user.country"
        @save="saveUserInfo"
      />
      <label for="user.phone">Phone</label>
      <editable-field
        id="user.phone"
        :text.sync="user.phone"
        @save="saveUserInfo"
      />
      <label for="user.JMBG">JMBG</label>
      <editable-field
        id="user.JMBG"
        :text.sync="user.JMBG"
        @save="saveUserInfo"
      />
      <label for="user.profession">Profession</label>
      <editable-field
        id="user.profession"
        :text.sync="user.profession"
        @save="saveUserInfo"
      />
      <label for="user.institution">Institution</label>
      <editable-field
        id="user.institution"
        :text.sync="user.institution"
        @save="saveUserInfo"
      />
    </div>
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
      updateClientInfo(this.user);
    },
  },
});
</script>

<style scoped lang="scss">
#profile {
  padding: 50px;
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
