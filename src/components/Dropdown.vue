<template>
  <div ref="dropdown" class="dropdown">
    <select v-model="selectedDropdownValue" class="native-dropdown">
      <option
        v-for="(value, key, index) in dropdownObject"
        :key="index"
        :value="key"
      >
        {{ value }}
      </option>
    </select>
    <button @click="isOpen = !isOpen" class="display">
      <div class="text">{{ label }}</div>
      <div class="arrow" :class="{ 'rotate': isOpen }">&#60;</div>
    </button>
    <div v-if="isOpen" class="options">
      <button
        @click="pickOption(key)"
        v-for="(value, key, index) in dropdownObject"
        :key="index"
        class="option"
      >
        {{ value }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCharactersStore } from '@/stores/characters';
import { onClickOutside } from '@vueuse/core';
import { computed } from '@vue/reactivity';

type DropdownValueType = typeof selectedDropdownValue.value;

const heroStore = useCharactersStore();
const { selectedDropdownValue, dropdownObject } = storeToRefs(heroStore);
const isOpen = ref(false);
const dropdown = ref();
const label = computed(() => dropdownObject.value[selectedDropdownValue.value]);

onClickOutside(dropdown, () => (isOpen.value = false));

function pickOption(item: DropdownValueType) {
  selectedDropdownValue.value = item;
  isOpen.value = false;
}
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;
  width: 100%;
  cursor: pointer;
  background-color: var(--color-white);
  border-radius: 10px;
  overflow: hidden;

  @include media-s {
    border-right: 1px solid var(--color-primary);
    border-radius: 0;
    overflow: unset;
  }
}
.native-dropdown {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  border: 0;

  @include media-s {
    display: none;
  }
}
.display {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  padding: 16px;
  pointer-events: none;
  background-color: var(--color-white);
  border: 0;
  color: var(--color-primary);
  font-size: 16px;
  width: 100%;

  @include media-s {
    pointer-events: unset;
    font-size: 20px;
  }
}
.text {
  padding-right: 10px;
}
.arrow {
  transform: rotate(-90deg);
  transition: transform 0.2s;
}
.rotate {
  transform: rotate(90deg);
}
.options {
  position: absolute;
  border: 1px solid var(--color-primary);
  top: 100%;
  left: -1px;
  z-index: 999;
}
.option {
  padding: 16px;
  width: 100%;
  border: 0;
  background-color: var(--color-white);
  color: var(--color-primary);

  @include media-s {
    font-size: 20px;
  }
}
</style>
