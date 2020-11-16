import { updateField } from 'vuex-map-fields'
import defaultState from './state'

export function SET_CATEGORIES (state, categories) {
  state.categories = categories
}
export function SET_CATEGORY (state, category) {
  state.category = category
}

export function updateCategoryField (state, field) {
  updateField(state.category, field)
}

export function RESET_CATEGORY_STATE (state) {
  Object.assign(state, defaultState())
}
