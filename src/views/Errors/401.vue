<template>
  <div class="error-container">
    <div class="err">
      <h1 class="error-title">{{ $t("401_error_title") }}</h1>
      <span class="error-code">401 Error</span>
      <p class="error-desc">
        {{ $t("401_error_about") }}
      </p>
      <v-btn small color="primary" to="/login" rounded>{{ $t("login") }}</v-btn>
      <p>
        {{ $t("or") }} {{ $t("visit_our")
        }}<router-link to="/help">{{ $t("help_center") }}</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.title = `401 ${this.$t("401_error_title")} - GenxAdd`;
    console.clear();
  },
};
</script>

<style scoped>
.error-container {
  text-align: center;
  height: 100%;
  display: grid;
  align-content: center;
}
.error-title {
  font-size: 3em;
}
.error-code {
  font-size: 2em;
}
.error-desc {
  font-size: 1.5em;
}
</style>
