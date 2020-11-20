<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Actualizar Producto</div>
      <div class="text-subtitle3">Los campos con (*) son obligatorios</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="collumn col-12 full-width">
      <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
        <form @submit.prevent="passes(updateStorageItem)">
          <div class="row">
            <div class="col-xs-12 col-sm-6 q-px-xs">
              <ValidationProvider
                rules="required|min:4"
                name="nombre"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="name"
                  dense
                  outlined
                  disable
                  readonly
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                  color="blue-grey-10"
                  type="text"
                  label="Nombre (*)"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col-xs-12 col-sm-6 q-px-xs">
              <ValidationProvider
                rules="min: 3|max: 100"
                name="descripcion"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="description"
                  dense
                  disable
                  readonly
                  outlined
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                  color="blue-grey-10"
                  type="text"
                  label="Descripcion"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-6 q-px-xs ">
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
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                  color="blue-grey-10"
                  type="text"
                  label="Stock"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-6 q-px-xs ">
              <ValidationProvider
                rules="required"
                name="precio de compra"
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
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                  color="blue-grey-10"
                  type="text"
                  label="P. Compra"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-6 q-px-xs ">
              <ValidationProvider
                rules="required"
                name="precio de venta"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-currency
                  v-model="selling_price"
                  dense
                  outlined
                  ref="selling_price"
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                  color="blue-grey-10"
                  type="text"
                  label="P. Venta"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-6 q-px-xs ">
              <ValidationProvider
                rules="required|numeric"
                name="stock minimo"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="minimal_stock"
                  dense
                  outlined
                  ref="minimal_stock"
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                  color="blue-grey-10"
                  type="text"
                  label="Stock Mínimo"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="row justify-center items-center fit q-gutter-md">
              <div class="col-5">
                <q-btn
                  class="q-mt-md full-width"
                  type="submit"
                  label="Actualizar"
                  :color="invalid ? 'grey' : 'primary'"
                />
              </div>
              <div class="col-5">
                <q-btn
                  class="q-mt-md full-width"
                  type="button"
                  color="negative"
                  label="Cancelar"
                  @click="$router.go(-1)"
                />
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </q-card-section>
  </q-card>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { mapActions, mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import { setValue } from 'vue-currency-input'
const { mapFields } = createHelpers({
  getterType: 'storage/getStorageField',
  mutationType: 'storage/updateStorageField'
})

export default {
  name: 'EditForm',
  components: { ValidationObserver },
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
      actualizarStorage: 'updateStorage'
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
