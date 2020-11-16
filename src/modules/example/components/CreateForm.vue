<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Nuevo Producto</div>
      <div class="text-subtitle3">Los campos con (*) son obligatorios</div>
    </q-card-section>

    <q-separator />
    <q-card-section>
      <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
        <form @submit.prevent="passes(crearProducto)">
          <div class="row">
            <div class="col-xs-12 col-sm-6 q-px-xs ">
              <ValidationProvider
                rules="required|min:4 |max:20"
                name="nombre"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="product.name"
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                  dense
                  outlined
                  color="blue-grey-10"
                  type="text"
                  label="Nombre (*)"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col-xs-12 col-sm-6 q-px-xs ">
              <ValidationProvider
                rules="min: 3|max: 100"
                name="descripcion"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="product.description"
                  dense
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
            <div class="col-xs-12 col-sm-6 q-px-xs ">
              <ValidationProvider
                rules="required|numeric"
                name="stock"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="product.stock"
                  dense
                  outlined
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                  color="blue-grey-10"
                  type="text"
                  label="Stock (*)"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-6 q-px-xs ">
              <ValidationProvider
                rules="required|max:3"
                name="moneda"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="product.currency"
                  dense
                  outlined
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                  color="blue-grey-10"
                  type="text"
                  label="Moneda (*)"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-6 q-px-xs ">
              <ValidationProvider
                rules="required|min:1"
                name="precio de compra"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="product.purchase_price"
                  dense
                  outlined
                  @input="calcularGanancia"
                  v-currency
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                  color="blue-grey-10"
                  type="text"
                  label="P. Compra (*)"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-6 q-px-xs ">
              <ValidationProvider
                rules="required|min:1"
                name="precio de venta"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="product.retail_price"
                  dense
                  outlined
                  @input="calcularGanancia"
                  v-currency
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                  color="blue-grey-10"
                  type="text"
                  label="P. Venta (*)"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-6 q-px-xs ">
              <ValidationProvider
                rules="required|min:1"
                name="ganancia"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  ref="gain"
                  v-model="product.gain"
                  dense
                  outlined
                  v-currency
                  readonly
                  disable
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm notallowed"
                  color="blue-grey-10"
                  type="text"
                  label="Ganancia (*)"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col-xs-12 col-sm-6 q-px-xs ">
              <ValidationProvider
                rules="required"
                name="categoria"
                v-slot="{ errors, invalid, validated }"
              >
                <q-select
                  v-model="product.category_id"
                  dense
                  options-dense
                  outlined
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                  color="blue-grey-10"
                  label="Categoria (*)"
                  use-input
                  :options="categoriaOptions"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                  option-label="name"
                  option-value="id"
                  emit-value
                  map-options
                  clearable
                  @filter="filterFn"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No hay resultados
                      </q-item-section>
                    </q-item>
                  </template></q-select
                >
              </ValidationProvider>
            </div>
            <div class="col-xs-12 col-sm-6 q-px-xs ">
              <ValidationProvider
                rules="required"
                name="imagen"
                v-slot="{ errors, invalid, validated }"
              >
                <q-file
                  v-model="product.image"
                  dense
                  outlined
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                  color="blue-grey-10"
                  label="Imagen (*)"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                  @input="mostrarPreImagen"
                  counter
                  clearable
                />
                <q-img
                  v-if="product.avatar"
                  :src="product.avatar"
                  :ratio="16 / 9"
                  spinner-color="primary"
                  spinner-size="82px"
                />
              </ValidationProvider>
            </div>
            <div class="row justify-center items-center fit q-gutter-md">
              <div class="col-5">
                <q-btn
                  class="q-mt-md full-width"
                  dense
                  outlined
                  type="submit"
                  :color="invalid ? 'grey' : 'primary'"
                  label="Crear"
                />
              </div>
              <div class="col-5">
                <q-btn
                  class="q-mt-md full-width"
                  dense
                  outlined
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
import { setValue } from 'vue-currency-input'
export default {
  name: 'CreateForm',
  components: { ValidationObserver },
  data() {
    return {
      product: {
        name: '',
        description: '',
        stock: '',
        purchase_price: '',
        retail_price: '',
        gain: null,
        currency: '',
        category_id: '',
        image: null,
        avatar: null
      },
      categoriaOptions: this.categorias
    }
  },
  async created() {
    await this.fetchCategories()
  },
  methods: {
    ...mapActions('product', ['storeProduct']),
    ...mapActions('category', ['fetchCategories']),
    mostrarPreImagen(e) {
      this.product.avatar = null
      if (e) {
        const reader = new FileReader()
        reader.readAsDataURL(e)
        reader.onload = e => {
          this.product.avatar = e.target.result
        }
      }
    },
    crearProducto() {
      this.product.purchase_price = this.$parseCurrency(
        this.product.purchase_price
      )
      this.product.retail_price = this.$parseCurrency(this.product.retail_price)

      const formData = new FormData()
      formData.append('name', this.product.name)
      formData.append('description', this.product.description)
      formData.append('stock', this.product.stock)
      formData.append('purchase_price', this.product.purchase_price)
      formData.append('retail_price', this.product.retail_price)
      formData.append('gain', this.product.gain)
      formData.append('currency', this.product.currency)
      formData.append('category_id', this.product.category_id)
      formData.append('image', this.product.image)
      return this.storeProduct(formData).then(() => {
        this.$router.push({ path: '/products' })
        this.$q.notify({
          type: 'positive',
          position: 'top-right',
          message: 'Producto creado correctamente.'
        })
      })
    },
    calcularGanancia() {
      this.product.gain =
        this.$parseCurrency(this.product.retail_price) -
        this.$parseCurrency(this.product.purchase_price)
      // console.log(this.product.gain);
      setValue(this.$refs.gain.$refs.input, this.product.gain)
    },
    filterFn(val, update) {
      if (val === '') {
        update(() => {
          this.categoriaOptions = this.categorias
          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.categoriaOptions = this.categorias.filter(categoria =>
          Object.keys(categoria).some(valor =>
            categoria[valor]
              .toString()
              .toLowerCase()
              .includes(needle)
          )
        )
      })
    }
  },
  computed: {
    ...mapGetters('category', { categorias: 'getCategories' })
  }
}
</script>
<style lang="scss" scoped>
.notallowed {
  cursor: not-allowed;
}
</style>
