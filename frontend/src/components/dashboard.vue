<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Dashboard</h1>
    </div>
    <div>
      <ChartViewVue :labels="labels" :attendees="attendees" />
    </div>
    <div class="px-10 pt-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Search Client By</h2>
        <!-- Displays Client Name search field -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy"
          >
            <option value="Client Name">Client Name</option>
            <option value="Client Number">Client Number</option>
          </select>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'Client Name'">
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="firstName"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter first name"
            />
          </label>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'Client Name'">
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="lastName"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter last name"
            />
          </label>
        </div>
        <!-- Displays Client Number search field -->
        <div class="flex flex-col" v-if="searchBy === 'Client Number'">
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            v-model="phoneNumber"
            v-on:keyup.enter="handleSubmitForm"
            placeholder="Enter Client Phone Number"
          />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div></div>
        <div></div>
        <div class="mt-5 grid-cols-2">
          <button
            class="mr-10 border border-red-700 bg-white text-red-700 rounded"
            @click="clearSearch"
            type="submit"
          >Clear Search</button>
          <button
            class="bg-red-700 text-white rounded"
            @click="handleSubmitForm"
            type="submit"
          >Search Client</button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">What Clients signed up for</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Event Name</th>
              <th class="p-4 text-left">Event Attendees </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr @click="editEvent(query._id)" v-for="query in queryData" :key="query._id">
              <td class="p-2 text-left">{{ query?.eventName??"unknown"}}</td>
              <td class="p-2 text-left">{{ query?.totalAttendees??0 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";
import ChartViewVue from "../views/ChartView.vue";
export default {
  components:{ChartViewVue},
  data() {
    return {
      queryData: [],
      labels:[],
      attendees:[],
      //Parameter for search to occur
      searchBy: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      event:{}
    };
  },
  mounted() {
    this.fetchData()
    window.scrollTo(0, 0);
  },
  methods: {
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
        this.queryData = response.data.map(item => ({eventName: item["eventName"], attendees: item["totalAttendees"]}))
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
    },
    handleSubmitForm() {
      let apiURL = "";
      if (this.searchBy === "Client Name") {
        apiURL =
          import.meta.env.VITE_ROOT_API +
          `/primaryData/search/?firstName=${this.firstName}&lastName=${this.lastName}&searchBy=name`;
      } else if (this.searchBy === "Client Number") {
        apiURL =
          import.meta.env.VITE_ROOT_API +
          `/primaryData/search/?phoneNumbers.primaryPhone=${this.phoneNumber}&searchBy=number`;
      }
      // axios.get(apiURL).then((resp) => {
      //  this.queryData = resp.data;
      // });
    },
    clearSearch() {
      //Resets all the variables
      this.searchBy = "";
      this.firstName = "";
      this.lastName = "";
      this.phoneNumber = "";

      //get all entries
      let apiURL = import.meta.env.VITE_ROOT_API + `/primaryData/`;
      // axios.get(apiURL).then((resp) => {
      // this.queryData = resp.data;
      // });
    },
    editEvent(eventID) {
      this.$router.push({ name: "eventdetails", params: { id: eventID } });
    },
  },
};
</script>

