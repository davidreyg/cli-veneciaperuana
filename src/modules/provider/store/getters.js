import { getField } from 'vuex-map-fields'

export function getProviders (state) {
  return state.providers
}
export function getProvider (state) {
  return state.provider
}

export function getProviderField (state) {
  return getField(state.provider)
}
