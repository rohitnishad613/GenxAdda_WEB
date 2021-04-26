import axios from "axios";

const state = {
  Allstatus: [],
  MyStatus: [],
  status: {},
  loading: false,
  userStatusLoading: false,
  uploading: false,
  progress: 0,
  createStatusSucc: null,
  createStatusErorr: null,
};

const getters = {
  Allstatus: (state) => state.Allstatus,
  MyStatus: (state) => state.MyStatus,
  uploading: (state) => state.uploading,
  userStatusLoading: (state) => state.userStatusLoading,
  progress: (state) => state.progress,
  createStatusSucc: (state) => state.createStatusSucc,
  createStatusErorr: (state) => state.createStatusErorr,
};

const actions = {
  async getAllStatus({ commit, dispatch }) {
    try {
      commit("getAllStatus_req");
      await axios.get(`${this._vm.$API}/status/`).then((res) => {
        if (res.data.status) {
          commit("getAllStatus_succ", res.data.status);
        }
      });
    } catch (err) {
      dispatch("globalErrorHandler", err);
      state.uploading = false;
      commit("getAllStatus_error");
    }
  },

  async getMyStatus({ commit, dispatch }) {
    try {
      commit("getUserStatus_req");
      await axios.get(`${this._vm.$API}/status/mystatus`).then((res) => {
        if (res.data.status) {
          commit("getUserStatus_succ", res.data.status);
        }
      });
    } catch (err) {
      console.error(err);
      dispatch("globalErrorHandler", err);
      state.uploading = false;
      commit("getUserStatus_error");
    }
  },

  async createStatus({ commit }, data) {
    try {
      commit("createStatus_req");
      state.uploading = true;
      await axios
        .post(`${this._vm.$API}/status/`, data, {
          onUploadProgress: (e) => {
            state.progress = Math.round((e.loaded * 100) / e.total);
          },
        })
        .then((res) => {
          if (res.status == 200) {
            state.uploading = false;
            commit("createStatus_succ");
          }
        });
    } catch (err) {
      state.uploading = false;
      commit("createStatus_error");
    }
  },

  async viewed({ commit }, id) {
    try {
      await axios.put(`${this._vm.$API}/status/viewed/${id}`);
    } catch (err) {
      if (err) throw err;
    }
  },
};

const mutations = {
  createStatus_req(state) {
    state.createStatusErorr = null;
  },
  createStatus_succ(state) {
    state.createStatusSucc = "Status post successfully.";
  },
  createStatus_error(state) {
    state.createStatusErorr = "Failed to post Status.";
  },
  getAllStatus_req(state) {
    state.loading = true;
  },
  getAllStatus_succ(state, data) {
    let dataLen = data.length;
    for (let i = 0; i < data.length; i++) {
      // convert to array and push the object
      data[i] = [data[i]];
      let dataLen2 = data.length;
      for (let j = i + 1; j < dataLen2; j++) {
        if (data[i][0].admin._id == data[j].admin._id) {
          // if match then push into main index [i]
          data[i].push(data[j]);
          // deleted matched index
          data.splice(j, 1);
          dataLen = dataLen - 1;
        }
      }
    }
    state.Allstatus = data;
    state.loading = false;
  },
  getAllStatus_error(state) {
    state.loading = false;
  },
  getUserStatus_req(state) {
    state.userStatusLoading = true;
  },
  getUserStatus_succ(state, data) {
    if(data[0]){
      state.MyStatus = [data];
    }
    state.userStatusLoading = false;
  },
  getUserStatus_error(state) {
    state.userStatusLoading = false;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
