import { computed, onBeforeMount, ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import getCharactersData from "@/service/getCharactersData";
import { useCharactersCache } from "@/stores/cache";
import type HeroType from "@/types/hero";
import type CharactersType from "@/types/characters";
import type { ParamsType, FilterType } from '@/utilitis/validateQuery';
import getUniqueId from '@/utilitis/getUniqueId';

export const useCharactersStore = defineStore("characters", () => {

  const dropdownObject = ref({
    name: "Name",
    status: "Status",
    species: "Species",
    type: "Type",
    gender: "Gender",
  });
  const cacheStore = useCharactersCache();
  const { charactersCache } = storeToRefs(cacheStore);
  const selectedDropdownValue = ref<FilterType>("name");
  const maxPages = ref(1);
  const pickedPageNumber = ref(1)
  const searchString = ref("");
  const characters = ref<CharactersType>();
  const favorites = ref<HeroType[]>([]);
  const favID = computed(() => favorites.value?.map(({ id }) => Number(id)));
  const isLoading = ref(false);
  const changeViewElement = ref<HTMLElement | null>(null);

  onBeforeMount((): void => {
    const favoritesData = localStorage.getItem("rickmortfavs");
    if (favoritesData) {
      favorites.value = JSON.parse(favoritesData);
    }
  });

  function handleFavorites(item: HeroType): void {
    let isFav = false;

    favorites.value?.forEach((hero, index) => {
      if (hero.id === item.id) {
        favorites.value?.splice(index, 1);
        isFav = true;
      }
    });
    if (!isFav) {
      favorites.value?.push(item);
    }
    localStorage.setItem("rickmortfavs", JSON.stringify(favorites.value));
  }

  async function getCharacters(pageNum?: number, filters?: ParamsType) {

    const charactersQuery = {
      page: `${pageNum}`,
      ...sortFilters(filters)
    };
    const charactersParams = new URLSearchParams(charactersQuery).toString();

    isLoading.value = true;

    if (isResultsCached(charactersParams)) {
      characters.value = charactersCache.value[charactersParams];
      window.setTimeout(() => {
        isLoading.value = false;
      }, 500);
      return
    }

    try {
      const newUrl = `https://rickandmortyapi.com/api/character/?${charactersParams}`;
      const data = await getCharactersData(newUrl);
      const heroesWithKey = data.results.map((item: HeroType) => { return { ...item, key: getUniqueId() } })

      characters.value = { ...data, results: heroesWithKey }

      if (characters.value) {
        cacheStore.addCharactersCache(charactersParams, characters.value);
        maxPages.value = characters.value.info.pages;
      }
    } catch (error) {
      cacheStore.addNotification([
        "error",
        `an error has occurred, please contact your application administrator!`,
      ]);
    } finally {
      window.setTimeout(() => {
        isLoading.value = false;
      }, 500);
    }
  }

  function isResultsCached(queryParams: string): boolean {
    return !!Object.keys(charactersCache.value).length &&
      Object.keys(charactersCache.value).includes(queryParams)
  }

  function sortFilters(filters?: ParamsType) {
    if (filters) {
      const filtersEntries = Object.entries(filters)
      filtersEntries.sort(function (a, b) {
        if (a[0] < b[0]) {
          return -1;
        }
        if (a[0] > b[0]) {
          return 1;
        }
        return 0;
      });
      return Object.fromEntries(filtersEntries)
    }
  }

  return {
    characters,
    handleFavorites,
    favorites,
    favID,
    dropdownObject,
    searchString,
    maxPages,
    isLoading,
    changeViewElement,
    selectedDropdownValue,
    pickedPageNumber,
    getCharacters,
  };
});
