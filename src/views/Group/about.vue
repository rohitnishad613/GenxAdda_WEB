<template>
  <v-container>
    <v-card-title>About</v-card-title>
    <v-card style="border-radius:20px;" class="text-center box-shadow">
      <v-card-title>Contect info</v-card-title>
      <v-row v-if="group.phoneNumber" class="mx-5" align="center">
        <span>Phone:</span>
        <v-card-subtitle>{{ group.phoneNumber }}</v-card-subtitle>
      </v-row>
      <v-row v-if="group.email" class="mx-5" align="center">
        <span>Email:</span>
        <v-card-subtitle>{{ group.email }}</v-card-subtitle>
      </v-row>
      <v-card-title>Info</v-card-title>
      <v-row v-if="group.description" class="mx-5" align="center">
        <span v>Description</span>
        <v-card-subtitle>{{ group.description }}</v-card-subtitle>
      </v-row>
      <v-row class="mx-5" align="center">
        <span v-if="group.category">Category</span>
        <v-card-subtitle>{{ group.category }}</v-card-subtitle>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      group: null,
    };
  },
  methods: {
    ...mapActions(["getgroup"]),
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
    await this.handalgetgroup();
    document.title = `${this.group.name}, about  - GenxAdda`;
  },
  mounted() {
    console.clear();
  },
};
</script>
