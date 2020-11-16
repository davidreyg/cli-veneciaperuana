import Service from 'core/services/Service'
const resource = '/api/products'
export default {
  get () {
    return Service.get(`${resource}`)
  },

  getOne (productId) {
    return Service.get(`${resource}/${productId}`)
  },

  create (product) {
    return Service.post(`${resource}`, product)
  },
  update (productFormData) {
    // console.log(productFormData)
    return Service.post(`${resource}/${productFormData.get('id')}`, productFormData)
  },
  destroy (product) {
    return Service.delete(`${resource}/${product}`)
  }
}
