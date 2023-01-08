<template>
    <div class="feedback">
        <input class="textarea" id="feedbackContent" placeholder="ovde se pise complaint"/>
        <search-result></search-result>
    </div>
</template>

<script>
import Vue from "vue";
import SearchResult from "../components/SearchResult.vue";

export default Vue.extend({
    component : SearchResult,
    name: "Feedback"
});
</script>

<style lang="scss" scoped>
html, body { height: 100%; }

.feedback{
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 10%;

    .textarea {
    width: 100%;
    height: 150px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    resize: none;
    }
}


</style>