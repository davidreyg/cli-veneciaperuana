import { updateField } from 'vuex-map-fields'
import defaultState from './state'

export function SET_PROVIDERS (state, providers) {
  state.providers = providers
}
export function SET_PROVIDER (state, provider) {
  state.provider = provider
}

export function updateProductField (state, field) {
  updateField(state.provider, field)
}

export function RESET_PROVIDER_STATE (state) {
  Object.assign(state, defaultState())
}

