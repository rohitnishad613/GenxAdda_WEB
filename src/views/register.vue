<template>
  <v-parallax height="100%" src="@/assets/world.png">
    <v-container>
      <form @submit.prevent="registerUser">
        <v-row align="center" justify="center">
          <v-card shaped color max-width="500px" class="ma-2 pa-5">
            <v-card-title>{{ $t("sign_up") }}</v-card-title>
            <v-container>
              <v-alert
                v-if="error"
                text
                outlined
                type="error"
                dismissible
                icon="mdi-account"
                >{{ error }}</v-alert
              >
              <v-text-field
                outlined
                :label="$t('first_name')"
                prepend-inner-icon="mdi-account"
                rounded
                type="text"
                name="fname"
                clearable
                v-model="fname"
                id="fname"
                required
              ></v-text-field>
              <v-text-field
                outlined
                :label="$t('last_name')"
                prepend-inner-icon="mdi-account"
                rounded
                type="text"
                name="lname"
                clearable
                v-model="lname"
                id="lname"
                required
              ></v-text-field>
              <v-text-field
                outlined
                prepend-inner-icon="mdi-at"
                :label="$t('email')"
                rounded
                type="email"
                name="email"
                clearable
                v-model="email"
                id="email"
                required
              ></v-text-field>
              <v-text-field
                outlined
                :label="$t('password')"
                prepend-inner-icon="mdi-key-variant"
                rounded
                name="password"
                v-model="password"
                clearable
                id="password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
                autocomplete="new-password"
                required
              ></v-text-field>
              <v-text-field
                outlined
                :label="$t('confirm_password')"
                prepend-inner-icon="mdi-key-variant"
                rounded
                name="confirm_password"
                v-model="confirm_password"
                clearable
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
                id="confirm_password"
                required
              ></v-text-field>
              <v-btn
                class="my-5 px-10"
                color="primary"
                type="submit"
                rounded
                href
                link
                >{{ $t("sign_up") }}</v-btn
              >
              <br />
              <router-link to="/login">{{ $t("login") }} ?</router-link>
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
  name: "login",
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirm_password: "",
      showPass: false,
    };
  },
  methods: {
    ...mapActions(["register", "globalErrorHandler"]),
    registerUser() {
      let User = {
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
      };
      this.register(User)
        .then((res) => {
          if(res.data && res.data.success){
            this.$router.push({ name: 'verify-OTP', params: { unverified_email: this.email }})
          }
        })
        .catch((error) => {
          this.globalErrorHandler(error);
        });
    },
  },
  computed: {
    ...mapGetters(["error"]),
  },
  mounted() {
    document.title = `${this.$t("sign_up")} - GenxAdda`;
    console.clear();
  },
};
</script>
