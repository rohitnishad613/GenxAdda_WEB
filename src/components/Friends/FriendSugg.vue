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
    <div v-else-if="FriendsSuggations.length > 0">
      <v-list v-for="i in FriendsSuggations.length" :key="i">
        <v-list-item
          v-if="
            FriendsSuggations[i - 1]._id != user._id &&
              user.friends.find((c) => c == FriendsSuggations[i - 1]._id) ==
                undefined &&
              user.blocked_users.indexOf(FriendsSuggations[i - 1]._id) == -1 &&
              user.friends_req_send.find(
                (c) => c.id == FriendsSuggations[i - 1]._id
              ) == undefined &&
              user.friends_req_received.find(
                (c) => c.id == FriendsSuggations[i - 1]._id
              ) == undefined
          "
          class="px-2"
        >
          <router-link :to="`/${FriendsSuggations[i - 1]._id}`">
            <ProfileAvatar
              :status="FriendsSuggations[i - 1].status"
            
              class="mr-3"
              :profilePic="FriendsSuggations[i - 1].profilePic"
            ></ProfileAvatar>
          </router-link>
          <v-list-item-content class="ma-0 pa-0">
            <router-link
              :style="{ color: $vuetify.theme.themes[theme].secondary }"
              :to="`/${FriendsSuggations[i - 1]._id}`"
            >
              <v-list-item-title
                class="ma-0 pa-0 ml-1"
                :to="`/${FriendsSuggations[i - 1]._id}`"
                >{{ FriendsSuggations[i - 1].fname }}
                {{ FriendsSuggations[i - 1].lname }}</v-list-item-title
              >
            </router-link>
            <v-list-item-subtitle class="ma-0 pa-1"
              >Why suggation</v-list-item-subtitle
            >
            <v-row class="ma-0 pa-0">
              <v-btn
                class="mt-1 mx-1"
                small
                v-if="
                  FriendsSuggations[i - 1].who_send_friendReq == 'Everyone' ||
                    (FriendsSuggations[i - 1].who_send_friendReq ==
                      'Only Followers' &&
                      user.followers.indexOf(FriendsSuggations[[i - 1]]._id) !=
                        -1)
                "
                @click="sendFriendRequest(FriendsSuggations[i - 1]._id, i - 1)"
                rounded
                color="primary"
                >Add Friend</v-btn
              >
              <v-btn class="mt-1 mx-1" small rounded>Remove</v-btn>
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
      >You dont have any Friend Suggations</v-card-subtitle
    >
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: true,
      FriendsSuggations: [],
    };
  },
  computed: {
    ...mapGetters(["user"]),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    ...mapActions(["getProfile", "sendFriendReq", "globalErrorHandler"]),

    async getFriendsSuggations() {
      axios
        .get(`${this.$API}/friends/friendssuggations`)
        .then((res) => {
          this.FriendsSuggations = res.data.friendssuggations;
        })
        .catch((error) => {
          this.globalErrorHandler(error);
        });
    },
    sendFriendRequest(requestedId, index) {
      this.sendFriendReq(requestedId);
      this.FriendsSuggations.splice(index, 1);
    },
  },
  async created() {
    this.getProfile();
    await this.getFriendsSuggations();
    this.loading = false;
  },
};
</script>
