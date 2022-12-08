import type { LocationQuery } from "vue-router";

export type ValidateQueryType = {
    [key in FilterType]?: string;
};
type FilterType = typeof filterOptions[number];
const filterOptions = ["name", "status", "species", "type", "gender", "id"] as const;

export function validateQuery(params: LocationQuery): ValidateQueryType {
    const queryEntries = Object.entries(params);
    return queryEntries.reduce(
        (acumulator: object, [key, value]) => {
            return {
                ...acumulator,
                ...(value && filterOptions.includes(key as FilterType) && { [key]: value }),
            };
        },
        {}
    );
}