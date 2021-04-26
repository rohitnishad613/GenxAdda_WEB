<template>
  <v-container>
    <v-card-title>About</v-card-title>
    <v-card style="border-radius:20px;" class="text-center box-shadow">
      <v-card-title>Contect info</v-card-title>
      <v-row v-if="page.phoneNumber" class="mx-5" align="center">
        <span>Phone:</span>
        <v-card-subtitle>{{ page.phoneNumber }}</v-card-subtitle>
      </v-row>
      <v-row v-if="page.email" class="mx-5" align="center">
        <span>Email:</span>
        <v-card-subtitle>{{ page.email }}</v-card-subtitle>
      </v-row>
      <v-card-title>Info</v-card-title>
      <v-row v-if="page.description" class="mx-5" align="center">
        <span v>Description</span>
        <v-card-subtitle>{{ page.description }}</v-card-subtitle>
      </v-row>
      <v-row class="mx-5" align="center">
        <span v-if="page.category">Category</span>
        <v-card-subtitle>{{ page.category }}</v-card-subtitle>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
  mounted() {
    console.clear();
  },
  async created() {
    document.title = `${this.page.name}, about - GenxAdda`;
    await this.handalgetpage();
  },
};
</script>
