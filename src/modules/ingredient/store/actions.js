import { ServiceFactory } from 'core/services/ServiceFactory'
const IngredientService = ServiceFactory.get('ingredients')

export async function fetchIngredients ({ commit }) {
  return await IngredientService.get()
    .then(ingredients => {
      // console.log(products.data);
      commit('SET_INGREDIENTS', ingredients.data.data)
    })
}

export async function fetchOneIngredient (context, ingredient) {
  return await IngredientService.getOne(ingredient)
    .then(ingredient => {
      // console.log(product);
      context.commit('SET_INGREDIENT', ingredient.data)
    })
}

export async function storeIngredient (context, ingredient) {
  return await IngredientService.create(ingredient)
    .then(() => {
      context.dispatch('fetchIngredients')
      // context.dispatch('openModalCrear', false)
    })
}

export async function updateIngredient (context, ingredient) {
  return await IngredientService.update(ingredient)
    .then(() => {
      context.dispatch('emptySelectedIngredient')
      context.dispatch('fetchIngredients')
      // context.dispatch('openModalCrear', false)
    })
}

export async function emptySelectedIngredient (context) {
  await context.commit('SET_INGREDIENT', {})
}

export async function deleteIngredient (context, ingredient) {
  return await IngredientService.destroy(ingredient).then(() => {
    // console.log(res)
    context.dispatch('fetchIngredients')
  })
}

export async function resetState ({ commit }) {
  return await commit('RESET_INGREDIENT_STATE')
}

