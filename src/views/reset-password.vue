<template>
  <v-parallax height="100%" src="@/assets/world.png">
    <v-container>
      <form @submit.prevent="ResetPassword">
        <v-row align="center" justify="center">
          <v-card shaped color max-width="500px" class="ma-2 pa-5">
            <v-card-title>Reset Password</v-card-title>
            <v-container>
              <v-alert
                v-if="error"
                text
                outlined
                type="error"
                dismissible
                icon="mdi-key"
                >{{ error }}</v-alert
              >
              <v-text-field
                outlined
                label="email"
                prepend-inner-icon="mdi-at"
                rounded
                type="text"
                name="email"
                clearable
                v-model="email"
                id="email"
                required
              ></v-text-field>
              <v-btn
                class="my-5 px-10"
                color="primary"
                type="submit"
                rounded
                href
                link
                >Update Password</v-btn>
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
        email: "",
        error: "",
    };
  },
  methods: {
    ...mapActions(["resetPassword", "globalErrorHandler"]),
    ResetPassword() {
        if(this.email && this.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)){
            let data = {
              email: this.email,
            };
            this.resetPassword(data)
              .then(res => {
                if (res.data && res.data.success) {
                   this.$router.push({ name: 'verify-OTP-reset-password', params: { email: this.email }})
                } else {
                    this.error  = res.response.data.msg;
                }
              })
        } else {
            this.error = "Please enter a valid email address."
        }
    },
  },
  mounted() {
    document.title = `Reset Password - GenxAdda`;
    console.clear();
  },
};
</script>
