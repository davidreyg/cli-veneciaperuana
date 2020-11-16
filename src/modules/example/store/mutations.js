import { updateField } from 'vuex-map-fields'

export function SET_PRODUCTS(state, products) {
  state.products = products
}
export function SET_PRODUCT(state, product) {
  state.product = product
}

export function updateProductField(state, field) {
  updateField(state.product, field)
}
