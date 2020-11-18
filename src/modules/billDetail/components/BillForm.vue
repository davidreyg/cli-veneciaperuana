<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Compra N° 00001</div>
    </q-card-section>

    <q-separator />
    <q-card-section class="col-12 full-width">
      <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
        <form @submit.prevent="passes(insertBillDetails)" class="row">
          <div class="col-xs-12 col-sm-6 q-px-xs ">
            <ValidationProvider
              rules="min: 3|max: 100"
              name="notas"
              v-slot="{ errors, invalid, validated }"
            >
              <q-input
                v-model="bill.notes"
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
              name="Proveedor"
              v-slot="{ errors, invalid, validated }"
            >
              <q-select
                v-model="provider"
                dense
                options-dense
                outlined
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                color="blue-grey-10"
                label="Proveedor (*)"
                use-input
                :options="providerOptions"
                :error="invalid && validated"
                :error-message="errors[0]"
                option-label="name"
                option-value="id"
                map-options
                clearable
                @filter="filterProviders"
                @input="showProvider"
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
              name="Alias"
              v-slot="{ errors, invalid, validated }"
            >
              <q-input
                v-model="providerAlias"
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                dense
                readonly
                disable
                outlined
                color="blue-grey-10"
                type="text"
                label="Alias"
                :error="invalid && validated"
                :error-message="errors[0]"
              />
            </ValidationProvider>
          </div>

          <div class="col-xs-12 col-sm-6 q-px-xs ">
            <ValidationProvider
              rules="required"
              name="Items"
              v-slot="{ errors, invalid, validated }"
            >
              <q-select
                v-model="item"
                dense
                options-dense
                outlined
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                color="blue-grey-10"
                label="Items (*)"
                use-input
                :options="itemOptions"
                :error="invalid && validated"
                :error-message="errors[0]"
                option-label="itemName"
                option-value="itemCode"
                map-options
                clearable
                @filter="filterItems"
                @input="showItem"
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
              name="Stock minimo"
              v-slot="{ errors, invalid, validated }"
            >
              <q-input
                v-model="detail.minimal_stock"
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                dense
                outlined
                color="blue-grey-10"
                type="text"
                label="Stock minimo"
                :error="invalid && validated"
                :error-message="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="col-xs-12 col-sm-3 q-px-xs ">
            <ValidationProvider
              rules="min: 1|max: 100"
              name="Precio de venta"
              v-slot="{ errors, invalid, validated }"
            >
              <q-input
                v-model="detail.selling_price"
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                dense
                outlined
                v-currency
                color="blue-grey-10"
                type="text"
                label="Precio de venta"
                :error="invalid && validated"
                :error-message="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="col-xs-12 col-sm-3 q-px-xs ">
            <ValidationProvider
              rules="min: 1|max: 100"
              name="Precio de compra"
              v-slot="{ errors, invalid, validated }"
            >
              <q-input
                v-model="detail.purchase_price"
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                dense
                outlined
                v-currency
                color="blue-grey-10"
                type="text"
                label="Precio de compra"
                :error="invalid && validated"
                :error-message="errors[0]"
                @keyup="calculateTotalDetail"
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
                @keyup="calculateTotalDetail"
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
                ref="total"
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
                  <td class="text-left" v-text="item.product.itemName">
                    Frozen Yogurt
                  </td>
                  <td class="text-left">
                    {{ item.product.itemPrice | formatMoney }}
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
    <pre>{{ this.detail }}</pre>
  </q-card>
</template>

<script>
import { date } from 'quasar'
import { ValidationObserver } from 'vee-validate'
import { mapActions, mapGetters } from 'vuex'
import * as billFormService from '../services/billFormService'
// import * as cartService from '../services/cartService'

