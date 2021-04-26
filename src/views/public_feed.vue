<template>
  <v-container>
    <v-card-title>Public Feed</v-card-title>
    <v-card-subtitle>Discover all posts that public share.</v-card-subtitle>
    <Posts :posts="Public_Feed_Posts"></Posts>
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
  </v-container>
</template>

<script>
import axios from "axios";
import Posts from "@/components/Post/Posts.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loading: true,
      Public_Feed_Posts: [],
    };
  },
  components: {
    Posts,
  },
  methods: {
    ...mapActions(["getPublicPost","globalErrorHandler"]),
    async LoadPosts() {
      for (let i = 1; i <= 10; i++) {
        let PostLen = this.Public_Feed_Posts.length;
        if (PostLen > 0) {
          let lastPostsDate = this.Public_Feed_Posts[PostLen - 1].date;
          const res = await this.getPublicPost(lastPostsDate);
          if (res.data.post) {
            this.Public_Feed_Posts.push(res.data.post);
          } else {
            this.loading = false;
          }
        } else {
          let CurrentDateTime = new Date().toISOString();
          const res = await this.getPublicPost(CurrentDateTime);
          if (res.data.post) {
            this.Public_Feed_Posts.push(res.data.post);
          } else {
            this.loading = false;
          }
        }
      }
    },
    // load next post 1 by 1 from database
    async loadNextPost() {
      let PostLen = this.Public_Feed_Posts.length;
      let lastPostsDate = new Date(this.Public_Feed_Posts[PostLen - 1].date);
      let res = await this.getPublicPost(lastPostsDate);
      if (res.data.post) {
        this.Public_Feed_Posts.push(res.data.post);
      } else {
        this.loading = false;
      }
    },
  },
  mounted() {
    console.clear();
  },
  created() {
    document.title = "Public Feed - GenxAdda";
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