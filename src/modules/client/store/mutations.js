import { updateField } from 'vuex-map-fields'
import defaultState from './state'

export function SET_CLIENTS (state, clients) {
  state.clients = clients
}
export function SET_CLIENT (state, client) {
  state.client = client
}

export function updateClientField (state, field) {
  updateField(state.client, field)
}

export function RESET_CLIENT_STATE (state) {
  Object.assign(state, defaultState())
}
