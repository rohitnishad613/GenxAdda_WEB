<template>
  <div class="Sub_commentConntent">
    <div>
      <v-row v-if="subcomments.length == 0">
        <v-container class="text-center">
          <span>No reply found</span>
        </v-container>
      </v-row>
      <v-row v-else-if="subcomments.length != 0">
        <div style="width:100%;" v-if="subcomments[0].comment_id == comment_id">
          <v-list class="pa-0" v-for="k in subcomments.length" :key="k">
            <v-list-item class="pl-0 commentBg">
              <router-link :to="`/${subcomments[k - 1].admin._id}`">
                <ProfileAvatar
                  :size="35"
                  :borders="false"
                  class="mr-2"
                  :profilePic="subcomments[k - 1].admin.profilePic"
                ></ProfileAvatar>
              </router-link>
              <router-link
                :style="{ color: $vuetify.theme.themes[theme].secondary }"
                :to="`/${subcomments[k - 1].admin._id}`"
              >
                <span>
                  {{ subcomments[k - 1].admin.fname }}
                  {{ subcomments[k - 1].admin.lname }}
                </span>
              </router-link>
            </v-list-item>
            <v-list-item class="commentBg">
              <div style="margin-left:45px;">
                <v-row>
                  <v-chip
                    class="py-2"
                    style="height:auto; white-space: unset;"
                    >{{ subcomments[k - 1].comment }}</v-chip
                  >
                </v-row>
                <v-row>
                  <v-btn
                    text
                    @click="
                      subcomments[k - 1].likes.includes(user._id)
                        ? removeSubcommentlike(subcomments[k - 1]._id, k - 1)
                        : addsubcommentlike(subcomments[k - 1]._id, k - 1)
                    "
                    :color="
                      subcomments[k - 1].likes.includes(user._id)
                        ? 'primary'
                        : ''
                    "
                    rounded
                    x-small
                  >
                    <span v-show="subcomments[k - 1].likes.length != 0">
                      {{ subcomments[k - 1].likes.length }}
                    </span>
                    Like
                  </v-btn>
                  <v-btn
                    v-if="subcomments[k - 1].admin._id == user._id"
                    text
                    @click="removecommentreply(subcomments[k - 1]._id)"
                    rounded
                    x-small
                    >Remove</v-btn
                  >
                  <v-btn
                    v-if="subcomments[k - 1].admin._id != user._id"
                    text
                    rounded
                    x-small
                    >Report</v-btn
                  >
                </v-row>
              </div>
            </v-list-item>
          </v-list>
        </div>
      </v-row>
      <v-text-field
        :id="`SubComment${comment_id}`"
        class="pa-0 pt-3 ma-0"
        ref="commentReply"
        label="Write reply"
        clearable
        append-icon="mdi-link-variant"
        append-outer-icon="mdi-send"
        @click:append-outer="
          addcommentreply(comment_id, `SubComment${comment_id}`)
        "
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  props: ["comment_id"],
  data() {
    return {
      subcomments: [],
    };
  },
  computed: {
    ...mapGetters(["user"]),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    ...mapActions(["getProfile", "globalErrorHandler"]),
    async getcommentrerply(commentid) {
      await axios
        .get(`${this.$API}/posts/commmentreply/${commentid}`)
        .then((res) => {
          this.subcomments = res.data.comments;
        })
        .catch((error) => {
          this.globalErrorHandler(error);
        });
    },
    async addcommentreply(commentid, subcommenttxtID) {
      let subCommentTxt = document.getElementById(subcommenttxtID).value;
      let subComentGIF = "";
      let commentdata = new FormData();
      if (subCommentTxt) {
        commentdata.append("commentText", subCommentTxt);
      }
      if (subComentGIF) {
        commentdata.append("gif", subComentGIF);
      }
      if (subCommentTxt || subComentGIF) {
        await axios
          .post(`${this.$API}/posts/addcommmentreply/${commentid}`, commentdata)
          .then((res) => {
            this.subcomments.push({
              _id: res.data.insertedCommentID,
              likes: [],
              tag_users_id: [],
              comment_id: commentid,
              admin: this.user,
              comment: subCommentTxt,
              __v: 0,
            });
          })
          .catch((error) => {
            this.globalErrorHandler(error);
          });
      }
      document.getElementById(subcommenttxtID).value = "";
    },
    async addsubcommentlike(subcommentid, subcommentarrayindex) {
      this.subcomments[subcommentarrayindex].likes.push(this.user._id);
      await axios.post(`${this.$API}/posts/addsubcommentslike/${subcommentid}`);
    },
    async removeSubcommentlike(subcommentid, subcommentarrayindex) {
      let index = this.subcomments[subcommentarrayindex].likes.indexOf(
        this.user._id
      );
      if (index > -1) {
        this.subcomments[subcommentarrayindex].likes.splice(index, 1);
      }
      await axios.delete(
        `${this.$API}/posts/removesubcommentslike/${subcommentid}`
      );
    },
    async removecommentreply(commentid, postID) {  
      let commentlength = this.subcomments.length;
      for (var i = 0; i < commentlength; i++) {
        if (this.subcomments[i]._id == commentid) {
          this.subcomments.splice(i, 1);
          break;
        }
      }
      await axios.delete(`${this.$API}/posts/removecommentreply/${commentid}`, {
        postID: postID,
      });
    },
  },
  created() {
    this.getProfile();
    this.getcommentrerply(this.comment_id);
  },
};
</script>

<style>
.commentBg {
  background: rgba(112, 112, 112, 0.08);
}
</style>
