<template>
  <v-container>
    <v-card-title>Friends</v-card-title>
    <v-card-subtitle>Your friends</v-card-subtitle>
    <v-card style="border-radius:20px;" class="box-shadow">
      <FriendsList v-if="Auser.friends" :Auser="Auser"></FriendsList>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FriendsList from "@/components/Friends/Friends_list.vue";

import axios from "axios";
export default {
  computed: mapGetters(["Auser"]),
  components: {
    FriendsList,
  },
  methods: {
    ...mapActions(["getUser"]),
  },
  created() {
    this.getUser(this.$route.params.user);
    document.title = `${this.Auser.fname}, Friends  - GenxAdda`;
  },
  mounted() {
    console.clear();
  },
};
</script>
