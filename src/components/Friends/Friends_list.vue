<template>
  <v-list
    v-if="
      Auser._id == user._id ||
        Auser.who_see_friendList == 'Everyone' ||
        (Auser.who_see_friendList == 'Friends' &&
          Auser.friends.indexOf(user._id) != -1) ||
        (Auser.who_see_friendList == 'Followers' &&
          user.followers.indexOf(Auser._id) != -1)
    "
    ><div v-if="loading" class="mx-4">
      <div v-for="i in 3" class="list_loading pa-4 mb-4" :key="i">
        <div style="display: flex">
          <div
            style="border-radius: 50px; height: 50px; width:50px;"
            class="loading-bg loading-animation"
          ></div>
          <div
            style="border-radius: 20px; height: 20px; width:150px;"
            class="loading-bg loading-animation ma-4"
          ></div>
        </div>
      </div>
    </div>
    <div v-else-if="friends.length > 0">
      <v-list-item v-for="i in friends.length" :key="i">
        <v-row class="mx-3" align="center" justify="space-between">
          <v-row class="friend" align="center">
            <router-link :to="`/${friends[i - 1]._id}`">
              <ProfileAvatar
              :status="friends[i - 1].status"
                class="mr-3"
                :size="40"
                :profilePic="friends[i - 1].profilePic"
              ></ProfileAvatar>
            </router-link>
            <router-link
              :style="{ color: $vuetify.theme.themes[theme].secondary }"
              :to="`/${friends[i - 1]._id}`"
            >
              <v-list-item-title
                >{{ friends[i - 1].fname }}
                {{ friends[i - 1].lname }}</v-list-item-title
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
                <v-list-item @click="dounfriend(friends[i - 1]._id, i - 1)">
                  <v-icon class="mr-2">mdi-cancel</v-icon>
                  <v-list-item-title class="pr-10">Unfriend</v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
              </div>
              <Feedback></Feedback>
              <Report></Report>
            </v-list>
          </v-menu>
        </v-row>
      </v-list-item>
    </div>
    <v-card-subtitle v-else class="pa-6 text-center">
      No friend found
    </v-card-subtitle>
  </v-list>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import Report from "@/components/Report.vue";
import Feedback from "@/components/Feedback.vue";

export default {
  props: ["Auser"],
  data() {
    return {
      loading: true,
      friends: [],
    };
  },
  components: {
    Report,
    Feedback,
  },
  computed: {
    ...mapGetters(["user"]),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    ...mapActions(["getProfile", "unfriend", "globalErrorHandler"]),
    getfriends() {
      if (this.Auser.friends) {
        for (let i = 0; i < this.Auser.friends.length; i++) {
          axios
            .get(`${this.$API}/users/${this.Auser.friends[i]}`)
            .then((res) => {
              this.friends.push(res.data.user);
            })
            .catch((error) => {
              this.globalErrorHandler(error);
            });
        }
      }
    },
    dounfriend(requestedId, index) {
      this.unfriend(requestedId);
      this.friends.splice(index, 1);
    },
  },
  async created() {
    await this.getProfile();
    await this.getfriends();
    this.loading = false;
  },
};
</script>
