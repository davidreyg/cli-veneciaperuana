import CategoryService from 'modules/category/services/categoryService'
import ProductService from 'src/modules/product/services/productService'
import ClientService from 'modules/client/services/clientService'
import InvoiceProductService from 'src/modules/invoiceProduct/services/invoiceProductService'
const services = {
  categories: CategoryService,
  products: ProductService,
  clients: ClientService,
  invoiceProducts: InvoiceProductService
  // other repositories ...
}

export const ServiceFactory = {
  get: name => services[name]
}
