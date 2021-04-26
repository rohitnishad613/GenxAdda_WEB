<template>
  <v-container>
    <v-card class="box-shadow" style="border-radius:20px;">
      <v-card-title>{{ $t("terms_and_conditions") }}</v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle>
      <p>Welcome to GenxAdda!</p>

<p>GenxAdda builds technologies and services that enable people to connect with each other, build communities, and grow businesses. These Terms govern your use of GenxAdda and the other products, features, apps, services, technologies, and software we offer (the GenxAdda Products or Products), except where we expressly state that separate terms (and not these) apply.</p>

<p>We don’t charge you to use GenxAdda or the other products and services covered by these Terms. Instead, businesses and organizations pay us to show you ads for their products and services. By using our Products, you agree that we can show you ads that we think will be relevant to you and your interests. We use your personal data to help determine which ads to show you.</p>

<p>We don’t sell your personal data to advertisers, and we don’t share information that directly identifies you (such as your name, email address or other contact information) with advertisers unless you give us specific permission. Instead, advertisers can tell us things like the kind of audience they want to see their ads, and we show those ads to people who may be interested. We provide advertisers with reports about the performance of their ads that help them understand how people are interacting with their content.</p>

<p>Our Data Policy explains how we collect and use your personal data to determine some of the ads you see and provide all of the other services described below. You can also go to your settings at any time to review the privacy choices you have about how we use your data.</p></v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
export default {
  mounted() {
    document.title = `${this.$t("terms_and_conditions")} - GenxAdda`;
    console.clear();
  },
};
</script>
