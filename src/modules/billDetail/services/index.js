import Service from 'core/services/Service'
const resource = '/api/bills'
export default {
  create (bill) {
    return Service.post(`${resource}/createDetail`, bill)
  },
  getItemsFromStorage () {
    return Service.get(`/api/storages`)
  },
  getOneItemFromStorage (storageItem) {
    return Service.get(`/api/storageItems/${storageItem}`)
  }
}
