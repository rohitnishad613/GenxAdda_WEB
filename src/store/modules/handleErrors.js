import router from "../../router/index";

const state = {
  error: null,
};

const getters = {
  error: (state) => state.error,
};

const actions = {
  async globalErrorHandler({ commit }, err) {
    if (err.response) {
      if (err.response.status == 401) {
        router.push("/error/401");
      }
    } else {
      state.error = err;
    }
  },
};

export default {
  state,
  actions,
  getters,
};
