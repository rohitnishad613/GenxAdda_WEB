<template>
  <v-container>
    <v-alert
      v-if="deleteSucc"
      text
      outlined
      type="success"
      icon="mdi-account"
      dismissible
    >
      This Group is deleted.
    </v-alert>

    <div class="photos">
      <v-menu
        close-on-click
        offset-y
        absolute
        style="max-width: 600px; z-index:1;"
      >
        <template v-slot:activator="{ on }">
          <div v-on="on" class="coverPhoto">
            <CoverPhoto :coverPhoto="group.cover_photo"></CoverPhoto>
          </div>
        </template>
        <v-list>
          <div v-if="group.admin_id == user._id" class="admin">
            <label for="coverPhoto">
              <v-list-item>
                <v-list-item-title class="pr-10">Change</v-list-item-title>
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
              <v-list-item-title @click="deleteGroupCover()" class="pr-10"
                >Remove</v-list-item-title
              >
            </v-list-item>
          </div>
          <Lightbox
            :img="
              group.cover_photo
                ? $API_url + '/' + group.cover_photo
                : require('@/assets/img/Cover.jpg')
            "
          ></Lightbox>
        </v-list>
      </v-menu>

      <v-menu close-on-click offset-y style="z-index:1;">
        <template v-slot:activator="{ on }">
          <div v-on="on" class="groupPhoto">
            <ProfileAvatar :size="90" :profilePic="group.photo"></ProfileAvatar>
          </div>
        </template>
        <v-list>
          <div v-if="group.admin_id == user._id" class="admin">
            <label for="avatar">
              <v-list-item>
                <v-list-item-title class="pr-10">Change</v-list-item-title>
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
              <v-list-item-title @click="deleteGroupPhoto()" class="pr-10"
                >Remove</v-list-item-title
              >
            </v-list-item>
          </div>
          <Lightbox
            :img="
              group.photo
                ? $API_url + '/' + group.photo
                : require('@/assets/img/User.svg')
            "
          ></Lightbox>
        </v-list>
      </v-menu>
    </div>

    <v-row justify="space-between" align="center">
      <div>
        <v-card-title>{{ group.name }}</v-card-title>
        <v-card-subtitle>{{ group.description }}</v-card-subtitle>
      </div>
      <div>
        <v-btn
          class="ma-1"
          rounded
          color="primary"
          v-if="group.admin_id == user._id"
          :to="{ name: 'Editgroup', params: { id: group._id, group: group } }"
        >
          <v-icon small class="mr-1">mdi-pencil</v-icon>
          <span>Edit</span>
        </v-btn>
        <v-btn
          class="ma-1"
          v-if="group.admin_id == user._id"
          @click="Delete(group._id)"
          rounded
          color="primary"
        >
          <v-icon small class="mr-1">mdi-delete</v-icon>
          <span>Delete</span>
        </v-btn>
        <v-btn
          class="ma-1"
          v-if="user.blocked_groups.indexOf(group._id) == -1"
          @click="Block(group._id)"
          rounded
        >
          <v-icon small class="mr-1">mdi-block-helper</v-icon>
          <span>Block</span>
        </v-btn>
        <v-btn
          class="ma-1"
          v-else-if="user.blocked_groups.indexOf(group._id) != -1"
          @click="UnBlock(group._id, user.blocked_groups.indexOf(group._id))"
          rounded
          color="primary"
        >
          <v-icon small class="mr-1">mdi-block-helper</v-icon>
          <span>Unblock</span>
        </v-btn>
        <v-btn
          class="ma-1"
          v-if="group.joined.indexOf(user._id) == -1"
          @click="join(group._id)"
          rounded
        >
          <v-icon small class="mr-1">mdi-rss</v-icon>
          <span>Join</span>
        </v-btn>
        <v-btn
          class="ma-1"
          v-else-if="group.joined.indexOf(user._id) != -1"
          @click="unjoin(group._id)"
          rounded
        >
          <v-icon small class="mr-1">mdi-rss</v-icon>
          <span>unjoin</span>
        </v-btn>
      </div>
    </v-row>
    <v-row align="center" justify="center">
      <v-tabs show-arrows centered>
        <v-tab :to="`/group/${$route.params.id}/posts`">Posts</v-tab>
        <v-tab :to="`/group/${$route.params.id}/about`">About</v-tab>
        <v-tab :to="`/group/${$route.params.id}/community`">Community</v-tab>
      </v-tabs>
       <transition name="router_transition">
      <router-view></router-view>
       </transition>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      group: null,
      deleteSucc: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions([
      "getgroup",
      "joingroup",
      "unjoingroup",
      "Deletegroup",
      "getProfile",
      "blockgroup",
      "unblockgroup",
      "globalErrorHandler",
    ]),
    setavatar() {
      let formData = new FormData();
      formData.append("avatar", this.$refs.avatar.files[0]);
      if (this.group.photo) {
        formData.append("oldImgPath", this.group.photo);
      }
      axios
        .post(`${this.$API}/groups/edit/${this.group._id}/photo`, formData)
        .then((res) => {
          this.group.photo = res.data.newpic;
        })
        .catch((error) => {
          this.globalErrorHandler(error);
        });
    },
    setcoverphoto() {
      let formData = new FormData();
      formData.append("coverPhoto", this.$refs.coverPhoto.files[0]);
      if (this.group.cover_photo) {
        formData.append("oldImgPath", this.group.cover_photo);
      }
      axios
        .post(`${this.$API}/groups/edit/${this.group._id}/coverPhoto`, formData)
        .then((res) => {
          this.group.cover_photo = res.data.newcover;
        })
        .catch((error) => {
          this.globalErrorHandler(error);
        });
    },
    deleteGroupPhoto() {
      if (this.group.photo) {
        let data = {};
        data.delete = true;
        data.oldMainImgPath = this.group.photo;
        axios
          .post(`${this.$API}/groups/edit/${this.group._id}/photo`, data)
          .then((res) => {
            this.group.photo = undefined;
          });
      }
    },
    deleteGroupCover() {
      if (this.group.cover_photo) {
        let data = {};
        data.delete = true;
        data.oldCoverImgPath = this.group.cover_photo;
        axios
          .post(`${this.$API}/groups/edit/${this.group._id}/coverPhoto`, data)
          .then((res) => {
            this.group.cover_photo = undefined;
          });
      }
    },
    async handulGetgroup() {
      if (this.$route.params.group && this.$route.params.group.name) {
        this.group = this.$route.params.group;
      } else {
        let group = await this.getgroup(this.$route.params.id);
        this.group = group;
      }
    },
    async join(Id) {
      this.joingroup(Id);
      this.group.joined.push(this.user._id);
    },
    async unjoin(Id) {
      this.unjoingroup(Id);
      let index = this.group.joined.indexOf(this.user._id);
      if (index != -1) {
        this.group.joined.splice(index, 1);
      }
    },
    async Block(Id) {
      this.blockgroup(Id);
      this.user.blocked_groups.push(Id);
    },
    async UnBlock(Id, index) {
      this.unblockgroup(Id);
      this.user.blocked_groups.splice(index, 1);
    },
    async Delete(Id) {
      let data = {};
      data.Id = Id;
      if (this.group.photo) {
        data.oldImgPath = this.group.photo;
      }
      if (this.group.cover_photo) {
        data.oldcoverPath = this.group.cover_photo;
      }
      let res = await this.Deletegroup(data);
      if (res.status == 200) {
        this.deleteSucc = true;
      }
    },
  },
  async created() {
    await this.getProfile();
    await this.handulGetgroup();
    document.title = `${this.group.name}  - GenxAdda`;
  },
  mounted() {
    console.clear();
  },
};
</script>

<style>
.photos {
  position: relative;
  /* coverPhoto that is img its height (300px) + groupPhoto that is v-avtar its size (90)/2  */
  height: 245px;
}

.photos .groupPhoto {
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
</style>
