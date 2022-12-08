<template>
  <div class="dropdown">
    <select v-model="selectedDropdownValue" class="native-dropdown">
      <option
        v-for="(value, key, index) in dropdownObject"
        :key="index"
        :value="key"
      >
        {{ value }}
      </option>
    </select>
    <div
      ref="dropdownDisplay"
      @click="toggleDropdown"
      tabindex="0"
      class="display"
    >
      <div class="text">{{ label }}</div>
      <div class="arrow" :class="{ rotate: isOpen }">&#60;</div>
    </div>
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
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useCharactersStore } from "@/stores/characters";
import { computed } from "@vue/reactivity";
import { validateQuery } from "@/utilitis/validateQuery";

type DropdownValueType = typeof selectedDropdownValue.value;

const heroStore = useCharactersStore();
const { dropdownObject, selectedDropdownValue } = storeToRefs(heroStore);
const dropdownDisplay = ref();
const isOpen = ref(false);

const label = computed(() => {
  return dropdownObject.value[selectedDropdownValue.value];
});

onMounted(() => {
  const paramsString = window.location.search;
  const searchParams = new URLSearchParams(paramsString);
  const queryObject = Object.fromEntries(searchParams.entries());
  const query = validateQuery(queryObject);
  const queryEntries = Object.entries(query);
  if (queryEntries.length === 1) {
    selectedDropdownValue.value = queryEntries[0][0] as DropdownValueType;
  }
});
function detectClicks(event: MouseEvent) {
  if (event.target instanceof Element) {
    if (
      dropdownDisplay.value !== event.target &&
      dropdownDisplay.value !== event.target?.parentNode
    ) {
      isOpen.value = false;
      document.removeEventListener("click", detectClicks);
    }
  }
}

function toggleDropdown() {
  if (!isOpen.value) {
    document.addEventListener("click", detectClicks);
    isOpen.value = true;
  } else {
    isOpen.value = false;
  }
}
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
  background-color: var(--white);
  border-radius: 10px;
  overflow: hidden;

  @include media-s {
    border-right: 1px solid var(--primary);
    border-radius: 0px;
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
  z-index: 1;
  padding: 16px;
  pointer-events: none;
  background-color: var(--white);

  @include media-s {
    pointer-events: unset;
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
  border: 1px solid var(--primary);
  top: 100%;
  left: -1px;
  z-index: 999;
}
.option {
  padding: 16px;
  width: 100%;
  border: 0;
  background-color: var(--white);
  color: var(--primary);

  @include media-s {
    font-size: 20px;
  }
}
</style>
