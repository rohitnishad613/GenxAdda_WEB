import axios from "axios";

const state = {
  group: null,
  mygroups: [],
  joinedgroups: [],
  groupsuggation: [],
  status: "",
  grouperror: null,
  groupsuccess: null,
  groupEditErrors: null,
  groupEditSuccess: null,
};

const getters = {
  mygroups: (state) => state.mygroups,
  joinedgroups: (state) => state.joinedgroups,
  groupsuggation: (state) => state.groupsuggation,
  grouperror: (state) => state.grouperror,
  groupsuccess: (state) => state.groupsuccess,
  groupEditErrors: (state) => state.groupEditErrors,
  groupEditSuccess: (state) => state.groupEditSuccess,
};

const actions = {
  async getMygroups({ commit, dispatch }) {
    try {
      commit("getgroups_req");
      await axios.get(`${this._vm.$API}/groups/mygroups`).then((res) => {
        commit("getgroups_succ", res.data.groups);
      });
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("getgroups_error", err);
    }
  },
  async getJoinedgroups({ commit, dispatch }) {
    try {
      commit("getJoinedgroups_req");
      await axios.get(`${this._vm.$API}/groups`).then((res) => {
        commit("getJoinedgroups_succ", res.data.groups);
      });
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("getJoinedgroups_error", err);
    }
  },
  async getgroupsSuggations({ commit, dispatch }) {
    try {
      commit("getgroupsSuggations_req");
      await axios.get(`${this._vm.$API}/groups/suggations`).then((res) => {
        commit("getgroupsSuggations_succ", res.data.groups);
      });
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("getgroupsSuggations_error", err);
    }
  },

  async getgroup({ commit, dispatch }, id) {
    try {
      commit("getgroup_req");
      let res = await axios.get(`${this._vm.$API}/groups/${id}`);
      commit("getgroup_succ");
      return res.data.group;
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("getgroup_error", err);
    }
  },
  async Creategroup({ commit }, data) {
    try {
      commit("creategroup_req");
      await axios.post(`${this._vm.$API}/groups`, data).then((res) => {
        commit("creategroup_succ");
      });
    } catch (err) {
      commit("creategroup_error");
    }
  },
  async joingroup({ commit }, id) {
    try {
      commit("joingroup_req");
      await axios.post(`${this._vm.$API}/groups/join/${id}`);
      commit("joingroup_succ");
    } catch (err) {
      commit("joingroup_error");
    }
  },
  async unjoingroup({ commit }, id) {
    try {
      commit("unjoingroup_req");
      await axios.post(`${this._vm.$API}/groups/unjoin/${id}`);
      commit("unjoingroup_succ");
    } catch (err) {
      commit("unjoingroup_error");
    }
  },
  async blockgroup({ commit }, id) {
    try {
      await axios.put(`${this._vm.$API}/groups/block/${id}`);
    } catch (err) {
      if (err) throw err;
    }
  },
  async unblockgroup({ commit }, id) {
    try {
      await axios.put(`${this._vm.$API}/groups/unblock/${id}`);
    } catch (err) {
      if (err) throw err;
    }
  },
  async EditgroupPrivacy({ commit }, data) {
    try {
      commit("Editgroup_req");
      await axios
        .put(`${this._vm.$API}/groups/edit/${data.id}/privacy`, data)
        .then((res) => {
          commit("Editgroup_succ");
        });
    } catch (err) {
      commit("Editgroup_error");
    }
  },
  async EditgroupName({ commit }, data) {
    try {
      commit("Editgroup_req");
      await axios
        .put(`${this._vm.$API}/groups/edit/${data.id}/name`, data)
        .then((res) => {
          commit("Editgroup_succ");
        });
    } catch (err) {
      commit("Editgroup_error");
    }
  },

  async EditgroupCategory({ commit }, data) {
    try {
      commit("Editgroup_req");
      await axios
        .put(`${this._vm.$API}/groups/edit/${data.id}/category`, data)
        .then((res) => {
          commit("Editgroup_succ");
        });
    } catch (err) {
      commit("Editgroup_error");
    }
  },

  async EditgroupDescription({ commit }, data) {
    try {
      commit("Editgroup_req");
      await axios
        .put(`${this._vm.$API}/groups/edit/${data.id}/description`, data)
        .then((res) => {
          commit("Editgroup_succ");
        });
    } catch (err) {
      commit("Editgroup_error");
    }
  },

  async EditgroupEmail({ commit }, data) {
    try {
      commit("Editgroup_req");
      await axios
        .put(`${this._vm.$API}/groups/edit/${data.id}/email`, data)
        .then((res) => {
          commit("Editgroup_succ");
        });
    } catch (err) {
      commit("Editgroup_error");
    }
  },

  async EditgroupPhoneNum({ commit }, data) {
    try {
      commit("Editgroup_req");
      await axios
        .put(`${this._vm.$API}/groups/edit/${data.id}/phoneNumber`, data)
        .then((res) => {
          commit("Editgroup_succ");
        });
    } catch (err) {
      commit("Editgroup_error");
    }
  },

  async Editgroupstreet({ commit }, data) {
    try {
      commit("Editgroup_req");
      await axios
        .put(`${this._vm.$API}/groups/edit/${data.id}/streetaddress`, data)
        .then((res) => {
          commit("Editgroup_succ");
        });
    } catch (err) {
      commit("Editgroup_error");
    }
  },

  async Editgroupstate({ commit }, data) {
    try {
      commit("Editgroup_req");
      await axios
        .put(`${this._vm.$API}/groups/edit/${data.id}/state`, data)
        .then((res) => {
          commit("Editgroup_succ");
        });
    } catch (err) {
      commit("Editgroup_error");
    }
  },

  async EditgroupCountry({ commit }, data) {
    try {
      commit("Editgroup_req");
      await axios
        .put(`${this._vm.$API}/groups/edit/${data.id}/country`, data)
        .then((res) => {
          commit("Editgroup_succ");
        });
    } catch (err) {
      commit("Editgroup_error");
    }
  },

  async Deletegroup({ commit }, data) {
    try {
      commit("Deletegroup_req");
      let res = await axios.delete(
        `${this._vm.$API}/groups/delete/${data.Id}`,
        { data: data }
      );
      commit("Deletegroup_succ");
      return res;
    } catch (err) {
      commit("Deletegroup_error");
    }
  },
};

