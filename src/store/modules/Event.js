import axios from "axios";

const state = {
  myEvnets: [],
  friendsEvents: [],
  pagesEvents: [],
  status: "",
  success: "",
  EditEvnetsErrors: "",
  EditSuccess: "",
};

const getters = {
  myEvnets: (state) => state.myEvnets,
  friendsEvents: (state) => state.friendsEvents,
  pagesEvents: (state) => state.pagesEvents,
  EvnetsErrors: (state) => state.error,
  EditEvnetsErrors: (state) => state.EditEvnetsErrors,
  EditSuccess: (state) => state.EditSuccess,
  success: (state) => state.success,
  status: (state) => state.status,
};

const actions = {
  async getEvnets({ commit, dispatch }) {
    try {
      commit("getEvnets_req");
      await axios.get(`${this._vm.$API}/events`).then((res) => {
        commit("getEvnets_succ", res.data.events);
      });
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("getEvnets_error", err);
    }
  },
  async getFriendsEvnets({ commit, dispatch }) {
    try {
      commit("getFriendsEvnets_req");
      await axios.get(`${this._vm.$API}/events/friends`).then((res) => {
        commit("getFriendsEvnets_succ", res.data.events);
      });
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("getFriendsEvnets_error", err);
    }
  },
  async getPagesEvnets({ commit, dispatch }) {
    try {
      commit("getPagesEvnets_req");
      await axios.get(`${this._vm.$API}/events/pages`).then((res) => {
        commit("getPagesEvnets_succ", res.data.events);
      });
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("getPagesEvnets_error", err);
    }
  },
  async getevent({ commit, dispatch }, id) {
    try {
      commit("getEvent_req");
      let res = await axios.get(`${this._vm.$API}/events/${id}`);
      commit("getEvent_succ");
      return res.data.event;
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("getEvent_error", err);
    }
  },
  async CreateEvnet({ commit }, data) {
    try {
      commit("createEvnets_req");
      await axios.post(`${this._vm.$API}/events`, data).then((res) => {
        commit("createEvnets_succ");
      });
    } catch (err) {
      commit("createEvnets_error");
    }
  },
  async joinevent({ commit, dispatch }, eventid) {
    try {
      commit("joinevent_req");
      let res = await axios.post(`${this._vm.$API}/events/join/${eventid}`);
      commit("joinevent_succ");
      return res.data.event;
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("joinevent_error");
    }
  },
  async unjoinevent({ commit, dispatch }, eventid) {
    try {
      commit("unjoinevent_req");
      let res = await axios.post(`${this._vm.$API}/events/unjoin/${eventid}`);
      commit("unjoinevent_succ");
      return res.data.event;
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("unjoinevent_error");
    }
  },
  async EditEvnetPhoto({ commit }, data) {
    try {
      commit("EditEvnet_req");
      await axios
        .put(
          `${this._vm.$API}/events/edit/${data.eventid}/photo`,
          data.formData
        )
        .then((res) => {
          commit("EditEvnet_succ");
        });
    } catch (err) {
      commit("EditEvnet_error");
    }
  },
  async EditEvnetName({ commit }, data) {
    try {
      commit("EditEvnet_req");
      await axios
        .put(`${this._vm.$API}/events/edit/${data.eventid}/name`, data.formData)
        .then((res) => {
          commit("EditEvnet_succ");
        });
    } catch (err) {
      commit("EditEvnet_error");
    }
  },
  async EditEvnetDesc({ commit }, data) {
    try {
      commit("EditEvnet_req");
      await axios
        .put(
          `${this._vm.$API}/events/edit/${data.eventid}/description`,
          data.formData
        )
        .then((res) => {
          commit("EditEvnet_succ");
        });
    } catch (err) {
      commit("EditEvnet_error");
    }
  },
  async EditEvnetLocation({ commit }, data) {
    try {
      commit("EditEvnet_req");
      await axios
        .put(
          `${this._vm.$API}/events/edit/${data.eventid}/location`,
          data.formData
        )
        .then((res) => {
          commit("EditEvnet_succ");
        });
    } catch (err) {
      commit("EditEvnet_error");
    }
  },
  async EditEvnetURL({ commit }, data) {
    try {
      commit("EditEvnet_req");
      await axios
        .put(`${this._vm.$API}/events/edit/${data.eventid}/url`, data.formData)
        .then((res) => {
          commit("EditEvnet_succ");
        });
    } catch (err) {
      commit("EditEvnet_error");
    }
  },
  async EditEvnetStartDate({ commit }, data) {
    try {
      commit("EditEvnet_req");
      await axios
        .put(
          `${this._vm.$API}/events/edit/${data.eventid}/startDate`,
          data.formData
        )
        .then((res) => {
          commit("EditEvnet_succ");
        });
    } catch (err) {
      commit("EditEvnet_error");
    }
  },
  async EditEvnetStartTime({ commit }, data) {
    try {
      commit("EditEvnet_req");
      await axios
        .put(
          `${this._vm.$API}/events/edit/${data.eventid}/startTime`,
          data.formData
        )
        .then((res) => {
          commit("EditEvnet_succ");
        });
    } catch (err) {
      commit("EditEvnet_error");
    }
  },
  async EditEvnetEndDate({ commit }, data) {
    try {
      commit("EditEvnet_req");
      await axios
        .put(
          `${this._vm.$API}/events/edit/${data.eventid}/endDate`,
          data.formData
        )
        .then((res) => {
          commit("EditEvnet_succ");
        });
    } catch (err) {
      commit("EditEvnet_error");
    }
  },
  async EditEvnetEndTime({ commit }, data) {
    try {
      commit("EditEvnet_req");
      await axios
        .put(
          `${this._vm.$API}/events/edit/${data.eventid}/endTime`,
          data.formData
        )
        .then((res) => {
          commit("EditEvnet_succ");
        });
    } catch (err) {
      commit("EditEvnet_error");
    }
  },
  async DeleteEvent({ commit }, data) {
    try {
      commit("DeleteEvent_req");
      let res = await axios.delete(
        `${this._vm.$API}/events/delete/${data.eventId}`,
        { data: data }
      );
      commit("DeleteEvent_succ");
      return res;
    } catch (err) {
      commit("DeleteEvent_error");
    }
  },
};

