import { updateField } from 'vuex-map-fields'
import defaultState from './state'

export function SET_PRODUCTS (state, products) {
  state.products = products
}
export function SET_PRODUCT (state, product) {
  state.product = product
}

export function updateProductField (state, field) {
  updateField(state.product, field)
}

export function RESET_PRODUCT_STATE (state) {
  Object.assign(state, defaultState())
}

