<template>
  <v-dialog v-model="errorDialog" max-width="500px" width="90%">
    <template v-slot:activator="{ on }">
      <div v-on="on"></div>
    </template>
    <v-card class="pa-3">
      <v-row align="center" justify="space-between" class="mx-2">
        <v-card-title class="pa-1">Error</v-card-title>
        <v-btn icon @click="errorDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
      <v-container>
        <v-divider></v-divider>
        <v-card-subtitle>{{ error }}</v-card-subtitle>
        <v-divider></v-divider>
      </v-container>
      <v-row class="mx-1" align="center" justify="end">
        <v-btn @click="errorDialog = false" rounded>Close</v-btn>
        <v-btn to="/help" color="primary" rounded>Help</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      errorDialog: false,
    };
  },
  watch: {
    error(nevalue, oldvalue) {
      if (nevalue) {
        this.errorDialog = true;
      } else if (!nevalue) {
        this.errorDialog = false;
      }
    },
  },
  computed: mapGetters(["error"]),
  created() {
    this.error ? (this.errorDialog = true) : (this.errorDialog = false);
  },
};
</script>
