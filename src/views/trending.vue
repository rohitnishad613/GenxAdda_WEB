<template>
  <v-container>
    <v-card-title>Trending</v-card-title>
    <v-card-subtitle>Top 10 posts of the day.</v-card-subtitle>
    <Posts :posts="trendingPosts"></Posts>
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
      trendingPosts: [],
    };
  },
  components: {
    Posts,
  },
  methods: {
    ...mapActions(["globalErrorHandler"]),
    async getTrending() {
      await axios
        .get(`${this.$API}/posts/trending`)
        .then((res) => {
          this.trendingPosts = res.data.trendingPosts;
        })
        .catch((error) => {
          this.globalErrorHandler(error);
        });

      this.loading = false;
    },
  },
  mounted() {
    console.clear();
  },
  created() {
    document.title = "Trending - GenxAdda";
    this.getTrending();
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
