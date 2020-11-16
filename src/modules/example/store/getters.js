import { getField } from 'vuex-map-fields'

export function getProducts(state) {
  return state.products
}
export function getProduct(state) {
  return state.product
}

export function getProductField(state) {
  return getField(state.product)
}
