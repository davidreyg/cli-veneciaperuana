import { ServiceFactory } from 'core/services/ServiceFactory'
const StorageService = ServiceFactory.get('storages')

export async function fetchStorages ({ commit }) {
  return await StorageService.get()
    .then(storages => {
      // console.log(storages.data);
      commit('SET_STORAGES', storages.data.data)
    })
}

export async function fetchOneItem (context, itemCode) {
  return await StorageService.getOne(itemCode)
    .then(item => {
      // console.log(item);
      context.commit('SET_STORAGE', item.data)
    })
}

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

export async function updateStorage (context, storage) {
  // console.log(storage);
  return await StorageService.update(storage)

}

// export async function emptySelectedProduct(context, payload) {
//     await context.commit('SET_STORAGE', {})
// }

// export async function deleteProduct(context, payload) {
//   return await StorageService.destroy(payload).then(res => {
//     // console.log(res)

//     context.dispatch('fetchStorages')
//   })
// }
