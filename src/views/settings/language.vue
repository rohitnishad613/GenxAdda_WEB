<template>
  <v-card style="border-radius:20px;" class="box-shadow">
    <v-card-title>Languages</v-card-title>
    <v-list>
      <v-list-item>
        <v-list-item-title>English</v-list-item-title>
        <v-btn @click="changeLanguage('en')" color="primary" rounded small
          >SET</v-btn
        >
      </v-list-item>
      <v-list-item>
        <v-list-item-title>हिन्दी</v-list-item-title>
        <v-btn @click="changeLanguage('hi')" color="primary" rounded small
          >SET</v-btn
        >
      </v-list-item>
      <v-list-item>
        <v-list-item-title>中文</v-list-item-title>
        <v-btn @click="changeLanguage('ch')" color="primary" rounded small
          >SET</v-btn
        >
      </v-list-item>
      <v-list-item>
        <v-list-item-title>বাংলা</v-list-item-title>
        <v-btn @click="changeLanguage('bn')" color="primary" rounded small
          >SET</v-btn
        >
      </v-list-item>
      <v-list-item>
        <v-list-item-title>मराठी</v-list-item-title>
        <v-btn @click="changeLanguage('mr')" color="primary" rounded small
          >SET</v-btn
        >
      </v-list-item>
      <v-list-item>
        <v-list-item-title>ਪੰਜਾਬੀ</v-list-item-title>
        <v-btn @click="changeLanguage('pa')" color="primary" rounded small
          >SET</v-btn
        >
      </v-list-item>
      <v-list-item>
        <v-list-item-title>தமிழ்</v-list-item-title>
        <v-btn @click="changeLanguage('ta')" color="primary" rounded small
          >SET</v-btn
        >
      </v-list-item>
      <v-list-item>
        <v-list-item-title>తెలుగు</v-list-item-title>
        <v-btn @click="changeLanguage('te')" color="primary" rounded small
          >SET</v-btn
        >
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["globalErrorHandler"]),
    changeLanguage(lang) {
      // change the active language
      this._i18n.locale = lang;
      // change lang attributes in doc
      document.querySelector("html").setAttribute("lang", lang);
      //save language in cookies
      this.$cookies.set("lang", lang);
      // save to db
      axios.put(`${this.$API}/users/lang/${lang}`).catch((err) => {
        this.globalErrorHandler(err);
      });
    },
  },
};
</script>

<style scoped></style>
