import Service from 'core/services/Service'
const resource = '/api/categories'
export default {
  async get () {
    return await Service.get(`${resource}`)
  },

  getOne (categoryId) {
    return Service.get(`${resource}/${categoryId}`)
  },

  async create (category) {
    return await Service.post(`${resource}`, category)
  },
  update (category, categoryId) {
    return Service.put(`${resource}/${categoryId}`, category)
  },

  destroy (categoryId) {
    return Service.delete(`${resource}/${categoryId}`)
  }
}
