<template>
  <v-container>
    <v-tabs show-arrows centered>
      <v-tab>Friends Requests</v-tab>
      <v-tab>Friends Suggestions</v-tab>
      <v-tab>Your Requests</v-tab>
      <v-tab-item>
        <FriendReqrecived></FriendReqrecived>
      </v-tab-item>
      <v-tab-item>
        <FriendSuggation></FriendSuggation>
      </v-tab-item>
      <v-tab-item>
        <FriendReqsend></FriendReqsend>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import FriendSuggation from "@/components/Friends/FriendSugg.vue";
import FriendReqsend from "@/components/Friends/FriendReq_send.vue";
import FriendReqrecived from "@/components/Friends/FriendReq_recived.vue";

export default {
  components: {
    FriendSuggation,
    FriendReqrecived,
    FriendReqsend,
  },
  mounted() {
    document.title = "Friends - GenxAdda";
    console.clear();
  },
};
</script>