const mutations = {
  getgroups_req(state) {
    state.status = "Trying to get groups.";
  },
  getgroups_succ(state, data) {
    state.mygroups = data;
    state.status = "Get groups succesfully.";
  },
  getgroups_error(state, err) {
    state.status = "Falied to get groups.";
  },

  getJoinedgroups_req(state) {
    state.status = "Trying to get Groups.";
  },
  getJoinedgroups_succ(state, data) {
    state.joinedgroups = data;
    state.status = "Get Groups succesfully.";
  },
  getJoinedgroups_error(state, err) {
    state.status = "Falied to get Evnets.";
  },

  getgroupsSuggations_req(state) {
    state.status = "Trying to get groups.";
  },
  getgroupsSuggations_succ(state, data) {
    state.groupsuggation = data;
    state.status = "Get groups succesfully.";
  },
  getgroupsSuggations_error(state, err) {
    state.status = "Falied to get groups.";
  },

  Editgroup_req(state) {
    state.status = "Trying to edit group.";
  },
  Editgroup_succ(state) {
    state.groupEditSuccess = "Group save successfully.";
  },
  Editgroup_error(state) {
    state.groupEditErrors = "Failed to edit group.";
  },

  getgroup_req(state) {
    state.status = "Trying to get groups.";
  },
  getgroup_succ(state) {
    state.status = "Get group succesfully.";
  },
  getgroup_error(state, err) {
    state.status = "Falied to get group.";
  },

  creategroup_req(state) {
    state.status = "Trying to create new group.";
  },
  creategroup_succ(state) {
    state.groupsuccess = "group created successfully.";
  },
  creategroup_error(state) {
    state.status = "error";
    state.groupEditErrors = "Failed to create new group.";
  },

  Deletegroup_req(state) {
    state.status = "Trying to delete groups.";
  },
  Deletegroup_succ(state) {
    state.status = "groups delete successfully.";
  },
  Deletegroup_error(state) {
    state.error = "Failed to delete groups.";
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
