<template>
  <div style="position: relative;">
    <div
      v-if="borders"
      class="amiated-color"
      :style="{ width: size + 4 + 'px', height: size + 4 + 'px' }"
    >
      <v-avatar :style="{ border: `3px solid ${themeColor}` }" :size="size">
        <v-img
          v-if="profilePic"
          :src="`${$API_url}/${profilePic}`"
          class="box-shadow"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="gray"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-img v-else src="@/assets/img/User.svg" class="box-shadow">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="gray"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-avatar>
    </div>
    <v-avatar v-else :size="size">
      <v-img
        v-if="profilePic"
        :src="`${$API_url}/${profilePic}`"
        class="box-shadow"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="gray"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-img v-else src="@/assets/img/User.svg" class="box-shadow">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="gray"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-avatar>
    <div v-if="status == 'Active'" class="active_status">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profilePic: {
      type: String,
    },
    status: {
      type: String,
    },
    size: {
      default: 55,
      type: Number,
    },
    borders: {
      default: true,
      type: Boolean,
    },
  },
  computed: {
    themeColor() {
      return this.$vuetify.theme.dark ? "black" : "white";
    },
  },
};
</script>

<style scoped>
.active_status{
  position: absolute;
  bottom: 0;
  right: 0;
  height: 10px;
  width: 10px;
  border-radius:10px;
  background-color: rgb(43, 214, 0);
}
.amiated-color {
  border-radius: 50%;
  padding: 2px;
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
  h: 65px;
}
</style>
