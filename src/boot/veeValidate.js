import { ValidationProvider, extend, localize } from 'vee-validate'
// eslint-disable-next-line camelcase
import { required, length, min, max, max_value, numeric, is, email, min_value } from 'vee-validate/dist/rules'
import es from 'vee-validate/dist/locale/es.json'
import en from 'vee-validate/dist/locale/en.json';
import pt_BR from 'vee-validate/dist/locale/pt_BR.json';
import utils from '../core/utils/utilities';


// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default ({ Vue }) => {
  // something to do
  const urlFixRule = (value) => {
    return utils.checkValidUrl(value)
  };
  extend('required', required)
  extend('length', length)
  extend('min', min)
  extend('min_value', min_value)
  extend('max', max)
  extend('numeric', numeric)
  extend('max_value', max_value)
  extend('is', is)
  extend('email', email)
  extend('url', {
    validate: urlFixRule,
  })
  localize({ es, en, pt_BR })
  Vue.component('ValidationProvider', ValidationProvider)
}
