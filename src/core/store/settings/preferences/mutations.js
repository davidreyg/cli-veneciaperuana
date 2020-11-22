import * as types from './mutation-types'
import * as vuei18n from 'boot/i18n'
import { localize } from 'vee-validate'
export default {
  [types.SET_MOMENT_DATE_FORMAT] (state, dateFormat) {
    state.momentDateFormat = dateFormat
  },
  [types.SET_LANGUAGE_FORMAT] (state, language) {
    vuei18n.i18n.locale = language
    localize(language)
  }
}
