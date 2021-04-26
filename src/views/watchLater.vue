<template>
  <v-container>
    <v-card-title>Watch Later</v-card-title>
    <v-card-subtitle>List of your saved contents.</v-card-subtitle>
    <div class="post_loading mx-3 loading-bg" v-if="loading">
      <div class="cvd7vsds7vdscsc">
        <div class="cvd7vsds7vds">
          <div
            style="width:50px; height:50px; border-radius:50px;"
            class="loading-animation"
          ></div>
          <div>
            <div
              style="width:160px; height:15px; border-radius:15px;"
              class="loading-animation ml-2"
            ></div>
            <div
              style="width:130px; height:15px; border-radius:15px;"
              class="loading-animation ma-2"
            ></div>
          </div>
        </div>
        <div>
          <div
            style="width:40px; height:40px; border-radius:40px;"
            class="loading-animation"
          ></div>
        </div>
      </div>
      <div class="cascasc78asc">
        <div
          style="width: 100px; height:30px; border-radius:20px;"
          class="loading-animation"
        ></div>
        <div
          style="width: 100px; height:30px; border-radius:20px;"
          class="loading-animation"
        ></div>
        <div
          style="width: 100px; height:30px; border-radius:20px;"
          class="loading-animation"
        ></div>
      </div>
    </div>
    <v-card v-else-if="err" class="box-shadow" style="border-radius: 20px">
      <v-card-subtitle class="pa-6 text-center">{{ err }}</v-card-subtitle>
    </v-card>
    <Posts v-else :posts="postsById" />
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import Posts from "@/components/Post/Posts.vue";

export default {
  data() {
    return {
      err: null,
      loading: true,
    };
  },
  components: {
    Posts,
  },
  computed: mapGetters(["postsById", "user"]),

  methods: {
    ...mapActions(["getpostsbyID", "globalErrorHandler"]),
    async getsavedPosts() {
      await axios
        .get(`${this.$API}/playlists/watchlater`)
        .then((res) => {
          let watchlater = res.data.watchlater;
          if (watchlater.user_id == this.user._id) {
            let savedPostsLen = watchlater.saved_posts.length;
            if (savedPostsLen <= 0) {
              this.err = "No posts saved in Watch Later.";
            }
            for (let i = 0; i < savedPostsLen; i++) {
              this.getpostsbyID(watchlater.saved_posts[i]);
            }
            this.loading = false;
          }
        })
        .catch((error) => {
          this.globalErrorHandler(error);
        });
    },
  },
  mounted() {
    console.clear();
  },
  created() {
    this.getsavedPosts();
    document.title = "Watch Later - GenxAdda";
  },
};
</script>

<style>
.post_loading {
  height: 250;
  border-radius: 10px;
}

.cvd7vsds7vdscsc {
  display: flex;
  justify-content: space-between;
}

.cvd7vsds7vds {
  display: flex;
  margin-bottom: 150px;
}

.cascasc78asc {
  display: flex;
  justify-content: space-around;
}
</style>
