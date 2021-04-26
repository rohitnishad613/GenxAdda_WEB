<template>
  <v-parallax height="100%" src="@/assets/world.png">
    <v-container>
      <form @submit.prevent="verifyOTP">
        <v-row align="center" justify="center">
          <v-card shaped color max-width="500px" class="ma-2 pa-5">
            <v-card-title>Verify OTP</v-card-title>
            <v-container>
            <v-alert
                v-if="new_otp_sended"
                text
                outlined
                type="error"
                dismissible
                icon="mdi-key"
              >New OTP is sent to your email address.</v-alert>
              <v-alert
                v-if="error"
                text
                outlined
                type="error"
                dismissible
                icon="mdi-key"
              >{{ error }}</v-alert>
              <v-text-field
                outlined
                label="OTP"
                prepend-inner-icon="mdi-key"
                rounded
                type="text"
                name="otp"
                clearable
                v-model="otp"
                id="otp"
                required
              ></v-text-field>
              <v-btn class="my-5 px-10" color="primary" type="submit" rounded href link>Check OTP</v-btn>
              <br />
              <v-btn text @click="resendOTP_local()">Resend OTP</v-btn>
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
      new_otp_sended: false,
      error: null,
      otp: ""
    };
  },
  methods: {
    ...mapActions(["checkOTP", "resendOTP", "globalErrorHandler"]),
    resendOTP_local(){
      this.resendOTP(this.$route.params.unverified_email)
      .then(res => {
            if (res.data && res.data.success) {
                this.new_otp_sended = true;
            } else {
                this.error = res.response.data.err;
            }
          })
    },
    verifyOTP() {
      if(this.$route.params.unverified_email){
        let data = {
          unverified_email: this.$route.params.unverified_email,
          otp: this.otp
        };
        this.checkOTP(data)
          .then(res => {
              if (res.data && res.data.success) {
                  this.$router.push("/");
              } else {
                this.error = res.response.data.msg;
              }
            })
      } else {
        this.error = "We are unable to find your email address. Try again."
      }
    }
  },
  mounted() {
    document.title = `${this.$t("sign_up")} - GenxAdda`;
    console.clear();
  }
};
</script>
