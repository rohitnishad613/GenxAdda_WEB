<template>
  <v-container>
    <v-tabs show-arrows v-model="tab" centered>
      <v-tab>Gernal</v-tab>
      <v-tab>Adcance</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-snackbar
          top
          color="error"
          v-model="validationsnackbar"
          v-for="i in validationError.length"
          :key="i"
        >
          {{ validationError[i - 1] }}
          <v-icon @click="validationsnackbar = false">mdi-close</v-icon>
        </v-snackbar>

        <v-snackbar
          top
          color="error"
          v-model="creatErrorsnackbar"
          v-if="Pageerror"
        >
          {{ Pageerror }}
          <v-icon @click="creatErrorsnackbar = false">mdi-close</v-icon>
        </v-snackbar>

        <v-snackbar
          top
          color="success"
          v-model="creatSusssnackbar"
          v-else-if="Pagesuccess"
        >
          {{ Pagesuccess }}
          <v-icon @click="creatSusssnackbar = false">mdi-close</v-icon>
        </v-snackbar>

        <v-container>
          <v-text-field
            v-model="Name"
            label="Enter Page name"
            rounded
            outlined
          ></v-text-field>
        </v-container>

        <v-container>
          <v-textarea
            v-model="description"
            label="Enter Page description"
            rounded
            outlined
          ></v-textarea>
        </v-container>

        <v-container>
          <v-select
            rounded
            outlined
            v-model="category"
            label="Select category of your page"
            :items="categories"
          ></v-select>
        </v-container>

        <v-container v-if="category == 'Other'">
          <v-text-field
            v-model="Othercategory"
            label="Enter category of your page"
            rounded
            outlined
          ></v-text-field>
        </v-container>
        <v-container>
          <v-text-field
            v-model="email"
            label="Enter email"
            rounded
            outlined
          ></v-text-field>
        </v-container>
        <v-container>
          <v-text-field
            v-model="phoneNum"
            label="Enter phone number"
            rounded
            outlined
          ></v-text-field>
        </v-container>
        <v-container>
          <v-text-field
            v-model="street"
            label="Enter street address"
            rounded
            outlined
          ></v-text-field>
        </v-container>
        <v-container>
          <v-select
            rounded
            outlined
            v-model="country"
            label="Select your country"
            :items="countries"
          ></v-select>
        </v-container>

        <v-container>
          <v-select
            rounded
            outlined
            v-model="state"
            label="Select your State"
            :items="states"
          ></v-select>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container>
          <v-select
            rounded
            outlined
            v-model="privacy"
            label="Who can pulish post in your group."
            :items="privacy_ops"
          ></v-select>
        </v-container>
      </v-tab-item>
    </v-tabs-items>

    <v-container>
      <v-btn @click="submit()" rounded color="primary" block>
        <span>Create Page</span>
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      validationsnackbar: false,
      tab: null,
      Name: "",
      creatSusssnackbar: false,
      creatErrorsnackbar: false,
      description: "",
      email: "",
      phoneNum: "",
      validationError: [],
      category: "",
      Othercategory: "",
      privacy: "Only Admin can Post",
      privacy_ops: ["Anyone", "Publish after my review", "Only Admin can Post"],
      categories: ["Other"],
      street: "",
      state: "",
      states: [],
      country: "",
      countries: [],
    };
  },
  computed: {
    ...mapGetters(["Pageerror", "Pagesuccess", "user"]),
  },
  methods: {
    ...mapActions(["CreatePage", "getProfile"]),
    submit() {
      this.validationError = [];
      this.creatErrorsnackbar = false;
      this.creatSusssnackbar = false;
      this.validationsnackbar = false;
      let Data = {};
      if (this.Name) {
        Data.name = this.Name;
      } else {
        this.validationError.push("Please Enter Page name.");
      }
      if (this.category == "Other") {
        if (this.Othercategory) {
          Data.category = this.Othercategory;
        }
      } else if (Data.category) {
        Data.category = this.category;
      } else {
        this.validationError.push("Select the category of your page");
      }
      if (this.description) {
        Data.description = this.description;
      }
      if (this.street) {
        Data.street = this.street;
      }
      if (this.state) {
        Data.state = this.state;
      }
      if (this.country) {
        Data.country = this.country;
      }
      if (this.email) {
        Data.email = this.email;
      }
      if (this.phoneNum) {
        Data.phoneNumber = this.phoneNum;
      }

      if (this.privacy) {
        Data.who_can_post = this.privacy;
      } else {
        this.validationError.push("Please select privacy settings.");
      }

      if (this.validationError.length == 0) {
        this.CreatePage(Data);
        this.creatErrorsnackbar = true;
        this.creatSusssnackbar = true;
      } else {
        this.validationsnackbar = true;
      }
    },
  },
  async created() {
    await this.getProfile();
    document.title = `Create new page  - GenxAdda`;
  },
  mounted() {
    console.clear();
  },
};
</script>
