import axios from "axios";
import router from "../../router";
const state = {
  token: localStorage.getItem("token") || "",
  user: {},
  Auser: {},
  status: "",
  auth_error: null
};

const getters = {
  isLoggedIn: (state) => !!state.token,
  authState: (state) => state.status,
  auth_error: (state) => state.auth_error,
  user: (state) => state.user,
  Auser: (state) => state.Auser,
};

const actions = {
  // Login Action
  async login({ commit, dispatch }, user) {
    commit("auth_request");
    try {
      let res = await axios.post(`${this._vm.$API}/users/login`, user);
      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;
        // Store the token into the localstorage
        localStorage.setItem("token", token);
        // Set the axios defaults
        axios.defaults.headers.common["Authorization"] = token;
        commit("auth_success", token, user);
      }
      return res;
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("auth_error", err);
    }
  },
  // Register User
  async register({ commit, dispatch }, userData) {
    try {
      commit("register_request");
      let res = await axios.post(`${this._vm.$API}/users/register`, userData);
      return res;
    } catch (err) {
      commit("register_error", err);
    }
  },

  async resetPassword({ commit }, Data) {
    try {
      let res = await axios.post(`${this._vm.$API}/users/reset-password`, Data);
      return res;
    } catch (err) {
      return err;
    }
  },

  async checkResetPasswordOTP({ dispatch }, Data) {
      try {
        let res = await axios.post(`${this._vm.$API}/users/check-reset-password-otp`, Data);
        return res;
      } catch (err) {
        return err;
      }
  },

  async resendResetPasswordOTP({ dispatch }, email) {
    if(email){
      try {
        let res = await axios.post(
          `${this._vm.$API}/users/resend-reset-password-otp`,
          email
        );
        return res;
      } catch (err) {
        return err;
      }
    }else {
      return {response: {data: {msg: "We are unable to find your email address. Try again."}}};
    }
  },

  async resendOTP({ dispatch }, email) {
      if(email){
        try {
          let res = await axios.post(
            `${this._vm.$API}/users/resend-otp`,
            email
          );
          return res;
        } catch (err) {
          return err;
        }
      } else {
        return {response: {data: {err: "We are unable to find your email address. Try again."}}};
      }
  },

  async checkOTP({ commit, dispatch }, Data) {
    try {
      let res = await axios.post(`${this._vm.$API}/users/verify-otp`, Data);
      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;
        // Store the token into the localstorage
        localStorage.setItem("token", token);
        // Set the axios defaults
        axios.defaults.headers.common["Authorization"] = token;
        commit("register_success", token, user);
      }
      return res;
    } catch (error) {
      commit("register_error", error);
    }
  },

  // Get the user Profile
  async getProfile({ commit }) {
    commit("profile_request");
    let res = await axios.get(`${this._vm.$API}/users/profile`);
    commit("profile", res.data.user);
    return res;
  },

  async blockuser({ commit }, id) {
    try {
      await axios.put(`${this._vm.$API}/users/block/${id}`);
    } catch (err) {
      if (err) throw err;
    }
  },
  async unblockuser({ commit }, id) {
    try {
      await axios.put(`${this._vm.$API}/users/unblock/${id}`);
    } catch (err) {
      if (err) throw err;
    }
  },

  // Get the another user Profile
  async getUser({ commit, dispatch }, user) {
    try {
      commit("user_request");
      let res = await axios.get(`${this._vm.$API}/users/${user}`);
      if (res.data.user) {
        commit("user_profile", res.data.user);
      }
    } catch (err) {
      dispatch("globalErrorHandler", err);
    }
  },

  // Logout the user
  async logout({ commit }) {
    await localStorage.removeItem("token");
    commit("logout");
    delete axios.defaults.headers.common["Authorization"];
    router.push("/login");
    return;
  },

  async deleteUser({ commit }) {
    axios.delete(`${this._vm.$API}/users`);
    await localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    router.push("/login");
    commit("deleteAccount");
  },
};

const mutations = {
  auth_request(state) {
    state.auth_error = null;
    state.status = "loading";
  },
  auth_success(state, token, user) {
    state.token = token;
    state.user = user;
    state.status = "success";
    state.auth_error = null;
  },
  auth_error(state, err) {
    state.auth_error = err.response.data.msg;
  },
  register_request(state) {
    state.auth_error = null;
    state.status = "loading";
  },
  register_success(state, token, user) {
    state.token = token;
    state.user = user;
    state.auth_error = null;
    state.status = "success";
  },
  register_error(state, err) {
    state.auth_error = err.response.data.msg;
  },
  logout(state) {
    state.auth_error = null;
    state.status = "";
    state.token = "";
    state.user = "";
  },
  deleteAccount(state) {
    state.auth_error = null;
    state.status = "";
    state.token = "";
    state.user = "";
  },
  profile_request(state) {
    state.status = "loading";
  },
  user_request(state) {
    state.status = "loading";
  },
  user_profile(state, user) {
    state.Auser = user;
  },
  profile(state, user) {
    state.user = user;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
