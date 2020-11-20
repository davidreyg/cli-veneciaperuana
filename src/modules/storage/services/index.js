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
  update (storage) {
    // console.log(storage)
    return Service.put(`${resource}/${storage.id}`, storage)
  },
  // destroy (storage) {
  //   return Service.delete(`${resource}/${storage}`)
  // }
}
