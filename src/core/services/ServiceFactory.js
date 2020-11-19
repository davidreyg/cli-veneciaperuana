import CategoryService from 'modules/category/services/categoryService'
import ProductService from 'src/modules/product/services/productService'
import ClientService from 'modules/client/services/clientService'
import InvoiceProductService from 'src/modules/invoiceProduct/services/invoiceProductService'
import IngredientService from 'src/modules/ingredient/services'
import ProviderService from 'src/modules/provider/services'
import BillDetailService from 'src/modules/billDetail/services'
import StorageService from 'src/modules/storage/services'
const services = {
  categories: CategoryService,
  products: ProductService,
  clients: ClientService,
  invoiceProducts: InvoiceProductService,
  ingredients: IngredientService,
  providers: ProviderService,
  billDetails: BillDetailService,
  storages: StorageService,
  // other repositories ...
}

export const ServiceFactory = {
  get: name => services[name]
}
