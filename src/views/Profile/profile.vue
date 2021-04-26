<template>
  <v-container>
    <div v-if="loading">
      <div class="cover_photo_loading loading-bg loading-animation"></div>
      <div class="center_profilePic_loading">
        <div class="profilePic_loading loading-bg loading-animation"></div>
      </div>
      <div class="vdvdfvdfvu">
        <div class="profile_info_loading loading-bg loading-animation"></div>
        <div class="sac7csa6c87as">
          <div
            class="profile_action_btn_loaading loading-bg loading-animation"
          ></div>
          <div
            class="profile_action_btn_loaading loading-bg loading-animation"
          ></div>
          <div
            class="profile_action_btn_loaading loading-bg loading-animation"
          ></div>
        </div>
      </div>
    </div>
    <div v-else>
      <v-row align="center" justify="center">
        <v-container>
          <!-- cover photo -->
          <div class="photos">
            <v-menu
              close-on-click
              offset-y
              absolute
              style="max-width: 600px; z-index:1;"
            >
              <template v-slot:activator="{ on }">
                <div v-on="on" class="coverPhoto">
                  <CoverPhoto :coverPhoto="Auser.coverPhoto"></CoverPhoto>
                </div>
              </template>
              <v-list>
                <div v-if="Auser._id == user._id" class="admin">
                  <label for="coverPhoto">
                    <v-list-item>
                      <v-list-item-title class="pr-10"
                        >Change</v-list-item-title
                      >
                    </v-list-item>
                  </label>
                  <div class="divUpload">
                    <input
                      class="hide_file_input"
                      type="file"
                      accept=".jpg, .png, .jpeg"
                      name="coverPhoto"
                      ref="coverPhoto"
                      @change="setcoverphoto"
                      id="coverPhoto"
                    />
                  </div>
                  <v-list-item>
                    <v-list-item-action
                      @click="deleteCoverPhoto()"
                      class="pr-10"
                      >Remove</v-list-item-action
                    >
                  </v-list-item>
                </div>
                <Lightbox
                  :img="
                    Auser.coverPhoto
                      ? $API_url + '/' + Auser.coverPhoto
                      : require('@/assets/img/Cover.jpg')
                  "
                ></Lightbox>
              </v-list>
            </v-menu>

            <v-menu close-on-click offset-y style="z-index:1;">
              <template v-slot:activator="{ on }">
                <div v-on="on" class="profilePhoto">
                  <ProfileAvatar
              :status="Auser.status"
                  
                    :size="90"
                    :profilePic="Auser.profilePic"
                  ></ProfileAvatar>
                </div>
              </template>
              <v-list>
                <div v-if="Auser._id == user._id" class="admin">
                  <label for="avatar">
                    <v-list-item>
                      <v-list-item-title class="pr-10"
                        >Change</v-list-item-title
                      >
                    </v-list-item>
                  </label>
                  <div class="divUpload">
                    <input
                      class="hide_file_input"
                      type="file"
                      accept=".jpg, .png, .jpeg"
                      name="avatar"
                      ref="avatar"
                      @change="setavatar"
                      id="avatar"
                    />
                  </div>
                  <v-list-item>
                    <v-list-item-title
                      class="pr-10"
                      @click="deleteProfilePhoto()"
                      >Remove</v-list-item-title
                    >
                  </v-list-item>
                </div>
                <Lightbox
                  :img="
                    Auser.profilePic
                      ? $API_url + '/' + Auser.profilePic
                      : require('@/assets/img/User.svg')
                  "
                ></Lightbox>
              </v-list>
            </v-menu>
          </div>
        </v-container>
      </v-row>
      <v-row class="mx-2" justify="space-between">
        <div>
          <h3>{{ Auser.fname }} {{ Auser.lname }}</h3>
          <p>{{ Auser.about }}</p>
        </div>
        <v-row justify="end" class="actions" v-if="Auser._id != user._id">
          <div
            class="relationship"
            v-if="
              Auser.blocked_users &&
                Auser.blocked_users.indexOf(user._id) == -1 &&
                user.blocked_users.indexOf(Auser._id) == -1
            "
          >
            <div
              v-if="user.friends_req_received.find((c) => c.id == Auser._id)"
              class="relationship"
            >
              <v-btn
                class="ma-1"
                small
                @click="AcceptFriendRequest(Auser._id)"
                rounded
                color="primary"
                ><v-icon small class="mr-1">mdi-account-multiple-check</v-icon>
                <span>Accept</span></v-btn
              >
              <v-btn
                class="ma-1"
                small
                @click="RejectFriendRequest(Auser._id)"
                rounded
              >
                <v-icon small class="mr-1">mdi-account-off</v-icon>
                <span>Reject</span>
              </v-btn>
            </div>
            <v-btn
              class="ma-1"
              v-else-if="user.friends_req_send.find((c) => c.id == Auser._id)"
              small
              @click="CancelFriendRequest(Auser._id)"
              rounded
            >
              <v-icon small class="mr-1">mdi-account-cancel</v-icon>
              <span>Cancel Request</span>
            </v-btn>
            <v-btn
              class="ma-1"
              small
              v-else-if="
                (Auser.who_send_friendReq == 'Everyone' ||
                  (Auser.who_send_friendReq == 'Only Followers' &&
                    user.followers.indexOf(Auser._id) != -1)) &&
                  Auser.friends.indexOf(user._id) == -1 &&
                  user.friends.indexOf(Auser._id) == -1
              "
              @click="sendFriendRequest(Auser._id)"
              rounded
              color="primary"
            >
              <v-icon small class="mr-1">mdi-account-multiple-plus</v-icon>
              <span>Add Friend</span>
            </v-btn>
            <v-btn
              class="ma-1"
              @click="dounfriend(Auser._id)"
              small
              v-else-if="Auser.friends.indexOf(user._id) != -1"
              rounded
            >
              <v-icon small class="mr-1">mdi-account-multiple-remove</v-icon>
              <span>Unfriend</span>
            </v-btn>
          </div>
          <v-btn
            class="ma-1"
            small
            v-if="user.blocked_users.indexOf(Auser._id) == -1"
            @click="block(Auser._id)"
            rounded
          >
            <v-icon small class="mr-1">mdi-block-helper</v-icon>
            <span>Block</span>
          </v-btn>
          <v-btn
            class="ma-1"
            small
            v-else-if="user.blocked_users.indexOf(Auser._id) != -1"
            @click="unblock(Auser._id, user.blocked_users.indexOf(Auser._id))"
            color="primary"
            rounded
          >
            <v-icon small class="mr-1">mdi-block-helper</v-icon>
            <span>Unblock</span>
          </v-btn>
          <v-menu offset-y style="z-index:1;">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-if="user.followers.indexOf(Auser._id) == -1"
                @click="dofollow(Auser._id)"
              >
                <v-icon class="mr-2">mdi-account</v-icon>
                <v-list-item-title class="pr-10">Follow</v-list-item-title>
              </v-list-item>
              <v-list-item v-else @click="dounfollow(Auser._id)">
                <v-icon class="mr-2">mdi-account-off</v-icon>
                <v-list-item-title class="pr-10">Unfollow</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <Feedback></Feedback>
              <Report></Report>
            </v-list>
          </v-menu>
        </v-row>
        <v-row justify="end" class="actions" v-if="Auser._id == user._id">
          <v-btn
            to="/settings/profile"
            class="ma-1"
            small
            color="primary"
            rounded
          >
            <v-icon small class="mr-1">mdi-account-edit</v-icon>
            <span>Edit</span>
          </v-btn>
        </v-row>
      </v-row>

      <v-row align="center" justify="center">
        <v-tabs show-arrows centered>
          <v-tab :to="`/${$route.params.user}/posts`">Posts</v-tab>
          <v-tab :to="`/${$route.params.user}/friends`">Friends</v-tab>
          <v-tab :to="`/${$route.params.user}/followers`">Followers</v-tab>
          <v-tab :to="`/${$route.params.user}/about`">About</v-tab>
        </v-tabs>
        <transition name="router_transition">
          <router-view></router-view>
        </transition>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import Feedback from "@/components/Feedback.vue";
