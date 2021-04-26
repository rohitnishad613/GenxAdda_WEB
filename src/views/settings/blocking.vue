<template>
  <v-card style="border-radius:20px;" class="box-shadow">
    <v-card-title>Blocking</v-card-title>
    <v-container>
      <v-card-subtitle>Blocked users.</v-card-subtitle>
      <div class="blocked_users" v-if="blocked_users.length > 0">
        <v-list v-for="i in blocked_users.length" :key="i">
          <v-list-item>
            <router-link :to="`/${blocked_users[i - 1]._id}`">
              <ProfileAvatar
                :size="40"
                :profilePic="blocked_users[i - 1].profilePic"
              ></ProfileAvatar>
            </router-link>
            <v-row justify="space-between" align="center">
              <router-link
                :style="{ color: $vuetify.theme.themes[theme].secondary }"
                :to="`/${blocked_users[i - 1]._id}`"
              >
                <v-list-item-title
                  >{{ blocked_users[i - 1].fname }}
                  {{ blocked_users[i - 1].lname }}</v-list-item-title
                >
              </router-link>
              <v-btn
                color="primary"
                @click="unblock_user(blocked_users[i - 1]._id)"
                small
                rounded
                >Unblock</v-btn
              >
            </v-row>
          </v-list-item>
        </v-list>
      </div>
      <div class="no-bloacked_user" v-else>
        <v-card-subtitle class="text-center pa-5"
          >No Blocked Users found</v-card-subtitle
        >
      </div>
      <v-card-subtitle>Blocked Groups.</v-card-subtitle>
      <div class="blocked_groups" v-if="blocked_groups.length > 0">
        <v-list v-for="i in blocked_groups.length" :key="i">
          <v-list-item>
            <router-link :to="`/${blocked_groups[i - 1]._id}`">
              <ProfileAvatar
                :size="40"
                :profilePic="blocked_groups[i - 1].profilePic"
              ></ProfileAvatar>
            </router-link>
            <v-row justify="space-between" align="center">
              <router-link
                :style="{ color: $vuetify.theme.themes[theme].secondary }"
                :to="`/${blocked_groups[i - 1]._id}`"
              >
                <v-list-item-title
                  >{{ blocked_groups[i - 1].fname }}
                  {{ blocked_groups[i - 1].lname }}</v-list-item-title
                >
              </router-link>
              <v-btn
                color="primary"
                @click="unblock_user(blocked_groups[i - 1]._id)"
                small
                rounded
                >Unblock</v-btn
              >
            </v-row>
          </v-list-item>
        </v-list>
      </div>
      <div class="no-bloacked_user" v-else>
        <v-card-subtitle class="text-center pa-5"
          >No Blocked Groups found</v-card-subtitle
        >
      </div>
      <v-card-subtitle>Blocked Pages.</v-card-subtitle>
      <div class="blocked_pages" v-if="blocked_pages.length > 0">
        <v-list v-for="i in blocked_pages.length" :key="i">
          <v-list-item>
            <router-link :to="`/${blocked_pages[i - 1]._id}`">
              <ProfileAvatar
                :size="40"
                :profilePic="blocked_pages[i - 1].profilePic"
              ></ProfileAvatar>
            </router-link>
            <v-row justify="space-between" align="center">
              <router-link
                :style="{ color: $vuetify.theme.themes[theme].secondary }"
                :to="`/${blocked_pages[i - 1]._id}`"
              >
                <v-list-item-title
                  >{{ blocked_pages[i - 1].fname }}
                  {{ blocked_pages[i - 1].lname }}</v-list-item-title
                >
              </router-link>
              <v-btn
                color="primary"
                @click="unblock_user(blocked_pages[i - 1]._id)"
                small
                rounded
                >Unblock</v-btn
              >
            </v-row>
          </v-list-item>
        </v-list>
      </div>
      <div class="no-bloacked_user" v-else>
        <v-card-subtitle class="text-center pa-5"
          >No Blocked Pages found</v-card-subtitle
        >
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      blocked_users: [],
      blocked_groups: [],
      blocked_pages: [],
    };
  },
  methods: {
    ...mapActions(["getProfile", "unblockuser", "unblockpage", "unblockgroup"]),
    async getblocked_users() {
      for (let i = 0; i < this.user.blocked_users.length; i++) {
        let res = await axios.get(
          `${this.$API}/users/${this.user.blocked_users[i]}`
        );
        this.blocked_users.push(res.data.user);
      }
    },
    async getblocked_groups() {
      for (let i = 0; i < this.user.blocked_groups.length; i++) {
        let res = await axios.get(
          `${this.$API}/users/${this.user.blocked_groups[i]}`
        );
        this.blocked_groups.push(res.data.user);
      }
    },
    async getblocked_pages() {
      for (let i = 0; i < this.user.blocked_pages.length; i++) {
        let res = await axios.get(
          `${this.$API}/users/${this.user.blocked_pages[i]}`
        );
        this.blocked_pages.push(res.data.user);
      }
    },
    async unblock_user(Id) {
      this.unblockuser(Id);
      let index = this.user.blocked_users.indexOf(Id);
      this.user.blocked_users.splice(index, 1);
    },
    async unblock_page(Id) {
      this.unblockpage(Id);
      let index = this.user.blocked_pages.indexOf(Id);
      this.user.blocked_pages.splice(index, 1);
    },
    async unblock_groups(Id) {
      this.unblockgroup(Id);
      let index = this.user.blocked_groups.indexOf(Id);
      this.user.blocked_groups.splice(index, 1);
    },
  },
  computed: {
    ...mapGetters(["user"]),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  created() {
    this.getProfile();
    this.getblocked_users();
    this.getblocked_groups();
    this.getblocked_pages();
  },
  mounted() {
    document.title = "Blocking settings - GenxAdda";
    console.clear();
  },
};
</script>

<style scoped></style>
