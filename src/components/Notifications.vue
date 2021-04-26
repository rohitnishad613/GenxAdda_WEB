<template>
  <div>
    <div class="notificationList">
      <v-list>
        <v-list-item
          class="ma-0 pa-0"
          v-for="i in notifications_arr.length"
          :key="i"
        >
          <v-row align="center" justify="center">
            <div style="width:90%;">
              <v-list-item :to="`/${notifications_arr[i - 1].url}`">
                <ProfileAvatar
                  :profilePic="notifications_arr[i - 1].img"
                  :size="40"
                  class="mr-2"
                ></ProfileAvatar>
                <v-list-item-content>
                  <span>{{ notifications_arr[i - 1].msg }}</span>
                  <v-list-item-subtitle>{{
                    getDateTime(notifications_arr[i - 1].at)
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </div>
            <div>
              <v-menu offset-y style="z-index:1;">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" icon>
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title
                      @click="__delete(notifications_arr[i - 1]._id, i - 1)"
                      >Remove</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-row>
        </v-list-item>
        <div v-if="loading">
          <div v-for="i in 3" class="list_loading mb-4 pa-3" :key="i">
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
        <v-row v-else-if="notifications_arr.length == 0" align="center" justify="center">
          <v-card-subtitle>You have 0 notifications.</v-card-subtitle> 
        </v-row>
        <v-row v-if="!no_more_notifications" align="center" justify="center">
          <v-btn
          class="mt-2"
            @click="loadmoreNotifications(notifications_arr[notifications_arr.length - 1].at)"
            color="primary"
            >More</v-btn
          >
        </v-row>
      </v-list>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: true,
    };
  },
  computed: mapGetters(["user", "notifications_arr", "no_more_notifications"]),
  methods: {
    ...mapActions(["getProfile", "deleteNotification", "getNotifications", "getMoreNotifications", "seen_notifications"]),

    __delete(id, index) {
      this.deleteNotification(id);
      this.notifications_arr.splice(index, 1);
    },
    async HandlegetNotifications() {
      let dateTime = new Date().toISOString();
      await this.getNotifications(dateTime);
      this.loading = false;
    },
    async loadmoreNotifications(dateTime) {
      this.loading = true;
      await this.getMoreNotifications(dateTime);
      this.loading = false;
    },
    see_all_notifications() {
      this.seen_notifications();
    }
  },
  async created() {
    await this.getProfile();
    this.HandlegetNotifications();
    this.see_all_notifications();
  },
};
</script>
