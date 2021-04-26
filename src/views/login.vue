<template>
  <v-parallax height="100%" src="@/assets/world.png">
    <v-container>
      <v-alert
  dismissible
  type="info"
>Demo User account? <br>Username: demouser <br>Password: demo123 </v-alert>
      <form @submit.prevent="loginUser" id="loginform">
        <v-row align="center" justify="center">
          <v-card shaped max-width="500px" class="ma-2 pa-5">
            <v-card-title>{{ $t("login") }}</v-card-title>
            <v-container>
              <v-alert
                v-if="auth_error"
                text
                outlined
                type="error"
                icon="mdi-account"
                dismissible
              >
                {{ auth_error }}
              </v-alert>
              <v-text-field
                outlined
                :label="`${$t('username')} ${$t('or')} ${$t('email')}`"
                rounded
                type="username"
                name="username"
                id="username"
                clearable
                prepend-inner-icon="mdi-account"
                v-model="username"
                required
              >
              </v-text-field>
              <v-text-field
                outlined
                :label="$t('password')"
                prepend-inner-icon="mdi-key-variant"
                rounded
                clearable
                name="password"
                id="password"
                v-model="password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
                required
              >
              </v-text-field>
               <router-link to="/reset-password"
                >{{ $t("forgot_password") }} ?</router-link
              >
              <br />
              <v-btn
                class="my-5 px-10"
                color="primary"
                type="submit"
                rounded
                href
                link
                >{{ $t("login") }}</v-btn
              >
              <br />
              <router-link to="/signup">{{ $t("sign_up") }} ?</router-link>
            </v-container>
          </v-card>
        </v-row>
      </form>
    </v-container>
  </v-parallax>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      showPass: false,
    };
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      let user = {
        username: this.username,
        password: this.password,
      };
      this.login(user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push("/");
          }
        })
    },
  },
  computed: {
    ...mapGetters(["auth_error"]),
  },
  mounted() {
    document.title = `${this.$t("login")} - GenxAdda`;
    console.clear();
  },
};
</script>
