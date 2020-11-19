
export function getTotalFromCart (state) {
  return state.cart.total
}

export function getCart (state, getters, rootState) {
  return state.cart.bill_details.map(item => {
    // const product = rootState.product.products.find(
    //   producto => producto.code === item.item.itemCode
    // )
    return {
      product: item.item,
      quantity: item.quantity,
      price: item.price,
      totalItem: item.price * item.quantity
    }
  })
}

export function getInvoiceProducts (state) {
  return state.cart.bill_details;
}

export function getItems (state) {
  return state.items
}
