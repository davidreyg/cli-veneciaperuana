export function addItemQuantity (state, { item, billDetail }) {
  item.quantity += parseInt(billDetail.quantity)
  state.cart.total += parseInt(billDetail.total)
  item.total += billDetail.total
}

export function addItemToCart (state, { item, bill, billDetail }) {
  state.cart.notes = bill.notes
  state.cart.sub_total = bill.sub_total
  state.cart.user_id = bill.user_id
  state.cart.tax = bill.tax
  state.cart.bill_details.push({
    item,
    name: billDetail.name,
    description: billDetail.description,
    purchase_price: billDetail.formatedPrice,
    selling_price: billDetail.selling_price,
    minimal_stock: billDetail.minimal_stock,
    code: billDetail.code,
    total: billDetail.total,
    quantity: parseInt(billDetail.quantity),
    billable_id: billDetail.billable_id,
    billable_type: billDetail.billable_type,
    provider_id: billDetail.provider_id,
  })

  state.cart.total += parseInt(billDetail.total)
}

export function createBillHeader (state, { billHeader }) {
  state.cart.notes = billHeader.notes
  state.cart.sub_total = billHeader.sub_total
  state.cart.tax = billHeader.tax
  state.cart.user_id = billHeader.user_id
}

export function deleteItemFromCart (state, itemId) {
  console.log(itemId);
  const deletedItem = state.cart.bill_details.splice(itemId, 1)
  state.cart.total -= parseInt(deletedItem[0].total)
}

export function cleanCart (state) {
  state.cart.bill_details = []
}

export function SET_ITEMS (state, items) {
  state.items = items
}
