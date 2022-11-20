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
  props: {
    labels: {
      type: Array,
      default: () => []
    },
    attendees: {
      type: Array,
      default: () => []
    }
     
  }, 
    
  
  
 
};
</script>

