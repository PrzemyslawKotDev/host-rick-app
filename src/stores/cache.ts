import { defineStore } from "pinia"
import { ref } from "vue"
import type CharactersType from "@/types/characters";
import getUniqueId from "@/utilitis/getUniqueId";

type CacheType = {
  [key: string]: CharactersType
}
type NotifiesType = {
  type: string;
  message: string;
  id: string
}

export const useCharactersCache = defineStore("charactersCache", () => {

  const charactersCache = ref<CacheType>({});
  const charactersNotifies = ref<NotifiesType[]>([])

  function addNotification(notifyData: [string, string]): void {
    charactersNotifies.value.unshift({
      id: getUniqueId(),
      type: notifyData[0],
      message: notifyData[1]
    })
  }

  function addCharactersCache(query: string, response: CharactersType): void {
    charactersCache.value[query] = response;
  }

  return { charactersNotifies, charactersCache, addCharactersCache, addNotification }
})