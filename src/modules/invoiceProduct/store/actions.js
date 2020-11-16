import { ServiceFactory } from 'core/services/ServiceFactory'
const InvoiceProduct = ServiceFactory.get('invoiceProducts')

export async function addProductsToCart (context, { product, invoice, invoiceProduct }) {
  if (product.stock === 0) return
  const item = context.state.cart.invoice_products.find(item => item.product.id === product.id)
  if (item) {
    await context.commit('addProductQuantity', { item, invoiceProduct })
  } else {
    context.commit('addProductsToCart', { product, invoice, invoiceProduct })
  }
  // context.commit('decrementProductInventory', { producto, quantity })
}
export async function deleteProductFromCart (context, productoId) {
  context.commit('deleteProductFromCart', productoId)
}

export async function storeInvoiceProduct (context, { invoiceHeader }) {
  context.commit('createInvoiceHeader', { invoiceHeader })
  const invoice = context.state.cart
  await InvoiceProduct.create(invoice)
    .then((data) => {
      console.log(data.data);
      // context.dispatch('fetchinvoiceProducts')
      // context.dispatch('openModalCrear', false)
    })
    .catch(err => {
      console.error(err)
    })
}
