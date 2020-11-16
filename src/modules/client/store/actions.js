import { ServiceFactory } from 'core/services/ServiceFactory'
const ClientService = ServiceFactory.get('clients')

export async function fetchClients({ commit }) {
  await ClientService.get()
    .then(clients => {
      // console.log(clients.data);
      commit('SET_CLIENTS', clients.data.data)
    })
    .catch(err => {
      console.error(err)
    })
}

// export async function fetchOneProduct(context, payload) {
//   await ProductService.getOne(payload)
//     .then(product => {
//       // console.log(product);
//       context.commit('SET_PRODUCT', product.data)
//     })
//     .catch(err => {
//       console.error(err)
//     })
// }

// export async function storeProduct(context, payload) {
//   return await ProductService.create(payload)
//     .then(() => {
//       // context.dispatch('fetchProducts')
//       // context.dispatch('openModalCrear', false)
//     })
//     .catch(err => {
//       console.error(err)
//     })
// }

// export async function updateProduct(context, productFormData) {
//   return await ProductService.update(productFormData)

// }

// export async function emptySelectedProduct(context, payload) {
//     await context.commit('SET_PRODUCT', {})
// }

// export async function deleteProduct(context, payload) {
//   return await ProductService.destroy(payload).then(res => {
//     // console.log(res)

//     context.dispatch('fetchProducts')
//   })
// }
