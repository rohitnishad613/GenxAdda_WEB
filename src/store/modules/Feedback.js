import axios from "axios";

const state = {
    FeedbacksendSuccess: null,
    FeedbacksendError: null,
};

const getters = {
    FeedbacksendSuccess: state => state.FeedbacksendSuccess,
    FeedbacksendError: state => state.FeedbacksendError,
};

const actions = {
    async sendFeedback({ commit }, data) {
        try {
            await axios.post(`${this._vm.$API}/feedbacks/`, data).then(res => {
                commit("sendFeedback_succ");
            });
        } catch (err) {
            commit("sendFeedback_error", err);
        }
    },
};

const mutations = {
    sendFeedback_succ(state) {
        state.FeedbacksendSuccess = "Feedback send successfully.";
    },
    sendFeedback_error(status) {
        state.FeedbacksendError = "Failed send Feedback.";
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};