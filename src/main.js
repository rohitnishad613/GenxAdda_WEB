import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import i18n from "./i18n";
import VueMq from "vue-mq";
import vuetify from "./plugins/vuetify";
import Vuebar from "vuebar";
import VuePlyr from "vue-plyr";
import VueCookies from "vue-cookies";
import Notifications from "vue-notification";
import dateFormat from "dateformat";

// import "@/globalComponents";

Vue.use(Notifications);
Vue.use(VueCookies);
// 30 day after, expire
Vue.$cookies.config("30d");

Vue.component("VideoPlayer", () =>
  import("./components/common/VideoPlayer.vue")
);

Vue.component("AudioPLayer", () =>
  import("./components/common/AudioPlayer.vue")
);

Vue.component("ProfileAvatar", () =>
  import("./components/common/ProfileAvatar.vue")
);

Vue.component("CoverPhoto", () => import("./components/common/CoverPhoto.vue"));

Vue.component("Lightbox", () => import("./components/common/Lightbox.vue"));

Vue.use(VuePlyr);

Vue.prototype.getDateTime = (date) => {
  const localDate = new Date(new Date(date).toString());
  let UserFriendlyDateTime = dateFormat(localDate, "d mmmm yyyy, h:MM:ss TT");
  return UserFriendlyDateTime;
};

Vue.prototype.$API = "https://genxadda-api.glitch.me/api";
Vue.prototype.$API_url = "https://genxadda-api.glitch.me";

Vue.use(Vuebar);

Vue.use(VueMq, {
  breakpoints: {
    phone: 500,
    stablet: 800,
    tablet: 1200,
    desktop: Infinity,
  },
});

Vue.config.productionTip = true;

Vue.prototype.$http = axios;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
