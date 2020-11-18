import { updateField } from 'vuex-map-fields'
import defaultState from './state'

export function SET_INGREDIENTS (state, ingredients) {
  state.ingredients = ingredients
}
export function SET_INGREDIENT (state, ingredient) {
  state.ingredient = ingredient
}

export function updateProductField (state, field) {
  updateField(state.ingredient, field)
}

export function RESET_INGREDIENT_STATE (state) {
  Object.assign(state, defaultState())
}

