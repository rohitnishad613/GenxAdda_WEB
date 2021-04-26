<template>
  <v-container>
    <v-card-title>Followes</v-card-title>
    <v-card-subtitle>{{ group.name }}, followers</v-card-subtitle>
    <v-card style="border-radius:20px;" class="text-center box-shadow py-10">
      <h3>{{ group.name }} have,</h3>
      <span class="bigcounte">{{ group.joined_count }}</span>
      <h3>Followers</h3>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
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
    document.title = `${this.group.name}, community  - GenxAdda`;
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
