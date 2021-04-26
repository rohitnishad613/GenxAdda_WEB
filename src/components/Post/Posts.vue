<template>
  <v-container>
    <v-card
      v-for="i in posts.length"
      :key="i"
      style="border-radius:20px;"
      class="box-shadow mb-6"
    >
      <v-row class="mx-2" align="center" justify="space-between">
        <v-row class="mx-1" align="center">
          <router-link :to="`/${posts[i - 1].admin._id}`">
            <ProfileAvatar
              :status="posts[i - 1].admin.status"
              :size="50"
              :profilePic="posts[i - 1].admin.profilePic"
            ></ProfileAvatar>
          </router-link>
          <div>
            <router-link
              :style="{ color: $vuetify.theme.themes[theme].secondary }"
              :to="`/${posts[i - 1].admin._id}`"
            >
              <v-card-title
                >{{ posts[i - 1].admin.fname }}
                {{ posts[i - 1].admin.lname }}</v-card-title
              >
              <v-card-subtitle>{{
                getDateTime(posts[i - 1].date)
              }}</v-card-subtitle>
            </router-link>
          </div>
        </v-row>
        <v-menu offset-y style="z-index:1;">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list>
            <div>
              <v-list-item v-if="$route.path == '/watch-later'" @click="removeWatchLater(posts[i - 1]._id)">
                <v-icon class="mr-2">mdi-bookmark-remove</v-icon>
                <v-list-item-title class="pr-10"
                  >Delete from watch later</v-list-item-title
                >
              </v-list-item>
              <v-list-item v-else @click="saveWatchLater(posts[i - 1]._id)">
                <v-icon class="mr-2">mdi-bookmark-plus</v-icon>
                <v-list-item-title class="pr-10"
                  >Save to watch later</v-list-item-title
                >
              </v-list-item>
              <v-divider></v-divider>
            </div>
            <Feedback></Feedback>
            <Report v-if="posts[i - 1].admin._id != user._id"></Report>
            <v-divider></v-divider>
            <v-list-item
              v-if="posts[i - 1].admin._id != user._id"
              @click="blockadmin(posts[i - 1].admin._id, i - 1)"
            >
              <v-icon class="mr-2">mdi-cancel</v-icon>
              <v-list-item-title class="pr-10"
                >Block {{ posts[i - 1].admin.fname }}
                {{ posts[i - 1].admin.lname }}</v-list-item-title
              >
            </v-list-item>
            <div v-if="posts[i - 1].admin._id == user._id">
              <v-divider></v-divider>
              <v-list-item
                v-if="posts[i - 1].comments != -1"
                @click="turnoffcomment(posts[i - 1]._id)"
              >
                <v-icon class="mr-2">mdi-comment-remove</v-icon>
                <v-list-item-title class="pr-10"
                  >Turn off commenting</v-list-item-title
                >
              </v-list-item>
              <v-list-item
                v-if="posts[i - 1].comments == -1"
                @click="turnoncomment(posts[i - 1]._id)"
              >
                <v-icon class="mr-2">mdi-comment</v-icon>
                <v-list-item-title class="pr-10"
                  >Turn on commenting</v-list-item-title
                >
              </v-list-item>
              <v-list-item
                @click="
                  deletePost(
                    posts[i - 1]._id,
                    i - 1,
                    posts[i - 1].video
                      ? posts[i - 1].video
                      : posts[i - 1].audio
                      ? posts[i - 1].audio
                      : posts[i - 1].photo
                      ? posts[i - 1].photo
                      : ''
                  )
                "
              >
                <v-icon class="mr-2">mdi-delete</v-icon>
                <v-list-item-title class="pr-10">Delete</v-list-item-title>
              </v-list-item>
            </div>
          </v-list>
        </v-menu>
      </v-row>

      <v-row align="center" justify="center">
        <v-container>
          <v-col v-if="posts[i - 1].text" cols="12">{{
            posts[i - 1].text
          }}</v-col>
          <v-col v-if="posts[i - 1].photo" cols="12">
            <v-img :src="`${$API_url}/${posts[i - 1].photo}`" width="100%">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="gray"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
          <v-col v-else-if="posts[i - 1].video" cols="12">
            <VideoPlayer
              :controller="true"
              :src="`${$API_url}/${posts[i - 1].video}`"
            ></VideoPlayer>
          </v-col>
          <v-col v-else-if="posts[i - 1].audio" cols="12">
            <AudioPlayer
              :src="`${$API_url}/${posts[i - 1].audio}`"
            ></AudioPlayer>
          </v-col>
        </v-container>
      </v-row>

      <v-container
        v-if="
          posts[i - 1].likes.length != 0 ||
            posts[i - 1].comments != 0 ||
            posts[i - 1].shares.length != 0
        "
      >
        <v-divider class="mb-2"></v-divider>
        <v-row class="mx-4" justify="space-between">
          <v-row align="center" justify="start" class="likeCount">
            <v-icon small class="mx-2">mdi-thumb-up</v-icon>
            <span>{{ posts[i - 1].likes.length }}</span>
          </v-row>

          <v-row
            align="center"
            justify="end"
            v-if="posts[i - 1].comments != 0 || posts[i - 1].shares.length != 0"
            class="commentCount"
          >
            <v-icon v-if="posts[i - 1].comments != 0" small class="mx-2"
              >mdi-comment-multiple</v-icon
            >
            <span v-if="posts[i - 1].comments != 0">{{
              posts[i - 1].comments
            }}</span>
            <v-icon v-if="posts[i - 1].shares.length" small class="mx-2"
              >mdi-share-variant</v-icon
            >
            <span v-if="posts[i - 1].shares.length">{{
              posts[i - 1].shares.length
            }}</span>
          </v-row>
        </v-row>
        <v-divider class="mt-2"></v-divider>
      </v-container>

      <v-row class="mx-2" justify="space-around">
        <v-btn
          @click="
            posts[i - 1].likes.includes(user._id)
              ? removelike(posts[i - 1]._id, i - 1)
              : addlike(posts[i - 1]._id, i - 1)
          "
          :color="posts[i - 1].likes.includes(user._id) ? 'primary' : ''"
          rounded
          small
        >
          <v-icon small class="mr-2">mdi-thumb-up</v-icon>
          <span>Like</span>
        </v-btn>
        <v-btn
          small
          v-if="posts[i - 1].comments != -1"
          @click="toggelcomment(posts[i - 1]._id)"
          :color="posts[i - 1].comments > 0 ? 'primary' : ''"
          rounded
        >
          <v-icon small class="mx-2">mdi-comment-multiple</v-icon>
          <span>Commants</span>
        </v-btn>
        <v-dialog v-model="shareDialog" max-width="700px" width="90%">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="primary" rounded small>
              <v-icon small class="mx-2">mdi-share-variant</v-icon>
              <span>Share</span>
            </v-btn>
          </template>
          <v-card>
            <v-row align="center" justify="space-between" class="mx-2">
              <v-card-title>Share this with friends or family.</v-card-title>
              <v-btn icon @click="shareDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-row>
            <v-divider></v-divider>
            <div class="pa-3">
              <v-divider></v-divider>
              <v-text-field
                  :id="`postsId_${i - 1}`"
                  label="Post link"
                  readonly
                  :value="`${url}/post/${posts[i - 1]._id}`"
                ></v-text-field>
                <v-btn rounded color="primary" @click="copyPostLink(i - 1)"
                  >Copy link</v-btn
                >
            </div>
          </v-card>
        </v-dialog>
      </v-row>

      <Comments
        v-if="showcomment[posts[i - 1]._id]"
        :post_id="posts[i - 1]._id"
      />
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import Comments from "@/components/Post/Comments.vue";
import Feedback from "@/components/Feedback.vue";
import Report from "@/components/Report.vue";
import axios from "axios";

