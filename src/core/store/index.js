import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import mutations from './mutations.js'
import actions from './actions'

//ONBOARD
import userProfile from './onBoard/profileSetting'

//CATEGORIES
import category from 'modules/category/store'
// * PRODUCTS
import product from 'src/modules/product/store'
//CLIENTS
import client from 'modules/client/store'
//INVOICE PRODUCTS
import invoiceProduct from 'modules/invoiceProduct/store'
//COMPANIES
import company from 'modules/company/store'
//INGREDIENTS
import ingredient from 'modules/ingredient/store'
//PROVIDER
import provider from 'modules/provider/store'
//PROVIDER
import billDetail from 'modules/billDetail/store'
//STORAGE
import storage from 'modules/storage/store'
//SETTINGS/Preferences
import preferences from './settings/preferences'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      isAppLoaded: false,
      token: localStorage.getItem('token_API_FACTURACION')
    },
    getters,
    mutations,
    actions,
    modules: {
      userProfile,
      category,
      product,
      client,
      invoiceProduct,
      company,
      ingredient,
      provider,
      billDetail,
      storage,
      preferences
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
