<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Factura N° 00001</div>
    </q-card-section>

    <q-separator />
    <q-card-section class="col-12 full-width">
      <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
        <form @submit.prevent="passes(insertInvoicesProductDetail)" class="row">
          <div class="col-xs-12 col-sm-6 q-px-xs ">
            <ValidationProvider
              rules="min: 3|max: 100"
              name="notas"
              v-slot="{ errors, invalid, validated }"
            >
              <q-input
                v-model="invoice.notes"
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                dense
                outlined
                autogrow=""
                color="blue-grey-10"
                type="text"
                label="Notas"
                :error="invalid && validated"
                :error-message="errors[0]"
              />
            </ValidationProvider>
          </div>

          <div class="col-xs-12 col-sm-6 q-px-xs ">
            <q-input
              v-model="dateInvoice"
              class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
              dense
              outlined
              readonly
              color="blue-grey-10"
              type="text"
              label="Fecha"
            />
          </div>

          <div class="col-xs-12 col-sm-6 q-px-xs ">
            <ValidationProvider
              rules="required"
              name="Cliente"
              v-slot="{ errors, invalid, validated }"
            >
              <q-select
                v-model="client"
                dense
                options-dense
                :disable="disableClientInput"
                :readonly="disableClientInput"
                outlined
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                color="blue-grey-10"
                label="Cliente (*)"
                use-input
                :options="clientOptions"
                :error="invalid && validated"
                :error-message="errors[0]"
                option-label="name"
                option-value="id"
                map-options
                clearable
                @filter="filterClients"
                @input="showClient"
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
              rules="min: 3|max: 100"
              name="descripcion"
              v-slot="{ errors, invalid, validated }"
            >
              <q-input
                v-model="clientAlias"
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                dense
                readonly
                disable
                outlined
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
              rules="required"
              name="Plato"
              v-slot="{ errors, invalid, validated }"
            >
              <q-select
                v-model="product"
                dense
                options-dense
                outlined
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                color="blue-grey-10"
                label="Plato (*)"
                use-input
                :options="productOptions"
                :error="invalid && validated"
                :error-message="errors[0]"
                option-label="name"
                option-value="id"
                map-options
                clearable
                @filter="filterProducts"
                @input="showProduct"
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
          <div class="col-xs-12 col-sm-4 q-px-xs ">
            <ValidationProvider
              rules="min: 3|max: 100"
              name="descripcion"
              v-slot="{ errors, invalid, validated }"
            >
              <q-input
                v-model="detail.description"
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                dense
                disable
                readonly
                outlined
                color="blue-grey-10"
                type="text"
                label="Descripcion"
                :error="invalid && validated"
                :error-message="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="col-xs-12 col-sm-2 q-px-xs ">
            <ValidationProvider
              rules="min: 1|max: 100"
              name="stock"
              v-slot="{ errors, invalid, validated }"
            >
              <q-input
                v-model="detail.stock"
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                dense
                disable
                readonly
                outlined
                color="blue-grey-10"
                type="text"
                label="Stock"
                :error="invalid && validated"
                :error-message="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="col-xs-12 col-sm-3 q-px-xs ">
            <ValidationProvider
              rules="min: 1|max: 100"
              name="precio"
              v-slot="{ errors, invalid, validated }"
            >
              <q-input
                v-model="formatedPrice"
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                dense
                outlined
                color="blue-grey-10"
                type="text"
                label="Precio"
                :error="invalid && validated"
                :error-message="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="col-xs-12 col-sm-3 q-px-xs ">
            <ValidationProvider
              rules="required|min: 1"
              name="cantidad"
              v-slot="{ errors, invalid, validated }"
            >
              <q-input
                v-model="detail.quantity"
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                dense
                outlined
                color="blue-grey-10"
                type="number"
                label="Cantidad"
                :error="invalid && validated"
                :error-message="errors[0]"
                @input="calculateTotalDetail"
              />
            </ValidationProvider>
          </div>
          <div class="col-xs-12 col-sm-3 q-px-xs ">
            <ValidationProvider
              rules="min: 1|max: 100"
              name="total"
              v-slot="{ errors, invalid, validated }"
            >
              <q-input
                v-model="formatedTotal"
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                dense
                outlined
                color="blue-grey-10"
                type="text"
                label="Total"
                :error="invalid && validated"
                :error-message="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="col-xs-12 col-sm-3 q-px-xs ">
            <q-btn
              icon="add"
              round
              type="submit"
              :color="invalid ? 'grey' : 'primary'"
            />
          </div>
        </form>
      </ValidationObserver>

      <ValidationObserver ref="observer2" v-slot="{ invalid, passes }">
        <form @submit.prevent="passes(insertInvoiceProduct)" class="row">
          <div class="col-xs-12 col-sm-12 ">
            <!-- tabla de detalles -->
            <q-markup-table>
              <thead>
                <tr>
                  <th class="text-left">Cantidad</th>
                  <th class="text-left">Producto</th>
                  <th class="text-left">Precio</th>
                  <th class="text-right">Total</th>
                  <th class="text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in details" :key="index">
                  <td class="text-left" v-text="item.quantity">
                    Frozen Yogurt
                  </td>
                  <td class="text-left" v-text="item.product.name">
                    Frozen Yogurt
                  </td>
                  <td class="text-left">
                    {{ item.product.price | formatMoney }}
                  </td>
                  <td class="text-right">
                    {{ item.totalItem | formatMoney }}
                  </td>
                  <td class="text-center">
                    <q-btn
                      round
                      class=""
                      color="negative"
                      icon="delete"
                      size="sm"
                      @click="deleteItemFromCart(index)"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="text-left"></td>
                  <td class="text-left"></td>
                  <td class="text-left">Sub Total</td>
                  <td class="text-right">0</td>
                  <td class="text-right"></td>
                </tr>
                <tr>
                  <td class="text-left"></td>
                  <td class="text-left"></td>
                  <td class="text-left">I.G.V</td>
                  <td class="text-right">0</td>
                  <td class="text-right"></td>
                </tr>
                <tr>
                  <td class="text-left"></td>
                  <td class="text-left"></td>
                  <td class="text-left">Total</td>
                  <td class="text-right">{{ totalDetails | formatMoney }}</td>
                  <td class="text-right"></td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
          <div>
            <ValidationProvider
              rules="required|min_value: 1"
              name="detalles"
              v-slot="{ errors }"
            >
              <input v-model="invoiceProductsSize" type="text" hidden />
              <div v-if="errors.length > 0">
                <q-badge
                  hidden
                  color="red"
                  text-color="black"
                  :label="errors[0]"
                />
              </div>
            </ValidationProvider>
          </div>
          <div class="row justify-center items-center fit q-gutter-md q-pb-sm">
            <div class="col-5">
              <q-btn
                class="q-mt-md full-width"
                :color="invalid ? 'grey' : 'primary'"
                label="Crear"
                type="submit"
              />
            </div>
            <div class="col-5">
              <q-btn
                class="q-mt-md full-width"
                type="button"
                color="negative"
                label="Cancelar"
                @click="$router.push('/')"
              />
            </div>
          </div>
        </form>
      </ValidationObserver>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from 'quasar'
