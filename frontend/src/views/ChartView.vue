<template>
  <section class="container">
    
    <div class="columns">
      <div class="column">
        <BarChart :labels="labels" :attendees="attendees" />
      </div>
     
    </div>
  </section>
</template>


<script>
import BarChart from "./barChart";
import axios from "axios";
export default {
  name: "ChartView",
  components: {
    BarChart,
  },
  data() {
    return {
      labels: [],
      attendees: [],
    };
  }, methods: {
    async fetchData() {
      try {
        this.error = null;
        this.loading = true;
        const url =import.meta.env.VITE_ROOT_API + `/eventsData/totalAttendees`;
        const response = await axios.get(url);
        //"re-organizing" - mapping json from the response
        console.log(response)
        const labels = response.data.map((item) => item["eventName"]);
        const attendees = response.data.map((item) => item["totalAttendees"]);

        for (const i in labels) {
          this.labels[i] = labels[i]
        }
        for (const i in attendees) {
          this.attendees[i] = attendees[i]
        }
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: "Server Response",
            message: err.message,
          };
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: "Unable to Reach Server",
            message: err.message,
          };
        } else {
          // There's probably an error in your code
          this.error = {
            title: "Application Error",
            message: err.message,
          };
        }
      }
      this.loading = false;
    },
  },
  
  mounted() {
    // call the totalAttendees endpoint
    this.fetchData()
  },
};
</script>

