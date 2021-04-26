<template>
  <v-container class="wrapper">
    <v-progress-linear v-model="timeline" color="white"></v-progress-linear>
    <v-row class="top" justify="space-between" align="center">
      <v-row align="center">
        <router-link :to="`/${status[index].admin._id}`">
          <ProfileAvatar
            :size="40"
            :profilePic="status[index].admin.profilePic"
          ></ProfileAvatar>
        </router-link>
        <router-link
          :style="{ color: $vuetify.theme.themes[theme].secondary }"
          :to="`/${status[index].admin._id}`"
        >
          <v-card-title
            >{{ status[index].admin.fname }}
            {{ status[index].admin.lname }}</v-card-title
          >
          <v-card-subtitle>{{
            getDateTime(status[index].date)
          }}</v-card-subtitle>
        </router-link>
      </v-row>
      <v-btn icon v-if="status[index].admin._id == user._id" @click="__deleteStatus(status[index]._id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
    </v-row>

    <v-row align="center" justify="center" class="middle">
      <button class="previous" @click="previous()"></button>
      <v-col
        class="content"
        style="height:100%;"
        v-if="status[index].text"
        cols="12"
      >
        <div style="height:100%;" id="TextBg">
          <span id="bigtxt">
            {{ status[index].text }}
          </span>
        </div>
      </v-col>
      <v-col class="content" v-if="status[index].photo" cols="12">
        <v-img :src="`${$API_url}/${status[index].photo}`" width="100%">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="gray"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
      <v-col class="content" v-else-if="status[index].video" cols="12">
        <VideoPlayer
          :controller="false"
          :src="`${$API_url}/${status[index].video}`"
        ></VideoPlayer>
      </v-col>
      <button class="next" @click="next()"></button>
    </v-row>

    <v-row
      justify="center"
      class="opbg bottom"
      v-if="status[index].description"
    >
      <v-card-subtitle>{{ status[index].description }}</v-card-subtitle>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      status: null,
      deleted: false,
      timeline: 0,
      index: null,
    };
  },
  methods: {
    ...mapActions(["getStatus", "viewed", "getProfile"]),
    __deleteStatus(id) {
      let data = {};
      let path = this.status.video
        ? this.status.video
        : this.status.photo
        ? this.status.photo
        : null;
      if (path) {
        data.path = path;
      }
      axios.delete(`${this.$API}/status/${id}`, { data: data });
      this.deleted = true;
      this.closeViewStatus();
    },
    async handalgetstatus() {
      if (this.$route.params.status && this.$route.params.status.length > 0) {
        this.status = this.$route.params.status;
        this.index = 0;
      } else {
        this.closeViewStatus();
      }
    },
    closeViewStatus() {
      this.status = null,
      this.deleted = false,
      this.timeline = 0,
      this.index = null,
      this.$router.push("/");
    },
    next() {
      let nextIndex = this.index + 1;
      if (nextIndex <= this.status.length - 1) {
        this.index = nextIndex;
        this.deleted = false;
        this.timeline = 0;
        this.handalTimeLine();
        if (status[nextIndex].text) {
          this.adjustDynamicText();
        }
        if (status[nextIndex].viewed.indexOf(this.user._id) != -1) {
          this.viewed(status[nextIndex]._id);
        }
      } else {
        this.closeViewStatus();
      }
    },
    previous() {
      let previousIndex = this.index - 1;
      if (previousIndex >= 0) {
        this.index = previousIndex;
        this.deleted = false;
        this.timeline = 0;
        this.handalTimeLine();
        if (status[previousIndex].text) {
          this.adjustDynamicText();
        }
        if (status[previousIndex].viewed.indexOf(this.user._id) != -1) {
          this.viewed(status[previousIndex]._id);
        }
      } else {
        this.closeViewStatus();
      }
    },
    adjustDynamicText() {
      let textSpan = document.getElementById("bigtxt");
      let textDiv = document.getElementById("TextBg");
      textSpan.style.fontSize = "65px";
      while (textSpan.offsetHeight > textDiv.offsetHeight) {
        textSpan.style.fontSize = `${(
          parseInt(textSpan.style.fontSize) - 10
        ).toString()}px`;
      }
    },

    handalTimeLine() {
      if (this.status[this.index].text || this.status[this.index].photo) {
        let interval = setInterval(() => {
          this.timeline = this.timeline + 1;
          if (this.timeline == 100) {
            clearInterval(interval);
            this.timeline = 0;

            this.next();
          }
        }, 100);
      }
    },
  },
  computed: {
    ...mapGetters(["user"]),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  mounted() {
    this.adjustDynamicText();
  },
  created() {
    this.getProfile();
    this.handalgetstatus();
    this.handalTimeLine();
  },
};
</script>

<style>
.opbg {
  background: rgba(0, 0, 0, 0.479);
}
.previous,
.next {
  z-index: 1;
  position: absolute;
  width: 50%;
  height: 100%;
}

.previous {
  left: 0;
}

.next {
  right: 0;
}

#TextBg {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgb(255, 85, 0);
  background: -moz-linear-gradient(
    120deg,
    rgba(255, 85, 0, 0.9528186274509804) 0%,
    rgba(255, 139, 6, 1) 72%
  );
  background: -webkit-linear-gradient(
    120deg,
    rgba(255, 85, 0, 0.9528186274509804) 0%,
    rgba(255, 139, 6, 1) 72%
  );
  background: linear-gradient(
    90deg,
    rgba(255, 85, 0, 0.9528186274509804) 0%,
    rgba(255, 139, 6, 1) 72%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff5500",endColorstr="#ff8b06",GradientType=1);
  h: 65px;
}
#TextBg > #bigtxt {
  color: white;
  padding: 10px;
}
.wrapper {
  text-align: center;
  position: relative;
  height: 100%;
}
.wrapper > .top,
.middle,
.bottom {
  position: absolute;
}

.wrapper > .top {
  padding: 0px 25px;
  top: 1;
  height: 85px;
  width: 100%;
}

.wrapper > .bottom {
  padding: 0px 25px;
  bottom: 0;
  height: 55px;
  width: 100%;
}

.wrapper > .middle {
  z-index: 10;
  top: 85px;
  bottom: 55px;
  width: 100%;
}

.wrapper > .middle > .content {
  max-width: 300px;
}
</style>
