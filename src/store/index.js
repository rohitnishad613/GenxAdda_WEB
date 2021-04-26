import Vue from "vue";
import Vuex from "vuex";
import Auth from "./modules/Auth";
import Apperance from "./modules/Apperance";
import Posts from "./modules/Posts";
import Status from "./modules/Status";
import Events from "./modules/Event";
import Pages from "./modules/Pages";
import Groups from "./modules/Groups";
import Feedback from "./modules/Feedback";
import Report from "./modules/Report";
import Notification from "./modules/Notification";
import Friendship from "./modules/friendship";
import handleErrors from "./modules/handleErrors";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    Apperance,
    Posts,
    Status,
    Events,
    Pages,
    Groups,
    Feedback,
    Notification,
    handleErrors,
    Report,
    Friendship,
  },
});
