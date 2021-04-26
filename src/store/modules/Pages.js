import axios from "axios";

const state = {
  page: null,
  myPages: [],
  joinedPages: [],
  pagesuggation: [],
  status: "",
  Pageerror: null,
  Pagesuccess: null,
  PageEditErrors: null,
  PageEditSuccess: null,
};

const getters = {
  myPages: (state) => state.myPages,
  joinedPages: (state) => state.joinedPages,
  pagesuggation: (state) => state.pagesuggation,
  Pageerror: (state) => state.Pageerror,
  Pagesuccess: (state) => state.Pagesuccess,
  PageEditErrors: (state) => state.PageEditErrors,
  PageEditSuccess: (state) => state.PageEditSuccess,
};

const actions = {
  async getMyPages({ commit, dispatch }) {
    try {
      commit("getPages_req");
      await axios.get(`${this._vm.$API}/pages/mypages`).then((res) => {
        commit("getPages_succ", res.data.pages);
      });
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("getPages_error", err);
    }
  },
  async getJoinedPages({ commit, dispatch }) {
    try {
      commit("getJoinedPages_req");
      await axios.get(`${this._vm.$API}/pages`).then((res) => {
        commit("getJoinedPages_succ", res.data.pages);
      });
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("getJoinedPages_error", err);
    }
  },
  async getPagesSuggations({ commit, dispatch }) {
    try {
      commit("getPagesSuggations_req");
      await axios.get(`${this._vm.$API}/pages/suggations`).then((res) => {
        commit("getPagesSuggations_succ", res.data.pages);
      });
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("getPagesSuggations_error", err);
    }
  },

  async getPage({ commit, dispatch }, id) {
    try {
      commit("getPage_req");
      let res = await axios.get(`${this._vm.$API}/pages/${id}`);
      commit("getPage_succ");
      return res.data.page;
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("getPage_error", err);
    }
  },
  async CreatePage({ commit }, data) {
    try {
      commit("createPage_req");
      await axios.post(`${this._vm.$API}/pages`, data).then((res) => {
        commit("createPage_succ");
      });
    } catch (err) {
      commit("createPage_error");
    }
  },
  async joinpage({ commit }, id) {
    try {
      commit("joinpage_req");
      await axios.post(`${this._vm.$API}/pages/join/${id}`);
      commit("joinpage_succ");
    } catch (err) {
      commit("joinpage_error");
    }
  },
  async unjoinpage({ commit }, id) {
    try {
      commit("unjoinpage_req");
      await axios.post(`${this._vm.$API}/pages/unjoin/${id}`);
      commit("unjoinpage_succ");
    } catch (err) {
      commit("unjoinpage_error");
    }
  },
  async blockpage({ commit }, id) {
    try {
      await axios.put(`${this._vm.$API}/pages/block/${id}`);
    } catch (err) {
      if (err) throw err;
    }
  },
  async unblockpage({ commit }, id) {
    try {
      await axios.put(`${this._vm.$API}/pages/unblock/${id}`);
    } catch (err) {
      if (err) throw err;
    }
  },
  async EditPagePrivacy({ commit }, data) {
    try {
      commit("EditPage_req");
      await axios
        .put(`${this._vm.$API}/pages/edit/${data.id}/privacy`, data)
        .then((res) => {
          commit("EditPage_succ");
        });
    } catch (err) {
      commit("EditPage_error");
    }
  },
  async EditPageName({ commit }, data) {
    try {
      commit("EditPage_req");
      await axios
        .put(`${this._vm.$API}/pages/edit/${data.id}/name`, data)
        .then((res) => {
          commit("EditPage_succ");
        });
    } catch (err) {
      commit("EditPage_error");
    }
  },

  async EditPageCategory({ commit }, data) {
    try {
      commit("EditPage_req");
      await axios
        .put(`${this._vm.$API}/pages/edit/${data.id}/category`, data)
        .then((res) => {
          commit("EditPage_succ");
        });
    } catch (err) {
      commit("EditPage_error");
    }
  },

  async EditPageDescription({ commit }, data) {
    try {
      commit("EditPage_req");
      await axios
        .put(`${this._vm.$API}/pages/edit/${data.id}/description`, data)
        .then((res) => {
          commit("EditPage_succ");
        });
    } catch (err) {
      commit("EditPage_error");
    }
  },

  async EditPageEmail({ commit }, data) {
    try {
      commit("EditPage_req");
      await axios
        .put(`${this._vm.$API}/pages/edit/${data.id}/email`, data)
        .then((res) => {
          commit("EditPage_succ");
        });
    } catch (err) {
      commit("EditPage_error");
    }
  },

  async EditPagePhoneNum({ commit }, data) {
    try {
      commit("EditPage_req");
      await axios
        .put(`${this._vm.$API}/pages/edit/${data.id}/phoneNumber`, data)
        .then((res) => {
          commit("EditPage_succ");
        });
    } catch (err) {
      commit("EditPage_error");
    }
  },

  async EditPageStreet({ commit }, data) {
    try {
      commit("EditPage_req");
      await axios
        .put(`${this._vm.$API}/pages/edit/${data.id}/streetaddress`, data)
        .then((res) => {
          commit("EditPage_succ");
        });
    } catch (err) {
      commit("EditPage_error");
    }
  },

  async EditPageState({ commit }, data) {
    try {
      commit("EditPage_req");
      await axios
        .put(`${this._vm.$API}/pages/edit/${data.id}/state`, data)
        .then((res) => {
          commit("EditPage_succ");
        });
    } catch (err) {
      commit("EditPage_error");
    }
  },

  async EditPageCountry({ commit }, data) {
    try {
      commit("EditPage_req");
      await axios
        .put(`${this._vm.$API}/pages/edit/${data.id}/country`, data)
        .then((res) => {
          commit("EditPage_succ");
        });
    } catch (err) {
      commit("EditPage_error");
    }
  },

  async DeletePage({ commit }, data) {
    try {
      commit("DeletePage_req");
      let res = await axios.delete(`${this._vm.$API}/pages/delete/${data.id}`, {
        data: data,
      });
      commit("DeletePage_succ");
      return res;
    } catch (err) {
      commit("DeletePage_error");
    }
  },
};

