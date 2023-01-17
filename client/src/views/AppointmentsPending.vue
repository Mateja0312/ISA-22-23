<template>
    <div>
        <p>al picone donio brasno</p>
        {{appointments}}
    </div>
</template>

<script lang="ts">
    import { getPendingAppointments } from "@/services/requests";
import Vue from "vue";
    export default Vue.extend({
        data(){
            return {
                appointments: [] as any
            }
        },
        mounted() {
            getPendingAppointments(this.$store.state.user.id)
            .then(res => {
                this.appointments = res
            })
        },
    })
</script>

<style lang="scss" scoped>

</style>