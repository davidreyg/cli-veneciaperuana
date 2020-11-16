export function addProductQuantity (state, { item, invoiceProduct }) {
  item.quantity += parseInt(invoiceProduct.quantity)
  state.cart.total += parseInt(invoiceProduct.total)
  item.total += invoiceProduct.total
}

export function addProductsToCart (state, { product, invoice, invoiceProduct }) {
  state.cart.notes = invoice.notes
  state.cart.sub_total = invoice.sub_total
  state.cart.user_id = invoice.user_id
  state.cart.tax = invoice.tax
  state.cart.client_id = invoice.client_id
  state.cart.invoice_products.push({
    product,
    quantity: parseInt(invoiceProduct.quantity),
    product_id: invoiceProduct.product_id,
    price: invoiceProduct.price,
    total: invoiceProduct.total,
    description: invoiceProduct.description,
    name: invoiceProduct.name
  })

  state.cart.total += parseInt(invoiceProduct.total)
}

export function createInvoiceHeader (state, { invoiceHeader }) {
  state.cart.notes = invoiceHeader.notes
  state.cart.sub_total = invoiceHeader.sub_total
  state.cart.tax = invoiceHeader.tax
  state.cart.user_id = invoiceHeader.user_id
  state.cart.client_id = invoiceHeader.client_id
}

export function deleteProductFromCart (state, productoId) {
  const deletedItem = state.cart.invoice_products.splice(productoId, 1)
  state.cart.total -= parseInt(deletedItem[0].total)
}

export function cleanCart (state) {
  state.cart.invoice_products = []
}
