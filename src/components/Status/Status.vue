<template>
  <v-container>
    <v-tabs
      style="border-radius:20px; text-align: center"
      height="100px"
      show-arrows
    >
      <div class="ml-2 CreteStats">
        <CreateStatus></CreateStatus>
      </div>
      <MyStatus></MyStatus>
      <div class="stats" v-for="i in Allstatus.length" :key="i">
        <div v-if="Allstatus[i - 1][0]">
          <router-link
            :to="{
              name: 'status',
              params: {
                id: Allstatus[i - 1][0].admin._id,
                status: Allstatus[i - 1],
              },
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
                :profilePic="Allstatus[i - 1][0].admin.profilePic"
              ></ProfileAvatar>
            </v-row>
          </router-link>
          <router-link
            :style="{ color: $vuetify.theme.themes[theme].secondary }"
            :to="`/${Allstatus[i - 1][0].admin._id}`"
          >
            <span>{{ Allstatus[i - 1][0].admin.fname }}</span>
          </router-link>
        </div>
      </div>
      <div v-for="i in 5" :key="i">
        <div v-if="loading" class="pa-1 mx-1">
          <div
            style="border-radius:70px; height:70px; width:70px;"
            class="loading-bg loading-animation"
          ></div>
          <div
            style="border-radius:10px; height: 5px; width:70px;"
            class="loading-bg loading-animation"
          ></div>
        </div>
      </div>
    </v-tabs>
  </v-container>
</template>

<script>
import MyStatus from "@/components/Status/MyStatus.vue";
import CreateStatus from "@/components/Status/CreateStatus.vue";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters(["user", "Allstatus"]),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    ...mapActions(["getProfile", "getAllStatus"]),
  },
  components: {
    CreateStatus,
    MyStatus,
  },
  async created() {
    await this.getProfile();
    await this.getAllStatus();
    this.loading = false;
  },
};
</script>
