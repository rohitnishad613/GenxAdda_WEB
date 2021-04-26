<template>
  <v-container>
    <v-card-title>About</v-card-title>
    <v-card style="border-radius:20px;" class="text-center box-shadow">
      <v-card-title>Contect info</v-card-title>
      <v-row class="mx-5" align="center">
        <span>Phone:</span>
        <v-card-subtitle>{{
          Auser.phone ? Auser.phone : "Not available"
        }}</v-card-subtitle>
      </v-row>
      <v-row class="mx-5" align="center">
        <span>Email:</span>
        <v-card-subtitle>{{
          Auser.email ? Auser.email : "Not available"
        }}</v-card-subtitle>
      </v-row>
      <v-card-title>Privacy</v-card-title>
      <v-row class="mx-5" align="center">
        <span>Who can send friend rquests:</span>
        <v-card-subtitle>{{
          Auser.who_send_friendReq ? Auser.who_send_friendReq : "Not available"
        }}</v-card-subtitle>
      </v-row>
      <v-row class="mx-5" align="center">
        <span>Who can see friend list:</span>
        <v-card-subtitle>{{
          Auser.who_see_friendList ? Auser.who_see_friendList : "Not available"
        }}</v-card-subtitle>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["Auser"]),
  mounted() {
    document.title = `${this.Auser.fname}, about  - GenxAdda`;
    console.clear();
  },
};
</script>
