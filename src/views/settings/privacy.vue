<template>
  <v-card style="border-radius:20px;" class="box-shadow">
    <v-card-title>Privacy</v-card-title>
    <v-container>
      <v-list>
        <v-list-item>
          <v-row>
            <v-list-item-subtitle
              >Who can send you friend rquests</v-list-item-subtitle
            >
            <v-select
              v-model="friendsReq_privacy"
              :items="privacy_ops"
            ></v-select>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-list-item-subtitle
              >Who can see your friend list</v-list-item-subtitle
            >
            <v-select
              v-model="friendsList_privacy"
              :items="normal_ops"
            ></v-select>
          </v-row>
        </v-list-item>
      </v-list>
      <v-container>
        <v-btn @click="updateUserPrivacy()" color="primary" rounded block
          >Save</v-btn
        >
      </v-container>
      <div v-for="i in msg.length" :key="i">
        <div v-if="msg[i - 1] == 'Done.'">
          <v-alert
            text
            type="success"
            outlined
            icon="mdi-account"
            dismissible
            >{{ msg[i - 1] }}</v-alert
          >
        </div>
        <div v-else>
          <v-alert text type="error" outlined icon="mdi-account" dismissible>{{
            msg[i - 1]
          }}</v-alert>
        </div>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      friendsReq_privacy: "Everyone",
      posts_privacy: "Everyone",
      pages_privacy: "Friends",
      groups_privacy: "Friends",
      events_privacy: "Followers",
      friendsList_privacy: "Everyone",
      invit_ops: ["Friends", "Followers", "Nobody"],
      normal_ops: ["Everyone", "Friends", "Followers"],
      privacy_ops: ["Everyone", "Only Followers"],
      yesNo_ops: ["Yes", "No"],
      msg: [],
    };
  },

  methods: {
    ...mapActions(["getProfile"]),

    async updateUserPrivacy() {
      this.msg = [];

      if (
        this.friendsReq_privacy == "Everyone" ||
        this.friendsReq_privacy == "Only Followers"
      ) {
        if (this.friendsReq_privacy != this.user.who_send_friendReq) {
          let res = await axios.put(
            `${this.$API}/users/privacy/friendrequest/${this.friendsReq_privacy}`
          );
          this.msg.push(res.data.msg);
          this.getProfile();
        }
      } else {
        this.msg.push("The given option is not valid.");
      }

      if (
        this.friendsList_privacy == "Everyone" ||
        this.friendsList_privacy == "Friends" ||
        this.friendsList_privacy == "Followers"
      ) {
        if (this.friendsList_privacy != this.user.who_see_friendList) {
          let res = await axios.put(
            `${this.$API}/users/privacy/friendlist/${this.friendsList_privacy}`
          );
          this.msg.push(res.data.msg);
          this.getProfile();
        }
      } else {
        this.msg.push("The given option is not valid.");
      }
      if (
        this.posts_privacy == "Everyone" ||
        this.posts_privacy == "Only Followers"
      ) {
        if (this.posts_privacy != this.user.who_see_posts) {
          let res = await axios.put(
            `${this.$API}/users/privacy/postsPrivacy/${this.posts_privacy}`
          );
          this.msg.push(res.data.msg);
          this.getProfile();
        }
      } else {
        this.msg.push("The given option is not valid.");
      }

      this.msg = this.msg.filter((v, i, a) => a.indexOf(v) === i);
    },
  },
  computed: mapGetters(["user"]),
  created() {
    this.getProfile();
    this.friendsReq_privacy = this.user.who_send_friendReq;
    this.friendsList_privacy = this.user.who_see_friendList;
    this.pages_privacy = this.user.who_invite_pages;
    this.groups_privacy = this.user.who_invite_groups;
    this.events_privacy = this.user.who_invite_events;
    this.posts_privacy = this.user.who_see_posts;
  },
  mounted() {
    document.title = "Privacy settings - GenxAdda";
    console.clear();
  },
};
</script>

<style scoped></style>
