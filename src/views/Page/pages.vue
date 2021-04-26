<template>
  <v-container>
    <v-row class="pa-0 ma-0" align="center" justify="space-between">
      <v-card-title>Pages</v-card-title>
      <v-btn icon to="/create/page">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-container>
      <v-card style="border-radius:20px;" class="box-shadow">
        <v-card-title>Your Pages</v-card-title>
        <div v-if="loading_myContent" class="list_loading pa-4">
          <div style="display: flex">
            <div
              style="border-radius: 50px; height: 50px; width:50px;"
              class="loading-bg loading-animation"
            ></div>
            <div
              style="border-radius: 20px; height: 20px; width:150px;"
              class="loading-bg loading-animation ma-4"
            ></div>
          </div>
        </div>
        <v-list v-else-if="myPages.length > 0">
          <div v-for="i in myPages.length" :key="i">
            <v-list-item
              :to="{
                name: 'page',
                params: { id: myPages[i - 1]._id, page: myPages[i - 1] },
              }"
            >
              <v-row>
                <v-col cols="2">
                  <v-row align="center" justify="center">
                    <ProfileAvatar
                      :size="40"
                      :profilePic="myPages[i - 1].photo"
                    ></ProfileAvatar>
                  </v-row>
                </v-col>
                <v-col cols="10">
                  <p class="ma-0">{{ myPages[i - 1].name }}</p>
                  <v-card-subtitle class="ma-0 pa-0">{{
                    myPages[i - 1].category
                  }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-btn
                  :to="{
                    name: 'EditPage',
                    params: { id: myPages[i - 1]._id, page: myPages[i - 1] },
                  }"
                  class="ma-1"
                  small
                  color="primary"
                  rounded
                  >Edit</v-btn
                >
              </v-row>
            </v-list-item>
          </div>
        </v-list>
        <v-card-subtitle v-else class="text-center pa-5"
          >No Pages found</v-card-subtitle
        >
      </v-card>
    </v-container>
    <v-container>
      <v-card style="border-radius:20px;" class="box-shadow">
        <v-card-title>Followed pages</v-card-title>
        <div v-if="loading_joined" class="list_loading pa-4">
          <div style="display: flex">
            <div
              style="border-radius: 50px; height: 50px; width:50px;"
              class="loading-bg loading-animation"
            ></div>
            <div
              style="border-radius: 20px; height: 20px; width:150px;"
              class="loading-bg loading-animation ma-4"
            ></div>
          </div>
        </div>
        <v-list v-else-if="joinedPages.length > 0">
          <div v-for="i in joinedPages.length" :key="i">
            <v-list-item
              :to="{
                name: 'page',
                params: {
                  id: joinedPages[i - 1]._id,
                  page: joinedPages[i - 1],
                },
              }"
            >
              <v-row>
                <v-col cols="2">
                  <v-row align="center" justify="center">
                    <ProfileAvatar
                      :size="40"
                      :profilePic="joinedPages[i - 1].profilePic"
                    ></ProfileAvatar>
                  </v-row>
                </v-col>
                <v-col cols="10">
                  <p class="ma-0">{{ joinedPages[i - 1].name }}</p>
                  <v-card-subtitle class="ma-0 pa-0">{{
                    joinedPages[i - 1].category
                  }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-btn class="ma-1" small color="primary" rounded
                  >Unfollow</v-btn
                >
              </v-row>
            </v-list-item>
          </div>
        </v-list>
        <v-card-subtitle v-else class="text-center pa-5"
          >No Pages found</v-card-subtitle
        >
      </v-card>
    </v-container>
    <v-container>
      <v-card style="border-radius:20px;" class="box-shadow">
        <v-card-title>Suggations</v-card-title>
        <div v-if="loading_sugg" class="list_loading pa-4">
          <div style="display: flex">
            <div
              style="border-radius: 50px; height: 50px; width:50px;"
              class="loading-bg loading-animation"
            ></div>
            <div
              style="border-radius: 20px; height: 20px; width:150px;"
              class="loading-bg loading-animation ma-4"
            ></div>
          </div>
        </div>
        <v-list v-else-if="pagesuggation.length > 0">
          <div v-for="i in pagesuggation.length" :key="i">
            <v-list-item
              :to="{
                name: 'page',
                params: {
                  id: pagesuggation[i - 1]._id,
                  page: pagesuggation[i - 1],
                },
              }"
            >
              <v-row>
                <v-col cols="2">
                  <v-row align="center" justify="center">
                    <ProfileAvatar
                      :size="40"
                      :profilePic="pagesuggation[i - 1].photo"
                    ></ProfileAvatar>
                  </v-row>
                </v-col>
                <v-col cols="10">
                  <p class="ma-0">{{ pagesuggation[i - 1].name }}</p>
                  <v-card-subtitle class="ma-0 pa-0">{{
                    pagesuggation[i - 1].category
                  }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-btn class="ma-1" small color="primary" rounded>Follow</v-btn>
                <v-btn class="ma-1" small color="primary" rounded
                  >Unfollow</v-btn
                >
              </v-row>
            </v-list-item>
          </div>
        </v-list>
        <v-card-subtitle v-else class="text-center pa-5"
          >No Pages found</v-card-subtitle
        >
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading_myContent: true,
      loading_joined: true,
      loading_sugg: true,
    };
  },
  computed: mapGetters(["myPages", "joinedPages", "pagesuggation"]),
  methods: {
    ...mapActions(["getMyPages", "getJoinedPages", "getPagesSuggations"]),
  },
  async created() {
    await this.getMyPages();
    this.loading_myContent = false;
    await this.getJoinedPages();
    this.loading_joined = false;
    this.getPagesSuggations();
    this.loading_sugg = false;
  },
  mounted() {
    document.title = `Pages  - GenxAdda`;
    console.clear();
  },
};
</script>

<style scoped></style>
