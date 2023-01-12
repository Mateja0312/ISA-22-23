<template>
    <div>
        <p>Idem ucoravo nasljepo necu karte ni gledat</p>
        <FeedbackToRespondTo v-for="feedback in feedbackToRespondList"
            :key = "feedback.id"
            :feedback = "feedback"
        />
    </div>
</template>

<script>
    import Vue from "vue";
    import { getFeedbacksToRespondTo } from "../services/requests";
    import FeedbackToRespondTo from "../components/FeedbackToRespondTo.vue"
    
    export default Vue.extend({
        components: { FeedbackToRespondTo },
        name: "FeedbackResponseList",
        data() {
            return {
                feedbackToRespondList: [],
            }
        },
        mounted() {
            getFeedbacksToRespondTo().then(res => {
                this.feedbackToRespondList = res;
            });
        },
    });
</script>

<style lang="scss" scoped>

</style>