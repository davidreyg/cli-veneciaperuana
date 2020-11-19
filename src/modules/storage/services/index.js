import Service from 'core/services/Service'
const resource = '/api/storages'
export default {
  get () {
    return Service.get(`${resource}`)
  },

  getOne (itemCode) {
    return Service.get(`${resource}/${itemCode}`)
  },

  // create (item) {
  //   return Service.post(`${resource}`, item)
  // },
  update (item, code) {
    // console.log(item)
    return Service.post(`${resource}/${code}`, item)
  },
  // destroy (storage) {
  //   return Service.delete(`${resource}/${storage}`)
  // }
}
