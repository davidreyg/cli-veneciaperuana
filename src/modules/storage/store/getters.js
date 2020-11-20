import { getField } from 'vuex-map-fields'

export function getStorages (state) {
  let self = this
  return (condition) => {
    if (condition) {
      return state.storages.filter(item => item.status === condition)
    }
    return state.storages
  }
}
export function getStorage (state) {
  return state.storage
}

export function getStorageItemsWithStock (state) {
  return state.storages.filter(item => item.quantity > 0)
}
export function getStorageField (state) {
  return getField(state.storage)
}
