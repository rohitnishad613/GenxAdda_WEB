<template>
  <v-container>
    <v-card class="box-shadow" style="border-radius:20px;">
      <v-card-title>{{ $t("data_privacy") }}</v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle>
        <big>What kinds of information do we collect?</big>
        <p>
          When we talk about "Personal Information" in this Privacy Policy, we
          are talking about Device Information.
        </p>
        <ul>
          <li>Communicate with you;</li>
          <li>Screen our orders for potential risk or fraud; and</li>
          <li>
            When in line with the preferences you have shared with us, provide
            you with information or advertising relating to our products or
            services.
          </li>
        </ul>
        <p>
          We use the Device Information that we collect to help us screen for
          potential risk and fraud (in particular, your IP address), and more
          generally to improve and optimize our Site (for example, by generating
          analytics about how our customers browse and interact with the Site,
          and to assess the success of our marketing and advertising campaigns).
        </p>
        <p>
          We use your account information that we collect generally to generate
          statistics for you, and provide personalized roadmaps. Additionally,
          we use this information to:
        </p>
        <ul>
          <li>Communicate with you;</li>
          <li>
            When in line with the preferences you have shared with us, provide
            you with information or advertising relating to our products or
            services.
          </li>
        </ul>
        <big>How do we use this information?</big>
        <p>
          We use your data only for our R&D (Research and Development) to make our products and services more useful for you.
        </p>
        <big>How is this information shared?</big>
        <p>
          We are not shareing your Personal Information with any other trived party app or company excluding Google Analytics.  
        </p>
        <p>
          We use Google Analytics to help us understand how our
          customers use the Site -- you can read more about how Google uses your
          Personal Information here:
          https://www.google.com/intl/en/policies/privacy/. You can also opt-out
          of Google Analytics here: https://tools.google.com/dlpage/gaoptout.
        </p>
        <p>
          We fund our site by showing adverts as you browse our site. These
          adverts are usually managed by a partner specializing in providing
          adverts for multiple sites. Invariably these partners collect
          anonymous data about the websites you visits so they can personalize
          the adverts to you, ensure that you don't see the same adverts too
          frequently and ultimately report to advertisers on which adverts are
          working.
        </p>
        <p>
          Finally, we may also share your Personal Information to comply with
          applicable laws and regulations, to respond to a subpoena, search
          warrant or other lawful request for information we receive, or to
          otherwise protect our rights.
        </p>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
export default {
  mounted() {
    document.title = `${this.$t("data_privacy")} - GenxAdda`;
    console.clear();
  },
};
</script>
