<template>
  <div @click="toggelSpeechRecongnition()">
    <v-card-subtitle class="ma-0 pa-0 text-center">{{
      voiceinput
    }}</v-card-subtitle>
    <v-list-item>
      <v-icon class="mr-2">mdi-microphone</v-icon>
      <v-list-item-title>{{ $t("ai_name") }}</v-list-item-title>
      <v-switch v-model="SpeechRecognition"></v-switch>
    </v-list-item>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      SpeechRecognition: false,
      voiceinput: "",
    };
  },
  watch: {
    SpeechRecognition(nevalue, oldvalue) {
      this.handleSpeechRecognition();
      if (nevalue == true) {
        this.$cookies.set("SpeechRecognition", true);
      } else if (nevalue == false) {
        this.$cookies.set("SpeechRecognition", false);
      }
    },
  },
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
  },
  methods: {
    ...mapActions(["logout", "getProfile"]),
    toggelSpeechRecongnition() {
      this.SpeechRecognition = !this.SpeechRecognition;
    },
    handleSpeechRecognition() {
      const SpeechRecognition =
        window.speechRecognition || window.webkitSpeechRecognition;

      let recognition = new SpeechRecognition();

      recognition.interimResults = true;
      if (this.SpeechRecognition) {
        recognition.addEventListener("result", (e) => {
          let result = Array.from(e.results).map(
            (result) => result[0].transcript
          );
          this.voiceinput = result[0];
          let input = result[0].toLowerCase();
          let inputArray = input.trim().split(" ");
          if (e.results[0].isFinal) {
            if (inputArray.indexOf("scroll") != -1) {
              if (inputArray.indexOf("down") != -1) {
                window.scrollBy({ top: 1000, behavior: "smooth" });
              }
              if (inputArray.indexOf("up") != -1) {
                window.scrollBy({ top: -1000, behavior: "smooth" });
              }
            }

            if (
              inputArray.indexOf("settings") != -1 ||
              inputArray.indexOf("setting") != -1
            ) {
              if (inputArray.indexOf("profile") != -1) {
                this.$router.push("/settings/profile");
              }
              if (inputArray.indexOf("privacy") != -1) {
                this.$router.push("/settings/profile");
              }
              if (inputArray.indexOf("appearance") != -1) {
                this.$router.push("/settings/appearance");
              }
              if (inputArray.indexOf("blocking") != -1) {
                this.$router.push("/settings/blocking");
              }
            }

            if (inputArray.indexOf("trending") != -1) {
              this.$router.push("/trending");
            }
            if (inputArray.indexOf("home") != -1) {
              this.$router.push("/");
            }
            if (
              inputArray.indexOf("groups") != -1 ||
              inputArray.indexOf("group") != -1
            ) {
              this.$router.push("/groups");
            }
            if (
              inputArray.indexOf("pages") != -1 ||
              inputArray.indexOf("page") != -1
            ) {
              this.$router.push("/pages");
            }
            if (
              inputArray.indexOf("events") != -1 ||
              inputArray.indexOf("event") != -1
            ) {
              this.$router.push("/events");
            }
            if (inputArray.indexOf("profile") != -1) {
              this.$router.push(`/${this.user._id}`);
            }
            if (
              inputArray.indexOf("chats") != -1 ||
              inputArray.indexOf("chat") != -1
            ) {
              this.$router.push("/chats");
            }
            if (
              inputArray.indexOf("watch") != -1 &&
              inputArray.indexOf("later") != -1
            ) {
              this.$router.push("/watch-later");
            }
            if (
              inputArray.indexOf("friends") != -1 &&
              inputArray.indexOf("friend") != -1
            ) {
              this.$router.push("/friends");
            }

            if (
              inputArray.indexOf("dark") != -1 &&
              inputArray.indexOf("mode") != -1
            ) {
              if (inputArray.indexOf("on") != -1) {
                this.$vuetify.theme.dark = true;
                this.$cookies.set("DarkMode", true);
              }
              if (inputArray.indexOf("off") != -1) {
                this.$vuetify.theme.dark = false;
                this.$cookies.set("DarkMode", false);
              }
              if (inputArray.indexOf("toggel") != -1) {
                if (this.$vuetify.theme.dark) {
                  this.$vuetify.theme.dark = false;
                  this.$cookies.set("DarkMode", false);
                } else {
                  this.$vuetify.theme.dark = true;
                  this.$cookies.set("DarkMode", true);
                }
              }
            }

            if (inputArray.indexOf("logout") != -1) {
              this.logout();
            }
            if (inputArray.indexOf("reload") != -1) {
              window.reload();
            }
          }
        });

        recognition.addEventListener("end", recognition.start);

        recognition.start();
      } else {
        this.SpeechRecognition = false;
        this.voiceinput = "";
      }
    },
  },
  async created() {
    await this.getProfile();
    if (this.$cookies.get("SpeechRecognition")) {
      // cookies are not support boolen so convert string into a boolean
      var cookieValue =
        this.$cookies.get("SpeechRecognition").toLowerCase() == "true"
          ? true
          : false;
      this.SpeechRecognition = cookieValue;
    }
  },
};
</script>
