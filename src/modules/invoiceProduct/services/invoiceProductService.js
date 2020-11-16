import Service from 'core/services/Service'
const resource = '/api/invoices'
export default {
  create (invoice) {
    return Service.post(`${resource}/createDetail`, invoice)
  }
}
