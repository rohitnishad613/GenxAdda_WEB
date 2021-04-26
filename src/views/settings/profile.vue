<template>
  <v-card style="border-radius:20px;" class="box-shadow">
    <v-card-title>Profile</v-card-title>
    <v-card-subtitle>Make your profile as you wis.</v-card-subtitle>
    <v-container>
      <v-list>
        <v-list-item>
          <v-row>
            <v-list-item-subtitle>Change your Frist name.</v-list-item-subtitle>
            <v-text-field
              class="mt-3"
              label="Frist name"
              id="fname"
              :value="user.fname"
              rounded
              outlined
              clearable
            ></v-text-field>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-list-item-subtitle>Change your last name.</v-list-item-subtitle>
            <v-text-field
              class="mt-3"
              label="Last name"
              :value="user.lname"
              id="lname"
              rounded
              outlined
              clearable
            ></v-text-field>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-list-item-subtitle>Change your username.</v-list-item-subtitle>
            <v-text-field
              :value="user.username"
              class="mt-3"
              label="Username"
              rounded
              id="username"
              clearable
              outlined
            ></v-text-field>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-list-item-subtitle>Change your email.</v-list-item-subtitle>
            <v-text-field
              class="mt-3"
              label="Email"
              :value="user.email"
              id="email"
              rounded
              clearable
              outlined
            ></v-text-field>
          </v-row>
        </v-list-item>

        <v-list-item>
          <v-row>
            <v-list-item-subtitle>About</v-list-item-subtitle>
            <v-text-field
              class="mt-3"
              label="About"
              id="about"
              :value="user.about"
              rounded
              outlined
              clearable
            ></v-text-field>
          </v-row>
        </v-list-item>

        <v-list-item>
          <v-row>
            <v-list-item-subtitle
              >Change your phone number.</v-list-item-subtitle
            >
            <v-text-field
              class="mt-3"
              label="Phone number"
              :value="user.phone"
              rounded
              id="phone"
              clearable
              outlined
            ></v-text-field>
          </v-row>
        </v-list-item>

        <v-list-item>
          <v-row align="center">
            <v-list-item-subtitle>Change your password.</v-list-item-subtitle>
            <v-text-field
              class="mt-3"
              outlined
              label="Password"
              prepend-inner-icon="mdi-key-variant"
              rounded
              clearable
              id="password"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPass ? 'text' : 'password'"
              @click:append="showPass = !showPass"
              autocomplete="new-password"
              required
            ></v-text-field>
            <v-text-field
              outlined
              label="Confirm Password"
              prepend-inner-icon="mdi-key-variant"
              rounded
              clearable
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPass ? 'text' : 'password'"
              @click:append="showPass = !showPass"
              id="confirm_password"
              required
            ></v-text-field>
          </v-row>
        </v-list-item>

        <v-list-item>
          <v-row>
            <v-list-item-subtitle
              >Deactivation and deletation.</v-list-item-subtitle
            >
            <v-row justify="space-between" align="center">
              <span class="ml-3"
                >Permanantly delete your account and all data (Photo, video,
                etc).</span
              >

              <v-dialog v-model="deleteDialog" max-width="700px" width="90%">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" rounded>Delete</v-btn>
                </template>
                <v-card>
                  <v-container>
                    <v-row justify="space-between" align="center" class="mx-2">
                      <v-card-title
                        >Are you suru to delete your account?</v-card-title
                      >
                      <v-btn icon @click="deleteDialog = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-row>
                    <v-divider></v-divider>
                    <div>
                      <v-card-subtitle
                        >{{ user.fname }}, if you delete your Genxadda account,
                        you won't be able to retrieve the content or information
                        you've shared on Genxadda. Your all posts and all of
                        your messages will also be deleted</v-card-subtitle
                      >
                    </div>
                    <v-divider></v-divider>
                    <v-row justify="end" class="ma-2">
                      <v-btn
                        v-on="on"
                        color="red"
                        dark
                        @click="deleteUser()"
                        rounded
                        >Delete</v-btn
                      >
                    </v-row>
                  </v-container>
                </v-card>
              </v-dialog>
            </v-row>
          </v-row>
        </v-list-item>
      </v-list>
      <v-container>
        <v-btn color="primary" @click="updateUserInfo()" rounded block
          >Save</v-btn
        >
      </v-container>
      <div v-for="i in msg.length" :key="i">
        <div v-if="msg[i - 1] == 'Done.'">
          <v-alert
            text
            type="success"
            outlined
            icon="mdi-account"
            dismissible
            >{{ msg[i - 1] }}</v-alert
          >
        </div>
        <div v-else>
          <v-alert text type="error" outlined icon="mdi-account" dismissible>{{
            msg[i - 1]
          }}</v-alert>
        </div>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      deleteDialog: false,
      showPass: false,
      msg: [],
    };
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile", "deleteUser"]),
    async updateUserInfo() {
      this.msg = [];

      // form validation
      let regFullAlpha = /^[a-zA-Z]+ [a-zA-Z]+$/;
      let regAlpha = /^[a-zA-Z]+$/;
      let regNum = /^[0-9]+$/;
      let regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      let regusername = /^[a-z0-9._-]+$/;

      let fname = document.getElementById("fname").value;
      let about = document.getElementById("about").value;
      let lname = document.getElementById("lname").value;
      let email = document.getElementById("email").value;
      let username = document.getElementById("username").value;
      let phone = document.getElementById("phone").value;
      let password = document.getElementById("password").value;
      let confirm_password = document.getElementById("confirm_password").value;

      if (lname != "" && lname != null) {
        if (lname != this.user.lname) {
          if (lname.match(regAlpha) || lname.match(regFullAlpha)) {
            let res = await axios.put(`${this.$API}/users/lname/${lname}`);
            this.msg.push(res.data.msg);
            this.getProfile();
          } else {
            this.msg.push("The given last name is not valid.");
          }
        }
      }

      if (email != "" && email != null) {
        if (email != this.user.email) {
          if (email.match(regEmail)) {
            let res = await axios.put(`${this.$API}/users/email/${email}`);
            this.msg.push(res.data.msg);
            this.getProfile();
          } else {
            this.msg.push("The given email is not valid.");
          }
        }
      }

      if (username != "" && username != null) {
        if (username != this.user.username) {
          if (username.match(regusername)) {
            let res = await axios.put(
              `${this.$API}/users/username/${username.toLowerCase()}`
            );
            this.msg.push(res.data.msg);
            this.getProfile();
          } else {
            this.msg.push("The given username is not valid.");
          }
        }
      }

      if (phone != "" && phone != null) {
        if (phone != this.user.phone) {
          if (phone.match(regNum)) {
            let res = await axios.put(`${this.$API}/users/phone/${phone}`);
            this.msg.push(res.data.msg);
            this.getProfile();
          } else {
            this.msg.push("The given Phone number is not valid.");
          }
        }
      }

      if (about != "" && about != null) {
        if (about != this.user.about) {
          let res = await axios.put(`${this.$API}/users/about/${about}`);
          this.msg.push(res.data.msg);
          this.getProfile();
        }
      }

      if (password != "" && confirm_password != "") {
        if (password === confirm_password) {
          let res = await axios.put(`${this.$API}/users/password/${password}`);
          this.msg.push(res.data.msg);
          this.getProfile();
        } else {
          this.msg.push("The password and confirm password must be same.");
        }
      }
    },
  },
  created() {
    this.getProfile();
  },
  mounted() {
    document.title = "Profile settings - GenxAdda";
    console.clear();
  },
};
</script>

<style scoped></style>
