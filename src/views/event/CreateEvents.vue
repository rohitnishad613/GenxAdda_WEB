<template>
  <v-container>
    <v-card style="border-radius:20px;" class="box-shadow mb-6">
      <v-container>
        <v-alert
          v-for="i in validationError.length"
          :key="i"
          text
          outlined
          type="error"
          dismissible
        >
          {{ validationError[i - 1] }}
        </v-alert>
      </v-container>
      <v-container>
        <v-alert v-if="EvnetsErrors" text outlined type="error" dismissible>
          {{ EvnetsErrors }}
        </v-alert>

        <v-alert v-if="success" text outlined type="success" dismissible>
          {{ success }}
        </v-alert>
      </v-container>
      <v-container>
        <v-menu offset-y style="z-index:10;">
          <template v-slot:activator="{ on }">
            <v-list-item style="border-radius:20px;" v-on="on">
              <v-col cols="2">
                <ProfileAvatar
                  :size="40"
                  :profilePic="host.profilePic"
                ></ProfileAvatar>
              </v-col>
              <v-col cols="10">
                <v-list-item-title class="ma-0">{{
                  host.name
                }}</v-list-item-title>
                <v-list-item-subtitle class="ma-0 pa-0">{{
                  host.type
                }}</v-list-item-subtitle>
              </v-col>
            </v-list-item>
          </template>
          <v-list>
            <v-list-item
              @click="
                changeHost(
                  user._id,
                  user.profilePic,
                  `${user.fname} ${user.lname}`,
                  'User'
                )
              "
            >
              <v-col cols="2">
                <ProfileAvatar
                  :size="40"
                  :profilePic="user.profilePic"
                ></ProfileAvatar>
              </v-col>
              <v-col cols="10">
                <p class="ma-0">{{ user.fname }} {{ user.lname }}</p>
              </v-col>
            </v-list-item>
            <v-divider v-if="joindpages.length != 0"></v-divider>
            <div class="pages" v-for="i in joindpages.length" :key="i">
              <v-list-item
                @click="
                  changeHost(
                    joindpages[i - 1]._id,
                    joindpages[i - 1].photo,
                    joindpages[i - 1].name,
                    'Page'
                  )
                "
              >
                <v-col cols="2">
                  <ProfileAvatar
                    :size="40"
                    :profilePic="joindpages[i - 1].pagePic"
                  ></ProfileAvatar>
                </v-col>
                <v-col cols="10">
                  <p class="ma-0">{{ joindpages[i - 1].name }}</p>
                </v-col>
              </v-list-item>
            </div>
          </v-list>
        </v-menu>
      </v-container>

      <v-container>
        <v-text-field
          v-model="eventName"
          label="Enter Event name"
          rounded
          outlined
        ></v-text-field>
      </v-container>

      <v-container>
        <v-textarea
          v-model="description"
          label="Enter Event description"
          rounded
          outlined
        ></v-textarea>
      </v-container>

      <v-container>
        <v-btn block rounded>
          <label for="photo">Select Photo</label>
        </v-btn>

        <input
          class="hide_file_input"
          type="file"
          accept=".jpg, .png, .jpeg"
          name="photo"
          ref="photo"
          @change="selectPhoto"
          id="photo"
        />
      </v-container>

      <v-row class="ma-0">
        <v-col>
          <v-menu offset-y style="z-index:10;">
            <template v-slot:activator="{ on }">
              <v-text-field
                label="Enter start date"
                v-model="startDate"
                rounded
                outlined
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker class="mx-1" v-model="startDate"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col>
          <v-menu offset-y style="z-index:10;">
            <template v-slot:activator="{ on }">
              <v-text-field
                label="Enter start time"
                v-model="startTime"
                rounded
                outlined
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker class="mx-1" v-model="startTime"></v-time-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row class="ma-0">
        <v-col>
          <v-menu offset-y style="z-index:10;">
            <template v-slot:activator="{ on }">
              <v-text-field
                label="Enter end date"
                v-model="endDate"
                rounded
                outlined
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker class="mx-1" v-model="endDate"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col>
          <v-menu offset-y style="z-index:10;">
            <template v-slot:activator="{ on }">
              <v-text-field
                label="Enter end time"
                v-model="endTime"
                rounded
                outlined
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker class="mx-1" v-model="endTime"></v-time-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-container>
        <v-text-field
          v-model="eventLocation"
          label="Enter Event location"
          rounded
          outlined
        ></v-text-field>
      </v-container>

      <v-container>
        <v-text-field
          v-model="eventURL"
          label="Enter online Event URL"
          rounded
          outlined
        ></v-text-field>
      </v-container>

      <v-container>
        <v-btn @click="submit()" rounded color="primary" block>
          <span>Creat Event</span>
        </v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Footer",
  data() {
    return {
      eventName: "",
      eventLocation: "",
      startTime: "",
      startDate: "",
      endTime: "",
      endDate: "",
      description: "",
      host: {
        id: "",
        profilePic: null,
        name: "",
        type: "",
      },
      photo: [],
      progress: null,
      joindpages: [],
      eventURL: "",
      validationError: [],
    };
  },
  computed: {
    ...mapGetters(["EvnetsErrors", "success", "user"]),
  },
  methods: {
    ...mapActions(["CreateEvnet", "getProfile"]),
    selectPhoto() {
      this.photo = this.$refs.photo.files[0];
    },
    selectHost() {
      this.host.id = this.user._id;
      this.host.profilePic = this.user.profilePic;
      this.host.name = `${this.user.fname} ${this.user.lname}`;
      this.host.type = "User";
    },
    changeHost(id, photo, name, type) {
      this.host.id = id;
      this.host.profilePic = photo;
      this.host.name = name;
      this.host.type = type;
    },
    async submit() {
      let formData = new FormData();
      if (this.photo) {
        formData.append("photo", this.photo);
      }
      if (this.host.type && this.host.id) {
        formData.append("host", this.host.type);
        formData.append("hostId", this.host.id);
      } else {
        this.validationError.push("Please select Event host.");
      }
      if (this.eventName) {
        formData.append("eventName", this.eventName);
      } else {
        this.validationError.push("Please Enter Event name.");
      }
      if (this.description) {
        formData.append("description", this.description);
      }
      if (this.eventLocation || this.eventURL) {
        if (this.eventLocation) {
          formData.append("eventLocation", this.eventLocation);
        }
        if (this.eventURL) {
          formData.append("eventURL", this.eventURL);
        }
      } else {
        this.validationError.push("Please Enter Event location or URL.");
      }
      if (this.startTime) {
        formData.append("startTime", this.startTime);
      } else {
        this.validationError.push("Event Start Time is required.");
      }
      if (this.startDate) {
        formData.append("startDate", this.startDate);
      } else {
        this.validationError.push("Event Start date is required.");
      }
      if (this.endDate) {
        formData.append("endDate", this.endDate);
      } else {
        this.validationError.push("Event End date is required.");
      }
      if (this.endTime) {
        formData.append("endTime", this.endTime);
      } else {
        this.validationError.push("Event End Time is required.");
      }

      if (this.validationError.length == 0) {
        this.CreateEvnet(formData);
      }
    },
  },
  async created() {
    await this.getProfile();
    this.selectHost();
  },
  mounted() {
    document.title = `Create new event  - GenxAdda`;
    console.clear();
  },
};
</script>
