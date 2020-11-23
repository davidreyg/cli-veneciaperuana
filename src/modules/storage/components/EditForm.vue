<template>
  <PageLayout>
    <div
      slot="pageTitle"
      class="text-h6"
      v-html="$t('storages.storage_edit')"
    ></div>
    <div
      slot="pageSubTitle"
      class="text-subtitle3"
      v-html="$t('general.form_subtitle')"
    >
      Los campos con (*) son obligatorios
    </div>
    <div slot="pageOptions"></div>
    <slot>
      <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
        <form @submit.prevent="passes(updateStorageItem)" class="row">
          <div class="col-md-7 col-xs-12 col-sm-8">
            <div class="row">
              <div class="col-12">
                <ValidationProvider
                  rules="required|min:4"
                  :name="$t('form_general.name')"
                  v-slot="{ errors, invalid, validated }"
                >
                  <q-input
                    v-model="name"
                    dense
                    outlined
                    disable
                    readonly
                    color="blue-grey-10"
                    type="text"
                    :label="$t('form_general.name') + ' (*)'"
                    :error="invalid && validated"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <div class="col-12">
                <ValidationProvider
                  rules="min: 3|max: 100"
                  :name="$t('form_general.description')"
                  v-slot="{ errors, invalid, validated }"
                >
                  <q-input
                    v-model="description"
                    dense
                    disable
                    readonly
                    outlined
                    color="blue-grey-10"
                    type="text"
                    :label="$t('form_general.description')"
                    :error="invalid && validated"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12  q-pr-md-xs q-pr-sm-xs ">
                <ValidationProvider
                  rules="required|numeric"
                  name="stock"
                  v-slot="{ errors, invalid, validated }"
                >
                  <q-input
                    v-model="quantity"
                    dense
                    disable
                    readonly
                    outlined
                    type="text"
                    label="Stock"
                    :error="invalid && validated"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12 q-pl-md-xs q-pl-sm-xs ">
                <ValidationProvider
                  rules="required"
                  :name="$t('form_general.purchase_price')"
                  v-slot="{ errors, invalid, validated }"
                >
                  <q-input
                    v-currency
                    ref="purchase_price"
                    v-model="purchase_price"
                    dense
                    disable
                    readonly
                    outlined
                    type="text"
                    :label="$t('form_general.purchase_price')"
                    :error="invalid && validated"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12 q-pr-md-xs q-pr-sm-xs ">
                <ValidationProvider
                  rules="required"
                  :name="$t('form_general.selling_price')"
                  v-slot="{ errors, invalid, validated }"
                >
                  <q-input
                    v-currency
                    v-model="selling_price"
                    dense
                    outlined
                    ref="selling_price"
                    color="blue-grey-10"
                    type="text"
                    :label="$t('form_general.selling_price')"
                    :error="invalid && validated"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12 q-pl-md-xs q-pl-sm-xs">
                <ValidationProvider
                  rules="required|numeric"
                  :name="$t('form_general.minimal_stock')"
                  v-slot="{ errors, invalid, validated }"
                >
                  <q-input
                    v-model="minimal_stock"
                    dense
                    outlined
                    ref="minimal_stock"
                    color="blue-grey-10"
                    type="text"
                    :label="$t('form_general.minimal_stock')"
                    :error="invalid && validated"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <div class="col-12">
                <div class="row justify-around items-center">
                  <div class="col-4">
                    <q-btn
                      class="full-width"
                      type="submit"
                      :label="$t('general.update')"
                      :color="invalid ? 'grey' : 'primary'"
                    />
                  </div>
                  <div class="col-4">
                    <q-btn
                      class="full-width"
                      type="button"
                      color="negative"
                      :label="$t('general.cancel')"
                      @click="cancelAction"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </slot>
  </PageLayout>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { mapActions, mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import { setValue } from 'vue-currency-input'
import PageLayout from 'core/components/PageLayout'
const { mapFields } = createHelpers({
  getterType: 'storage/getStorageField',
  mutationType: 'storage/updateStorageField'
})

export default {
  name: 'EditForm',
  components: { ValidationObserver, PageLayout },
  data() {
    return {
      avatar: null,
      categoriaOptions: null
    }
  },
  async beforeMount() {
    this.purchase_price = ''
    this.selling_price = ''
    this.gain = ''
    await this.fetchOneItem(this.$route.params.id).then(() => {
      setValue(this.$refs.purchase_price.$refs.input, this.purchase_price)
      setValue(this.$refs.selling_price.$refs.input, this.selling_price)
    })
  },
  methods: {
    ...mapActions('storage', {
      fetchOneItem: 'fetchOneItem',
      actualizarStorage: 'updateStorage',
      limpiarStorage: 'emptySelectedItem'
    }),
    updateStorageItem() {
      this.status = 'V'
      this.purchase_price = this.$parseCurrency(this.purchase_price)
      this.selling_price = this.$parseCurrency(this.selling_price)
      this.actualizarStorage(this.storage)
        .then(() => {
          this.$router.go(-1)
        })
        .catch(err => {
          alert('algo salio mal')
        })
    },
    cancelAction() {
      this.$router.go(-1)
      setTimeout(() => {
        this.limpiarStorage()
      }, 300)
    }
  },
  computed: {
    ...mapGetters('storage', { storage: 'getStorage' }),
    // ...mapGetters('category', { categories: 'getCategories' }),
    ...mapFields([
      'name',
      'description',
      'quantity',
      'purchase_price',
      'code',
      'minimal_stock',
      'selling_price',
      'status'
    ])
  }
}
</script>
