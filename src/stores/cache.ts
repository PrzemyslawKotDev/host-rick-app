import { defineStore } from "pinia"
import { ref } from "vue"
import type CharactersType from "@/types/characters";

type CacheType = {
  [key: string]: CharactersType
}
export const useCache = defineStore("cache", () => {

  const cache = ref<CacheType>({});
  const notifies = ref<[string, string][]>([])

  function addCache(query: string, response: CharactersType) {
    cache.value = {
      ...cache.value,
      [query]: response
    }
  }
  return { notifies, cache, addCache }
})