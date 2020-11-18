import Service from 'core/services/Service'
const resource = '/api/ingredients'
export default {
  get () {
    return Service.get(`${resource}`)
  },

  getOne (ingredientId) {
    return Service.get(`${resource}/${ingredientId}`)
  },

  create (ingredient) {
    return Service.post(`${resource}`, ingredient)
  },
  update (ingredient) {
    // console.log(ingredient)
    return Service.post(`${resource}/${ingredient.id}`, ingredient)
  },
  destroy (ingredient) {
    return Service.delete(`${resource}/${ingredient}`)
  }
}
