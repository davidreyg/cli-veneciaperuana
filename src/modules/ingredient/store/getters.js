import { getField } from 'vuex-map-fields'

export function getIngredients (state) {
  return state.ingredients
}
export function getIngredient (state) {
  return state.ingredient
}

export function getIngredientField (state) {
  return getField(state.ingredient)
}
