import axios from "axios";

const state = {
    ReportsendSuccess: null,
    ReportsendError: null,
};

const getters = {
    ReportsendSuccess: state => state.ReportsendSuccess,
    ReportsendError: state => state.ReportsendError,
};

const actions = {
    async sendReport({ commit }, data) {
        try {
            await axios.post(`${this._vm.$API}/reports/`,data).then(res => {
                commit("sendReport_succ");
            });
        } catch (err) {
            commit("sendReport_error", err);
        }
    },
};

const mutations = {
    sendReport_succ(state) {
        state.ReportsendSuccess = "Report send successfully.";
    },
    sendReport_error(status) {
        state.ReportsendError = "Failed send Report.";
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};