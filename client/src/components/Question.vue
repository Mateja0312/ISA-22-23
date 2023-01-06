<template>
    <div class="question">
      <label> {{qText}} </label>
      <div>
        <label for="yes">YES</label>
        <input type="radio" id="yes" :name="qText" value="YES" @input="updateValue"/>
        <label for="no">NO</label>
        <input type="radio" id="no" :name="qText" value="NO" @input="updateValue"/>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Questions",
  props: {
    qText: String,
    qNumber: String,
  },
  methods: {
    updateValue(event: any) {
      console.log("iz Question komponente", event.target.value)
      this.$emit('input', event.target.value)
    }
  },
});
</script>

<style scoped lang="scss">
.question {
    display: inline-block;
    margin: 5px;
  }
</style>