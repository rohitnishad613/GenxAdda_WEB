<template>
  <v-app>
    <notifications
      width="450px"
      style="max-width:100%;"
      group="newNotifications"
    />
    <Navbar></Navbar>
    <v-main>
      <leftSideBar v-if="isLoggedIn"></leftSideBar>
      <transition name="router_transition">
        <router-view></router-view>
      </transition>
      <rightSideBar
        v-if="isLoggedIn && !$vuetify.breakpoint.xsOnly"
      ></rightSideBar>
    </v-main>
    <Footer v-if="!isLoggedIn"></Footer>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import rightSideBar from "@/components/rightSideBar.vue";
import leftSideBar from "@/components/leftSideBar.vue";
import Footer from "@/components/Footer.vue";
import { mapGetters, mapActions } from "vuex";
import io from "socket.io-client";

export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    ...mapActions(["ListeningForNotifications"]),
    i_am_alive(){
      if (this.isLoggedIn) {
        io(`${this.$API_url}/user_status`, {
          query: `token=${localStorage.getItem("token")}`,
        });
      }
    }
  },
  components: {
    Navbar,
    rightSideBar,
    leftSideBar,
    Footer,
  },
  created() {
    this.ListeningForNotifications();
    this.i_am_alive();
  },
};
</script>

<style>
.vue-notification {
  margin-top: 10px;
  margin-right: 10px;

  font-size: 17px;
}

.v-btn--active,
.v-list-item--active {
  color: #ff8b06 !important;
}

.v-list--nav .v-list-item,
.v-list--nav .v-list-item:before,
.v-list-item--link,
.v-list-item--link:before {
  border-radius: 13px;
  margin: 0px 3px;
}
</style>
