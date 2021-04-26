<template>
  <div>
    <div v-if="loading">
      <div v-for="i in 5" class="list_loading mb-4 pa-3" :key="i">
        <div style="display: flex">
          <div
            style="border-radius: 50px; height: 50px; width:50px;"
            class="loading-bg loading-animation"
          ></div>
          <div
            style="border-radius: 20px; height: 15px; width:100%;"
            class="loading-bg loading-animation ma-4"
          ></div>
        </div>
      </div>
    </div>
    <v-list v-else-if="searchResults.length > 0">
      <div class="result" v-for="i in searchResults.length" :key="i">
        <v-list-item :to="`/${searchResults[i - 1].url}`">
          <v-list-item>{{ searchResults[i - 1].title }}</v-list-item>
        </v-list-item>
      </div>
    </v-list>
    <v-card-subtitle v-else class="text-center pa-5"
      >No results found</v-card-subtitle
    >
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  props: {
    search: {
      type: String,
    },
    filter: {
      type: String,
    },
  },
  data() {
    return {
      searchResults: [],
      loading: true,
    };
  },
  watch: {
    search: function(newValue, oldValue) {
      this.getSearchResults();
    },
  },
  methods: {
    ...mapActions(["globalErrorHandler"]),
    async getSearchResults() {
      let filter = this.filter;
      let search = this.search;
      axios
        .get(`${this.$API}/search/${filter}/${search}`)
        .then((res) => {
          this.searchResults = res.data.results;
          this.loading = false;
        })
        .catch((err) => {
          this.globalErrorHandler(err);
        });
    },
  },
  created() {
    this.getSearchResults();
  },
};
</script>
