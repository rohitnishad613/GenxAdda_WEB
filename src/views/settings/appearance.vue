<template>
  <v-card style="border-radius:20px;" class="box-shadow">
    <v-card-title>Apperance</v-card-title>
    <v-container>
      <v-list>
        <v-list-item>
          <v-row>
            <v-list-item-subtitle>Left sidebar.</v-list-item-subtitle>
            <v-container fluid>
              <v-checkbox class="ma-0 pa-0" v-model="lefthide" label="Hide">
              </v-checkbox>
              <v-checkbox class="ma-0 pa-0" v-model="leftmini" label="Mini">
              </v-checkbox>
              <v-checkbox
                class="ma-0 pa-0"
                v-model="lefttemporary"
                label="Temprary"
              >
              </v-checkbox>
            </v-container>
            <v-container>
              <v-btn @click="setLeftSidebar()" color="primary" rounded block
                >Save</v-btn
              >
            </v-container>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-list-item-subtitle>Right sidebar.</v-list-item-subtitle>
            <v-container fluid>
              <v-checkbox class="ma-0 pa-0" v-model="righthide" label="Hide">
              </v-checkbox>
              <v-checkbox class="ma-0 pa-0" v-model="rightmini" label="Mini">
              </v-checkbox>
              <v-checkbox
                class="ma-0 pa-0"
                v-model="righttemporary"
                label="Temprary"
              >
              </v-checkbox>
            </v-container>
            <v-container>
              <v-btn @click="setRightSidebar()" color="primary" rounded block
                >Save</v-btn
              >
            </v-container>
          </v-row>
        </v-list-item>
      </v-list>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      lefttemporary:
        this.$cookies.get("LeftSideBarTemprary") != null
          ? this.$cookies.get("LeftSideBarTemprary") == "true"
            ? true
            : false
          : false,
      leftmini:
        this.$cookies.get("LeftSideBarMini") != null
          ? this.$cookies.get("LeftSideBarMini") == "true"
            ? true
            : false
          : false,
      lefthide:
        this.$cookies.get("LeftSideBarHide") != null
          ? this.$cookies.get("LeftSideBarHide") == "true"
            ? true
            : false
          : false,
      righttemporary:
        this.$cookies.get("RightSideBarTemprary") != null
          ? this.$cookies.get("RightSideBarTemprary") == "true"
            ? true
            : false
          : false,
      rightmini:
        this.$cookies.get("RightSideBarMini") != null
          ? this.$cookies.get("RightSideBarMini") == "true"
            ? true
            : false
          : false,
      righthide:
        this.$cookies.get("RightSideBarHide") != null
          ? this.$cookies.get("RightSideBarHide") == "true"
            ? true
            : false
          : false,
    };
  },
  methods: {
    ...mapActions(["LeftSidebar", "rightSidebar"]),
    setLeftSidebar() {
      let data = {
        temporary: this.lefttemporary,
        mini: this.leftmini,
        hide: this.lefthide,
      };
      this.LeftSidebar(data);
    },
    setRightSidebar() {
      let data = {
        temporary: this.righttemporary,
        mini: this.rightmini,
        hide: this.righthide,
      };
      this.rightSidebar(data);
    },
  },
  computed: {
    ...mapGetters(["error"]),
  },
  mounted() {
    document.title = "Appearance settings - GenxAdda";
    console.clear();
  },
};
</script>

<style scoped></style>
