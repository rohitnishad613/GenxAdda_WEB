<template>
  <div>
    <v-snackbar
      top
      color="error"
      v-model="CreateStatusErrorsnackbar"
      v-if="createStatusErorr"
    >
      {{ createStatusErorr }}
      <v-icon @click="CreateStatusErrorsnackbar = false">mdi-close</v-icon>
    </v-snackbar>
    <v-snackbar
      top
      color="success"
      v-model="CreateStatusSuccsnackbar"
      v-else-if="createStatusSucc"
    >
      {{ createStatusSucc }}
      <v-icon @click="CreateStatusSuccsnackbar = false">mdi-close</v-icon>
    </v-snackbar>
    <v-dialog v-model="statusDialog" max-width="300px" width="90%">
      <template v-slot:activator="{ on }">
        <div>
          <div v-on="on">
            <v-row
              align="center"
              justify="center"
              style="border-radius: 50%;"
              class="statusPreview"
            >
              <v-avatar size="61">
                <v-icon color="white" x-large>mdi-plus</v-icon>
              </v-avatar>
            </v-row>
          </div>
          <span>Create</span>
        </div>
      </template>
      <v-card>
        <v-row align="center" justify="space-between" class="mx-2">
          <v-card-title>Create Status.</v-card-title>
          <v-btn icon @click="statusDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
        <v-divider class="mx-2"></v-divider>
        <div class="px-5 py-2" style="text-align:center;">
          <v-row justify="center" wrap>
            <label v-if="!photo && selectTEXT == false" for="Statusvideo">
              <v-row justify="center" align="center" class="Preview glandbg">
                <v-icon color="white" x-large>mdi-video</v-icon>
              </v-row>
            </label>
            <input
              class="hide_file_input"
              type="file"
              accept=".mp4, .mkv, .mov"
              ref="video"
              @change="selectStatusVideo"
              name="video"
              id="Statusvideo"
            />
            <label v-if="!video && selectTEXT == false" for="statusphoto">
              <v-row justify="center" align="center" class="Preview glandbg">
                <v-icon color="white" x-large>mdi-image-multiple</v-icon>
              </v-row>
            </label>
            <input
              class="hide_file_input"
              type="file"
              accept=".jpg, .png, .jpeg"
              name="photo"
              ref="photo"
              @change="selectStatusPhoto"
              id="statusphoto"
            />
            <v-row
              v-if="!photo && !video && selectTEXT == false"
              @click="selectTEXT = true"
              justify="center"
              align="center"
              class="Preview glandbg"
            >
              <v-icon color="white" x-large>mdi-text</v-icon>
            </v-row>
            <v-textarea
              class="mx-3 roundedTextarea"
              v-if="selectTEXT == true"
              v-model="text"
              outlined
            ></v-textarea>
          </v-row>
          <div class="upload" v-if="uploading">
            <v-progress-linear striped :value="progress" max="100" height="10px"
              >{{ progress }}%</v-progress-linear
            >
          </div>
          <v-text-field
            v-if="video || photo || text"
            v-model="descripton"
            label="Enter caption..."
            rounded
            outlined
          ></v-text-field>
          <v-btn rounded color="primary" @click="create()">Post Status</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      statusDialog: false,
      CreateStatusSuccsnackbar: false,
      CreateStatusErrorsnackbar: false,
      video: null,
      photo: null,
      selectTEXT: false,
      text: "",
      descripton: "",
    };
  },
  computed: mapGetters([
    "user",
    "createStatusSucc",
    "createStatusErorr",
    "progress",
    "uploading",
  ]),
  methods: {
    ...mapActions(["getProfile", "createStatus"]),
    selectStatusPhoto() {
      this.photo = this.$refs.photo.files[0];
      this.video = "";
    },
    selectStatusVideo() {
      this.video = this.$refs.video.files[0];
      this.photo = "";
    },
    handelGetProfile() {
      if (!this.user && !this.user._id) {
        this.getProfile();
      }
    },
    create() {
      if (this.video) {
        let fromData = new FormData();
        fromData.append("video", this.video);
        if (this.descripton) {
          fromData.append("description", this.descripton);
        }
        this.createStatus(fromData);
        this.CreateStatusSuccsnackbar = true;
        this.CreateStatusErrorsnackbar = true;
        this.statusDialog = false;
      } else if (this.photo) {
        let fromData = new FormData();
        fromData.append("photo", this.photo);
        if (this.descripton) {
          fromData.append("description", this.descripton);
        }
        this.createStatus(fromData);
        this.CreateStatusSuccsnackbar = true;
        this.CreateStatusErrorsnackbar = true;
        this.statusDialog = false;
      } else if (this.text) {
        let data = {};
        data.text = this.text;
        if (this.descripton) {
          data.description = this.descripton;
        }
        this.createStatus(data);
        this.CreateStatusSuccsnackbar = true;
        this.CreateStatusErrorsnackbar = true;
        this.statusDialog = false;
      }
    },
  },
  created() {
    this.handelGetProfile();
  },
};
</script>

<style>
.Preview {
  width: 120px;
  margin: 10px;
  height: 200px;
}
.glandbg {
  border-radius: 10px;
  background: rgb(255, 85, 0);
  background: -moz-linear-gradient(
    90deg,
    rgba(255, 85, 0, 0.9528186274509804) 0%,
    rgba(255, 139, 6, 1) 72%
  );
  background: -webkit-linear-gradient(
    90deg,
    rgba(255, 85, 0, 0.9528186274509804) 0%,
    rgba(255, 139, 6, 1) 72%
  );
  background: linear-gradient(
    90deg,
    rgba(255, 85, 0, 0.9528186274509804) 0%,
    rgba(255, 139, 6, 1) 72%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff5500",endColorstr="#ff8b06",GradientType=1);
}
.statusPreview {
  border-radius: 10px;
  background: rgb(255, 85, 0);
  background: -moz-linear-gradient(
    90deg,
    rgba(255, 85, 0, 0.9528186274509804) 0%,
    rgba(255, 139, 6, 1) 72%
  );
  background: -webkit-linear-gradient(
    90deg,
    rgba(255, 85, 0, 0.9528186274509804) 0%,
    rgba(255, 139, 6, 1) 72%
  );
  background: linear-gradient(
    90deg,
    rgba(255, 85, 0, 0.9528186274509804) 0%,
    rgba(255, 139, 6, 1) 72%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff5500",endColorstr="#ff8b06",GradientType=1);
  width: 65px;
  margin: 5px;
  height: 65px;
}
</style>
