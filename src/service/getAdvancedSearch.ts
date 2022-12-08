import { createClient } from "villus";

async function getAdvancedSearch(filters: any, pageNum: number) {
  const client = createClient({
    url: "https://rickandmortyapi.com/graphql",
  });
  try {
    const response = await client
      .executeQuery({
        query: `query ($filterValue: FilterCharacter, $page: Int) {
characters(page: $page, filter: $filterValue) {
  info {
    count
    pages
    next
    prev
  }
  results {
    id
    name
    status
    species
    type
    gender
    origin{
      name
    }
    location{
      name
    }
    image
    created
  }
}
}`,
        variables: {
          filterValue: filters,
          page: pageNum
        },
      })
    return response.data.characters;
  } catch (err) {
    return "error"
  }
}
export default getAdvancedSearch;
