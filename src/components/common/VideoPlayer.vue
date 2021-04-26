<template>
  <div id="videoSkin">
    <div v-if="!controller">
      <video class="video" id="video" autoPlay controlsList="nodownload">
        <source :src="src" />
      </video>
    </div>
    <div v-else-if="controller">
      <video  id="video" class="video" controls loop>
        <source :src="src" />
      </video>
    </div>
    <v-btn
      v-if="recreate"
      x-small
      rounded
      @click="recreatevideo()"
      color="primary"
      >RECREATE</v-btn
    >
  </div>
</template>

<script>
export default {
  props: ["src", "controller"],
};
</script>

<style scoped>
.video {
  width: 100%;
}
</style>
