<template>
  <div class="product m-2 rounded-lg">
    <img
      :src="require('../assets/products/' + product.image)"
      class="object-contain"
    />
    <div class="pdct-info p-2">
      <h2>{{ product.name }}</h2>
      <dl>
        <!-- <dt>Number of persons</dt>
        <dd>{{ reservation.nOfPeople }}</dd> -->
      </dl>
      <div class="pdct-ctrls">
        <button class="btn btn-blue" @click="onClick">View</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SearchResult",
  props: {
    product: Object,
  },
  methods: {
    onClick() {
      this.$router.push("product/" + this.product.id);
    },
  },
});
</script>

<style scoped lang="scss">
.product {
  display: flex;
  background-color: rgba(28, 28, 28, 0.7);
  height: 200px;
  width: 700px;
  .pdct-ctrls {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    .btn {
      @apply font-bold py-1 px-3 rounded;
    }
    .btn-blue {
      @apply bg-blue-500 text-white;
    }
    .btn-blue:hover {
      @apply bg-blue-700;
    }
  }
}
</style>
