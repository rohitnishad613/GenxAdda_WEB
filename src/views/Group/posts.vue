<template>
  <v-container>
    <v-card-title>Posts</v-card-title>
    <CreatePost
      v-if="
        group.who_can_post == 'Anyone' ||
          group.who_can_post == 'Publish after my review'
      "
      :groupid="group._id"
    />
    <Posts :posts="posts" />
    <v-card-subtitle v-if="posts.length == 0" class="text-center pa-5"
      >No Posts found</v-card-subtitle
    >
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import CreatePost from "@/components/Post/CreatePost.vue";
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
      group: null,
    };
  },
  methods: {
    ...mapActions(["getgroup", "globalErrorHandler"]),
    async getMyposts() {
      await axios
        .get(`${this.$API}/groups/${this.$route.params.id}/posts`)
        .then((res) => {
          this.posts = res.data.posts;
        })
        .catch((error) => {
          this.globalErrorHandler(error);
        });
    },
    async handalgetgroup() {
      if (this.$route.params.group && this.$route.params.group.name) {
        this.group = this.$route.params.group;
      } else {
        let group = await this.getgroup(this.$route.params.id);
        this.group = group;
      }
    },
  },
  async created() {
    this.getMyposts();
    await this.handalgetgroup();
    document.title = `${this.group.name}, posts  - GenxAdda`;
  },
  mounted() {
    console.clear();
  },
};
</script>
