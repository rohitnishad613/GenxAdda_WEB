<template>
  <v-container>
    <v-container>
      <v-alert
        v-if="deleteSucc"
        text
        outlined
        type="success"
        icon="mdi-account"
        dismissible
        >This event is deleted.</v-alert
      >
      <CoverPhoto :coverPhoto="event.photos"></CoverPhoto>
      <v-row justify="space-between" align="center">
        <div>
          <v-card-title>{{ event.event_name }}</v-card-title>
          <v-card-subtitle>{{ event.description }}</v-card-subtitle>
        </div>
        <div>
          <v-btn
            class="ma-1"
            rounded
            color="primary"
            v-if="event.host_id == user._id"
            :to="{ name: 'EditEvent', params: { id: event._id, event: event } }"
          >
            <v-icon small>mdi-pencil</v-icon>
            <span>Edit</span>
          </v-btn>
          <v-btn
            class="ma-1"
            v-if="event.host_id == user._id"
            @click="Delete(event._id)"
            rounded
            color="primary"
          >
            <v-icon small>mdi-delete</v-icon>
            <span>Delete</span>
          </v-btn>
          <v-btn
            class="ma-1"
            v-if="event.joined.indexOf(user._id) == -1"
            @click="join(event._id)"
            rounded
          >
            <v-icon small>mdi-walk</v-icon>
            <span>Going</span>
          </v-btn>
          <v-btn
            class="ma-1"
            v-else-if="event.joined.indexOf(user._id) != -1"
            @click="unjoin(event._id)"
            rounded
            color="primary"
          >
            <v-icon small>mdi-walk</v-icon>
            <span>Not Going</span>
          </v-btn>
        </div>
      </v-row>
      <v-row justify="center" wrap>
        <v-card
          v-if="event.location"
          class="box-shadow eventSection"
          style=" border-radius:20px; "
        >
          <v-card-title>Location</v-card-title>
          <v-container>
            <p>{{ event.location }}</p>
          </v-container>
        </v-card>
        <v-card
          v-if="event.eventURL"
          class="box-shadow eventSection"
          style=" border-radius:20px; "
        >
          <v-card-title>Online event URL</v-card-title>
          <v-container>
            <v-card-subtitle class="py-0">
              <a :href="event.eventURL" target="_blank">
                {{ event.eventURL }}
              </a>
            </v-card-subtitle>
          </v-container>
        </v-card>
        <v-card
          v-if="
            event.start_date &&
              event.start_time &&
              event.end_date &&
              event.end_time
          "
          class="box-shadow eventSection"
          style=" border-radius:20px; "
        >
          <v-card-title>Timing</v-card-title>
          <v-container>
            <p class="ma-0 pa-0">Start date</p>
            <v-card-subtitle class="py-0">
              {{ event.start_date }}
            </v-card-subtitle>
            <p class="ma-0 pa-0">Start time</p>
            <v-card-subtitle class="py-0">
              {{ event.start_time }}
            </v-card-subtitle>
            <p class="ma-0 pa-0">End date</p>
            <v-card-subtitle class="py-0">{{ event.end_date }}</v-card-subtitle>
            <p class="ma-0 pa-0">End time</p>
            <v-card-subtitle class="py-0">{{ event.end_time }}</v-card-subtitle>
          </v-container>
        </v-card>
        <v-card class="box-shadow eventSection" style=" border-radius:20px; ">
          <v-card-title>Joined</v-card-title>
          <v-container>
            <v-list
              v-if="
                event.joined.length != 0 && event.joined.length == joined.length
              "
            >
              <v-list-item
                :to="`/${joined[i - 1]._id}`"
                v-for="i in joined.length"
                :key="i"
              >
                <v-col cols="2">
                  <v-row align="center" justify="center">
                    <ProfileAvatar
                      :size="40"
                      :profilePic="joined[i - 1].profilePic"
                    ></ProfileAvatar>
                  </v-row>
                </v-col>
                <v-col cols="10">
                  <p class="ma-0">
                    {{ joined[i - 1].fname }} {{ joined[i - 1].lname }}
                  </p>
                </v-col>
              </v-list-item>
            </v-list>
            <v-card-subtitle v-else class="text-center pa-5">
              0 joined
            </v-card-subtitle>
          </v-container>
        </v-card>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      event: null,
      joined: [],
      deleteSucc: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions([
      "getevent",
      "joinevent",
      "getProfile",
      "unjoinevent",
      "DeleteEvent",
    ]),
    async handulGetEvent() {
      if (this.$route.params.event && this.$route.params.event.event_name) {
        this.event = this.$route.params.event;
      } else {
        let event = await this.getevent(this.$route.params.id);
        this.event = event;
      }
    },
    async getjoineduser() {
      for (let i = 0; i < this.event.joined.length; i++) {
        let res = await axios.get(`${this.$API}/users/${this.event.joined[i]}`);
        this.joined.push(res.data.user);
      }
    },
    async join(eventid) {
      this.joinevent(eventid);
      this.event.joined.push(this.user._id);
    },
    async unjoin(eventid) {
      this.unjoinevent(eventid);
      let index = this.event.joined.indexOf(this.user._id);
      if (index != -1) {
        this.event.joined.splice(index, 1);
      }
    },
    async Delete(eventId) {
      let data = {};
      data.eventId = eventId;
      if (this.event.photos) {
        data.oldPhoto = this.event.photos;
      }
      let res = await this.DeleteEvent(data);
      if (res.status == 200) {
        this.deleteSucc = true;
      }
    },
  },
  async created() {
    await this.getProfile();
    await this.handulGetEvent();
    this.getjoineduser();
    document.title = `${this.event.name}  - GenxAdda`;
  },
  mounted() {
    console.clear();
  },
};
</script>

<style>
.eventphoto {
  width: 100%;
  max-height: 45vh;
}
.eventSection {
  width: 100%;
  max-width: 290px;
  margin: 10px;
  height: auto;
}
</style>
