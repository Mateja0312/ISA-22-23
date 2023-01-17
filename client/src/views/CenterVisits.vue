<template>
    <div>
        <p>husein kapetan gradascevic sa krvavih njiva</p>
        <p>nabodi ga spicom ustomak</p>
        <p>--------------------------------------------</p>
        <button id="dateButton" :class="{ bold: dateSort }" @click="sortByStart">Date ({{ orderDate }})</button>
        <button id="lengthButton" :class="{ bold: lengthSort }" @click="sortByLength">Lenght ({{ orderLength }})</button>
        <CenterVisit v-for="a in appointments"
        :key="a.id"
        :appointment="a"/>
    </div>
</template>

<script lang="ts">
import CenterVisit from '@/components/CenterVisit.vue';
import { getCompletedAppointments } from '../services/requests';
import Vue from 'vue'

export default Vue.extend({
    name: "CenterVisits",
    components: { CenterVisit },
    data() {
        return {
            appointments: [] as any,
            dateSort: false,
            lengthSort: false,
            orderDate: 'asc',
            orderLength: 'asc',
            pomDate: Date as any,
        }
    },
    mounted() {
        getCompletedAppointments(this.$store.state.user.id).then(res => {
            this.appointments = res
            for(var a in this.appointments){
                this.appointments[a].startTimeInSeconds = new Date(this.appointments[a].start).getTime()
                this.appointments[a].lengthInSeconds = new Date(this.appointments[a].end).getTime() - this.appointments[a].startTimeInSeconds
            }
        });
    },
    methods: {
        //ove sortove bi u sustini trebalo ubaciti u switch case kako bi se moglo sortirati npr opadajuce po datumu ali rastuce po trajanju (recimo da u istom danu ima vise apointmenta koji su bili razlicitog trajanja)
        sortByStart(){
            this.dateSort = true;
            this.lengthSort = false;
            this.orderDate = this.orderDate == 'asc' ? 'desc' : "asc";
            this.appointments = this.appointments.sort((a:any, b:any) => {
                return (a.startTimeInSeconds - b.startTimeInSeconds) * (this.orderDate == 'asc' ? 1 : -1)
            });
        },
        sortByLength(){
            this.dateSort = false;
            this.lengthSort = true;
            this.orderLength = this.orderLength == 'asc' ? 'desc' : "asc";
            this.appointments = this.appointments.sort((a:any, b:any) => {
                return (a.lengthInSeconds - b.lengthInSeconds) * (this.orderLength == 'asc' ? 1 : -1)
            });
        }
    }
})
</script>

<style scoped>
.bold {
    font-weight: bold
}

</style>