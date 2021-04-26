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
      v-if="groupEditErrors"
    >
      {{ groupEditErrors }}
      <v-icon @click="editErrorsnackbar = false">mdi-close</v-icon>
    </v-snackbar>
    <v-snackbar
      top
      color="success"
      v-model="editSusssnackbar"
      v-else-if="groupEditSuccess"
    >
      {{ groupEditSuccess }}
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
            label="Enter group name"
            rounded
            outlined
          ></v-text-field>
        </v-container>

        <v-container>
          <v-textarea
            v-model="description"
            label="Enter group description"
            rounded
            outlined
          ></v-textarea>
        </v-container>

        <v-container>
          <v-select
            rounded
            outlined
            v-model="category"
            label="Select category of your group"
            :items="categories"
          ></v-select>
        </v-container>
        <v-container>
          <v-text-field
            v-model="Othercategory"
            label="Enter category of your group"
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
        <span>Save group</span>
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
      oldgroup: null,
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
    ...mapGetters(["groupEditSuccess", "groupEditErrors", "user"]),
  },
  methods: {
    ...mapActions([
      "getgroup",
      "getProfile",
      "EditgroupName",
      "EditgroupCategory",
      "EditgroupDescription",
      "EditgroupEmail",
      "EditgroupPhoneNum",
      "EditgroupStreet",
      "EditgroupState",
      "EditgroupCountry",
      "EditgroupPrivacy",
    ]),
    async handulGetgroup() {
      if (this.$route.params.group && this.$route.params.group.name) {
        this.oldgroup = this.$route.params.group;
        let oldgroup = this.$route.params.group;
        this.Name = oldgroup.name;
        this.privacy = oldgroup.who_can_post;
        this.description = oldgroup.description;
        this.email = oldgroup.email;
        this.phoneNum = oldgroup.phoneNumber;
        if (this.categories.indexOf(oldgroup.category) == -1) {
          this.category = "Other";
          this.Othercategory = oldgroup.category;
        } else {
          this.category = oldgroup.category;
        }
        this.street = oldgroup.address.street;
        if (this.states.indexOf(oldgroup.state) != -1) {
          this.state = oldgroup.address.state;
        }
        if (this.countries.indexOf(oldgroup.country) != -1) {
          this.country = oldgroup.address.country;
        }
      } else {
        let group = await this.getgroup(this.$route.params.id);

        this.oldgroup = group;
        let oldgroup = group;
        this.Name = oldgroup.name;
        this.description = oldgroup.description;
        this.privacy = oldgroup.who_can_post;
        this.email = oldgroup.email;
        this.phoneNum = oldgroup.phoneNumber;
        if (this.categories.indexOf(oldgroup.category) == -1) {
          this.category = "Other";
          this.Othercategory = oldgroup.category;
        } else {
          this.category = oldgroup.category;
        }
        this.street = oldgroup.address.street;
        if (this.states.indexOf(oldgroup.state) != -1) {
          this.state = oldgroup.address.state;
        }
        if (this.countries.indexOf(oldgroup.country) != -1) {
          this.country = oldgroup.address.country;
        }
      }
    },
    async submit() {
      this.validationError = [];
      this.editErrorsnackbar = false;
      this.editSusssnackbar = false;
      this.validationsnackbar = false;
      if (this.Name) {
        if (this.Name != this.oldgroup.name) {
          let data = {
            id: this.oldgroup._id,
            newName: this.Name,
          };
          if (this.validationError.length == 0) {
            this.EditgroupName(data);
            this.oldgroup.name = this.Name;
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
      } else {
        this.validationError.push("Enter the Group name");
        this.validationsnackbar = true;
      }
      if (this.category) {
        if (
          this.category == "Other" &&
          this.Othercategory &&
          this.Othercategory != this.oldgroup.category
        ) {
          let data = {
            id: this.oldgroup._id,
            newCategory: this.Othercategory,
          };
          if (this.validationError.length == 0) {
            this.EditgroupCategory(data);
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        } else if (
          this.category != "Other" &&
          this.category != this.oldgroup.category
        ) {
          let data = {
            id: this.oldgroup._id,
            newCategory: this.category,
          };
          if (this.validationError.length == 0) {
            this.EditgroupCategory(data);
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
      } else {
        this.validationError.push("Selete the category of group");
        this.validationsnackbar = true;
      }
      if (this.privacy) {
        if (this.privacy != this.oldgroup.who_can_post) {
          let data = {
            id: this.oldgroup._id,
            who_can_post: this.privacy,
          };
          if (this.validationError.length == 0) {
            this.EditgroupPrivacy(data);
            this.oldgroup.who_can_post = this.privacy;

            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
      } else {
        this.validationError.push("Selete the privacy settings of group");
        this.validationsnackbar = true;
      }

      if (this.description != this.oldgroup.description) {
        let data = {
          id: this.oldgroup._id,
          newDescription: this.description,
        };
        if (this.validationError.length == 0) {
          this.EditgroupDescription(data);
          this.oldgroup.description = this.description;
          this.editSusssnackbar = true;
          this.editErrorsnackbar = true;
        }
      }

      if (this.email != this.oldgroup.email) {
        let data = {
          id: this.oldgroup._id,
          newEmail: this.email,
        };
        if (this.validationError.length == 0) {
          this.EditgroupEmail(data);
          this.oldgroup.email = this.email;
          this.editSusssnackbar = true;
          this.editErrorsnackbar = true;
        }
      }

      if (this.phoneNum != this.oldgroup.phoneNumber) {
        let data = {
          id: this.oldgroup._id,
          newPhoneNumber: this.phoneNum,
        };
        if (this.validationError.length == 0) {
          this.EditgroupPhoneNum(data);
          this.oldgroup.phoneNumber = this.phoneNum;
          this.editSusssnackbar = true;
          this.editErrorsnackbar = true;
        }
      }

      if (this.oldgroup.address) {
        if (this.street && this.street != this.oldgroup.address.street) {
          let data = {
            id: this.oldgroup._id,
            newStreet: this.street,
          };
          if (this.validationError.length == 0) {
            this.EditgroupStreet(data);
            this.oldgroup.address.street = this.street;
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
        if (this.state && this.state != this.oldgroup.address.state) {
          let data = {
            id: this.oldgroup._id,
            newState: this.state,
          };
          if (this.validationError.length == 0) {
            this.EditgroupState(data);
            this.oldgroup.address.state = this.state;
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
        if (this.country && this.country != this.oldgroup.address.country) {
          let data = {
            id: this.oldgroup._id,
            newCountry: this.country,
          };
          if (this.validationError.length == 0) {
            this.EditgroupCountry(data);
            this.oldgroup.address.country = this.country;
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
      } else {
        if (this.street) {
          let data = {
            id: this.oldgroup._id,
            newStreet: this.street,
          };
          if (this.validationError.length == 0) {
            this.EditgroupStreet(data);
            this.oldgroup.address.street = this.street;
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
        if (this.state) {
          let data = {
            id: this.oldgroup._id,
            newState: this.state,
          };
          if (this.validationError.length == 0) {
            this.EditgroupState(data);
            this.oldgroup.address.state = this.state;
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
        if (this.country) {
          let data = {
            id: this.oldgroup._id,
            newCountry: this.country,
          };
          if (this.validationError.length == 0) {
            this.EditgroupCountry(data);
            this.oldgroup.address.country = this.country;
            this.editSusssnackbar = true;
            this.editErrorsnackbar = true;
          }
        }
      }
    },
  },
  async created() {
    await this.getProfile();
    await this.handulGetgroup();
    document.title = `Edit ${this.group.name}  - GenxAdda`;
  },
  mounted() {
    console.clear();
  },
};
</script>
