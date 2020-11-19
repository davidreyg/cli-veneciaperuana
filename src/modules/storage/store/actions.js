import { ServiceFactory } from 'core/services/ServiceFactory'
const StorageService = ServiceFactory.get('storages')

export async function fetchStorages ({ commit }) {
  await StorageService.get()
    .then(storages => {
      console.log(storages.data);
      commit('SET_STORAGES', storages.data.data)
    })
}

// export async function fetchOneProduct(context, payload) {
//   await StorageService.getOne(payload)
//     .then(product => {
//       // console.log(product);
//       context.commit('SET_STORAGE', product.data)
//     })
//     .catch(err => {
//       console.error(err)
//     })
// }

// export async function storeProduct(context, payload) {
//   return await StorageService.create(payload)
//     .then(() => {
//       // context.dispatch('fetchStorages')
//       // context.dispatch('openModalCrear', false)
//     })
//     .catch(err => {
//       console.error(err)
//     })
// }

// export async function updateProduct(context, productFormData) {
//   return await StorageService.update(productFormData)

// }

// export async function emptySelectedProduct(context, payload) {
//     await context.commit('SET_STORAGE', {})
// }

// export async function deleteProduct(context, payload) {
//   return await StorageService.destroy(payload).then(res => {
//     // console.log(res)

//     context.dispatch('fetchStorages')
//   })
// }
