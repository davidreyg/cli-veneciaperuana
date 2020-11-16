export async function setSelectedCompany ({ commit }, data) {
  await commit('SET_SELECTED_COMPANY', data)
}

export async function resetState ({ commit }) {
  await commit('RESET_COMPANY_STATE')
}
