<template>
    <div class="dashboard">
        <homepage-image id=requests img="No-Image-Placeholder.jpg" page="boats" title="Business Data"/>
        <homepage-image id=requests img="No-Image-Placeholder.jpg" page="boats" title="Manage Appointments"/><!--na ovoj stranici ce biti link za istoriju svih appointmenta vezanih za dodeljen centar-->
        <homepage-image id=requests img="No-Image-Placeholder.jpg" page="boats" title="Center Admin"/>
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
    width:calc(100% / 3);
    height:calc(100vh -  78px); 
    float:left;
  }
  </style>
  