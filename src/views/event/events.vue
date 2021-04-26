<template>
  <v-container>
    <v-row class="pa-0 ma-0" align="center" justify="space-between">
      <v-card-title>Events</v-card-title>
      <v-btn icon to="/create/event">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-card style="border-radius:20px;" class="box-shadow ma-3 mb-6">
      <v-card-title>Your Events</v-card-title>
      <div v-if="loading_myContent" class="list_loading pa-4">
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
      <div class="scrollBtn" v-else-if="myEvnets.length > 0">
        <v-btn @click="leftscroll()" x-large class="leftscrollbtn" icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <div class="EventsRow">
          <div v-for="i in myEvnets.length" :key="i">
            <router-link
              :to="{
                name: 'event',
                params: { id: myEvnets[i - 1]._id, event: myEvnets[i - 1] },
              }"
            >
              <v-card
                style=" border-radius: 15px;"
                class="eventBanner box-shadow"
              >
                <CoverPhoto :coverPhoto="myEvnets[i - 1].photos"></CoverPhoto>
                <p class="ma-0 pa-0">{{ myEvnets[i - 1].event_name }}</p>
                <v-card-subtitle class="ma-0 pa-0">{{
                  myEvnets[i - 1].description
                }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn block rounded color="primary">
                    <v-icon class="mr-1">mdi-star</v-icon>
                    Interested</v-btn
                  >
                </v-card-actions>
              </v-card>
            </router-link>
          </div>
        </div>
        <v-btn @click="rightscroll()" x-large class="rightscrollbtn" icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-card-subtitle v-else class="text-center pa-5"
        >No Events found</v-card-subtitle
      >
    </v-card>
    <v-card style="border-radius:20px;" class="box-shadow ma-3 mb-6">
      <v-card-title>Your Friend's Events</v-card-title>
      <div v-if="loading_joined" class="list_loading pa-4">
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
      <div class="scrollBtn" v-else-if="friendsEvents.length > 0">
        <v-btn @click="leftscroll()" x-large class="leftscrollbtn" icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <div class="EventsRow">
          <div v-for="i in friendsEvents.length" :key="i">
            <router-link
              :to="{
                name: 'event',
                params: {
                  id: friendsEvents[i - 1]._id,
                  event: friendsEvents[i - 1],
                },
              }"
            >
              <v-card
                style=" border-radius: 15px;"
                class="eventBanner box-shadow"
              >
                <CoverPhoto
                  :coverPhoto="friendsEvents[i - 1].photos"
                ></CoverPhoto>
                <p class="ma-0 pa-0">{{ friendsEvents[i - 1].event_name }}</p>
                <v-card-subtitle class="ma-0 pa-0">{{
                  friendsEvents[i - 1].description
                }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn block rounded color="primary">
                    <v-icon class="mr-1">mdi-star</v-icon>
                    Interested</v-btn
                  >
                </v-card-actions>
              </v-card>
            </router-link>
          </div>
        </div>
        <v-btn @click="rightscroll()" x-large class="rightscrollbtn" icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-card-subtitle v-else class="text-center pa-5"
        >No Events found</v-card-subtitle
      >
    </v-card>
    <v-card style="border-radius:20px;" class="box-shadow ma-3">
      <v-card-title>Pages Events</v-card-title>
      <div v-if="loading_sugg" class="list_loading pa-4">
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
      <div class="scrollBtn" v-else-if="pagesEvents.length > 0">
        <v-btn @click="leftscroll()" x-large class="leftscrollbtn" icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <div class="EventsRow">
          <div v-for="i in pagesEvents.length" :key="i">
            <router-link
              :to="{
                name: 'event',
                params: {
                  id: pagesEvents[i - 1]._id,
                  event: pagesEvents[i - 1],
                },
              }"
            >
              <v-card
                style=" border-radius: 15px;"
                class="eventBanner box-shadow"
              >
                <CoverPhoto
                  :coverPhoto="pagesEvents[i - 1].photos"
                ></CoverPhoto>
                <p class="ma-0 pa-0">{{ pagesEvents[i - 1].event_name }}</p>
                <v-card-subtitle class="ma-0 pa-0">{{
                  pagesEvents[i - 1].description
                }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn block rounded color="primary">
                    <v-icon class="mr-1">mdi-star</v-icon>
                    Interested</v-btn
                  >
                </v-card-actions>
              </v-card>
            </router-link>
          </div>
        </div>
        <v-btn @click="rightscroll()" x-large class="rightscrollbtn" icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-card-subtitle v-else class="text-center pa-5"
        >No Events found</v-card-subtitle
      >
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading_myContent: true,
      loading_joined: true,
      loading_sugg: true,
    };
  },
  computed: mapGetters(["myEvnets", "friendsEvents", "pagesEvents"]),
  methods: {
    ...mapActions(["getEvnets", "getFriendsEvnets", "getPagesEvnets"]),
  },
  created() {
    this.getEvnets();
    this.loading_myContent = false;
    this.getFriendsEvnets();
    this.loading_joined = false;
    this.getPagesEvnets();
    this.loading_sugg = false;
  },
  mounted() {
    document.title = `Events  - GenxAdda`;
    console.clear();
  },
};
</script>

<style scoped>
.scrollBtn {
  position: relative;
}

.scrollBtn .EventsRow {
  display: flex;
  overflow: auto;
  text-align: center;
}

.scrollBtn .leftscrollbtn {
  position: absolute;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  top: 50%;
  left: 0;
  z-index: 1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.scrollBtn .rightscrollbtn {
  position: absolute;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  top: 50%;
  right: 0;
  z-index: 1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.eventBanner {
  width: 300px;
  margin: 10px;
  padding: 10px;
}
</style>
