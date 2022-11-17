

<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome to the Dashboard</h1>
      
      <table class="w3-table w3-striped w3-bordered">

        <thead>
          <tr>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Alternative Phone Number</th>
              <th>Address Line 1</th>
              <th>Address Line 2</th>
              <th>City</th>
              <th>County</th>
              <th>Zip Code</th>           
          </tr>
        </thead>
        <body>

          <tr v-for="user_alias in User">
            <td>{{user_alias.first_name}}</td>
            <td>{{user_alias.middle_name}}</td>
            <td>{{user_alias.email}}</td>
            <td>{{user_alias.phonenumber}}</td>
            <td>{{user_alias.alternativephonenumber}}</td>
            <td>{{user_alias.address_line1}}</td>
            <td>{{user_alias.address_line2}}</td>
            <td>{{user_alias.city}}</td>
            <td>{{user_alias.county}}</td>
            <td>{{user_alias.zipcode}}</td>   
          </tr>
        </body>
      </table>
      




    </div>
  </main>
</template>

<script>
/* eslint-disable */

import axios from 'axios';
export default {
  name:'user',
  data() {
    return {
      User: [],

    }
    
  },
    mounted() {
    axios.get('http://127.0.0.1:5173/intakeform')
      .then((response) => {
        console.log(response.data);
        this.User = response.data;

      })
      .catch((error) => {
          console.log(error);
      });
  },
}
</script>



<!-- <script>
export default {
  methods: {
    routePush(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script> -->
