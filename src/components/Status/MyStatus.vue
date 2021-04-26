<template>
  <div>
    <div class="stats" v-for="i in MyStatus.length" :key="i">
      <router-link
        :to="{
          name: 'status',
          params: { id: MyStatus[i - 1][0]._id, status: MyStatus[i - 1] },
        }"
      >
        <v-row
          align="center"
          justify="center"
          style="border-radius: 50%;"
          class="statusPreview"
        >
          <ProfileAvatar
            :size="61"
            :profilePic="MyStatus[i - 1][0].admin.profilePic"
          ></ProfileAvatar>
        </v-row>
      </router-link>
      <router-link
        :style="{ color: $vuetify.theme.themes[theme].secondary }"
        :to="`/${user._id}`"
      >
        <span>{{ user.fname }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["user", "MyStatus", "userStatusLoading"]),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },

  methods: {
    ...mapActions(["getProfile", "getMyStatus"]),
  },
  created() {
    this.getProfile();
    this.getMyStatus();
  },
};
</script>

<style scoped>
.statusPreview {
  border-radius: 10px;
  background: rgb(255, 85, 0);
  background: -moz-linear-gradient(
    90deg,
    rgba(255, 85, 0, 0.9528186274509804) 0%,
    rgba(255, 139, 6, 1) 72%
  );
  background: -webkit-linear-gradient(
    90deg,
    rgba(255, 85, 0, 0.9528186274509804) 0%,
    rgba(255, 139, 6, 1) 72%
  );
  background: linear-gradient(
    90deg,
    rgba(255, 85, 0, 0.9528186274509804) 0%,
    rgba(255, 139, 6, 1) 72%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff5500",endColorstr="#ff8b06",GradientType=1);
  width: 65px;
  margin: 5px;
  height: 65px;
}
</style>
