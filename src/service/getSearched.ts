import axios from "axios";

const getSearched = async (filter: string, value: string, page?: number) => {
  let url = "https://rickandmortyapi.com/api/character/?";
  if (page && page > 1) {
    url = url + `page=${page}&`
  }
  if (filter === "id") {
    url = url + value;
  } else {
    url = url + `${filter}=${value}`;
  }
  try {
    let data;
    let heroes;
    const response = await axios.get(url);
    if (response.data.length > 1) {
      heroes = response.data
    } else {
      heroes = [response.data]
    }
    if (!response.data.info) {
      data = {
        info: {
          count: 1,
          pages: 1,
          next: null,
          prev: null
        },
        results: heroes
      }
    } else {
      data = response.data
    }
    return data;
  } catch (err: any) {
    return "error"
  }
};
export default getSearched;
