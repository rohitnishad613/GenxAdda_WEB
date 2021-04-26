import cookie from "vue-cookies";

const state = {
  drawer: null,
  LeftSidebar: {
    temporary:
      cookie.get("LeftSideBarTemprary") != null
        ? cookie.get("LeftSideBarTemprary") == "true"
          ? true
          : false
        : false,
    mini:
      cookie.get("LeftSideBarMini") != null
        ? cookie.get("LeftSideBarMini") == "true"
          ? true
          : false
        : false,
    hide:
      cookie.get("LeftSideBarHide") != null
        ? cookie.get("LeftSideBarHide") == "true"
          ? true
          : false
        : false,
  },
  RightSidebar: {
    temporary:
      cookie.get("RightSideBarTemprary") != null
        ? cookie.get("RightSideBarTemprary") == "true"
          ? true
          : false
        : false,
    mini:
      cookie.get("RightSideBarMini") != null
        ? cookie.get("RightSideBarMini") == "true"
          ? true
          : false
        : false,
    hide:
      cookie.get("RightSideBarHide") != null
        ? cookie.get("RightSideBarHide") == "true"
          ? true
          : false
        : false,
  },
  status: "",
};

const getters = {
  drawer: (state) => state.drawer,
  LeftSidebar: (state) => state.LeftSidebar,
  RightSidebar: (state) => state.RightSidebar,
};

const actions = {
  setDrawer({ commit }, bool) {
    state.drawer = bool;
  },
  LeftSidebar({ commit }, data) {
    try {
      commit("setLeftSidebar", data);
    } catch (err) {
      commit("LeftSidebar_Apperance_error", err);
    }
  },
  rightSidebar({ commit }, data) {
    try {
      commit("setRightSidebar", data);
    } catch (err) {
      commit("LeftSidebar_Apperance_error", err);
    }
  },
};

const mutations = {
  setLeftSidebar(state, data) {
    cookie.set("LeftSideBarTemprary", data.temporary);
    cookie.set("LeftSideBarMini", data.mini);
    cookie.set("LeftSideBarHide", data.hide);
  },
  LeftSidebar_Apperance_error(state, err) {
    state.status = "Srroy! Try again later.";
  },
  setRightSidebar(state, data) {
    cookie.set("RightSideBarTemprary", data.temporary);
    cookie.set("RightSideBarMini", data.mini);
    cookie.set("RightSideBarHide", data.hide);
  },
  RightSidebar_Apperance_error(state, err) {
    state.status = "Srroy! Try again later.";
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
