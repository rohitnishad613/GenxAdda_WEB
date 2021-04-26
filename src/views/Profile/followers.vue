<template>
  <v-container>
    <v-card-title>Followes</v-card-title>
    <v-card-subtitle
      >{{ Auser.fname }} {{ Auser.lname }}, followers</v-card-subtitle
    >
    <v-card style="border-radius:20px;" class="box-shadow">
      <v-list>
        <v-list-item v-for="i in followers.length" :key="i">
          <v-row class="mx-3" align="center" justify="space-between">
            <v-row class="friend" align="center">
              <router-link :to="`/${followers[i - 1]._id}`">
                <ProfileAvatar
              :status="followers[i - 1].status"
                
                  class="mr-3"
                  :size="40"
                  :profilePic="followers[i - 1].profilePic"
                ></ProfileAvatar>
              </router-link>
              <router-link
                :style="{ color: $vuetify.theme.themes[theme].secondary }"
                :to="`/${followers[i - 1]._id}`"
              >
                <v-list-item-title
                  >{{ followers[i - 1].fname }}
                  {{ followers[i - 1].lname }}</v-list-item-title
                >
              </router-link>
            </v-row>
            <v-menu offset-y style="z-index:1;">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon>
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <v-list>
                <div v-if="Auser._id == user._id">
                  <v-list-item @click="dounfollow(followers[i - 1]._id, i - 1)">
                    <v-icon class="mr-2">mdi-cancel</v-icon>
                    <v-list-item-title class="pr-10"
                      >Unfollow</v-list-item-title
                    >
                  </v-list-item>
                  <v-divider></v-divider>
                </div>
                <Feedback></Feedback>
                <Report></Report>
              </v-list>
            </v-menu>
          </v-row>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Feedback from "@/components/Feedback.vue";
import Report from "@/components/Report.vue";

import axios from "axios";
export default {
  data() {
    return {
      followers: [],
    };
  },
  methods: {
    ...mapActions([
      "getProfile",
      "unblockuser",
      "unblockpage",
      "unblockgroup",
      "unfollow",
    ]),
    async getfollowers() {
      for (let i = 0; i < this.Auser.followers.length; i++) {
        let res = await axios.get(
          `${this.$API}/users/${this.Auser.followers[i]}`
        );
        this.followers.push(res.data.user);
      }
    },
    async dounfollow(requestedId, index) {
      this.unfollow(requestedId);
      this.user.followers.splice(index, 1);
    },
  },
  components: {
    Feedback,
    Report,
  },
  computed: {
    ...mapGetters(["user", "Auser"]),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  created() {
    this.getProfile();
    this.getfollowers();
    document.title = `${this.Auser.fname}, Followers  - GenxAdda`;
  },
  mounted() {
    console.clear();
  },
};
</script>

<style>
.bigcounte {
  font-size: 50px;
}
</style>
