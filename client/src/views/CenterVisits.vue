<template>
    <div>
        <p>husein kapetan gradascevic sa krvavih njiva</p>
        <p>nabodi ga spicom ustomak</p>
        <p>--------------------------------------------</p>
        <button id="dateButton" style="font-weight: bold" @click="sortByStart">Date ({{ orderDate }})</button>
        <button id="lengthButton" style="font-weight: normal" @click="sortByLength">Lenght ({{ orderLength }})</button>
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
            dateSort: true,
            lengthSort: true,
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
            this.dateSort = !this.dateSort;//ako ti bude bacao ovde "object possibly null" samo u tsconfig.json ubaci: "strictNullChecks":false,
            document.getElementById("dateButton").style.fontWeight = "bold";
            document.getElementById("lengthButton").style.fontWeight = "normal";
            this.appointments = this.appointments.sort((a:any, b:any) => {
                if(this.dateSort)
                {
                    this.orderDate = "asc";
                    return a.startTimeInSeconds - b.startTimeInSeconds;
                }
                else
                {
                    this.orderDate = "desc";
                    return b.startTimeInSeconds - a.startTimeInSeconds;
                }
            });
        },
        sortByLength(){
            this.lengthSort = !this.lengthSort;
            document.getElementById("lengthButton").style.fontWeight = "bold";
            document.getElementById("dateButton").style.fontWeight = "normal";
            this.appointments = this.appointments.sort((a:any, b:any) => {
                if(this.lengthSort)
                {
                    this.orderLength = "asc";
                    return a.lengthInSeconds - b.lengthInSeconds;
                }
                else
                {
                    this.orderLength = "desc";
                    return b.lengthInSeconds - a.lengthInSeconds;
                }
            });
        }
    }
})
</script>

<style scoped>

</style>