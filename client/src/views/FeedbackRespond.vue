<template>
    <div>
        <p>Dajte da vam strina nacrta smajla protiv uroka</p>
        <p>ID feedbeka: {{ id }} </p>
        <p>Klijent je podneo sledecu zalbu: </p>
        <p> {{ feedback.content }}  </p>
        <p>Input your response below: </p>
        <input
        class="responsearea"
        id="responseContent"
        placeholder="Enter your response"
        />
        <button>Submit</button>
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
.responsearea {
    width: 100%;
    height: 150px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    resize: none;
  }
</style>