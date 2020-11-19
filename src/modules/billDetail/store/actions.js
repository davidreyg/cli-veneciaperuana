import { ServiceFactory } from 'core/services/ServiceFactory'
const BillDetailService = ServiceFactory.get('billDetails')

export async function fetchItemsFromStorage (context) {
  return await BillDetailService.getItemsFromStorage()
    .then(items => {
      // console.log(items.data);
      context.commit('SET_ITEMS', items.data)
    })
}

export async function fetchOneIngredient (context, ingredient) {
  return await BillDetailService.getOne(ingredient)
    .then(ingredient => {
      // console.log(product);
      // context.commit('SET_INGREDIENT', ingredient.data)
    })
}

export async function addItemToCart (context, { product, bill, billDetail, formatedPurchasePrice }) {
  // if (product.stock === 0) return

  const item = context.state.cart.bill_details.find(item => item.item.code === product.code)
  if (item) {
    await context.commit('addItemQuantity', { item, billDetail })
  } else {
    context.commit('addItemToCart', { item: product, bill, billDetail, formatedPurchasePrice })
  }
  // context.commit('decrementProductInventory', { producto, quantity })
}
export async function deleteItemFromCart (context, itemId) {
  context.commit('deleteItemFromCart', itemId)
}

export async function storeBillDetails (context, { billHeader }) {
  // console.log(billHeader);
  context.commit('createBillHeader', { billHeader })
  const invoice = context.state.cart
  console.log(invoice);
  await BillDetailService.create(invoice)
    .then((data) => {
      console.log(data.data);
      // context.dispatch('fetchinvoiceProducts')
      // context.dispatch('openModalCrear', false)
    })
}
