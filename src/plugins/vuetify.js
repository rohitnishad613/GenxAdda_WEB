import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#ff8b06",
        secondary: "#000000"       
      },
      dark: {
        primary: "#ff8b06",
        secondary: "#ffffff"
      }
    }
  }
});