import Report from "@/components/Report.vue";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
    };
  },
  computed: mapGetters(["user", "Auser"]),
  components: {
    Feedback,
    Report,
  },
  methods: {
    ...mapActions([
      "getProfile",
      "getUser",
      "unblockuser",
      "blockuser",
      "unfriend",
      "RejectFriendReq",
      "AcceptFriendReq",
      "CancelFriendReq",
      "sendFriendReq",
      "follow",
      "unfollow",
      "globalErrorHandler",
    ]),
    setavatar() {
      let formData = new FormData();
      formData.append("avatar", this.$refs.avatar.files[0]);
      if (this.Auser.profilePic) {
        formData.append("oldImgPath", this.Auser.profilePic);
      }
      axios
        .post(this.$API + "/users/profilePic", formData)
        .then((res) => {
          this.Auser.profilePic = res.data.newpic;
        })
        .catch((error) => {
          this.globalErrorHandler(error);
        });
    },
    setcoverphoto() {
      let formData = new FormData();
      formData.append("coverPhoto", this.$refs.coverPhoto.files[0]);
      if (this.Auser.coverPhoto) {
        formData.append("oldImgPath", this.Auser.coverPhoto);
      }
      axios
        .post(this.$API + "/users/coverPhoto", formData)
        .then((res) => {
          this.Auser.coverPhoto = res.data.newcover;
        })
        .catch((error) => {
          this.globalErrorHandler(error);
        });
    },
    deleteProfilePhoto() {
      if (this.Auser.profilePic) {
        let data = {};
        data.delete = true;
        data.oldMainImgPath = this.Auser.profilePic;
        axios.post(this.$API + "/users/profilePic", data).then((res) => {
          this.Auser.profilePic = undefined;
        });
      }
    },
    deleteCoverPhoto() {
      if (this.Auser.coverPhoto) {
        let data = {};
        data.delete = true;
        data.oldCoverImgPath = this.Auser.coverPhoto;
        axios.post(this.$API + "/users/coverPhoto", data).then((res) => {
          this.Auser.coverPhoto = undefined;
        });
      }
    },
    CancelFriendRequest(requestedId) {
      this.CancelFriendReq(requestedId);
      let index = this.user.friends_req_send.indexOf(requestedId);
      this.user.friends_req_send.splice(index, 1);
      let index2 = this.user.friends_req_send.indexOf(this.user._id);
      this.Auser.friends_req_received.splice(index2, 1);
    },
    findIndexofObjectProperty(array, attr, value) {
      let arrayLen = array.length;
      for (var i = 0; i < arrayLen; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    },
    async AcceptFriendRequest(requestedId) {
      this.AcceptFriendReq(requestedId);
      let AuserRequests = this.Auser.friends_req_send;
      let userRequests = this.user.friends_req_received;

      let index = this.findIndexofObjectProperty(
        userRequests,
        "id",
        requestedId
      );
      let index2 = this.findIndexofObjectProperty(
        AuserRequests,
        "id",
        requestedId
      );
      userRequests.splice(index, 1);
      AuserRequests.splice(index2, 1);

      this.user.friends.push(requestedId);
      this.Auser.friends.push(this.user._id);
      this.user.followers.push(requestedId);
      this.Auser.followers.push(this.user._id);
    },
    RejectFriendRequest(requestedId) {
      this.RejectFriendReq(requestedId);
      let AuserRequests = this.Auser.friends_req_send;
      let userRequests = this.user.friends_req_received;

      let index = this.findIndexofObjectProperty(
        userRequests,
        "id",
        requestedId
      );
      let index2 = this.findIndexofObjectProperty(
        AuserRequests,
        "id",
        requestedId
      );

      userRequests.splice(index, 1);
      AuserRequests.splice(index2, 1);
    },
    sendFriendRequest(requestedId) {
      this.sendFriendReq(requestedId);
      this.user.friends_req_send.push({ id: requestedId });
      this.Auser.friends_req_received.push({ id: requestedId });
    },
    async dounfriend(requestedId) {
      this.unfriend(requestedId);
      let Myfriends = this.user.friends;
      let Auserfriends = this.Auser.friends;
      let Myfollowers = this.user.followers;
      let Auserfollowers = this.Auser.followers;

      let indexOfrequestedId = Myfriends.indexOf(requestedId);
      let indexOfmyid = Auserfriends.indexOf(this.user._id);

      let FollowerIndexOfrequestedId = Myfollowers.indexOf(requestedId);
      let FollowerIndexOfmyid = Auserfollowers.indexOf(this.user._id);

      Myfriends.splice(indexOfrequestedId, 1);
      this.user.friend_count -= 1;
      Auserfriends.splice(indexOfmyid, 1);
      this.Auser.friend_count -= 1;
      Myfollowers.splice(FollowerIndexOfrequestedId, 1);
      this.user.followers_count -= 1;
      Auserfollowers.splice(FollowerIndexOfmyid, 1);
      this.Auser.followers_count -= 1;
    },
    async block(Id) {
      this.blockuser(Id);
      this.user.blocked_users.push(Id);
    },
    async unblock(Id, index) {
      this.unblockuser(Id);
      this.user.blocked_users.splice(index, 1);
    },
    async dofollow(requestedId) {
      this.follow(requestedId);
      this.user.followers.push(requestedId);
    },
    async dounfollow(requestedId) {
      this.unfollow(requestedId);
      let index = this.user.followers.indexOf(requestedId);
      this.user.followers.splice(index, 1);
    },
  },
  watch: {
    $route(to, from) {
      this.getUser(this.$route.params.user);
    },
  },
  async created() {
    await this.getProfile();
    await this.getUser(this.$route.params.user);
    this.loading = false;
    document.title = `${this.Auser.fname} ${this.Auser.lname} - GenxAdda`;
  },
  mounted() {
    if (this.$route.path == `/${this.$route.params.user}`) {
      this.$router.push(`/${this.$route.params.user}/posts`);
    }
    console.clear();
  },
};
</script>

<style>
.photos {
  position: relative;
  /* coverPhoto its height (200px) + profilePhoto that is v-avtar its size (90)/2  */
  height: 245px;
}

.photos .profilePhoto {
  position: absolute;
  left: 50%;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  bottom: 0px;
}

.divUpload {
  display: none;
  width: 1px;
  height: 1px;
}

.cover_photo_loading {
  border-radius: 15px;
  height: 200px;
}
.center_profilePic_loading {
  display: flex;
  justify-content: center;
}
.profilePic_loading {
  border-radius: 0px 0px 50px 50px;
  height: 55px;
  width: 110px;
}

.profile_action_btn_loaading {
  border-radius: 30px;
  width: 80px;
  height: 30px;
  margin: 7px;
}

.profile_info_loading {
  border-radius: 30px;
  width: 150px;
  height: 20px;
  margin: 10px 0px;
}

.vdvdfvdfvu {
  display: flex;
  justify-content: space-between;
}

.sac7csa6c87as {
  display: flex;
}
</style>
