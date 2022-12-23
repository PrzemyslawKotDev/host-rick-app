<template>
  <div class="functionality-container">
    <div class="filters">
      <FilterDisplay :is-filters="isFilters" class="offset" />
    </div>
    <ChangeView @view-change="$emit('viewChange')" />
  </div>
</template>

<script setup lang="ts">
import ChangeView from './ChangeView.vue';
import FilterDisplay from './FilterDisplay.vue';

type PropsType = {
  isFilters: Boolean;
};

const props = defineProps<PropsType>();
</script>

<style lang="scss" scoped>
.functionality-container {
  border-bottom: 1px solid var(--color-primary);
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
