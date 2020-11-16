// export function getTotalFromCart (state, getters) {
//   return getters.getCart.reduce(
//     (total, current) => total + current.product.price * current.quantity,
//     0
//   )
// }

export function getTotalFromCart (state, getters) {
  return state.cart.total
}

export function getCart (state, getters, rootState) {
  return state.cart.invoice_products.map(item => {
    const product = rootState.product.products.find(
      producto => producto.id === item.product.id
    )

    return {
      product: product,
      quantity: item.quantity,
      totalItem: product.price * item.quantity
    }
  })
}

export function getInvoiceProducts (state, getters) {
  return state.cart.invoice_products;
}