export default {
  name: 'InvoiceForm',
  components: { ValidationObserver },
  data() {
    return {
      bill: {
        notes: null,
        sub_total: 0,
        total: 0,
        user_id: null,

        tax: 0
      },
      detail: {
        name: '',
        description: '',
        purchase_price: '',
        formatedPrice: 0,
        selling_price: '',
        minimal_stock: null,
        code: null,
        quantity: 0,
        total: 0,
        provider_id: null,
        invoice_id: null,
        billable_id: null,
        billable_type: null,
        stock: null
      },
      item: null,
      provider: null,
      providerAlias: null,
      itemOptions: this.items,
      providerOptions: this.providers,
      dateInvoice: null,
      disableClientInput: false
    }
  },
  async created() {
    await this.fetchProviders()
    await this.fetchItemsFromStorage()
    const fecha = date.formatDate(Date.now(), 'D - MMMM - YYYY')
    this.dateInvoice = fecha
    this.bill.user_id = this.loggedUserID
  },
  methods: {
    ...mapActions('provider', ['fetchProviders']),
    ...mapActions('billDetail', [
      'fetchItemsFromStorage',
      'addItemToCart',
      'deleteItemsFromCart',
      'storeBillDetails'
    ]),
    async insertBillDetails() {
      await this.addItemToCart({
        product: this.item,
        bill: this.bill,
        billDetail: this.detail
      }).then(() => {
        billFormService.clearDetailAndItemInputs({
          detail: this.detail,
          item: this.item
        })
      })
    },
    insertInvoiceProduct() {
      this.storeBillDetails({ billHeader: this.bill })
        .then(() => {
          alert('insertado en al bd')
        })
        .catch(error => {
          alert('algo salio MAL')
          console.log(error.data)
        })
    },
    calculateTotalDetail() {
      this.detail.total = billFormService.calculateTotalOfDetail({
        quantity: this.detail.quantity,
        purchase_price: this.$parseCurrency(this.detail.purchase_price)
      })

      // const cant = this.detail.quantity
      // this.detail.formatedPrice = this.$parseCurrency(
      //   this.detail.purchase_price
      // )
      // if (this.item) {
      //   const total = this.$parseCurrency(this.detail.purchase_price) * cant
      //   this.detail.total = total
      // }
    },
    deleteItemFromCart(indexCart) {
      this.deleteItemsFromCart(indexCart)
    },
    showItem() {
      if (this.item) {
        this.detail.name = this.item.itemName
        this.detail.description = this.item.itemDescription
        this.detail.stock = this.item.itemStock
        this.detail.purchase_price = this.item.itemPrice
        this.detail.billable_id = this.item.itemId
        this.detail.billable_type = this.item.itemType
        this.detail.code = this.item.itemCode
      } else {
        console.log('no hay nada')
        this.detail.name = null
        this.detail.description = null
        this.detail.stock = null
        this.detail.code = null
        this.detail.purchase_price = 0
        this.detail.total = 0
        this.detail.quantity = null
        this.detail.billable_id = null
        this.detail.billable_type = null
      }
    },
    showProvider() {
      if (this.provider) {
        this.detail.provider_id = this.provider.id
        this.providerAlias = this.provider.alias
      } else {
        console.log('no hay nada')
        this.providerAlias = null
        this.detail.provider_id = null
      }
    },
    filterItems(val, update) {
      if (val === '') {
        update(() => {
          this.itemOptions = this.items
          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.itemOptions = this.items.filter(prdct =>
          Object.keys(prdct).some(valor =>
            prdct[valor]
              .toString()
              .toLowerCase()
              .includes(needle)
          )
        )
      })
    },
    filterProviders(val, update) {
      if (val === '') {
        update(() => {
          this.providerOptions = this.providers
          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.providerOptions = this.providers.filter(client =>
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
    ...mapGetters('provider', { providers: 'getProviders' }),
    ...mapGetters('billDetail', {
      items: 'getItems',
      details: 'getCart',
      totalDetails: 'getTotalFromCart',
      invoiceProducts: 'getInvoiceProducts'
    }),
    formatedTotal() {
      return this.Dinero({
        amount: parseInt(this.detail.total)
      }).toFormat()
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
