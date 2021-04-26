<template>
  <v-app-bar style="z-index:100; width:100%;" clipped-left app>
    <v-app-bar-nav-icon
      v-if="LeftSidebar.temporary || innerWidth < 701"
      @click="setDrawer(true)"
    ></v-app-bar-nav-icon>
    <v-avatar v-if="$mq != 'phone' || !isLoggedIn" size="35" class="mx-3" rounded>
      <v-img src="@/assets/logo.png">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="gray"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-avatar>
    <div :style="searchContainerCSS" class="searchBoxContainer">
      <v-menu v-if="isLoggedIn" offset-y style="z-index:101;">
        <template v-slot:activator="{ on }">
          <v-text-field
            @blur="searchContainerCSS = ''"
            flat
            v-on="on"
            @click="$mq == 'phone' ? mobileSearch() : getrecentSearch()"
            solo
            hide-details
            rounded
            prepend-inner-icon="mdi-magnify"
            :label="$t('search')"
            v-model="search"
            clearable
          />
        </template>
        <v-card>
          <div v-if="recentSearch.length > 0" class="recent">
            <v-card-title>{{ $t("recent_search") }}</v-card-title>
            <v-list v-for="i in recentSearch.length" :key="i">
              <v-row align="center" class="px-2" justify="space-between">
                <div style="width: calc(100% - 60px)" class="ml-2">
                  <v-list-item :to="`/${recentSearch[i - 1].url}`">
                    <v-list-item-title>{{
                      recentSearch[i - 1].title
                    }}</v-list-item-title>
                  </v-list-item>
                </div>
                <v-btn class="mr-3" icon @click="deleteRecentSearch(i - 1)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-row>
            </v-list>
          </div>
          <v-card-subtitle v-else class="text-center pa-5">{{
            $t("no_recent_search_found")
          }}</v-card-subtitle>
          <v-row v-if="search" align="center" justify="center">
            <v-btn rounded class="ma-2" color="primary" @click="do_search()">{{
              $t("search")
            }}</v-btn>
          </v-row>
        </v-card>
      </v-menu>
    </div>

    <v-spacer />

    <div
      v-if="loading && isLoggedIn"
      class="loading-bg pa-2"
      style="display: flex; border-radius:20px; height:45px;"
    >
      <div
        style="width:30px; height:30px; border-radius:30px;"
        class="loading-animation"
      ></div>
      <div
        style="width:60px; height:15px; border-radius:15px;"
        class="loading-animation ma-2"
      ></div>
    </div>
    <v-btn
      v-else-if="isLoggedIn"
      elevation="0"
      rounded
      :to="`/${user._id}`"
      class="px-2"
    >
      <ProfileAvatar
      :status="user.status"
        class="mr-2"
        :borders="false"
        :size="30"
        :profilePic="user.profilePic"
      ></ProfileAvatar>
      <span v-if="$mq != 'phone'">{{ user.fname }}</span>
    </v-btn>

    <v-menu
      v-if="isLoggedIn"
      offset-y
      :eager="true"
    >
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" rounded text>
          <v-icon>mdi-chevron-down</v-icon>
          <span>{{ $t("create") }}</span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/create/event">
          {{ $t("events") }}
        </v-list-item>
        <v-list-item to="/create/page">
          {{ $t("pages") }}
        </v-list-item>
        <v-list-item to="/create/group">
          {{ $t("groups") }}
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn v-if="isLoggedIn" to="/friends" icon>
      <v-icon small>mdi-account-multiple</v-icon>
    </v-btn>
    <v-badge
      offset-x="20"
      offset-y="20"
      color="red"
      overlap
      :value="!unseen_notifications <= 0"
      :content="unseen_notifications"
    >
      <v-btn v-if="isLoggedIn" to="/notifications" icon>
        <v-icon small>mdi-bell-ring</v-icon>
      </v-btn>
    </v-badge>
    <v-badge
      offset-x="20"
      offset-y="20"
      color="red"
      overlap
      :value="!unseen_chats <= 0"
      :content="unseen_chats"
    >
      <v-btn v-if="isLoggedIn" icon to="/chats">
        <v-icon small>mdi-chat</v-icon>
      </v-btn>
    </v-badge>
    <v-btn rounded elevation="0" v-if="!isLoggedIn" to="/login">{{
      $t("login")
    }}</v-btn>
    <v-btn rounded elevation="0" v-if="!isLoggedIn" to="/signup">{{
      $t("sign_up")
    }}</v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-if="isLoggedIn" to="/watch-later">
          <v-icon class="mr-2">mdi-clock</v-icon>
          <v-list-item-title class="pr-10">
            {{ $t("watch_later") }}
          </v-list-item-title>
        </v-list-item>
        <v-divider v-if="isLoggedIn"></v-divider>
        <v-list-item v-if="isLoggedIn" to="/settings/appearance">
          <v-icon class="mr-2">mdi-window-maximize</v-icon>
          <v-list-item-title class="pr-10">{{
            $t("apperence_preferences")
          }}</v-list-item-title>
        </v-list-item>
        <v-divider v-if="isLoggedIn"></v-divider>
        <Feedback></Feedback>
        <v-list-item to="/help">
          <v-icon class="mr-2">mdi-help-circle</v-icon>
          <v-list-item-title class="pr-10">{{
            $t("help_and_support")
          }}</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-if="isLoggedIn" to="/settings/profile">
          <v-icon class="mr-2">mdi-cog-outline</v-icon>
          <v-list-item-title class="pr-10">
            {{ $t("settings") }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-icon class="mr-2">mdi-brightness-4</v-icon>
          <v-list-item-title class="pr-10">{{
            $t("dark_mode")
          }}</v-list-item-title>
          <v-switch color="#ff8b06" v-model="darkmode"></v-switch>
        </v-list-item>
        <v-divider v-if="isLoggedIn"></v-divider>
        <v-list-item v-if="isLoggedIn" @click.prevent="logoutUser">
          <v-icon class="mr-2">mdi-logout</v-icon>
          <v-list-item-title>{{ $t("logout") }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Feedback from "@/components/Feedback.vue";
import axios from "axios";

export default {
  name: "Navbar",
  data() {
    return {
      searchContainerCSS: "",
      loading: true,
      darkmode: false,
      innerWidth: null,
      search: null,
      recentSearch: [],
      unseen_notifications: 0,
      unseen_chats: 0
    };
  },
  components: {
    Feedback,
  },
  computed: {
    ...mapGetters(["user", "isLoggedIn", "LeftSidebar"]),
  },
  watch: {
    darkmode: function(oldval, newval) {
      this.handledarkmode();
    },
  },

  methods: {
    ...mapActions(["logout", "getProfile", "setDrawer"]),
    logoutUser() {
      this.logout();
    },
    mobileSearch() {
      this.searchContainerCSS =
        "position: absolute; width:90vw; z-index: 150; transition: width 3s;";
      this.getrecentSearch();
    },
    do_search() {
      let query = this.search;
      // save the search to localStorage

      // get the existing searches
      let search = localStorage.getItem(`recentSearch`);

      // new search object to save in existing array.
      let search_obj = {
        url: `/search/${query}/all`,
        title: query,
      };

      // if existing search is exists
      if (search) {
        // then parace them to use as array
        search = JSON.parse(search);
        let duplicate_search_index = -1;
        let recentSearchLen = search.length;
        for (let i = 0; i < recentSearchLen; i++) {
          if (query == search[i].title) {
            duplicate_search_index = i;
            break;
          }
        }
        // then parace them to use as array
        if (duplicate_search_index > -1) {
          search.unshift(search_obj); // unshift means add item at the top of array (in 0 index)
          search.splice(duplicate_search_index, 1);
          // update this in localStorage
          let search_string = JSON.stringify(search);
          localStorage.setItem("recentSearch", search_string);
        } else {
          // use the FILO (Fist in Last Out)
          search.unshift(search_obj); // unshift means add item at the top of array (in 0 index)
          if (search.length > 10) {
            search.pop(); // remove the last item from the array if length is > 10 :)
          }
          // update this in localStorage
          let search_string = JSON.stringify(search);
          localStorage.setItem("recentSearch", search_string);
        }
      } else {
        // if user search frist time and there is no search history in localStorage
        let search_array = [search_obj];
        // stringify this because the localStorage support only string
        let search_string = JSON.stringify(search_array);
        localStorage.setItem("recentSearch", search_string);
      }

      this.$router.push(`/search/${query}/all` /* here 'all' is for filter */);
    },
    getrecentSearch() {
      // get last 10 searches
      let search = localStorage.getItem(`recentSearch`);
      // parace the array
      search = JSON.parse(search);
      if (search) {
        this.recentSearch = search;
      }
    },
    deleteRecentSearch(index) {
      let search = localStorage.getItem(`recentSearch`);
      // parace the array
      search = JSON.parse(search);
      search.splice(index, 1);
      let search_string = JSON.stringify(search);
      localStorage.setItem("recentSearch", search_string);
    },
    handledarkmode() {
      if (this.darkmode == true) {
        this.$vuetify.theme.dark = true;
        this.$cookies.set("DarkMode", true);
      } else if (this.darkmode == false) {
        this.$vuetify.theme.dark = false;
        this.$cookies.set("DarkMode", false);
      }
    },
    get_unseen_notifications(){
      axios.get(`${this.$API}/unseen/notifications`).then(res=>{
        this.unseen_notifications = res.data.unseen_notifications
      })
    },
    get_unseen_chats(){
      axios.get(`${this.$API}/unseen/chats`).then(res=>{
        this.unseen_chats = res.data.unseen_chats
      })
    }
  },
  async created() {
    this.innerWidth = window.innerWidth;
    if (this.$cookies.get("DarkMode")) {
      // cookies are not support boolen so convert string into a boolean

      var cookieValue =
        this.$cookies.get("DarkMode").toLowerCase() == "true" ? true : false;
      this.darkmode = cookieValue;
    } else {
      this.handledarkmode();
    }
    if (this.isLoggedIn) {
      await this.getProfile();
      this.loading = false;
      this.get_unseen_notifications();
      this.get_unseen_chats();
    }
  },
};
</script>

<style scoped>
.notificationContainer {
  max-height: 90vh;
}
</style>
