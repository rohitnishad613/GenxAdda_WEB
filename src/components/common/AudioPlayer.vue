<template>
  <div>
      <audio class="audio">
        <source :src="src">
      </audio>
  </div>
</template>

<script>
export default {
    props: ["src"],
}
</script>

<style>
.audio{
  width: 100%;
}
</style>