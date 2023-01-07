<template>
  <div id="questionnaire">
    <header>
      <h2>Questions must be answered honestly.</h2>
    </header>
    <div id="question-container">
      <question
        v-for="(question, index) in questions"
        :key="question"
        :text="question"
        :index="index"
        v-model="myAnswers[index]"
      >
      </question>
    </div>

    <button @click="onSubmit">Submit</button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { questions, saveQuestionnaireInfo } from "../services/requests";
import question from "../components/Question.vue";

export default Vue.extend({
  components: { question },
  name: "Questionnaire",
  props: {},
  data() {
    return {
      questions: [],
      myAnswers: [],
    };
  },
  async mounted() {
    this.questions = await questions();
  },
  methods: {
    onSubmit() {
      saveQuestionnaireInfo({
        q_answers: this.myAnswers,
        client_id: this.$store.state.user.id,
      });
    },
  },
});
</script>

<style scoped lang="scss">
#questionnaire {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 10%;

  #question-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
