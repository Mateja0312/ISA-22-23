<template>
    <div class="feedback">
        <input
        class="textarea"
        id="feedbackContent"
        v-model="content"
        placeholder="ovde se pise complaint"/>
        <label for="dog-names">Choose a dog name:</label>
        <select name="dog-names" id="dog-names">
            <option value="rigatoni">Rigatoni</option> <!-- opcije ce se praviti pomocu v-for elementa -->
            <option value="dave">Dave</option>
            <option value="pumpernickel">Pumpernickel</option>
            <option value="reeses">Reeses</option>
        </select>
        <p>Negde treba nekako prikazati listu zaposlenih i centara sa kojima je korisnik interagovao</p>
        <button @click="onSubmit">Submit</button>
        {{ myInteractions }}
    </div>
</template>

<script>
import Vue from "vue";
import { submitFeedback, getMyInteractions } from "../services/requests";

export default Vue.extend({
    name: "Feedback",
    data() {
        return{
            content: "",
            myInteractions: [],
        };
    },
    mounted() {
        getMyInteractions({client_id: this.$store.state.user.id}).then((res) => {
            this.myInteractions = res;
        });
    },
    methods:{
        onSubmit(){
            submitFeedback({
                content: this.content,
                client_id: this.$store.state.user.id,
                employee_id: 1, // za sad hard kodovano, ove podatke verovatno treba izvuci preko liste korisnikovih appointmenta pa izvuci zaposlene i centre sa kojima je interagovano
                center_id: 1,
            });
        },
    },
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