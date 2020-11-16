<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Actualizar Producto</div>
      <div class="text-subtitle3">Los campos con (*) son obligatorios</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="collumn col-12 full-width">
      <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
        <form @submit.prevent="passes(actualizarProducto)">
          <div class="row">
            <div class="col-xs-12 col-sm-6 q-px-xs">
              <ValidationProvider
                rules="required|min:4 |max:20"
                name="nombre"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="name"
                  dense
                  outlined
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
                rules="required|min:2"
                name="stock"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="stock"
                  dense
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
                rules="required|min: 3"
                name="moneda"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  readonly
                  v-model="currency"
                  dense
                  outlined
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                  color="blue-grey-10"
                  type="text"
                  label="Moneda"
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
                  outlined
                  @keydown="calcularGanancia"
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
                  @keydown="calcularGanancia"
                  v-model="retail_price"
                  dense
                  outlined
                  ref="retail_price"
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
                rules="required"
                name="ganancia"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-currency
                  v-model="gain"
                  dense
                  outlined
                  ref="gain"
                  readonly
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                  color="blue-grey-10"
                  type="text"
                  label="Ganancia"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col-xs-12 col-sm-6 q-px-xs">
              <ValidationProvider
                rules="required"
                name="categoria"
                v-slot="{ errors, invalid, validated }"
              >
                <q-select
                  v-model="category_id"
                  dense
                  options-dense
                  outlined
                  class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                  color="blue-grey-10"
                  label="Categoria (*)"
                  use-input
                  hide-selected
                  fill-input
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
            <div class="col-xs-12 col-sm-6 q-px-xs">
              <q-file
                v-model="image"
                dense
                outlined
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                color="blue-grey-10"
                label="Imagen (*)"
                @input="mostrarPreImagen"
                clearable
                counter
              />
              <q-img
                :src="avatar || 'statics/img/default_product_image.png'"
                :ratio="16 / 9"
                spinner-color="primary"
                spinner-size="82px"
              />
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
  getterType: 'product/getProductField',
  mutationType: 'product/updateProductField'
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
    this.retail_price = ''
    this.gain = ''
    await this.fetchCategories()
      .then(result => {
        this.categoriaOptions = this.categories
      })
      .catch(err => {})
    await this.fetchOneProduct(this.$route.params.id)
      .then(result => {
        this.avatar = this.product.image_url
        setValue(this.$refs.purchase_price.$refs.input, this.purchase_price)
        setValue(this.$refs.retail_price.$refs.input, this.retail_price)
        setValue(this.$refs.gain.$refs.input, this.gain)
      })
      .catch(err => {})
  },
  methods: {
    ...mapActions('category', ['fetchCategories']),
    ...mapActions('product', {
      actualizar: 'updateProduct',
      vaciarProductoSeleccionado: 'emptySelectedProduct',
      fetchOneProduct: 'fetchOneProduct'
    }),
    actualizarProducto() {
      const purchase_price = this.$parseCurrency(this.purchase_price)
      const retail_price = this.$parseCurrency(this.retail_price)
      const gain = this.$parseCurrency(this.product.gain)
      const formData = new FormData()
      formData.append('id', this.product.id)
      formData.append('name', this.product.name)
      formData.append('description', this.product.description)
      formData.append('stock', this.product.stock)
      formData.append('purchase_price', purchase_price)
      formData.append('retail_price', retail_price)
      formData.append('gain', gain)
      formData.append('currency', this.product.currency)
      formData.append('category_id', this.product.category_id)
      formData.append('image', this.product.image)
      formData.append('_method', 'PUT')
      console.trace('realizando la insercion en la base de datos...')
      return this.actualizar(formData).then(() => {
        this.$router.push({ path: '/products' })
        this.$q.notify({
          type: 'positive',
          position: 'top-right',
          message: `Producto ${this.product.name} actualizado correctamente .`
        })
        this.vaciarProductoSeleccionado()
      })
    },
    calcularGanancia() {
      this.gain =
        this.$parseCurrency(this.product.retail_price) -
        this.$parseCurrency(this.product.purchase_price)
      setValue(this.$refs.gain.$refs.input, this.product.gain)
    },
    mostrarPreImagen(e) {
      this.avatar = null
      if (e) {
        const reader = new FileReader()
        reader.readAsDataURL(e)
        reader.onload = e => {
          this.avatar = e.target.result
        }
      }
    },
    filterFn(val, update) {
      if (val === '') {
        update(() => {
          this.categoriaOptions = this.categories
          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        // console.log(this.categorias)
        // this.options = this.getCategorias.filter(v => v.toLowerCase().indexOf(needle) > -1)
        this.categoriaOptions = this.categories.filter(categoria =>
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
    ...mapGetters('product', { product: 'getProduct' }),
    ...mapGetters('category', { categories: 'getCategories' }),
    ...mapFields([
      'name',
      'description',
      'stock',
      'purchase_price',
      'retail_price',
      'gain',
      'currency',
      'category_id',
      'image'
    ])
  }
}
</script>
