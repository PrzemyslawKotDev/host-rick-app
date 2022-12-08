<template>
  <div class="functionality-container">
    <div class="filters">
      <FilterDisplay :isFilters="isFilters" class="offset" />
    </div>
    <ChangeView @viewChange="$emit('viewChange')" />
  </div>
</template>

<script setup lang="ts">
import ChangeView from "./ChangeView.vue";
import FilterDisplay from "./FilterDisplay.vue";

const props = defineProps({
  isFilters: Boolean,
});
</script>

<style lang="scss" scoped>
.functionality-container {
  border-bottom: 1px solid var(--primary);
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px 0;

  @include media-s {
    border: 0;
    padding: 10px 0;
  }
}
.filters {
  width: 100%;

  @include media-s {
    padding-left: 90px;
  }
}
</style>
