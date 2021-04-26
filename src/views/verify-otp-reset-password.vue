<template>
  <v-parallax height="100%" src="@/assets/world.png">
    <v-container>
      <form @submit.prevent="verifyOTP">
        <v-row align="center" justify="center">
          <v-card shaped color max-width="500px" class="ma-2 pa-5">
            <v-card-title>Reset Password</v-card-title>
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
                v-if="verify_otp_error"
                text
                outlined
                type="error"
                dismissible
                icon="mdi-key"
              >{{ verify_otp_error }}</v-alert>
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
              ></v-text-field>
              <v-text-field
                outlined
                label="New Password"
                prepend-inner-icon="mdi-lock"
                rounded
                type="text"
                name="new_password"
                clearable
                v-model="new_password"
                id="new_password"
              ></v-text-field>
              <v-btn class="my-5 px-10" color="primary" type="submit" rounded href link>Reset Password</v-btn>
              <br />
              <v-btn text @click="resendResetPasswordOTP_local()">Resend OTP</v-btn>
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
      otp: "",
      new_password: "",
      verify_otp_error: null,
    };
  },
  methods: {
    ...mapActions(["checkResetPasswordOTP", "resendResetPasswordOTP", "globalErrorHandler"]),
    resendResetPasswordOTP_local(){
      this.resendResetPasswordOTP(this.$route.params.email)
      .then(res => {
            if (res.data && res.data.success) {
              this.new_otp_sended = true;
            } else {
                this.verify_otp_error = res.response.data.msg;
            }
          })
    },
    verifyOTP() {
      if(this.otp && this.new_password){
        let data = {
            email: this.$route.params.email,
            otp: this.otp,
            new_password: this.new_password
        };
        this.checkResetPasswordOTP(data)
        .then(res => {
            if (res.data && res.data.success) {
                this.$router.push("/login");
            } else {
                this.verify_otp_error = res.response.data.msg;
            }
        });
      } else {
        this.verify_otp_error = "Fill the form."
      }
    }
  },
  mounted() {
    document.title = `Reset Password - GenxAdda`;
    console.clear();
  }
};
</script>
