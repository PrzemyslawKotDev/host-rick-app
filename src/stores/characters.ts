import { computed, onBeforeMount, ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import getSearched from "@/service/getSearched";
import getPage from "@/service/getPage";
import getAdvancedSearch from "@/service/getAdvancedSearch";
import { useCache } from "@/stores/cache";
import type HeroType from "@/types/hero";
import type CharactersType from "@/types/characters";
import type { ValidateQueryType } from '@/utilitis/validateQuery';

export const useCharactersStore = defineStore("characters", () => {
  type FilterValuesType = keyof typeof dropdownObject.value;

  const cacheStore = useCache();
  const { cache, notifies } = storeToRefs(cacheStore);

  const dropdownObject = ref({
    name: "Name",
    status: "Status",
    species: "Species",
    type: "Type",
    gender: "Gender",
    id: "ID",
  });
  const dropdownLabels = Object.values(dropdownObject.value);

  const selectedDropdownValue = ref<FilterValuesType>("name");

  const baseUrl = "https://rickandmortyapi.com/api/character";
  const maxPages = ref(1);
  const pickedPageNumber = ref(1)
  const searchString = ref("");

  const characters = ref<CharactersType | "error">("error");
  const favorites = ref<HeroType[]>([]);
  const favID = computed(() => favorites.value?.map(({ id }) => Number(id)));

  const isLoading = ref(false);
  const changeViewElement = ref<HTMLElement | null>(null); // <- this is used to grab

  onBeforeMount(() => {
    const favoritesData = localStorage.getItem("rickmortfavs");
    if (favoritesData) {
      favorites.value = JSON.parse(favoritesData);
    }
  });

  function handleFavorites(item: HeroType) {
    let isFav = false;
    favorites.value?.forEach((hero, index) => {
      if (hero.id == item.id) {
        favorites.value?.splice(index, 1);
        isFav = true;
      }
    });
    if (!isFav) {
      favorites.value?.push(item);
    }
    localStorage.setItem("rickmortfavs", JSON.stringify(favorites.value));
  }

  async function getData(pageNumber: number) {
    pickedPageNumber.value = pageNumber;
    isLoading.value = true;
    const searchParams = {
      page: `${pageNumber}`,
    };
    let newUrl: string;
    const query = new URLSearchParams(searchParams).toString();
    if (searchString.value) {
      newUrl = `${baseUrl}/?${query}&${selectedDropdownValue.value.toLowerCase()}=${searchString.value
        }`;
    } else {
      newUrl = `${baseUrl}/?${query}`;
    }
    if (
      Object.keys(cache.value).includes(query) &&
      Object.keys(cache.value).length
    ) {
      characters.value = cache.value[query];
    } else {
      characters.value = await getPage(newUrl);
    }
    if (characters.value === "error") {
      notifies.value.unshift([
        "error",
        "an error has occurred, please contact your application administrator!",
      ]);
      isLoading.value = false;
    } else if (characters.value) {
      cacheStore.addCache(query, characters.value);
      maxPages.value = characters.value.info.pages;
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    }
  }

  async function search(filter: string, value: string, pageNum?: number) {
    isLoading.value = true;
    let searchParams: { [key: string]: string }
    if (pageNum) {
      pickedPageNumber.value = pageNum;
      searchParams = {
        page: `${pageNum}`,
        filter: value
      };
    } else {
      pickedPageNumber.value = 1;
      searchParams = {
        filter: value
      };
    }
    const query = new URLSearchParams(searchParams).toString();
    let data: CharactersType | "error";
    if (Object.keys(cache.value).includes(query)) {
      data = cache.value[query];
    } else {
      data = await getSearched(filter, value, pageNum);
    }
    if (data === "error") {
      notifies.value.unshift([
        "error",
        "an error has occurred, please contact your application administrator!",
      ]);
      isLoading.value = false;
    } else if (data) {
      characters.value = data;
      cacheStore.addCache(query, characters.value);
      if (characters.value) {
        maxPages.value = characters.value.info.pages;
      }
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    } else {
      (characters.value as CharactersType).results = [];
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    }
  }

  async function advancedSearch(filters: ValidateQueryType, pageNum: number) {
    pickedPageNumber.value = pageNum;
    isLoading.value = true;
    let searchParams: { [key: string]: string } = {
      page: `${pageNum}`,
      ...filters
    };

    const query = new URLSearchParams(searchParams).toString();
    let data: CharactersType | "error";
    if (Object.keys(cache.value).includes(query)) {
      data = cache.value[query];
    } else {
      data = await getAdvancedSearch(filters, pageNum);
    }
    if (data === "error") {
      notifies.value.unshift([
        "error",
        "an error has occurred, please contact your application administrator!",
      ]);
      isLoading.value = false;
    } else if (data) {
      characters.value = data;
      cacheStore.addCache(query, characters.value);
      if (characters.value) {
        maxPages.value = characters.value.info.pages;
      }
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    } else {
      (characters.value as CharactersType).results = [];
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    }
  }

  return {
    characters,
    getData,
    handleFavorites,
    favorites,
    favID,
    search,
    dropdownObject,
    searchString,
    maxPages,
    advancedSearch,
    isLoading,
    changeViewElement,
    selectedDropdownValue,
    dropdownLabels,
    pickedPageNumber
  };
});
