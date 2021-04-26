<template>
  <div>
    <div v-if="loading" class="mx-4">
      <div v-for="i in 6" class="list_loading pa-4 mb-4" :key="i">
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
    <div v-if="FriendRequests.length > 0">
      <v-list v-for="i in FriendRequests.length" :key="i">
        <v-list-item>
          <router-link :to="`/${FriendRequests[i - 1]._id}`">
            <ProfileAvatar
              :status="FriendRequests[i - 1].status"
              class="mr-3"
              :profilePic="FriendRequests[i - 1].profilePic"
            ></ProfileAvatar>
          </router-link>

          <v-list-item-content class="ma-0 pa-0">
            <router-link
              :style="{ color: $vuetify.theme.themes[theme].secondary }"
              :to="`/${FriendRequests[i - 1]._id}`"
            >
              <v-list-item-title class="ma-0 pa-0 ml-1"
                >{{ FriendRequests[i - 1].fname }}
                {{ FriendRequests[i - 1].lname }}</v-list-item-title
              >
            </router-link>
            <v-list-item-subtitle class="ma-0 pa-1">{{
              getDateTime(
                FriendRequests[i - 1].friends_req_send.find(
                  (c) => c.id == user._id
                ).send_at
              )
            }}</v-list-item-subtitle>
            <v-row class="ma-0 pa-0">
              <v-btn
                class="mt-1 mx-1"
                small
                @click="AcceptFriendRequest(FriendRequests[i - 1]._id, i - 1)"
                rounded
                color="primary"
                >Accept</v-btn
              >
              <v-btn
                class="mt-1 mx-1"
                small
                @click="RejectFriendRequest(FriendRequests[i - 1]._id, i - 1)"
                rounded
                >Reject</v-btn
              >
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-row justify="center">
        <v-btn rounded @click="getFriendsReq()" color="primary" small
          >Load more</v-btn
        >
      </v-row>
    </div>
    <v-card-subtitle v-else class="text-center pa-5"
      >You dont have any Friend Requests</v-card-subtitle
    >
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: true,
      FriendRequests: [],
    };
  },
  computed: {
    ...mapGetters(["user"]),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    ...mapActions([
      "getProfile",
      "RejectFriendReq",
      "AcceptFriendReq",
      "globalErrorHandler",
    ]),
    async getFriendsReq() {
      axios
        .get(`${this.$API}/friends/friendrequests`)
        .then((res) => {
          this.FriendRequests = res.data.friendsrequest;
        })
        .catch((error) => {
          this.globalErrorHandler(error);
        });
    },
    AcceptFriendRequest(requestedId, index) {
      this.AcceptFriendReq(requestedId);
      this.FriendRequests.splice(index, 1);
    },
    RejectFriendRequest(requestedId, index) {
      this.RejectFriendReq(requestedId);
      this.FriendRequests.splice(index, 1);
    },
  },
  async created() {
    await this.getProfile();
    await this.getFriendsReq();
    this.loading = false;
  },
};
</script>
