import { ServiceFactory } from 'core/services/ServiceFactory'
const ProviderService = ServiceFactory.get('providers')

export async function fetchProviders ({ commit }) {
  return await ProviderService.get()
    .then(providers => {
      // console.log(products.data);
      commit('SET_PROVIDERS', providers.data.data)
    })
}

export async function fetchOneProvider (context, provider) {
  return await ProviderService.getOne(provider)
    .then(provider => {
      // console.log(product);
      context.commit('SET_PROVIDER', provider.data)
    })
}

// export async function storeIngredient (context, ingredient) {
//   return await ProviderService.create(ingredient)
//     .then(() => {
//       context.dispatch('fetchProviders')
//       // context.dispatch('openModalCrear', false)
//     })
// }

// export async function updateIngredient (context, ingredient) {
//   return await ProviderService.update(ingredient)
//     .then(() => {
//       context.dispatch('emptySelectedIngredient')
//       context.dispatch('fetchProviders')
//       // context.dispatch('openModalCrear', false)
//     })
// }

// export async function emptySelectedIngredient (context) {
//   await context.commit('SET_PROVIDER', {})
// }

// export async function deleteIngredient (context, ingredient) {
//   return await ProviderService.destroy(ingredient).then(() => {
//     // console.log(res)
//     context.dispatch('fetchProviders')
//   })
// }

// export async function resetState ({ commit }) {
//   return await commit('RESET_PROVIDER_STATE')
// }
