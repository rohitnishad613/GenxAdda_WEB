import axios from "axios";

const state = {
  post: null,
  postsById: [],
};

const getters = {
  post: (state) => state.post,
  postsById: (state) => state.postsById,
};

const actions = {
  getPost({ commit, dispatch }, dateTime) {
      try {
        commit("getPosts_req");
        let res = axios.get(`${this._vm.$API}/posts/${dateTime}/post/`);
        return res;
      } catch (err) {
        dispatch("globalErrorHandler", err);
        commit("getPosts_error", err);
      }
  },
  getPublicPost({ commit, dispatch }, dateTime) {
  
     try {
       commit("getPosts_req");
       let res = axios.get(
         `${this._vm.$API}/posts/${dateTime}/public-feed-post/`
       );
       return res;
     } catch (err) {
       dispatch("globalErrorHandler", err);
       commit("getPosts_error", err);
     }
  },
  async getpostbyID({ commit, dispatch }, postId) {
    try {
      await axios.get(`${this._vm.$API}/posts/post/${postId}`).then((res) => {
        if (res.data.post) {
          commit("getPost_succ", res.data.post);
        }
      });
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("getPost_error", err);
    }
  },
  async getpostsbyID({ commit, dispatch }, postId) {
    try {
      state.postsById = [];
      if (state.postsById.length == 0) {
        await axios.get(`${this._vm.$API}/posts/post/${postId}`).then((res) => {
          if (res.data.post) {
            commit("getPostsById_succ", res.data.post);
          }
        });
      }
    } catch (err) {
      dispatch("globalErrorHandler", err);
      commit("getPostsById_error", err);
    }
  },
};

const mutations = {
  getPosts_req(state) {
    state.error = null;
    state.status = "Trying to get posts.";
  },
  getPosts_succ(state, data) {
    state.posts = data;
    state.error = null;
    state.status = "Get posts succesfully.";
  },
  getPosts_error(status, err) {
    state.error = err;
    state.status = "Falied to get posts.";
  },
  getPost_req(state) {
    state.error = null;
    state.status = "Trying to get posts.";
  },
  getPost_succ(state, data) {
    state.post = data;
    state.error = null;
    state.status = "Get posts succesfully.";
  },
  getPost_error(status, err) {
    state.error = err;
    state.status = "Falied to get posts.";
  },
  getPostsById_succ(state, data) {
    state.postsById.push(data);
    state.error = null;
    state.status = "Get post succesfully.";
  },
  getPostsById_error(status, err) {
    state.error = err;
    state.status = "Falied to get post.";
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
