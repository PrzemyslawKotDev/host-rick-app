import type { LocationQuery } from "vue-router";

export type FilterType = typeof filterOptions[number];
export type ParamsType = {
    [key in FilterType]?: string;
}

type ValidateQueryType = {
    validParams: ParamsType;
    unusedParams: ParamsType;
}

const filterOptions = ["name", "status", "species", "type", "gender"] as const;

export function validateQuery(params: LocationQuery): ValidateQueryType {
    const queryEntries = Object.entries(params);
    const validParams = queryEntries.reduce(
        (acumulator, [key, value]) => ({
            ...acumulator,
            ...(value && filterOptions.includes(key as FilterType) && { [key]: value }),
        }),
        {}
    );
    const unusedParams = queryEntries.reduce(
        (acumulator, [key, value]) => ({
            ...acumulator,
            ...(value && !filterOptions.includes(key as FilterType) && { [key]: value }),
        }),
        {}
    );
    return {
        validParams: validParams,
        unusedParams: unusedParams
    }
}