import { ValidationObserver } from 'vee-validate'
import { mapActions, mapGetters } from 'vuex'
// import * as cartService from '../services/cartService'

export default {
  name: 'InvoiceForm',
  components: { ValidationObserver },
  data() {
    return {
      invoice: {
        notes: null,
        sub_total: 0,
        total: 0,
        user_id: null,
        client_id: null,
        tax: 0
      },
      detail: {
        name: '',
        description: '',
        price: 0,
        quantity: null,
        total: 0,
        invoice_id: null,
        product_id: null,
        stock: null
      },
      product: null,
      client: null,
      clientAlias: null,
      productOptions: this.products,
      clientOptions: this.clients,
      dateInvoice: null,
      disableClientInput: false
    }
  },
  async created() {
    await this.fetchProducts()
    await this.fetchClients()
    const fecha = date.formatDate(Date.now(), 'D - MMMM - YYYY')
    this.dateInvoice = fecha
    this.invoice.user_id = this.loggedUserID
  },
  methods: {
    ...mapActions('product', ['fetchProducts']),
    ...mapActions('client', ['fetchClients']),
    ...mapActions('invoiceProduct', [
      'addProductsToCart',
      'deleteProductFromCart',
      'storeInvoiceProduct'
    ]),
    async insertInvoicesProductDetail() {
      await this.addProductsToCart({
        product: this.product,
        invoice: this.invoice,
        invoiceProduct: this.detail
      }).then(() => {
        this.disableClientInput = true
        this.product = null
        this.detail.description = null
        this.detail.stock = null
        this.detail.price = 0
        this.detail.total = 0
        this.detail.quantity = null
        this.detail.product_id = null
      })
    },
    insertInvoiceProduct() {
      this.storeInvoiceProduct({ invoiceHeader: this.invoice })
        .then(() => {
          alert('insertado en al bd')
        })
        .catch(error => {
          alert('algo salio MAL')
          console.log(error.data)
        })
    },
    calculateTotalDetail() {
      const cant = this.detail.quantity
      if (this.product) {
        const total = this.product.price * cant
        this.detail.total = total
      }
    },
    deleteItemFromCart(indexCart) {
      console.log(indexCart)
      this.deleteProductFromCart(indexCart)
    },
    showProduct() {
      if (this.product) {
        this.detail.name = this.product.name
        this.detail.description = this.product.description
        this.detail.stock = this.product.stock
        this.detail.price = this.product.price
        this.detail.product_id = this.product.id
      } else {
        console.log('no hay nada')
        this.detail.name = null
        this.detail.description = null
        this.detail.stock = null
        this.detail.price = 0
        this.detail.total = 0
        this.detail.quantity = null
        this.detail.product_id = null
      }
    },
    showClient() {
      if (this.client) {
        this.invoice.client_id = this.client.id
        this.clientAlias = this.client.alias
      } else {
        console.log('no hay nada')
        this.clientAlias = null
        this.invoice.client_id = null
      }
    },
    filterProducts(val, update) {
      if (val === '') {
        update(() => {
          this.productOptions = this.products
          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.productOptions = this.products.filter(prdct =>
          Object.keys(prdct).some(valor =>
            prdct[valor]
              .toString()
              .toLowerCase()
              .includes(needle)
          )
        )
      })
    },
    filterClients(val, update) {
      if (val === '') {
        update(() => {
          this.clientOptions = this.clients
          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.clientOptions = this.clients.filter(client =>
          Object.keys(client).some(valor =>
            client[valor]
              .toString()
              .toLowerCase()
              .includes(needle)
          )
        )
      })
    }
  },
  computed: {
    ...mapGetters('product', { products: 'getProducts' }),
    ...mapGetters('client', { clients: 'getClients' }),
    ...mapGetters('invoiceProduct', {
      details: 'getCart',
      totalDetails: 'getTotalFromCart',
      invoiceProducts: 'getInvoiceProducts'
    }),
    formatedPrice() {
      return this.Dinero({ amount: parseInt(this.detail.price) }).toFormat()
    },
    formatedTotal() {
      return this.Dinero({ amount: parseInt(this.detail.total) }).toFormat()
    },
    loggedUserID() {
      return this.$auth.user().id || null
    },
    invoiceProductsSize() {
      return this.invoiceProducts.length || 0
    }
  }
}
</script>

<style></style>
