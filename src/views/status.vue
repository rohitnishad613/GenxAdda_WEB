<template>
  <ViewStatus></ViewStatus>
</template>

<script>
import ViewStatus from "@/components/Status/ViewStatus.vue";
export default {
  components: {
    ViewStatus,
  },
  mounted() {
    document.title = "Status - GenxAdda";
    console.clear();
  },
};
</script>
