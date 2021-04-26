import io from "socket.io-client";
import axios from "axios";
import Vue from "vue";

const state = {
  notifications_arr: [],
  no_more_notifications: true
};

const getters = {
  notifications_arr: (state) => state.notifications_arr,
  no_more_notifications: (state) => state.no_more_notifications
};

const actions = {
  seen_notifications() {
    axios.post(`${this._vm.$API}/notifications/seen`);
  },
  async getNotifications({ commit }, date) {
    let res = await axios.get(`${this._vm.$API}/notifications/${date}`);
    commit("getOldNotifications", res);
  },

  async getMoreNotifications({ commit }, date) {
    let res = await axios.get(`${this._vm.$API}/notifications/${date}`);
    commit("getMoreOldNotifications", res);
  },

  ListeningForNotifications({ commit }) {
    let socket = io(`${this._vm.$API_url}/notifications`, {
      query: `token=${localStorage.getItem("token")}`,
    });
    socket.on("GetNewNotifications", (data) => {
      let DataLen = data.length;
      for (let i = 0; i < DataLen; i++) {
        commit("getNewNotifications", data[i]);
        Vue.notify({
          group: "newNotifications",
          title: "New notification",
          type: "warn",
          text: data[i].msg,
        });
      }
    });
  },

  deleteNotification({ commit }, id) {
    axios.delete(`${this._vm.$API}/notifications/${id}`);
  },
};

const mutations = {
  getOldNotifications(state, data) {
    state.notifications_arr = data.data.notifications;
    let notifications = data.data.notifications;
    let notifications_len = notifications.length;
    if (notifications_len > 10) {
      state.notifications_arr = data.data.notifications;
    } else {
      state.no_more_notifications = true;
    }
  },
  getMoreOldNotifications(state, data) {
    let notifications = data.data.notifications;
    let notifications_len = notifications.length;
    if (notifications_len > 10) {
      state.notifications_arr = state.notifications_arr.concat(data.data.notifications);
    } else {
      state.no_more_notifications = true;
    }
  },
  getNewNotifications(state, data) {
    state.notifications_arr = state.notifications_arr.unshift(data);
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
