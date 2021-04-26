<template>
  <v-container>
    <v-card-title>Settings</v-card-title>
    <v-card-subtitle>Make thing that you like most.</v-card-subtitle>
    <transition name="router_transition">
      <router-view></router-view>
    </transition>
  </v-container>
</template>

<script>
export default {
  mounted() {
    if (this.$route.path == "/settings") {
      this.$router.push("/settings/profile");
    }
    document.title = "Settings - GenxAdda";
    console.clear();
  },
};
</script>
