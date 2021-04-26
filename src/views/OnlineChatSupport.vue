<template>
  <v-container>
    <v-card class="box-shadow" style="border-radius:20px;">
      <v-card-title>Help Center</v-card-title>
      <v-img src="@/assets/img/customer-support.png" class="box-shadow">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="gray"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-container>
        <v-row align="center" justify="center">
          <v-dialog v-model="shareDialog" max-width="700px" width="90%">
          <template v-slot:activator="{ on }">
            <v-btn  v-on="on" class="mx-2" color="primary" rounded>Support Inbox</v-btn>
          </template>
          <v-card>
            <v-row align="center" justify="space-between" class="mx-2">
              <v-card-title>Share this with friends or family.</v-card-title>
              <v-btn icon @click="shareDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-row>
            <v-divider></v-divider>
            <p class="pa-3">This time support feature is under development... comming soon!</p>
          </v-card>
        </v-dialog>
        </v-row>
      </v-container>
      <p class="text-center">*We are here to your help*</p>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return{
      shareDialog: false,
      url: ""
    }
  },
  created() {
    this.url = window.location.origin
  }
};
</script>
