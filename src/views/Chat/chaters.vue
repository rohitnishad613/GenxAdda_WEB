<template>
  <v-container>
    <div v-if="loading">
      <div v-for="i in 5" class="list_loading mb-4 pa-3" :key="i">
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
    <v-list v-else-if="Chatters.length > 0" style="border-radius: 10px;">
      <div :key="i" v-for="i in Chatters.length" class="mx-2">
        <v-list-item
          :to="`/chats/${Chatters[i - 1]._id}`"
          two-line
          class="ma-0 pa-0"
        >
          <ProfileAvatar
              :status="Chatters[i - 1].status"
            class="mx-2"
            :size="50"
            :profilePic="Chatters[i - 1].profilePic"
          ></ProfileAvatar>
          <v-list-item-content>
            <v-list-item-title
              >{{ Chatters[i - 1].fname }}
              {{ Chatters[i - 1].lname }}</v-list-item-title
            >
              <v-list-item-subtitle v-if="Chatters[i - 1].chat">
                <span v-if="Chatters[i - 1].chat.seen || Chatters[i - 1].chat.sender_id == user._id">{{ Chatters[i - 1].chat.msg }}</span>
                <span class="not_readed" v-else>{{ Chatters[i - 1].chat.msg }}</span>
              </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-actions class="mr-4" v-if="Chatters[i - 1].chat">
            <v-icon v-if="Chatters[i - 1].chat.seen == false && Chatters[i - 1].chat.sender_id != user._id" small color="primary">mdi-brightness-1</v-icon>
          </v-list-item-actions>
        </v-list-item>
      </div>
    </v-list>
    <v-card-subtitle v-else class="text-center pa-5">{{
      $t("no_chats_found")
    }}</v-card-subtitle>

    <!-- chat list of users -->
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import io from "socket.io-client";

export default {
  data() {
    return {
      loading: true,
      Chatters: [],
    };
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"]),
    async getChatters() {
      try {
        let socket = io(`${this.$API_url}/chat`, {
          query: `token=${localStorage.getItem("token")}`,
        });
        socket.emit("GetChatter");
        socket.on("GetChatter", (data) => {
          if (data && data._id) {
            let ChtterLen = this.Chatters.length;
            if (ChtterLen == 0) {
              this.Chatters.unshift(data);
              this.loading = false;
            } else {
              let ChtterLen = this.Chatters.length;
              let IndexOfDup = -1;
              for (let i = 0; i < ChtterLen; i++) {
                if (this.Chatters[i]._id == data._id) {
                  IndexOfDup = i;
                  break;
                }
              }
              if (IndexOfDup > -1) {
                this.Chatters.splice(IndexOfDup, 1);
                this.Chatters.unshift(data);
                this.loading = false;
              } else {
                this.Chatters.unshift(data);
                this.loading = false;
              }
            }
          }
        });

        setTimeout(() => {
          this.loading = false;
        }, 3000);
      } catch (error) {
        this.globalErrorHandler(error);
      }
    },
  },
  async created() {
    await this.getProfile();
    this.getChatters();
  },
  mounted() {
    // check route because i use this as component in home route
    if (this.$route.path == "/chats") {
      document.title = `Chats  - GenxAdda`;
    }
    console.clear();
  },
};
</script>

<style scoped>
.not_readed{
  font-weight: 1000;
}
</style>
