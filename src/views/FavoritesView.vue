<template>
  <DisplayData :data="favorites" no-data="You have no favourites." />
</template>

<script setup lang="ts">
import DisplayData from '@/components/DisplayData.vue';
import { useCharactersStore } from '@/stores/characters';
import { storeToRefs } from 'pinia';

const heroStore = useCharactersStore();
const { favorites } = storeToRefs(heroStore);
</script>

<style scoped lang="scss"></style>
