<template>
  <v-container>
    <div class="comments">
      <div v-if="comments == 0">
        <v-container class="text-center">
          <span>No comment found</span>
        </v-container>
      </div>
      <div v-else-if="comments == -1">
        <v-container class="text-center">
          <span>Comments are disabled for by post admin.</span>
        </v-container>
      </div>

      <div v-else-if="comments[0].post_id == post_id">
        <v-list class="pa-0" v-for="j in comments.length" :key="j">
          <v-list-item
            style="border-radius:50px 0px 0px 50px;"
            class="pa-0 commentBg"
          >
            <router-link :to="`/${comments[j - 1].admin._id}`">
              <ProfileAvatar
                class="my-0 mx-2"
                :size="35"
                :borders="false"
                :profilePic="comments[j - 1].admin.profilePic"
              ></ProfileAvatar>
            </router-link>
            <router-link
              :style="{ color: $vuetify.theme.themes[theme].secondary }"
              :to="`/${comments[j - 1].admin._id}`"
            >
              <span>
                {{ comments[j - 1].admin.fname }}
                {{ comments[j - 1].admin.lname }}
              </span>
            </router-link>
          </v-list-item>
          <v-list-item class="px-6 commentBg" style="margin-left:40px;">
            <div style="width:100%;">
              <v-row>
                <div>
                  <v-row>
                    <v-chip
                      v-if="comments[j - 1].comment"
                      class="py-2 ml-2"
                      style="height:auto; white-space: unset;"
                      >{{ comments[j - 1].comment }}</v-chip
                    >
                  </v-row>
                  <v-row class="commentAction">
                    <v-btn
                      text
                      @click="
                        comments[j - 1].likes.includes(user._id)
                          ? removecommentlike(comments[j - 1]._id, j - 1)
                          : addcommentlike(comments[j - 1]._id, j - 1)
                      "
                      :color="
                        comments[j - 1].likes.includes(user._id)
                          ? 'primary'
                          : ''
                      "
                      rounded
                      small
                    >
                      <span
                        v-if="comments[j - 1].likes.length > 0"
                        style="font-size:13px;"
                        >{{ comments[j - 1].likes.length }}</span
                      >Like
                    </v-btn>

                    <v-btn
                      text
                      @click="togglesubcomments(comments[j - 1]._id)"
                      rounded
                      small
                      >Reply</v-btn
                    >
                    <v-btn
                      v-if="comments[j - 1].admin._id == user._id"
                      text
                      @click="removecomment(comments[j - 1]._id, post_id)"
                      rounded
                      small
                      >Remove</v-btn
                    >
                    <v-btn
                      v-if="comments[j - 1].admin._id != user._id"
                      text
                      rounded
                      small
                      >Report</v-btn
                    >
                  </v-row>
                </div>
              </v-row>
              <Subcomments
                v-if="showsubcomment[comments[j - 1]._id]"
                :comment_id="comments[j - 1]._id"
              ></Subcomments>
            </div>
          </v-list-item>
        </v-list>
      </div>

      <v-text-field
        :id="`addcomment_${post_id}`"
        append-icon="mdi-link-variant"
        append-outer-icon="mdi-send"
        clearable
        @click:append-outer="addcommment(post_id, `addcomment_${post_id}`)"
        label="Write Comment"
      ></v-text-field>
    </div>
  </v-container>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import Subcomments from "@/components/Post/SubComments.vue";
import axios from "axios";
export default {
  props: ["post_id"],
  data() {
    return {
      showsubcomment: [],
      comments: [],
    };
  },
  components: {
    Subcomments,
  },

  computed: {
    ...mapGetters(["user"]),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    ...mapActions(["getProfile", "globalErrorHandler"]),
    togglesubcomments(commentId) {
      if (this.showsubcomment[commentId] != true) {
        Vue.set(this.showsubcomment, commentId, true);
      } else {
        Vue.set(this.showsubcomment, commentId, false);
      }
    },
    async getcomments(postid) {
      await axios.get(`${this.$API}/posts/comments/${postid}`).then((res) => {
        this.comments = res.data.comments;
      }) .catch((error) => {
          this.globalErrorHandler(error);
        });
    },

    async addcommment(postid, commentTxtID) {
      let commentTxt = document.getElementById(commentTxtID).value;
      let commentGIF = "";
      let commentdata = new FormData();
      if (commentTxt) {
        commentdata.append("commentText", commentTxt);
      }
      if (commentGIF) {
        commentdata.append("gif", commentGIF);
      }
      if (commentTxt || commentGIF) {
        await axios
          .post(`${this.$API}/posts/addcomments/${postid}`, commentdata)
          .then((res) => {
            this.comments.push({
              _id: res.data.insertedCommentID,
              likes: [],
              tag_users_id: [],
              post_id: postid,
              admin: this.user,
              comment: commentTxt,
            });
          }) .catch((error) => {
          this.globalErrorHandler(error);
        });
      }
      document.getElementById(commentTxtID).value = "";
    },
    async addcommentlike(commentid, commentarrayindex) {
      await axios.post(`${this.$API}/posts/addcommentslike/${commentid}`);
      this.comments[commentarrayindex].likes.push(this.user._id);
    },
    async removecommentlike(commentid, commentarrayindex) {
      await axios.delete(`${this.$API}/posts/removecommentslike/${commentid}`);
      let index = this.comments[commentarrayindex].likes.indexOf(this.user._id);
      if (index > -1) {
        this.comments[commentarrayindex].likes.splice(index, 1);
      }
    },
    async removecomment(commentid, postID, postindex) {
      await axios.delete(
        `${this.$API}/posts/removecomments/${postID}/${commentid}`
      );
      let commentlength = this.comments.length;
      for (var i = 0; i < commentlength; i++) {
        if (this.comments[i]._id == commentid) {
          this.comments.splice(i, 1);
          break;
        }
      }
      this.posts[postindex].comments -= 1;
    },
  },
  created() {
    this.getcomments(this.post_id);
    this.getProfile();
  },
};
</script>

<style>
.commentBg {
  background: rgba(112, 112, 112, 0.08);
}

.SubCommentConntent {
  display: none;
}
</style>
