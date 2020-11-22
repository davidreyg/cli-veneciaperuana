import Ls from 'core/services/ls'
import defaultState from './state'

export function BOOTSTRAP_COMPANIES (state, companies) {
  state.companies = companies
  state.selectedCompany = companies[0]
}
export function SET_SELECTED_COMPANY (state, userCompany) {
  Ls.set('selectedCompany', userCompany)
  state.selectedCompany = userCompany
}

export function RESET_COMPANY_STATE (state) {
  Ls.remove('selectedCompany')
  Object.assign(state, defaultState())
}