const mutations = {
  getEvnets_req(state) {
    state.status = "Trying to get Events.";
  },
  getEvnets_succ(state, data) {
    state.myEvnets = data;
    state.status = "Get events succesfully.";
  },
  getEvnets_error(state, err) {
    state.status = "Falied to get Evnets.";
  },

  getFriendsEvnets_req(state) {
    state.status = "Trying to get Events.";
  },
  getFriendsEvnets_succ(state, data) {
    state.friendsEvents = data;
    state.status = "Get events succesfully.";
  },
  getFriendsEvnets_error(state, err) {
    state.status = "Falied to get Evnets.";
  },

  getEvent_req(state) {
    state.status = "Trying to get Events.";
  },
  getEvent_succ(state) {
    state.status = "Get events succesfully.";
  },
  getEvent_error(state, err) {
    state.error = err;
    state.status = "Falied to get Evnets.";
  },

  joinevent_req(state) {
    state.status = "Trying to join Events.";
  },
  joinevent_succ(state) {
    state.status = "Join events succesfully.";
  },
  joinevent_error(state, err) {
    state.error = err;
    state.status = "Falied to join Evnets.";
  },

  unjoinevent_req(state) {
    state.status = "Trying to unjoin Events.";
  },
  unjoinevent_succ(state) {
    state.status = "Unjoin events succesfully.";
  },
  unjoinevent_error(state, err) {
    state.error = err;
    state.status = "Falied to unjoin Evnets.";
  },

  getPagesEvnets_req(state) {
    state.status = "Trying to get Events.";
  },
  getPagesEvnets_succ(state, data) {
    state.pagesEvents = data;
    state.status = "Get events succesfully.";
  },
  getPagesEvnets_error(state, err) {
    state.error = err;
    state.status = "Falied to get Evnets.";
  },

  createEvnets_req(state) {
    state.status = "Trying to create new Events.";
  },
  createEvnets_succ(state) {
    state.success = "Events created successfully.";
  },
  createEvnets_error(state) {
    state.status = "Failed to create new events.";
  },

  EditEvnet_req(state) {
    state.status = "Trying to edit Events.";
  },
  EditEvnet_succ(state) {
    state.EditSuccess = "Events save successfully.";
  },
  EditEvnet_error(state) {
    state.EditEvnetsErrors = "Failed to edit events.";
  },

  DeleteEvent_req(state) {
    state.status = "Trying to delete Events.";
  },
  DeleteEvent_succ(state) {
    state.status = "Events delete successfully.";
  },
  DeleteEvent_error(state) {
    state.error = "Failed to delete events.";
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
