import { ServiceFactory } from 'core/services/ServiceFactory'
const CategoryService = ServiceFactory.get('categories')

export async function fetchCategories ({ commit }) {
  await CategoryService.get()
    .then(categorias => {
      // console.log(categorias.data);
      commit('SET_CATEGORIES', categorias.data.data)
    })
    .catch(err => {
      console.error(err)
    })
}

export async function fetchOneCategory (context, payload) {
  return await CategoryService.getOne(payload)
    .then(categoria => {
      // console.log(categoria);
      context.commit('SET_CATEGORY', categoria.data)
    })
    .catch(err => {
      console.error(err)
    })
}

export async function storeCategory (context, payload) {
  return await CategoryService.create(payload)
    .then(() => {
      context.dispatch('fetchCategories')
      // context.dispatch('openModalCrear', false)
    })
}

export async function updateCategory (context, category) {
  return await CategoryService.update(category, category.id)
    .then(() => {
      // console.log(res)
      context.dispatch('fetchCategories')
      context.commit('SET_CATEGORY', {})
    })
}

export async function deleteCategory (context, payload) {
  return await CategoryService.destroy(payload).then(res => {
    // console.log(res)

    context.dispatch('fetchCategories')
  })
}
