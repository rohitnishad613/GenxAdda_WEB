<template>
  <v-footer>
    <v-row justify="center" class="text-center pa-3" style="width:100%;">
      <v-btn @click="changeLanguage('en')" text rounded small>English</v-btn>
      <v-btn @click="changeLanguage('hi')" text rounded small>हिन्दी</v-btn>
      <v-btn @click="changeLanguage('ch')" text rounded small>中文</v-btn>
      <v-btn @click="changeLanguage('bn')" text rounded small>বাংলা</v-btn>
      <v-btn @click="changeLanguage('mr')" text rounded small>मराठी</v-btn>
      <v-btn @click="changeLanguage('pa')" text rounded small>ਪੰਜਾਬੀ</v-btn>
      <v-btn @click="changeLanguage('ta')" text rounded small>தமிழ்</v-btn>
      <v-btn @click="changeLanguage('te')" text rounded small>తెలుగు</v-btn>
    </v-row>
    <v-row justify="center" class="text-center" style="width:100%;">
      <router-link to="/data-privacy">{{ $t("data_privacy") }} </router-link>
      &middot;
      <router-link to="/term-and-conditions"
        >{{ $t("terms_and_conditions") }}
      </router-link>
      &middot; Genxadda
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    changeLanguage(lang) {
      // change the active language
      this._i18n.locale = lang;
      // change lang attributes in doc
      document.querySelector("html").setAttribute("lang", lang);
      //save language in cookies
      this.$cookies.set("lang", lang);
    },
  },
};
</script>
