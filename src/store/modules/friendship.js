import axios from "axios";

const actions = {
  async sendFriendReq({ commit }, requestedId) {
    try {
      await axios.post(`${this._vm.$API}/friends/request/${requestedId}`);
    } catch (err) {
      if (err) throw err;
    }
  },
  async CancelFriendReq({ commit }, requestedId) {
    try {
      await axios.delete(
        `${this._vm.$API}/friends/cancelrequest/${requestedId}`
      );
    } catch (err) {
      if (err) throw err;
    }
  },
  async AcceptFriendReq({ commit }, requestedId) {
    try {
      await axios.post(`${this._vm.$API}/friends/acceptrequest/${requestedId}`);
    } catch (err) {
      if (err) throw err;
    }
  },
  async RejectFriendReq({ commit }, requestedId) {
    try {
      await axios.delete(
        `${this._vm.$API}/friends/deleterequest/${requestedId}`
      );
    } catch (err) {
      if (err) throw err;
    }
  },
  async unfriend({ commit }, requestedId) {
    try {
      await axios.delete(`${this._vm.$API}/friends/unfriend/${requestedId}`);
    } catch (err) {
      if (err) throw err;
    }
  },
  async follow({ commit }, requestedId) {
    try {
      await axios.put(`${this._vm.$API}/friends/follow/${requestedId}`);
    } catch (err) {
      if (err) throw err;
    }
  },
  async unfollow({ commit }, requestedId) {
    try {
      await axios.delete(`${this._vm.$API}/friends/unfollow/${requestedId}`);
    } catch (err) {
      if (err) throw err;
    }
  },
};

export default {
  actions,
};
