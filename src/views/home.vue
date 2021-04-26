<template>
  <v-container>
    <status></status>
    <CreatePost />
    <Posts :posts="posts" />
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
      <v-container>
        <v-row justify="center" align="center">
          <v-col class="text-center" cols="12" sm="6">
            <span>Add some friends.</span>
            <v-card-subtitle>Add more 10 friends to get thier posts.</v-card-subtitle>
            <v-btn rounded block color="primary" to="/friends">Add Friend</v-btn>
          </v-col>
        </v-row>
      </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import status from "@/components/Status/Status.vue";
import CreatePost from "@/components/Post/CreatePost.vue";
import Posts from "@/components/Post/Posts.vue";

export default {
  name: "home",
  data() {
    return {
      posts: [],
      loading: true,
    };
  },
  components: {
    CreatePost,
    Posts,
    status,
  },
  methods: {
    ...mapActions(["getPost", "getProfile"]),
    // load frist 10 posts from database
    async LoadPosts() {
      for (let i = 1; i <= 10; i++) {
        let PostLen = this.posts.length;
        if (PostLen > 0) {
          let lastPostsDate = this.posts[PostLen - 1].date;
          const res = await this.getPost(lastPostsDate);
          if (res.data.post) {
            this.posts.push(res.data.post);
          } else {
            this.loading = false;
          }
        } else {
          let CurrentDateTime = new Date().toISOString();
          const res = await this.getPost(CurrentDateTime);
          if (res.data.post) {
            this.posts.push(res.data.post);
          } else {
            this.loading = false;
          }
        }
      }
    },
    // load next post 1 by 1 from database
    async loadNextPost() {
      let PostLen = this.posts.length;
      let lastPostsDate = new Date(this.posts[PostLen - 1].date);
      let res = await this.getPost(lastPostsDate);
      if (res.data.post) {
        this.posts.push(res.data.post);
      } else {
        this.loading = false;
      }
    },
  },
  mounted() {
    console.clear();
    document.title = "Home - GenxAdda";
    this.LoadPosts();
    window.onscroll = () => {
      let bottomOfWindow =
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow && this.loading) {
        this.loadNextPost();
      }
    };
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
