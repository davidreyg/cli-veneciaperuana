export async function clearDetailAndItemInputs ({ detail }) {
  detail.minimal_stock = null
  detail.price = null
  detail.selling_price = ''
  detail.description = null
  detail.stock = null
  detail.total = 0
  detail.quantity = null
  detail.billable_id = null
}

export function calculateTotalOfDetail ({ quantity, price }) {
  return quantity * price
};

export async function showItemDetails ({ detail, item, formDetails }) {
  if (item) {
    detail.name = item.name
    detail.description = item.description
    formDetails.stock = item.quantity
    detail.billable_id = item.storageable_id
    detail.billable_type = item.storageable_type
    detail.code = item.code
    return true;
  } else {
    console.log('no hay nada')
    detail.name = null
    detail.description = null
    formDetails.stock = null
    detail.code = null
    detail.price = 0
    detail.total = 0
    detail.quantity = null
    detail.billable_id = null
    detail.billable_type = null
    return false;
  }
}

export function showProviderDetails ({ detail, provider, formDetails }) {
  if (provider) {
    detail.provider_id = provider.id
    formDetails.providerAlias = provider.alias
  } else {
    console.log('no hay nada')
    formDetails.providerAlias = null
    detail.provider_id = null
  }
};

