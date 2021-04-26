<template>
  <v-container>
    <v-card class="box-shadow" style="border-radius:20px;">
      <v-card-title
        >Search results of '{{ $route.params.search }}'</v-card-title
      >
      <v-tabs show-arrows centered>
        <v-tab :to="`/search/${$route.params.search}/all`">All</v-tab>
        <v-tab :to="`/search/${$route.params.search}/people`">Peoples</v-tab>
        <v-tab :to="`/search/${$route.params.search}/posts`">Posts</v-tab>
        <v-tab :to="`/search/${$route.params.search}/groups`">Groups</v-tab>
        <v-tab :to="`/search/${$route.params.search}/pages`">Pages</v-tab>
        <v-tab :to="`/search/${$route.params.search}/events`">Events</v-tab>
      </v-tabs>
      <searchResults
        :key="searchResultsKey"
        :search="$route.params.search"
        :filter="$route.params.filter"
      ></searchResults>
    </v-card>
  </v-container>
</template>

<script>
import searchResults from "@/components/SearchResults.vue";
export default {
  data() {
    return {
      searchResultsKey: 0,
    };
  },
  components: {
    searchResults,
  },
  watch: {
    $route(to, from) {
      // increment the search results component key for re-rendering
      this.searchResultsKey += 1;
    },
  },
  created() {
    document.title = `${this.$route.params.search} - GenxAdda`;
  },
};
</script>
