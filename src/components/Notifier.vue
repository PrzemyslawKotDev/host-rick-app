<template>
  <div v-if="notifies.length" class="notifier-container">
    <div
      v-for="item in notifies"
      :key="item[1]"
      :class="item[0]"
      class="baloon"
    >
      <div class="notifier-type">{{ capitalize(item[0]) }}</div>
      <div class="notifier-message">{{ capitalize(item[1]) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCache } from "@/stores/cache";
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";

const cacheStore = useCache();
const { notifies } = storeToRefs(cacheStore);

function capitalize(item: string) {
  return item.charAt(0).toUpperCase() + item.slice(1);
}

watchEffect(() => {
  if (notifies.value.length) {
    setTimeout(() => {
      notifies.value.pop();
    }, 5000);
  }
});
</script>

<style lang="scss" scoped>
.notifier-container {
  z-index: 9999;
  padding: 0 5px;
  position: fixed;
  bottom: 0;

  @include media-s {
    left: 0;
    padding: 0 10px;
  }
}
.baloon {
  margin: 5px 0;
  border: 1px solid var(--color-black);
  padding: 5px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 150px;

  @include media-s {
    margin: 10px 0;
    font-size: 18px;
    padding: 10px;
    border-radius: 10px;
    max-width: 300px;
  }
}
.error {
  background-color: var(--color-red);
}
</style>
