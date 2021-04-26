<template>
  <v-container>
    <v-card class="box-shadow" style="border-radius: 20px">
      <Notification></Notification>
    </v-card>
  </v-container>
</template>

<script>
import Notification from "@/components/Notifications.vue";

export default {
  components: {
    Notification,
  },
  mounted() {
    document.title = "Notifications - GenxAdda";
    console.clear();
  },
};
</script>
