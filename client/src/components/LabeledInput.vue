<template>
    <label for="labelValue">Email:</label>
    <input id="idValue" type="typeValue" v-model="inputValue" />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "LabeledInput",
  data() {
    return{
      labelValue: '',
      inputValue: '',
      typeValue: '',
      idValue: ''
    }
  },
  methods: {

  },
});
</script>