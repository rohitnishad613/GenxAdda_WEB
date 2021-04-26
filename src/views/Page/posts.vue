<template>
  <v-container>
    <v-card-title>Posts</v-card-title>
    <CreatePost
      v-if="
        page.who_can_post == 'Anyone' ||
          page.who_can_post == 'Publish after my review'
      "
      :pageid="page._id"
    />
    <Posts :posts="posts" />
    <v-card-subtitle v-if="posts.length == 0" class="text-center pa-5"
      >No Posts found</v-card-subtitle
    >
  </v-container>
</template>

<script>
import CreatePost from "@/components/Post/CreatePost.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import Posts from "@/components/Post/Posts.vue";
export default {
  computed: mapGetters(["user"]),
  components: {
    Posts,
    CreatePost,
  },
  data() {
    return {
      posts: [],
      page: null,
    };
  },
  methods: {
    ...mapActions(["getPage"]),
    async handalgetpage() {
      if (this.$route.params.page && this.$route.params.page.name) {
        this.page = this.$route.params.page;
      } else {
        let page = await this.getPage(this.$route.params.id);
        this.page = page;
      }
    },
    async getMyposts() {
      await axios
        .get(`${this.$API}/pages/${this.$route.params.id}/posts`)
        .then((res) => {
          this.posts = res.data.posts;
        })
        .catch((error) => {
          this.globalErrorHandler(error);
        });
    },
  },
  async created() {
    this.getMyposts();
    await this.handalgetpage();
    document.title = `${this.page.name}, Posts  - GenxAdda`;
  },
  mounted() {
    console.clear();
  },
};
</script>
