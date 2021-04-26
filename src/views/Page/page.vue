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
      This Page is deleted.
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
            <CoverPhoto :coverPhoto="page.cover_photo"></CoverPhoto>
          </div>
        </template>
        <v-list>
          <div v-if="page.admin_id == user._id" class="admin">
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
              <v-list-item-title class="pr-10" @click="deletePageCover()"
                >Remove</v-list-item-title
              >
            </v-list-item>
          </div>
          <Lightbox
            :img="
              page.cover_photo
                ? $API_url + '/' + page.cover_photo
                : require('@/assets/img/Cover.jpg')
            "
          ></Lightbox>
        </v-list>
      </v-menu>
      <v-menu close-on-click offset-y style="z-index:1;">
        <template v-slot:activator="{ on }">
          <div v-on="on" class="PagePhoto">
            <ProfileAvatar :size="90" :profilePic="page.photo"></ProfileAvatar>
          </div>
        </template>
        <v-list>
          <div v-if="page.admin_id == user._id" class="admin">
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
              <v-list-item-title class="pr-10" @click="deletePageCover()"
                >Remove</v-list-item-title
              >
            </v-list-item>
          </div>
          <Lightbox
            :img="
              page.photo
                ? $API_url + '/' + page.photo
                : require('@/assets/img/User.svg')
            "
          ></Lightbox>
        </v-list>
      </v-menu>
    </div>

    <v-row justify="space-between" align="center">
      <div>
        <v-card-title>{{ page.name }}</v-card-title>
        <v-card-subtitle>{{ page.description }}</v-card-subtitle>
      </div>
      <div v-if="page.admin_id != user._id" class="useractions">
        <v-btn
          class="ma-1"
          v-if="user.blocked_pages.indexOf(page._id) == -1"
          @click="block(page._id)"
          rounded
        >
          <v-icon small class="mr-1">mdi-block-helper</v-icon>
          <span>Block</span>
        </v-btn>
        <v-btn
          class="ma-1"
          v-else-if="user.blocked_pages.indexOf(page._id) != -1"
          @click="unblock(page._id, user.blocked_pages.indexOf(page._id))"
          color="primary"
          rounded
        >
          <v-icon small class="mr-1">mdi-block-helper</v-icon>
          <span>Unblock</span>
        </v-btn>

        <v-btn
          class="ma-1"
          v-if="page.joined.indexOf(user._id) == -1"
          @click="join(page._id)"
          color="primary"
          rounded
        >
          <v-icon small class="mr-1">mdi-rss</v-icon>
          <span>Follow</span>
        </v-btn>
        <v-btn
          class="ma-1"
          v-else-if="page.joined.indexOf(user._id) != -1"
          @click="unjoin(page._id)"
          rounded
        >
          <v-icon small class="mr-1">mdi-rss</v-icon>
          <span>Unfollow</span>
        </v-btn>
      </div>
      <div v-else-if="page.admin_id == user._id" class="adminaction">
        <v-btn
          class="ma-1"
          rounded
          color="primary"
          v-if="page.admin_id == user._id"
          :to="{ name: 'EditPage', params: { id: page._id, page: page } }"
        >
          <v-icon small class="mr-1">mdi-pencil</v-icon>
          <span>Edit</span>
        </v-btn>
        <v-btn
          class="ma-1"
          v-if="page.admin_id == user._id"
          @click="Delete(page._id)"
          rounded
        >
          <v-icon small class="mr-1">mdi-delete</v-icon>
          <span>Delete</span>
        </v-btn>
      </div>
    </v-row>
    <v-row align="center" justify="center">
      <v-tabs show-arrows centered>
        <v-tab :to="`/page/${$route.params.id}/posts`">Posts</v-tab>
        <v-tab :to="`/page/${$route.params.id}/about`">About</v-tab>
        <v-tab :to="`/page/${$route.params.id}/followers`">Followers</v-tab>
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
      page: null,
      deleteSucc: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions([
      "getPage",
      "joinpage",
      "getProfile",
      "unjoinpage",
      "DeletePage",
      "blockpage",
      "unblockpage",
      "globalErrorHandler",
    ]),
    setavatar() {
      let formData = new FormData();
      formData.append("avatar", this.$refs.avatar.files[0]);
      if (this.page.photo) {
        formData.append("oldImgPath", this.page.photo);
      }
      axios
        .post(`${this.$API}/pages/edit/${this.page._id}/photo`, formData)
        .then((res) => {
          this.page.photo = res.data.newpic;
        })
        .catch((error) => {
          this.globalErrorHandler(error);
        });
    },
    setcoverphoto() {
      let formData = new FormData();
      formData.append("coverPhoto", this.$refs.coverPhoto.files[0]);
      if (this.page.cover_photo) {
        formData.append("oldImgPath", this.page.cover_photo);
      }
      axios
        .post(`${this.$API}/pages/edit/${this.page._id}/coverPhoto`, formData)
        .then((res) => {
          this.page.cover_photo = res.data.newcover;
        })
        .catch((error) => {
          this.globalErrorHandler(error);
        });
    },
    deletePagePhoto() {
      if (this.page.photo) {
        let data = {};
        data.delete = true;
        data.oldMainImgPath = this.page.photo;
        axios
          .post(`${this.$API}/pages/edit/${this.page._id}/photo`, data)
          .then((res) => {
            this.page.photo = undefined;
          });
      }
    },
    deletePageCover() {
      if (this.page.cover_photo) {
        let data = {};
        data.delete = true;
        data.oldCoverImgPath = this.page.cover_photo;
        axios
          .post(`${this.$API}/pages/edit/${this.page._id}/coverPhoto`, data)
          .then((res) => {
            this.page.cover_photo = undefined;
          });
      }
    },
    async handulGetPage() {
      if (this.$route.params.page && this.$route.params.page.name) {
        this.page = this.$route.params.page;
      } else {
        let page = await this.getPage(this.$route.params.id);
        this.page = page;
      }
    },
    async block(Id) {
      this.blockpage(Id);
      this.user.blocked_pages.push(Id);
    },
    async unblock(Id, index) {
      this.unblockpage(Id);
      this.user.blocked_pages.splice(index, 1);
    },
    async join(Id) {
      this.joinpage(Id);
      this.page.joined.push(this.user._id);
    },
    async unjoin(Id) {
      this.unjoinpage(Id);
      let index = this.page.joined.indexOf(this.user._id);
      if (index != -1) {
        this.page.joined.splice(index, 1);
      }
    },
    async Delete(Id) {
      let data = {};
      data.id = Id;
      if (this.page.photo) {
        data.oldImgPath = this.page.photo;
      }
      if (this.page.cover_photo) {
        data.oldcoverPath = this.page.cover_photo;
      }
      let res = await this.DeletePage(data);
      if (res.status == 200) {
        this.deleteSucc = true;
      }
    },
  },
  async created() {
    await this.getProfile();
    await this.handulGetPage();
    document.title = `${this.page.name}  - GenxAdda`;
  },
  mounted() {
    console.clear();
  },
};
</script>

<style>
.photos {
  position: relative;
  /* coverPhoto that is img its height (300px) + pagePhoto that is v-avtar its size (90)/2  */
  height: 245px;
}

.photos .PagePhoto {
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
