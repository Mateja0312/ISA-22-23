<template>
  <div class="dashboard">
      <homepage-image id=requests img="No-Image-Placeholder.jpg" page="boats" title="Requests Approval"/>
      <homepage-image id=requests img="No-Image-Placeholder.jpg" page="boats" title="Requests Approval"/>
      <homepage-image id=requests img="No-Image-Placeholder.jpg" page="boats" title="Requests Approval"/>
      <homepage-image id=requests img="cottage1.jpg" page="request_approval" title="Requests Approval"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HomepageImage from '../components/HomepageImage.vue';

export default Vue.extend({
  name: 'AdminHome',
  components: {
    HomepageImage
  }
});



</script>

<style scoped lang="scss">
.homepage-image{
  width:calc(100% / 4);
  height:calc(100vh -  78px); 
  float:left;
}
</style>
