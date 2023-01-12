<template>
    <div>
        <p>Dajte da vam strina nacrta smajla protiv uroka</p>
        <p>ID feedbeka: {{ id }} </p>
        <p>Klijent je podneo sledecu zalbu: </p>
        <p> {{ feedback.content }}  </p>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { getFeedbackById } from "../services/requests"
    export default Vue.extend({
        name: "FeedbackRespond",
        props: {
            id: String,
        },
        data() {
            return {
                feedback: {} as any,
            };
        },
        mounted() {
            console.log(typeof(+this.id));
            console.log(+this.id);
            console.log(typeof(this.feedback));
            getFeedbackById(+this.id).then((res) => {
                this.feedback = res;
            });
        },
    });
</script>

<style lang="scss" scoped>

</style>