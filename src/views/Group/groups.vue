<template>
  <v-container>
    <v-row class="pa-0 ma-0" align="center" justify="space-between">
      <div>
        <v-card-title>Groups</v-card-title>
        <v-card-subtitle
          >Discover your interrest, via joining groups.</v-card-subtitle
        >
      </div>
      <v-btn icon to="/create/group">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-container>
      <v-card style="border-radius:20px;" class="box-shadow">
        <v-card-title>Your groups</v-card-title>
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
        <v-list v-else-if="mygroups.length > 0">
          <div v-for="i in mygroups.length" :key="i">
            <v-list-item
              :to="{
                name: 'group',
                params: { id: mygroups[i - 1]._id, group: mygroups[i - 1] },
              }"
            >
              <v-row>
                <v-col cols="2">
                  <v-row align="center" justify="center">
                    <ProfileAvatar
                      :size="40"
                      :profilePic="mygroups[i - 1].photo"
                    ></ProfileAvatar>
                  </v-row>
                </v-col>
                <v-col cols="10">
                  <p class="ma-0">{{ mygroups[i - 1].name }}</p>
                  <v-card-subtitle class="ma-0 pa-0">{{
                    mygroups[i - 1].category
                  }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-btn
                  :to="{
                    name: 'Editgroup',
                    params: { id: mygroups[i - 1]._id, group: mygroups[i - 1] },
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
          >No Groups found</v-card-subtitle
        >
      </v-card>
    </v-container>
    <v-container>
      <v-card style="border-radius:20px;" class="box-shadow">
        <v-card-title>Joined groups</v-card-title>
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
        <v-list v-else-if="joinedgroups.length > 0">
          <div v-for="i in joinedgroups.length" :key="i">
            <v-list-item
              :to="{
                name: 'group',
                params: {
                  id: joinedgroups[i - 1]._id,
                  group: joinedgroups[i - 1],
                },
              }"
            >
              <v-row>
                <v-col cols="2">
                  <v-row align="center" justify="center">
                    <ProfileAvatar
                      :size="40"
                      :profilePic="joinedgroups[i - 1].photo"
                    ></ProfileAvatar>
                  </v-row>
                </v-col>
                <v-col cols="10">
                  <p class="ma-0">{{ joinedgroups[i - 1].name }}</p>
                  <v-card-subtitle class="ma-0 pa-0">{{
                    joinedgroups[i - 1].category
                  }}</v-card-subtitle>
                </v-col>
              </v-row>
            </v-list-item>
          </div>
        </v-list>
        <v-card-subtitle v-else class="text-center pa-5"
          >No Groups found</v-card-subtitle
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
        <v-list v-else-if="groupsuggation.length > 0">
          <div v-for="i in groupsuggation.length" :key="i">
            <v-list-item
              :to="{
                name: 'group',
                params: {
                  id: groupsuggation[i - 1]._id,
                  gruop: groupsuggation[i - 1],
                },
              }"
            >
              <v-row>
                <v-col cols="2">
                  <v-row align="center" justify="center">
                    <ProfileAvatar
                      :size="40"
                      :profilePic="groupsuggation[i - 1].photo"
                    ></ProfileAvatar>
                  </v-row>
                </v-col>
                <v-col cols="10">
                  <p class="ma-0">{{ groupsuggation[i - 1].name }}</p>
                  <v-card-subtitle class="ma-0 pa-0">{{
                    groupsuggation[i - 1].category
                  }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-btn class="ma-1" small color="primary" rounded>Join</v-btn>
                <v-btn class="ma-1" small color="primary" rounded>Remove</v-btn>
              </v-row>
            </v-list-item>
          </div>
        </v-list>
        <v-card-subtitle v-else class="text-center pa-5"
          >No Groups found</v-card-subtitle
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
  computed: mapGetters(["mygroups", "joinedgroups", "groupsuggation"]),
  methods: {
    ...mapActions(["getMygroups", "getJoinedgroups", "getgroupsSuggations"]),
  },
  created() {
    this.getMygroups();
    this.loading_myContent = false;
    this.getJoinedgroups();
    this.loading_joined = false;
    this.getgroupsSuggations();
    this.loading_sugg = false;
  },
  mounted() {
    document.title = `Groups  - GenxAdda`;
    console.clear();
  },
};
</script>
