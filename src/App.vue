<template>
  <v-app>
    <!-- footer hides for loged in user for better ui -->
    <router-view></router-view>
    <Error></Error>
  </v-app>
</template>

<script>
import Error from "@/components/Error.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Error,
  },
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
  },
  methods: {
    getActiveLanguage() {
      if (this.isLoggedIn && this.user) {
        //get from db and cookies
        let language = this.$cookies.get("lang")
          ? this.$cookies.get("lang")
          : this.user.lang;

        if (language) {
          this._i18n.locale = language;
        }
      } else {
        let language = this.$cookies.get("lang");
        if (language) {
          this._i18n.locale = language;
        }
      }
    },
  },
  created() {
    this.getActiveLanguage();
  },
  mounted() {
    console.clear();
  },
};
</script>

<style>
/* import */
@import url("https://fonts.googleapis.com/css?family=Poppins&display=swap");

/* scrollbar */

/* >>>>>>>>>>>>>>>>>>>>> firefox <<<<<<<<<<<<<<<<< */
* {
  scrollbar-width: thin;
  scrollbar-color: #ffffff78 #00000000;
}

/* >>>>>>>>>>>>>>>>>>>>> webket suuported like chrome <<<<<<<<<<<<<<<<< */
*::-webkit-scrollbar {
  background-color: #ffffff00;
  width: 8px;
}

*::-webkit-scrollbar-track {
  width: 8px;
  background-color: #00000000;
}

*::-webkit-scrollbar-thumb {
  width: 8px;
  background-color: #8181817c;
}

*::-webkit-scrollbar-button {
  visibility: hidden;
}

.router_transition-enter,
.router_transition-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.router_transition-enter-active {
  transition: all 180ms ease-in;
}

.router_transition-leave-active {
  transition: all 200ms ease-out;
}

.v-menu__content {
  border-radius: 15px !important;
}

/* scrollbar */

* {
  box-sizing: border-box;
  margin: 0;
  outline: 0;
  font-family: "Poppins", sans-serif;
}

.v-btn--active > * {
  font-weight: bold;
}

.roundedTextarea {
  border-radius: 15px;
}

a {
  text-decoration: none;
}
* a:hover {
  color: #ff8b06;
}
.box-shadow {
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  transition: 0.5s;
}

.box-shadow:hover {
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
}

@keyframes loading_animation {
  0% {
    opacity: 0;
  }
  15% {
    opacity: 0.5;
  }
  36% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.loading-bg {
  padding: 10px;
  background: #41414110;
}
.loading-animation {
  background: #41414115;
  animation: loading_animation 1000ms ease 0ms infinite;
}

.list_loading {
  width: 100%;
  height: 80px;
  border-radius: 18px;
  background: #41414110;
  animation: loading_animation 1000ms ease 0ms infinite;
}

.hide_file_input {
  width: 0px;
  height: 0px;
}

.hide_file_input[type="file"]::-webkit-file-upload-button {
  width: 0px;
  height: 0px;
  position: fixed;
  display: none;
  visibility: hidden;
}
</style>
