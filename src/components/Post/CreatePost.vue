<template>
  <v-container>
    <v-dialog v-model="createPostDialog" max-width="600px" width="90%">
      <template v-slot:activator="{ on }">
        <v-card style="border-radius:20px;" class="box-shadow">
          <v-btn rounded block color="primary" v-on="on">Create Post</v-btn>
        </v-card>
      </template>
      <v-card class="pa-3">
        <v-row align="center" justify="space-between" class="mx-2">
          <v-card-title>Create Post</v-card-title>
          <v-btn icon @click="createPostDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
        <v-row class="mx-2 mb-0 mt-2">
          <ProfileAvatar
              :status="user.status"

            :size="50"
            :profilePic="user.profilePic"
          ></ProfileAvatar>
          <v-textarea
            outlined
            label="Write something here."
            v-model="text"
            ref="text"
            type="text"
            name="text"
            class="ml-2 roundedTextarea"
          >
          </v-textarea>
        </v-row>
        <v-row align="center" justify="center">
          <div class="otherPosts">
            <div class="video">
              <v-btn :disabled="video_dis" block color="primary" rounded>
                <label for="full_video">Video</label>
              </v-btn>
              <input
                class="hide_file_input"
                type="file"
                accept=".mp4, .mkv, .mov"
                name="full_video"
                ref="full_video"
                @change="selectVideo"
                id="full_video"
              />
            </div>
            <div class="audio">
              <v-btn :disabled="audio_dis" block color="primary" rounded>
                <label for="audio">Audio</label>
              </v-btn>
              <input
                class="hide_file_input"
                type="file"
                accept=".mp3, .wav, .mpeg"
                name="audio"
                ref="audio"
                @change="selectAudio"
                id="audio"
              />
            </div>
            <div class="photo">
              <v-btn :disabled="photo_dis" block color="primary" rounded>
                <label for="photo">Photo</label>
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
            </div>
            <div class="gifs">
              <v-btn block color="primary" rounded @click="gif_show = !gif_show"
                >GIFs</v-btn
              >
            </div>
          </div>
          <v-container v-if="gif_show">
            <v-container>
              <v-text-field
                v-model="gif"
                v-show="gif_show"
                rounded
                outlined
                label="Search Gifs"
              ></v-text-field>
            </v-container>
          </v-container>
          <v-row v-if="msg || uploading" align="center" justify="center">
            <v-col cols="10">
              <v-alert
                v-if="msg"
                text
                outlined
                :type="`${!err ? 'success' : 'error'}`"
                :icon="`${!err ? 'mdi-check-bold' : 'mdi-alert-circle'}`"
                dismissible
                >{{ msg }}</v-alert
              >
            </v-col>
            <v-col v-if="uploading" cols="10">
              <v-progress-linear
                striped
                :value="progress"
                max="100"
                height="20px"
                >{{ progress }}%</v-progress-linear
              >
            </v-col>
          </v-row>
        </v-row>
        <v-row align="center" justify="space-between" class="mx-2">
          <v-select v-model="privacy" :items="privacy_ops"></v-select>
          <v-col cols="3">
            <v-btn block rounded color="primary" @click="sendData()"
              >POST</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

import Posts from "@/components/Post/Posts.vue";

export default {
  props: ["groupid", "pageid"],
  computed: mapGetters(["user"]),
  data() {
    return {
      createPostDialog: false,
      uploading: false,
      progress: 0,
      photo: "",
      video: "",
      audio: "",
      photo_dis: false,
      video_dis: false,
      audio_dis: false,
      short_video_dis: false,
      text: "",
      gif: "",
      msg: "",
      privacy: "Public",
      gif_show: false,
      err: false,
      privacy_ops: ["Public", "Friends"],
    };
  },
  comments: {
    Posts,
  },
  methods: {
    ...mapActions(["getProfile","globalErrorHandler"]),
    selectPhoto() {
      this.video = "";
      this.audio = "";
      this.audio_dis = true;
      this.video_dis = true;
      this.short_video_dis = true;
      this.photo = this.$refs.photo.files[0];
    },
    selectVideo() {
      this.video = this.$refs.full_video.files[0];
      this.photo = "";
      this.audio = "";
      this.photo_dis = true;
      this.short_video_dis = true;
      this.audio_dis = true;
    },
    selectAudio() {
      this.audio = this.$refs.audio.files[0];
      this.video = "";
      this.photo = "";
      this.photo_dis = true;
      this.short_video_dis = true;
      this.video_dis = true;
    },
    async sendData() {
      try {
        let formData = new FormData();
        formData.append("who_can_see", this.privacy);
        if (this.photo) {
          formData.append("photo", this.photo);
        } else if (this.video) {
          formData.append("video", this.video);
        } else if (this.audio) {
          formData.append("audio", this.audio);
        }
        if (this.text) {
          formData.append("text", this.text);
        }
        if (this.groupid) {
          formData.append("groupid", this.groupid);
        } else if (this.pageid) {
          formData.append("pageid", this.pageid);
        }

        if (this.video || this.photo || this.audio || this.text) {
          this.uploading = true;
          await axios
            .post(this.$API + "/posts/post", formData, {
              onUploadProgress: (e) => {
                this.progress = Math.round((e.loaded * 100) / e.total);
              },
            })
            .then((res) => {
              if (res.data) {
                this.uploading = false;
                this.msg = "Posted successfully.";
                this.err = false;
                this.photo = "";
                this.video = "";
                this.audio = "";
                this.text = "";
                this.video_dis = false;
                this.audio_dis = false;
                this.photo_dis = false;
                this.createPostDialog = false;
                // this.posts.push(res.data.insertedPost);
              }
            }) .catch((error) => {
          this.globalErrorHandler(error);
        });
        }
      } catch (err) {
        this.msg = err.response.data.err;
        this.err = true;
        this.photo = "";
        this.uploading = false;
      }
    },
  },
  created() {
    this.getProfile();
  },
};
</script>

<style>
.otherPosts {
  justify-content: center;
  align-content: center;
  display: flex;
  flex-wrap: wrap;
}

.otherPosts > div {
  padding: 10px;
  width: 250px;
  height: 50px;
}

[type="file"]::-webkit-file-upload-button {
  width: 0px;
  height: 0px;
  position: fixed;
  display: none;
  visibility: hidden;
}
</style>
