<template>
  <div class="advanced-search">
    <button @click="emit('closeSearch')" class="close">+</button>
    <div class="inputs">
      <label for="name">Enter name</label>
      <input v-model="formModel.name" type="text" name="name" id="name" />
      <label for="status">Enter status</label>
      <input v-model="formModel.status" type="text" name="status" id="status" />
      <label for="species">Enter species</label>
      <input
        v-model="formModel.species"
        type="text"
        name="species"
        id="species"
      />
      <label for="type">Enter type</label>
      <input v-model="formModel.type" type="text" name="type" id="type" />
      <label for="gender">Enter gender</label>
      <input v-model="formModel.gender" type="text" name="gender" id="gender" />
    </div>
    <button @click="doAdvancedSearch" class="search-btn">Search</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCharactersStore } from '@/stores/characters';
import { useRouter, useRoute } from 'vue-router';
import { validateQuery } from '@/utilitis/validateQuery';

type KeyType = keyof typeof formModel.value;

const router = useRouter();
const route = useRoute();
const heroStore = useCharactersStore();
const emit = defineEmits(['closeSearch']);

const formModel = ref({
  name: '',
  status: '',
  species: '',
  type: '',
  gender: '',
});

if (route.query) {
  const { validParams } = validateQuery(route.query);
  const queryEntries = Object.entries(validParams);

  queryEntries.forEach(([key, item]) => {
    if (key !== 'page') {
      formModel.value[key as KeyType] = item as string;
    }
  });
}

function doAdvancedSearch(): void {
  const filterEntries = Object.entries(formModel.value);
  const { unusedParams } = validateQuery(route.query);

  const usedFilters = filterEntries.reduce((acumulator, [key, value]) => {
    return {
      ...acumulator,
      ...(value && { [key]: value }),
    };
  }, {});

  router.push({
    name: 'basic',
    query: {
      ...usedFilters,
      ...unusedParams,
      page: 1,
    },
  });

  heroStore.getCharacters(1, usedFilters);
  emit('closeSearch');
}
</script>

<style scoped lang="scss">
.advanced-search {
  padding: 15px;
  border: 1px solid var(--color-black);
  position: relative;
  background-color: var(--color-white);
  width: 90%;

  @include media-s {
    width: 75%;
    padding: 25px;
  }
}
.inputs {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
.close {
  position: absolute;
  z-index: 99;
  right: -5px;
  top: -17px;
  border: 0;
  background: transparent;
  font-size: 40px;
  transform: rotate(45deg);
  padding: 0 5px;
  color: var(--color-red);
  transition: transform 0.2s ease-in-out;
  font-weight: $fontweight-bolder;

  &:hover {
    transform: rotate(135deg);
  }

  @include media-s {
    right: 0;
    top: -13px;
  }
}
input {
  padding: 5px;
  margin: 8px;
}
label {
  display: flex;
  align-items: center;
}
.search-btn {
  margin-top: 25px;
  width: 100%;
  padding: 5px;
  font-size: 20px;
}
</style>
