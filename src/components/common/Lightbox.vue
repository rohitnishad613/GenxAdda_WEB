<template>
  <v-dialog v-model="LightboxDialog">
    <template v-slot:activator="{ on }">
      <v-list-item v-on="on">
        <v-list-item-title class="pr-10">View</v-list-item-title>
      </v-list-item>
    </template>
    <v-card class="pa-3">
      <v-btn icon @click="LightboxDialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-container>
        <v-img v-if="img" :src="img">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="gray"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
    },
  },
  data() {
    return {
      LightboxDialog: false,
    };
  },
};
</script>
