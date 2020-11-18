import Service from 'core/services/Service'
const resource = '/api/providers'
export default {
  get () {
    return Service.get(`${resource}`)
  },

  getOne (providerId) {
    return Service.get(`${resource}/${providerId}`)
  },

  create (provider) {
    return Service.post(`${resource}`, provider)
  },
  update (providerData, providerId) {
    // console.log(providerData)
    return Service.post(`${resource}/${providerId}`, providerData)
  },
  destroy (providerId) {
    return Service.delete(`${resource}/${providerId}`)
  }
}
