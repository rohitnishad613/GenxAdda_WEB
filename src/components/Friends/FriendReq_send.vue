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
    <div v-if="FriendsRequestsSend.length > 0">
      <v-list v-for="i in FriendsRequestsSend.length" :key="i">
        <v-list-item class="px-2">
          <router-link :to="`/${FriendsRequestsSend[i - 1]._id}`">
            <ProfileAvatar
              :status="FriendsRequestsSend[i - 1].status"
              class="mr-3"
              :profilePic="FriendsRequestsSend[i - 1].profilePic"
            ></ProfileAvatar>
          </router-link>

          <v-list-item-content class="ma-0 pa-0">
            <router-link
              :style="{ color: $vuetify.theme.themes[theme].secondary }"
              :to="`/${FriendsRequestsSend[i - 1]._id}`"
            >
              <v-list-item-title
                class="ma-0 pa-0 ml-1"
                :to="`/${FriendsRequestsSend[i - 1]._id}`"
                >{{ FriendsRequestsSend[i - 1].fname }}
                {{ FriendsRequestsSend[i - 1].lname }}</v-list-item-title
              >
            </router-link>
            <v-list-item-subtitle class="ma-0 pa-1">{{
              getDateTime(
                FriendsRequestsSend[i - 1].friends_req_received.find(
                  (c) => c.id == user._id
                ).receive_at
              )
            }}</v-list-item-subtitle>
            <v-row class="ma-0 pa-0">
              <v-btn
                class="mt-1 mx-1"
                small
                @click="
                  CancelFriendRequest(FriendsRequestsSend[i - 1]._id, i - 1)
                "
                rounded
                >Cancel Request</v-btn
              >
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-row justify="center">
        <v-btn rounded @click="getFriendsReqSended()" color="primary" small
          >Load more</v-btn
        >
      </v-row>
    </div>
    <v-card-subtitle v-else class="text-center pa-5"
      >You don't send any Friend Requests</v-card-subtitle
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
      FriendsRequestsSend: [],
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
      "CancelFriendReq",
      "globalErrorHandler",
    ]),
    async getFriendsReqSended() {
      axios
        .get(`${this.$API}/friends/myfriendsrequests`)
        .then((res) => {
          this.FriendsRequestsSend = res.data.myfriendsrequest;
        })
        .catch((error) => {
          this.globalErrorHandler(error);
        });
    },
    CancelFriendRequest(requestedId, index) {
      this.CancelFriendReq(requestedId);
      this.FriendsRequestsSend.splice(index, 1);
    },
  },
  async created() {
    await this.getProfile();
    await this.getFriendsReqSended();
    this.loading = false;
  },
};
</script>
