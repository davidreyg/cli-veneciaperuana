import { updateField } from 'vuex-map-fields'
import defaultState from './state'

export function SET_STORAGES (state, storages) {
  state.storages = storages
}
export function SET_STORAGE (state, storage) {
  state.storage = storage
}

export function updateStorageField (state, field) {
  updateField(state.storage, field)
}

export function RESET_STORAGE_STATE (state) {
  Object.assign(state, defaultState())
}

