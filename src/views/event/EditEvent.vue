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
        <v-alert v-if="EditEvnetsErrors" text outlined type="error" dismissible>
          {{ EditEvnetsErrors }}
        </v-alert>

        <v-alert
          v-else-if="EditSuccess"
          text
          outlined
          type="success"
          dismissible
        >
          {{ EditSuccess }}
        </v-alert>
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
          <span>Save Event</span>
        </v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      oldEvent: null,
      eventName: "",
      eventLocation: "",
      startTime: "",
      startDate: "",
      endTime: "",
      endDate: "",
      description: "",
      photo: null,
      joindpages: [],
      eventURL: "",
      validationError: [],
    };
  },
  computed: {
    ...mapGetters(["EditEvnetsErrors", "EditSuccess", "user"]),
  },
  methods: {
    ...mapActions([
      "EditEvnetPhoto",
      "EditEvnetName",
      "EditEvnetDesc",
      "EditEvnetLocation",
      "EditEvnetURL",
      "EditEvnetStartDate",
      "EditEvnetStartTime",
      "EditEvnetEndDate",
      "EditEvnetEndTime",
      "getProfile",
      "getevent",
    ]),
    async handulDefultEvent() {
      if (this.$route.params.event && this.$route.params.event.event_name) {
        this.oldEvent = this.$route.params.event;
        let oldEvent = this.$route.params.event;
        (this.eventName = oldEvent.event_name),
          (this.eventLocation = oldEvent.location),
          (this.startTime = oldEvent.start_time),
          (this.startDate = oldEvent.start_date),
          (this.endTime = oldEvent.end_time),
          (this.endDate = oldEvent.end_date),
          (this.description = oldEvent.description),
          (this.eventURL = oldEvent.eventURL),
          (this.joindpages = []);
      } else {
        let event = await this.getevent(this.$route.params.id);
        this.oldEvent = event;
        let oldEvent = event;
        (this.eventName = oldEvent.event_name),
          (this.eventLocation = oldEvent.location),
          (this.startTime = oldEvent.start_time),
          (this.startDate = oldEvent.start_date),
          (this.endTime = oldEvent.end_time),
          (this.endDate = oldEvent.end_date),
          (this.description = oldEvent.description),
          (this.eventURL = oldEvent.eventURL),
          (this.joindpages = []);
      }
    },
    selectPhoto() {
      this.photo = this.$refs.photo.files[0];
    },
    async submit() {
      let oldEvent = this.oldEvent;
      if (this.photo) {
        let formData = new FormData();
        formData.append("photo", this.photo);
        let data = {
          eventid: this.oldEvent._id,
          formData: formData,
        };
        if (this.oldEvent.photos) {
          formData.append("oldPhoto", this.oldEvent.photos);
        }
        if (this.validationError.length == 0) {
          this.EditEvnetPhoto(data);
        }
      }
      if (this.eventName) {
        if (this.eventName != oldEvent.event_name) {
          let data = {
            eventid: this.oldEvent._id,
            formData: {
              eventName: this.eventName,
            },
          };
          if (this.validationError.length == 0) {
            this.EditEvnetName(data);
          }
        }
      } else {
        this.validationError.push("Please Enter Event name.");
      }
      if (this.description != oldEvent.description && this.description) {
        let data = {
          eventid: this.oldEvent._id,
          formData: {
            description: this.description,
          },
        };
        if (this.validationError.length == 0) {
          this.EditEvnetDesc(data);
        }
      }
      if (this.eventLocation || this.eventURL) {
        if (
          this.eventLocation != oldEvent.location ||
          this.eventURL != oldEvent.eventURL
        ) {
          if (this.eventLocation != oldEvent.location) {
            let data = {
              eventid: this.oldEvent._id,
              formData: {
                eventLocation: this.eventLocation,
              },
            };
            if (this.validationError.length == 0) {
              this.EditEvnetLocation(data);
            }
          }
          if (this.eventURL != oldEvent.eventURL) {
            let data = {
              eventid: this.oldEvent._id,
              formData: {
                eventURL: this.eventURL,
              },
            };
            if (this.validationError.length == 0) {
              this.EditEvnetURL(data);
            }
          }
        }
      } else {
        this.validationError.push("Please Enter Event location or URL.");
      }
      if (this.startTime) {
        if (this.startTime != oldEvent.start_time) {
          let data = {
            eventid: this.oldEvent._id,
            formData: {
              startTime: this.startTime,
            },
          };
          if (this.validationError.length == 0) {
            this.EditEvnetStartTime(data);
          }
        }
      } else {
        this.validationError.push("Event Start Time is required.");
      }
      if (this.startDate) {
        if (this.startDate != oldEvent.start_date) {
          let data = {
            eventid: this.oldEvent._id,
            formData: {
              startDate: this.startDate,
            },
          };
          if (this.validationError.length == 0) {
            this.EditEvnetStartDate(data);
          }
        }
      } else {
        this.validationError.push("Event Start date is required.");
      }
      if (this.endDate) {
        if (this.endDate != oldEvent.end_date) {
          let data = {
            eventid: this.oldEvent._id,
            formData: {
              endDate: this.endDate,
            },
          };
          if (this.validationError.length == 0) {
            this.EditEvnetEndDate(data);
          }
        }
      } else {
        this.validationError.push("Event End date is required.");
      }
      if (this.endTime) {
        if (this.endTime != oldEvent.end_time) {
          let data = {
            eventid: this.oldEvent._id,
            formData: {
              endTime: this.endTime,
            },
          };
          if (this.validationError.length == 0) {
            this.EditEvnetEndTime(data);
          }
        }
      } else {
        this.validationError.push("Event End Time is required.");
      }
    },
  },
  async created() {
    await this.getProfile();
    await this.handulDefultEvent();
    document.title = `${this.event.name}, posts  - GenxAdda`;
  },
  mounted() {
    console.clear();
  },
};
</script>
