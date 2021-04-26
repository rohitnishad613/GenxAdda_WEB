<template>
  <div>
    <v-img
      v-if="coverPhoto"
      :src="`${$API_url}/${coverPhoto}`"
      class="box-shadow"
      :width="width"
      :height="height"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="gray"></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <v-img
      v-else
      src="@/assets/img/Cover.jpg"
      class="box-shadow"
      :width="width"
      :height="height"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="gray"></v-progress-circular>
        </v-row>
      </template>
    </v-img>
  </div>
</template>

<script>
export default {
  props: {
    coverPhoto: {
      type: String,
    },
    height: {
      default: "200px",
      type: String,
    },
    width: {
      default: "100%",
      type: String,
    },
  },
};
</script>
