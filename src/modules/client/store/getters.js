import { getField } from 'vuex-map-fields'

export function getClients(state) {
  return state.clients
}
export function getClient(state) {
  return state.client
}

export function getClientField(state) {
  return getField(state.client)
}
