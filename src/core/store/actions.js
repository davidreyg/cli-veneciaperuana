import Service from '../services/Service'

export default {
  bootstrap (context) {
    return new Promise((resolve, reject) => {
      Service.get('/api/bootstrap').then((response) => {
        context.commit('company/BOOTSTRAP_COMPANIES', response.data.companies)
        context.commit('company/SET_SELECTED_COMPANY', response.data.company)
        // commit('currency/' + currencyTypes.BOOTSTRAP_CURRENCIES, response.data)
        // commit('currency/' + currencyTypes.SET_DEFAULT_CURRENCY, response.data)
        // commit('user/' + userTypes.BOOTSTRAP_CURRENT_USER, response.data.user)
        // commit('taxType/' + taxTypeTypes.BOOTSTRAP_TAX_TYPES, response.data.taxTypes)
        // commit('preferences/' + preferencesTypes.SET_MOMENT_DATE_FORMAT, response.data.moment_date_format)
        // commit('preferences/' + preferencesTypes.SET_LANGUAGE_FORMAT, response.data.default_language)
        // commit('item/' + itemTypes.SET_ITEM_UNITS, response.data.units)
        // commit('payment/' + paymentModes.SET_PAYMENT_MODES, response.data.paymentMethods)
        // commit(types.UPDATE_APP_LOADING_STATUS, true)
        // context.dispatch('resetApp')
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  resetApp (context) {
    return new Promise((resolve, reject) => {
      context.commit('category/RESET_CATEGORY_STATE')
      context.commit('client/RESET_CLIENT_STATE')
      context.commit('product/RESET_PRODUCT_STATE')
      context.commit('company/RESET_COMPANY_STATE')
    }).catch((err) => {
      reject(err)
    })
  }
}
