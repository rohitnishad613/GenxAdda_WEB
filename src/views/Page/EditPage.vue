<template>
  <v-container>
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
      v-model="editErrorsnackbar"
      v-if="PageEditErrors"
    >
      {{ PageEditErrors }}
      <v-icon @click="editErrorsnackbar = false">mdi-close</v-icon>
    </v-snackbar>

    <v-snackbar
      top
      color="success"
      v-model="editSusssnackbar"
      v-else-if="PageEditSuccess"
    >
      {{ PageEditSuccess }}
      <v-icon @click="editSusssnackbar = false">mdi-close</v-icon>
    </v-snackbar>

    <v-tabs show-arrows v-model="tab" centered>
      <v-tab>Gernal</v-tab>
      <v-tab>Adcance</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
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
        <v-container>
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
            label="Who can pulish post in your Paga."
            :items="privacy_ops"
          ></v-select>
        </v-container>
      </v-tab-item>
    </v-tabs-items>

    <v-container>
      <v-btn @click="submit()" rounded color="primary" block>
        <span>Save Page</span>
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
      editErrorsnackbar: false,
      editSusssnackbar: false,
      tab: null,
      oldPage: null,
      Name: "",
      description: "",
      email: "",
      phoneNum: "",
      validationError: [],
      category: "",
      privacy: null,
      privacy_ops: ["Anyone", "Publish after my review", "Only Admin can Post"],
      Othercategory: "",
      categories: ["Other"],
      street: "",
      state: "",
      states: [],
      country: "",
      countries: [],
    };
  },
  computed: {
    ...mapGetters(["PageEditErrors", "PageEditSuccess", "user"]),
  },
  methods: {
    ...mapActions([
      "getPage",
      "getProfile",
      "EditPageName",
      "EditPageCategory",
      "EditPageDescription",
      "EditPageEmail",
      "EditPagePhoneNum",
      "EditPageStreet",
      "EditPageState",
      "EditPageCountry",
      "EditPagePrivacy",
    ]),
    async handulGetPage() {
      if (this.$route.params.page && this.$route.params.page.name) {
        this.oldPage = this.$route.params.page;
        let oldPage = this.$route.params.page;
        this.Name = oldPage.name;
        this.privacy = oldPage.who_can_post;
        this.description = oldPage.description;
        this.email = oldPage.email;
        this.phoneNum = oldPage.phoneNumber;
        if (this.categories.indexOf(oldPage.category) == -1) {
          this.category = "Other";
          this.Othercategory = oldPage.category;
        } else {
          this.category = oldPage.category;
        }
        this.street = oldPage.address.street;
        if (this.states.indexOf(oldPage.state) != -1) {
          this.state = oldPage.address.state;
        }
        if (this.countries.indexOf(oldPage.country) != -1) {
          this.country = oldPage.address.country;
        }
      } else {
        let page = await this.getPage(this.$route.params.id);

        this.oldPage = page;
        let oldPage = page;
        this.Name = oldPage.name;
        this.description = oldPage.description;
        this.privacy = oldPage.who_can_post;
        this.email = oldPage.email;
        this.phoneNum = oldPage.phoneNumber;
        if (this.categories.indexOf(oldPage.category) == -1) {
          this.category = "Other";
          this.Othercategory = oldPage.category;
        } else {
          this.category = oldPage.category;
        }
        this.street = oldPage.address.street;
        if (this.states.indexOf(oldPage.state) != -1) {
          this.state = oldPage.address.state;
        }
        if (this.countries.indexOf(oldPage.country) != -1) {
          this.country = oldPage.address.country;
        }
      }
    },
    submit() {
      this.validationError = [];
      this.editErrorsnackbar = false;
      this.editSusssnackbar = false;
      this.validationsnackbar = false;
      if (this.Name) {
        if (this.Name != this.oldPage.name) {
          let data = {
            id: this.oldPage._id,
            newName: this.Name,
          };
          if (this.validationError.length == 0) {
            this.EditPageName(data);
            this.oldPage.name = this.Name;
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
      } else {
        this.validationError.push("Enter the Page name");
        this.validationsnackbar = true;
      }
      if (this.category) {
        if (
          this.category == "Other" &&
          this.Othercategory &&
          this.Othercategory != this.oldPage.category
        ) {
          let data = {
            id: this.oldPage._id,
            newCategory: this.Othercategory,
          };
          if (this.validationError.length == 0) {
            this.EditPageCategory(data);
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        } else if (
          this.category != "Other" &&
          this.category != this.oldPage.category
        ) {
          let data = {
            id: this.oldPage._id,
            newCategory: this.category,
          };
          if (this.validationError.length == 0) {
            this.EditPageCategory(data);
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
      } else {
        this.validationError.push("Selete the category of page");
        this.validationsnackbar = true;
      }
      if (this.privacy) {
        if (this.privacy != this.oldPage.who_can_post) {
          let data = {
            id: this.oldPage._id,
            who_can_post: this.privacy,
          };
          if (this.validationError.length == 0) {
            this.EditPagePrivacy(data);
            this.oldPage.who_can_post = this.privacy;
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
      } else {
        this.validationError.push("Selete the privacy settings of page");
        this.validationsnackbar = true;
      }
      if (this.description != this.oldPage.description) {
        let data = {
          id: this.oldPage._id,
          newDescription: this.description,
        };
        if (this.validationError.length == 0) {
          this.EditPageDescription(data);
          this.oldPage.description = this.description;
          this.editSusssnackbar = true;
          this.editErrorsnackbar = true;
        }
      }
      if (this.email != this.oldPage.email) {
        let data = {
          id: this.oldPage._id,
          newEmail: this.email,
        };
        if (this.validationError.length == 0) {
          this.EditPageEmail(data);
          this.oldPage.email = this.email;
          this.editSusssnackbar = true;
          this.editErrorsnackbar = true;
        }
      }
      if (this.phoneNum != this.oldPage.phoneNumber) {
        let data = {
          id: this.oldPage._id,
          newPhoneNumber: this.phoneNum,
        };
        if (this.validationError.length == 0) {
          this.EditPagePhoneNum(data);
          this.oldPage.phoneNumber = this.phoneNum;
          this.editSusssnackbar = true;
          this.editErrorsnackbar = true;
        }
      }
      if (this.oldPage.address) {
        if (this.street && this.street != this.oldPage.address.street) {
          let data = {
            id: this.oldPage._id,
            newStreet: this.street,
          };
          if (this.validationError.length == 0) {
            this.EditPageStreet(data);
            this.oldPage.address.street = this.street;
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
        if (this.state && this.state != this.oldPage.address.state) {
          let data = {
            id: this.oldPage._id,
            newState: this.state,
          };
          if (this.validationError.length == 0) {
            this.EditPageState(data);
            this.oldPage.address.state = this.state;
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
        if (this.country && this.country != this.oldPage.address.country) {
          let data = {
            id: this.oldPage._id,
            newCountry: this.country,
          };
          if (this.validationError.length == 0) {
            this.EditPageCountry(data);
            this.oldPage.address.country = this.country;
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
      } else {
        if (this.street) {
          let data = {
            id: this.oldPage._id,
            newStreet: this.street,
          };
          if (this.validationError.length == 0) {
            this.EditPageStreet(data);
            this.oldPage.address.street = this.street;
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
        if (this.state) {
          let data = {
            id: this.oldPage._id,
            newState: this.state,
          };
          if (this.validationError.length == 0) {
            this.EditPageState(data);
            this.oldPage.address.state = this.state;
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
        if (this.country) {
          let data = {
            id: this.oldPage._id,
            newCountry: this.country,
          };
          if (this.validationError.length == 0) {
            this.EditPageCountry(data);
            this.oldPage.address.country = this.country;
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
      }
    },
  },
  async created() {
    await this.getProfile();
    await this.handulGetPage();
    document.title = `Edit ${this.page.name}  - GenxAdda`;
  },
  mounted() {
    console.clear();
  },
};
</script>
