<template>
  <v-navigation-drawer
    clipped
    app
    :mobile-breakpoint="innerWidth < 961 ? 700 : 960"
    width="24%"
    mini-variant-width="100px"
    :mini-variant="LeftSidebar.mini || innerWidth < 960"
    v-model="leftbar"
    :temporary="LeftSidebar.temporary"
    :hidden="LeftSidebar.hide"
  >
    <v-container class="scrollbar">
      <v-list dense nav class="py-0">
        <SpeechRecognition></SpeechRecognition>

        <v-divider></v-divider>
        <v-list-item style="margin-top:10px;" two-line to="/">
          <v-img
            class="mx-2"
            src="@/assets/icons/Home.svg"
            height="30px"
            max-width="30px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="gray"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-list-item-content>
            <v-list-item-title>{{ $t("home") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item style="margin-top:10px;" two-line to="/public-feed">
          <v-img
            class="mx-2"
            src="@/assets/icons/PublicFeed.svg"
            height="30px"
            max-width="30px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="gray"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-list-item-content>
            <v-list-item-title>Public Feed</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line to="/trending">
          <v-img
            class="mx-2"
            src="@/assets/icons/Trending.svg"
            height="30px"
            max-width="30px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="gray"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-list-item-content>
            <v-list-item-title>{{ $t("trending") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <div
          v-if="loading"
          class="loading-bg pa-3"
          style="display: flex; border-radius:15px; height:65px;"
        >
          <div
            style="width:40px; height:40px; border-radius:40px;"
            class="loading-animation"
          ></div>
          <div
            style="width:120px; height:15px; border-radius:15px;"
            class="loading-animation ma-3"
          ></div>
        </div>
        <v-list-item v-else two-line :to="`/${user._id}`">
          <ProfileAvatar
            :status="user.status"
            class="mx-2"
            :borders="false"
            :size="30"
            :profilePic="user.profilePic"
          ></ProfileAvatar>

          <v-list-item-content>
            <v-list-item-title
              >{{ user.fname }} {{ user.lname }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line to="/chats">
          <v-img
            class="mx-2"
            src="@/assets/icons/Chats.svg"
            height="30px"
            max-width="30px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="gray"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-list-item-content>
            <v-list-item-title>{{ $t("chat") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line to="/watch-later">
          <v-img
            class="mx-2"
            src="@/assets/icons/WatchLater.svg"
            height="30px"
            max-width="30px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="gray"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-list-item-content>
            <v-list-item-title>{{ $t("watch_later") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item two-line to="/pages">
          <v-img
            class="mx-2"
            src="@/assets/icons/Pages.svg"
            height="30px"
            max-width="30px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="gray"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-list-item-content>
            <v-list-item-title>{{ $t("pages") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line to="/groups">
          <v-img
            class="mx-2"
            src="@/assets/icons/Groups.svg"
            height="30px"
            max-width="30px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="gray"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-list-item-content>
            <v-list-item-title>{{ $t("groups") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line to="/events">
          <v-img
            class="mx-2"
            src="@/assets/icons/Events.svg"
            height="30px"
            max-width="30px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="gray"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-list-item-content>
            <v-list-item-title>{{ $t("events") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item two-line to="/settings">
          <v-img
            class="mx-2"
            src="@/assets/icons/Settings.svg"
            height="30px"
            max-width="30px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="gray"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-list-item-content>
            <v-list-item-title>{{ $t("settings") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-container v-if="$route.path.includes('settings')">
          <v-list-item two-line to="/settings/profile">
            <v-img
              class="mx-2"
              src="@/assets/icons/Setting_General.svg"
              height="20px"
              max-width="20px"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="gray"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <v-list-item-content>
              <v-list-item-title>{{ $t("profile") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line to="/settings/language">
            <v-img
              class="mx-2"
              src="@/assets/icons/Setting_language.svg"
              height="20px"
              max-width="20px"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="gray"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <v-list-item-content>
              <v-list-item-title>{{ $t("language") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line to="/settings/privacy">
            <v-img
              class="mx-2"
              src="@/assets/icons/Setting_PrivacyAndSecSecurity.svg"
              height="20px"
              max-width="20px"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="gray"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <v-list-item-content>
              <v-list-item-title>{{ $t("privacy") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line to="/settings/appearance">
            <v-img
              class="mx-2"
              src="@/assets/icons/Setting_Appearance.svg"
              height="20px"
              max-width="20px"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="gray"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <v-list-item-content>
              <v-list-item-title>{{ $t("appearance") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line to="/settings/blocking">
            <v-img
              class="mx-2"
              src="@/assets/icons/Setting_Blocking.svg"
              height="20px"
              max-width="20px"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="gray"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <v-list-item-content>
              <v-list-item-title>{{ $t("blocking") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-container>
      </v-list>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import SpeechRecognition from "@/components/SpeechRecognition.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: true,
      leftbar: null,
      innerWidth: null,
    };
  },
  components: {
    SpeechRecognition,
  },
  watch: {
    leftbar(nevalue, oldvalue) {
      if (nevalue == true) {
        this.setDrawer(true);
      } else if (nevalue == false) {
        this.setDrawer(false);
      }
    },
    drawer(nevalue, oldvalue) {
      this.leftbar = nevalue;
    },
  },
  computed: {
    ...mapGetters(["user", "LeftSidebar", "drawer"]),
  },
  methods: {
    ...mapActions(["setDrawer", "getProfile"]),
  },
  async created() {
    this.innerWidth = window.innerWidth;
    this.leftbar = this.drawer;
    await this.getProfile();
    this.loading = false;
  },
};
</script>
