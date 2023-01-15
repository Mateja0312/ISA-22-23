<template>
    <div>
        <h2>Center name: {{ appointment.center.name }}</h2>
        <p>Date of visit: {{ appointment.start.split("T")[0] }}</p>
        <p>Appointment time: 
            {{ appointment.start.split("T")[1].split(":")[0] }}:{{ appointment.start.split("T")[1].split(":")[1] }} - 
            {{ appointment.end.split("T")[1].split(":")[0] }}:{{ appointment.end.split("T")[1].split(":")[1] }}
        </p>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "CenterVisit",
    props: {
        appointment: Object,
    },
    mounted(){
            console.log("tip podatka datuma:", typeof this.appointment.start)
    },
})
</script>

<style lang="scss" scoped>

</style>