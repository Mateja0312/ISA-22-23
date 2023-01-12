<template>
    <div>
        <p>Idem ucoravo nasljepo necu karte ni gledat</p>
        <feedbacks-pending v-for="feedback in feedbackToRespondList"
            :key = "feedback.id"
            :feedback = "feedback"
        />
    </div>
</template>

<script>
    import Vue from "vue";
    import { getPendingFeedbacks } from "../services/requests";
    import FeedbacksPending from "../components/FeedbacksPending.vue"
    
    export default Vue.extend({
        components: { FeedbacksPending },
        name: "FeedbackResponseList",
        data() {
            return {
                feedbackToRespondList: [],
            }
        },
        mounted() {
            getPendingFeedbacks().then(res => {
                this.feedbackToRespondList = res;
            });
        },
    });
</script>

<style lang="scss" scoped>

</style>