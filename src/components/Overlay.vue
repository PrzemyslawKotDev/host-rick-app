<template>
  <div v-if="isOpen" class="overlay" @click.self="$emit('closeDetails')">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
}>();
</script>

<style scoped lang="scss">
.overlay {
  top: 0;
  left: 0;
  position: fixed;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(
    128,
    128,
    128,
    0.5
  ); //<- sass not support rgba with hex, need some kind of fix !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  z-index: 99;
}
</style>
