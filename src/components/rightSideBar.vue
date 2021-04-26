<template>
  <v-navigation-drawer
    clipped
    app
    floating
    right
    :mobile-breakpoint="innerWidth < 1051 ? 700 : 1050"
    width="24%"
    mini-variant-width="100px"
    :expand-on-hover="RightSidebar.mini"
    :mini-variant="RightSidebar.mini || innerWidth < 1051"
    :temporary="RightSidebar.temporary"
    :hidden="RightSidebar.hide"
  >
    <chaters></chaters>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import chaters from "@/views/Chat/chaters.vue";

export default {
  data() {
    return {
      innerWidth: null,
    };
  },
  components: {
    chaters,
  },
  computed: {
    ...mapGetters(["user", "RightSidebar"]),
  },
  created() {
    this.innerWidth = window.innerWidth;
  },
};
</script>

<style scoped></style>
