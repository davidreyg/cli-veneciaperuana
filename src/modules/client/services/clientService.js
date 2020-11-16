import Service from 'core/services/Service'
const resource = '/api/clients'
export default {
  get () {
    return Service.get(`${resource}`)
  },

  getOne (clientId) {
    return Service.get(`${resource}/${clientId}`)
  },

  create (client) {
    return Service.post(`${resource}`, client)
  },
  update (clientFormData) {
    // console.log(clientFormData)
    return Service.post(`${resource}/${clientFormData.get('id')}`, clientFormData)
  },
  destroy (client) {
    return Service.delete(`${resource}/${client}`)
  }
}
