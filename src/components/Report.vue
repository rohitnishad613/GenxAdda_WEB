<template>
  <div>
    <v-dialog v-model="reportDialog" max-width="700px" width="90%">
      <template v-slot:activator="{ on }">
        <v-list-item v-on="on">
          <v-icon class="mr-2">mdi-alert-octagon</v-icon>
          <v-list-item-title class="pr-10">Report</v-list-item-title>
        </v-list-item>
      </template>
      <v-card class="pa-3">
        <v-row align="center" justify="space-between" class="mx-2">
          <v-card-title>Send Report</v-card-title>
          <v-btn icon @click="reportDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
        <v-container>
          <v-textarea
            class="roundedTextarea"
            v-model="detail"
            outlined
            label="Write something more."
          ></v-textarea>
        </v-container>
        <v-btn @click="send()" color="primary" rounded block>Send</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      reportDialog: false,
      detail: "",
    };
  },
  methods: {
    ...mapActions(["sendReport", "getProfile"]),
    send() {
      let data = {};
      if (this.detail) {
        data.detail = this.detail;
      }
      this.sendReport(data);
      this.reportDialog = false;
    },
  },
};
</script>

<style></style>