export default {
  props: ["posts"],
  data() {
    return {
      shareDialog: false,
      showcomment: [],
      url: ""
    };
  },
  components: {
    Comments,
    Feedback,
    Report,
  },
  methods: {
    ...mapActions(["getProfile", "blockuser", "globalErrorHandler"]),
    copyPostLink(index) {
      let copyText = document.getElementById(`postsId_${index}`);

      copyText.select();
      copyText.setSelectionRange(0, 99999);

      document.execCommand("copy");
      this.shareDialog = false;
    },
    toggelcomment(postid) {
      if (this.showcomment[postid] != true) {
        Vue.set(this.showcomment, postid, true);
      } else {
        Vue.set(this.showcomment, postid, false);
      }
    },
    blockadmin(userid, postindex) {
      this.blockuser(userid);
      this.posts.splice(postindex, 1);
    },
    async addlike(postid, postArrayIndex) {
      await axios.post(`${this.$API}/posts/addlike/${postid}`);
      this.posts[postArrayIndex].likes.push(this.user._id);
    },
    async removelike(postid, postArrayIndex) {
      await axios.delete(`${this.$API}/posts/removelike/${postid}`);
      let index = this.posts[postArrayIndex].likes.indexOf(this.user._id);
      if (index > -1) {
        this.posts[postArrayIndex].likes.splice(index, 1);
      }
    },
    async addshare(postid) {
      await axios.put(`${this.$API}/posts/addshare/${postid}`);
    },
    async turnoffcomment(postid) {
      await axios.put(`${this.$API}/posts/turnoffcomment/${postid}`);
    },
    async turnoncomment(postid) {
      await axios.put(`${this.$API}/posts/turnoncomment/${postid}`);
    },
    async deletePost(postid, postArray, path) {
      let data = {};
      if (path) {
        data.path = path;
      }
      axios.delete(`${this.$API}/posts/${postid}`, { data: data });
      this.posts.splice(postArray, 1);
    },
    async saveWatchLater(postId) {
      await axios.post(`${this.$API}/playlists/watchlater/${postId}`);
    },
    async removeWatchLater(postId) {
      await axios.delete(`${this.$API}/playlists/watchlater/${postId}`);
    },
  },
  computed: {
    ...mapGetters(["user"]),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  created() {
    this.getProfile();
    this.url = window.location.origin
  },
};
</script>