const mutations = {
  getPages_req(state) {
    state.status = "Trying to get Pages.";
  },
  getPages_succ(state, data) {
    state.myPages = data;
    state.status = "Get pages succesfully.";
  },
  getPages_error(state, err) {
    state.status = "Falied to get Pages.";
  },

  getJoinedPages_req(state) {
    state.status = "Trying to get Events.";
  },
  getJoinedPages_succ(state, data) {
    state.joinedPages = data;
    state.status = "Get events succesfully.";
  },
  getJoinedPages_error(state, err) {
    state.status = "Falied to get Evnets.";
  },

  getPagesSuggations_req(state) {
    state.status = "Trying to get pages.";
  },
  getPagesSuggations_succ(state, data) {
    state.pagesuggation = data;
    state.status = "Get pages succesfully.";
  },
  getPagesSuggations_error(state, err) {
    state.status = "Falied to get Pages.";
  },

  EditPage_req(state) {
    state.status = "Trying to edit Page.";
  },
  EditPage_succ(state) {
    state.PageEditSuccess = "Page save successfully.";
  },
  EditPage_error(state) {
    state.PageEditErrors = "Failed to edit page.";
  },

  getPage_req(state) {
    state.status = "Trying to get Pages.";
  },
  getPage_succ(state) {
    state.status = "Get Page succesfully.";
  },
  getPage_error(state, err) {
    state.status = "Falied to get page.";
  },

  createPage_req(state) {
    state.status = "Trying to create new page.";
  },
  createPage_succ(state) {
    state.Pagesuccess = "Page created successfully.";
  },
  createPage_error(state) {
    state.status = "error";
    state.PageEditErrors = "Failed to create new page.";
  },

  joinpage_req(state) {
    state.status = "Trying to follow page.";
  },
  joinpage_succ(state) {
    state.status = "follow page succesfully.";
  },
  joinpage_error(state, err) {
    state.status = "Falied to follow page.";
  },

  unjoinpage_req(state) {
    state.status = "Trying to unfollow page.";
  },
  unjoinpage_succ(state) {
    state.status = "unfollow page succesfully.";
  },
  unjoinpage_error(state, err) {
    state.status = "Falied to unfollow page.";
  },

  DeletePage_req(state) {
    state.status = "Trying to delete Pages.";
  },
  DeletePage_succ(state) {
    state.status = "Pages delete successfully.";
  },
  DeletePage_error(state) {
    state.error = "Failed to delete Pages.";
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
