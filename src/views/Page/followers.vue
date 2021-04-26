<template>
  <v-container>
    <v-card-title>Followes</v-card-title>
    <v-card-subtitle>{{ page.name }}, followers</v-card-subtitle>
    <v-card style="border-radius:20px;" class="text-center box-shadow py-10">
      <h3>{{ page.name }} have,</h3>
      <span class="bigcounte">{{ page.joined_count }}</span>
      <h3>Followers</h3>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
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
  },
  async created() {
    await this.handalgetpage();
    document.title = `${this.page.name}, Followers  - GenxAdda`;
  },
  mounted() {
    console.clear();
  },
};
</script>

<style>
.bigcounte {
  font-size: 50px;
}
</style>
