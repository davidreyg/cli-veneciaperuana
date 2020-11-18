import * as VueCurrencyInput from 'vue-currency-input'

export function clearDetailAndItemInputs ({ detail, item }) {
  item = null
  detail.minimal_stock = null
  detail.purchase_price = null
  detail.selling_price = ''
  detail.description = null
  detail.stock = null
  detail.total = 0
  detail.quantity = null
  detail.billable_id = null
}

export function calculateTotalOfDetail ({ quantity, purchase_price }) {
  return quantity * purchase_price
};

// export function disable ({ detail, item }) {
//   item = null
//   detail.minimal_stock = null
//   detail.purchase_price = null
//   detail.selling_price = ''
//   detail.description = null
//   detail.stock = null
//   detail.total = 0
//   detail.quantity = null
//   detail.billable_id = null
// }
