import { getField } from 'vuex-map-fields'

export function getStorages (state) {
  return state.storages
}
export function getStorage (state) {
  return state.storage
}

export function getStorageField (state) {
  return getField(state.storage)
}
