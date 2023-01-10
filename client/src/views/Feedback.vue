<template>
  <div class="feedback">

    <p>What is this complaint about?</p>
    <button @click="modifyComplaintType" v-if="showEmployee">Employee</button>
    <button @click="modifyComplaintType" v-if="!showEmployee">Center</button>

    <label for="employee-names" v-if="showEmployee">Choose the employee:</label>
    <select name="employee-names" id="employee-names" v-if="showEmployee" v-model="employeeIdValue">
      <option v-for="employee in this.myInteractions.employees"
      :key="employee.id"
      :value="employee.id"
      >{{ employee.firstName }} {{ employee.lastName }}</option> 
    </select>

    <label for="center-names" v-if="!showEmployee">Choose the center:</label>
    <select name="center-names" id="center-names" v-if="!showEmployee" v-model="centerIdValue">
      <option v-for="center in this.myInteractions.centers"
      :key="center.id"
      :value="center.id"
      >{{ center.name }} ({{ center.address }})</option> 
    </select>

    <p>Input your feedback below: </p>
    <input
      class="textarea"
      id="feedbackContent"
      v-model="content"
      placeholder="ovde se pise complaint"
    />
    <button @click="onSubmit">Submit</button>
    <button>My Submissions (wip)</button>
  </div>
</template>

<!--treba implementirati dodatne preventivne mere:-->
<!--obezbediti da se ne moze submitovati feedback ukoliko nije odabran centar/radnik i popunjena forma-->
<!--obezbediti neki vid kontrole da li korisnik ima bar jedan uspesno izvrsen pregled pre nego moze da ucita/koristi stranicu za feedback-->

<script>
import Vue from "vue";
import { submitFeedback, getMyInteractions } from "../services/requests";

export default Vue.extend({
  name: "Feedback",
  data() {
    return {
      content: "",
      myInteractions: [],
      showEmployee: true,
      employeeIdValue: null,
      centerIdValue: null,
    };
  },
  mounted() {
    getMyInteractions({ token: this.$store.state.token }).then((res) => {
      this.myInteractions = res;
    });
  },
  methods: {
    onSubmit() {
      submitFeedback({
        content: this.content,
        client_id: this.$store.state.user.id,
        employee_id: this.employeeIdValue,
        center_id: this.centerIdValue,
      });
    },
    modifyComplaintType() {
      this.showEmployee = !this.showEmployee;
      if(this.showEmployee) this.centerIdValue = null;
      else this.employeeIdValue = null;
    }
  },
});
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
}

.feedback {
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
  .visible {
    display:block;
  }

  .hidden {
    display: none;
  }
}
</style>
