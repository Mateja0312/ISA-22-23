<template>
    <div>
        <h1>Sada ce ti moji zabijaci dugova dug zabit</h1>
        <p>777</p>
        <p>777</p>
        {{ myFeedbacks }}
    </div>
</template>

<script lang="ts">
    import FeedbacksPending from "../components/FeedbacksPending.vue"
    import {myFeedbackHistory} from "../services/requests";
    export default {
        name: "FeedbackHistory",
        data() {
          return {
            myFeedbacks: [],
          }  
        },
        mounted() {
            myFeedbackHistory(this.$store.state.user.id)
            .then(res => {this.myFeedbacks = res});
        }}
</script>

<style lang="scss" scoped>

</style>