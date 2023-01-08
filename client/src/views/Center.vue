<template>
  <div id="center">
    <div id="left">
      <header>
        <h2>Info</h2>
      </header>
      <dl>
        <dt>Address</dt>
        <dd>{{ center.address }}</dd>
        <dt>Rating</dt>
        <dd>{{ center.rating ?? "none" }}</dd>
      </dl>
    </div>
    <div id="right" class="">
      <vue-scheduler
        :users="users"
        :opening-times="openingTimes"
        :events="events"
        :format="format"
        :start-date="startDate"
        :options="schedulerOptions"
        @times-selected="timesSelected"
        @event-click="eventClicked"
        class="h-24"
      />
      <div class="w-full flex justify-around p-4">
        <button @click="startDateOffset -= 7">Back</button>
        <button @click="startDateOffset += 7">Forward</button>
      </div>
    </div>
    <div v-if="showCreateModal" class="modal">
      <div class="flex flex-col items-center">
        <h1 class="m-1">Confirm reservation request</h1>
        {{ newResStart }} <br />
        {{ newResEnd }}
      </div>
      <div class="flex justify-between">
        <button class="bg-red-500" @click="cancelNewRes">Cancel</button>
        <button class="bg-green-500" @click="saveNewRes">Save</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getCenter, makeAppointment } from "../services/requests";
import VueScheduler from "vue-calendar-scheduler";

export default Vue.extend({
  components: { VueScheduler },
  name: "Profile",
  props: {
    id: Number,
  },
  data() {
    return {
      center: {} as any,

      startDateOffset: 0,
      schedulerOptions: {
        weekDays: [0, 6],
      },
      users: [
        {
          id: 1,
          initials: "",
        },
      ],
      openingTimes: {
        open: "0700",
        close: "1500",
      },
      events: [] as any[],
      format: "week",

      showCreateModal: false,
      newResStart: null as any,
      newResEnd: null as any,

      showApproveModal: false,
      activeRes: {},
    };
  },
  computed: {
    user(): any {
      return this.$store.state.user;
    },
    startDate(): any {
      return new Date().setDate(new Date().getDate() + this.startDateOffset);
    },
  },
  mounted() {
    this.reloadCenter();
  },
  methods: {
    reloadCenter() {
      getCenter(this.id)
        .catch((err) => {
          console.log(err);
        })
        .then((res) => {
          this.center = res;

          this.events = [];

          this.center.appointments.forEach((termin: any) => {
            console.log("termin", termin);
            this.events.push({
              id: termin.id,
              user_id: 1,
              name: this.unavailabilityStatus(termin),
              start: termin.start,
              end: termin.end,
              unavailability: termin,
              color: this.colorForUnavailability(termin),
            });
          });
        });
    },
    timesSelected: function (selectedPeriod: any) {
      console.log("timesSelected", selectedPeriod);
      this.showCreateModal = true;

      this.newResStart = selectedPeriod.start;
      this.newResEnd = selectedPeriod.end;

      this.events.push({
        id: 0,
        user_id: 1,
        name: "New Reservation",
        start: selectedPeriod.start,
        end: selectedPeriod.end,
        color: "#808080",
      });
    },
    eventClicked: function (e: any) {
      console.log("eventClicked", e);
      this.showApproveModal = true;
      this.activeRes = e.unavailability;
    },
    cancelNewRes() {
      this.showCreateModal = false;
      this.events.pop();
    },
    saveNewRes() {
      makeAppointment({
        user_id: this.user.id,
        center_id: this.center.id,
        start: this.newResStart,
        end: this.newResEnd,
        token: this.$store.state.token,
      }).then(() => this.reloadCenter());
      this.showCreateModal = false;
    },
    colorForUnavailability(ua: any): any {
      const colors: any = {
        Unavailable: "#101010",
        Mine: "#32a852",
        Predefined: "#6495ed",
        Reserved: "#f28c28",
      };
      console.log(this.unavailabilityStatus(ua));
      return colors[this.unavailabilityStatus(ua)];
    },
    unavailabilityStatus(appointment: any): any {
      switch (appointment.status) {
        case "reserved":
          if (appointment[this.user.role + "_id"] == this.user.id)
            return "Mine";
          else return "Reserved";
        case "predefined":
          return "Predefined";
      }
    },
  },
});
</script>

<style scoped lang="scss">
#center {
  height: calc(100vh - 120px);
  width: 100%;
  padding-top: 120px;
  display: flex;
  position: relative;
  #left {
    width: 30%;
    height: 100%;
    background-color: #fff;
    padding: 20px;
    header {
      h2 {
        font-size: 1.5rem;
        font-weight: 500;
      }
    }
    dl {
      dt {
        font-weight: 500;
        font-size: 1.2rem;
      }
      dd {
        font-size: 1.1rem;
        margin-bottom: 10px;
      }
    }
  }
  #right {
    width: 70%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
  .modal {
    position: absolute;
    background: green;
    top: 50vh;
    left: 50vw;
    height: 300px;
    width: 300px;
    transform: translate(-50%, -50%);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10000;
  }
}
</style>
