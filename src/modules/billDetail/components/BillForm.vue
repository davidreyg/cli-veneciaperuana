<template>
  <PageLayout>
    <div
      slot="pageTitle"
      class="text-h6"
      v-html="$t('bill_detail.add_bill')"
    ></div>
    <div
      slot="pageSubTitle"
      class="text-subtitle3"
      v-html="$t('bill_detail.form_subtitle')"
    >
      Los campos con (*) son obligatorios
    </div>
    <div slot="pageOptions"></div>
    <slot>
      <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
        <form @submit.prevent="passes(insertBillDetails)" class="row">
          <div class="col-xs-12 col-sm-6 q-px-xs ">
            <ValidationProvider
              rules="min: 3|max: 100|required"
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
              color="blue-grey-10"
              type="text"
              label="Fecha"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="dateInvoice">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>

                <div></div>
              </template>
            </q-input>
          </div>
          <div class="col-md-3 col-xs-12 col-sm-6 q-px-xs ">
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
                option-label="name"
                option-value="code"
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

          <div class="col-md-3 col-xs-12 col-sm-6 q-px-xs ">
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
          <div class="col-md-1 col-xs-12 col-sm-3 q-px-xs ">
            <ValidationProvider
              rules="required|min: 1"
              name="cantidad"
              v-slot="{ errors, invalid, validated }"
            >
              <q-input
                v-model="detail.quantity"
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                :disable="formDetails.disablePriceQuantityInputs"
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
          <div class="col-md-2 col-xs-12 col-sm-3 q-px-xs ">
            <ValidationProvider
              rules="min: 1|max: 100|required"
              name="Precio de compra"
              v-slot="{ errors, invalid, validated }"
            >
              <q-input
                v-model="detail.price"
                class="q-mb-xs-md q-mb-sm-sm q-mb-md-sm"
                dense
                outlined
                :disable="formDetails.disablePriceQuantityInputs"
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
          <div class="col-md-2 col-xs-10 col-sm-5 q-px-xs ">
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
                disable
                readonly
                outlined
                color="blue-grey-10"
                type="text"
                label="Total"
                :error="invalid && validated"
                :error-message="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="col-md-1 col-xs-2 col-sm-1 q-px-xs ">
            <q-btn
              icon="add"
              round
              type="submit"
              :color="invalid ? 'grey' : 'primary'"
            />
          </div>
        </form> </ValidationObserver
    ></slot>
    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Compra N° 00001</div>
      </q-card-section>

      <q-separator />
      <q-card-section class="col-12 full-width">
        <ValidationObserver ref="observer2" v-slot="{ invalid, passes }">
          <form @submit.prevent="passes(insertInvoiceProduct)" class="row">
            <div class="col-xs-12 col-sm-12 ">
              <!-- tabla de detalles -->
              <q-markup-table>
                <thead>
                  <tr>
                    <th class="text-left">Producto</th>
                    <th class="text-left">Cantidad</th>
                    <th class="text-left">Precio</th>
                    <th class="text-right">Total</th>
                    <th class="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in details" :key="index">
                    <td class="text-left" v-text="item.product.name"></td>
                    <td class="text-left" v-text="item.quantity"></td>
                    <td class="text-left">
                      {{ item.price | formatMoney }}
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
                  <!-- <tr>

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
                </tr> -->
                  <tr>
                    <td class="text-left"></td>
                    <td class="text-left"></td>
                    <td class="text-left text-bold">Total</td>
                    <td class="text-right text-bold">
                      {{ totalDetails | formatMoney }}
                    </td>
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
            <div
              class="row justify-center items-center fit q-gutter-md q-pb-sm"
            >
              <div class="col-5">
                <q-btn
                  class="q-mt-md full-width"
                  :color="invalid ? 'grey' : 'primary'"
                  label="Comprar"
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
      <!-- <pre>{{ this.details }}</pre> -->
    </q-card>
  </PageLayout>
</template>

<script>
import { date } from 'quasar'
import { ValidationObserver } from 'vee-validate'
import { mapActions, mapGetters } from 'vuex'
import * as billFormService from '../services/billFormService'
import PageLayout from 'core/components/PageLayout'

export default {
  name: 'InvoiceForm',
  components: { ValidationObserver, PageLayout },
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
        price: '',
        code: null,
        quantity: 0,
        total: 0,
        provider_id: null,
        invoice_id: null,
        billable_id: null,
        billable_type: null
      },
      formDetails: {
        providerAlias: null,
        stock: null,
        disablePriceQuantityInputs: true
      },
      item: null,
      provider: null,
      itemOptions: this.items,
      providerOptions: this.providers,
      dateInvoice: date.formatDate(Date.now(), 'YYYY/MM/DD'),
      disableClientInput: false
    }
  },
  async created() {
    await this.fetchProviders()
    await this.fetchItemsFromStorage()
    this.bill.user_id = this.loggedUserID
  },
  methods: {
    ...mapActions('provider', ['fetchProviders']),
    ...mapActions('billDetail', [
      'addItemToCart',
      'fetchItemsFromStorage',
      'deleteItemFromCart',
      'storeBillDetails'
    ]),
    async insertBillDetails() {
      const formatedPurchasePrice = this.$parseCurrency(this.detail.price)
      await this.addItemToCart({
        product: this.item,
        bill: this.bill,
        billDetail: this.detail,
        formatedPurchasePrice
      }).then(() => {
        billFormService
          .clearDetailAndItemInputs({ detail: this.detail })
          .then(() => {
            this.item = null
          })
      })
    },
    insertInvoiceProduct() {
      this.storeBillDetails({ billHeader: this.bill })
        .then(() => {
          alert('insertado en al bd')
          this.$router.push('/')
        })
        .catch(error => {
          alert('algo salio MAL')
          console.log(error.data)
        })
    },
    calculateTotalDetail() {
      if (this.item) {
        this.detail.total = billFormService.calculateTotalOfDetail({
          quantity: this.detail.quantity,
          price: this.$parseCurrency(this.detail.price)
        })
      }
    },
    showItem() {
      billFormService.showItemDetails({
        detail: this.detail,
        item: this.item,
        formDetails: this.formDetails
      })
    },
    showProvider() {
      billFormService.showProviderDetails({
        detail: this.detail,
        provider: this.provider,
        formDetails: this.formDetails
      })
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
