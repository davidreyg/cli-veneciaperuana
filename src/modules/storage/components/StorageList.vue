<template>
  <PageLayout>
    <div slot="pageTitle" class="text-h6" v-html="$t('storages.title')"></div>
    <div
      slot="pageSubTitle"
      class="text-subtitle2"
      v-html="$t('storages.storage_list')"
    ></div>
    <div slot="pageOptions" class="row items-center justify-end">
      <div class="col-md-12 col-xs-5 col-sm-6 col-lg-7">
        <q-radio
          v-model="itemCondition"
          @input="selectOptions"
          val=""
          :label="this.$t('general.all')"
        />
        <q-radio
          v-model="itemCondition"
          @input="selectOptions"
          val="A"
          label="En almacen"
        />
        <q-radio
          v-model="itemCondition"
          @input="selectOptions"
          val="V"
          label="Con precio de venta"
        />
      </div>
    </div>
    <slot>
      <q-table
        dense
        :grid="$q.screen.xs"
        :data="itemsList"
        :columns="columns"
        row-key="code"
        :rows-per-page-options="[10, 20, 50, 100, 0]"
        :filter="filter"
        :loading="loading"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            :placeholder="$t('general.search')"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props" auto-width class="q-gutter-xs">
            <q-btn
              outline
              round
              color="green"
              icon="lock"
              no-caps
              dense
              @click="editStorageItem(props.row.id)"
            />
          </q-td>
        </template>
        <template v-slot:item="props">
          <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
          >
            <q-card>
              <q-list dense>
                <q-item v-for="col in props.cols" :key="col.name">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>{{ col.value }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <div v-if="col.name === 'action'" class="q-gutter-xs">
                      <q-btn
                        outline
                        round
                        size="sm"
                        color="warning"
                        icon="edit"
                        no-caps
                        dense
                        @click="editStorageItem(props.row.id)"
                      />
                      <q-btn
                        outline
                        round
                        size="sm"
                        color="negative"
                        icon="delete"
                        no-caps
                        dense
                        @click="eliminarCategoria(props.row.id)"
                      />
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>
      </q-table>
    </slot>
  </PageLayout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageLayout from 'core/components/PageLayout'
export default {
  name: 'StorageList',
  components: { PageLayout },
  data() {
    return {
      itemCondition: '',
      loading: false,
      filter: '',
      visibleColumns: ['code', 'name', 'description', 'price', 'action'],
      columns: [
        {
          name: 'code',
          label: this.$t('form_general.code'),
          align: 'left',
          field: 'code',
          sortable: true
        },
        {
          name: 'name',
          align: 'left',
          label: this.$t('form_general.name'),
          field: 'name',
          sortable: true,
          required: true
        },
        {
          name: 'quantity',
          align: 'right',
          label: 'Stock',
          field: 'quantity',
          sortable: true,
          required: true
        },
        {
          name: 'description',
          align: 'right',
          label: this.$t('form_general.description'),
          field: 'description',
          sortable: true
        },
        {
          name: 'purchase_price',
          align: 'right',
          label: this.$t('form_general.purchase_price'),
          field: row => this.Dinero({ amount: row.purchase_price }).toFormat(),
          sortable: true
        },
        {
          name: 'selling_price',
          align: 'right',
          label: this.$t('form_general.selling_price'),
          field: row => this.Dinero({ amount: row.selling_price }).toFormat(),
          sortable: true
        },
        {
          name: 'action',
          align: 'center',
          label: this.$t('general.actions'),
          field: 'action'
        }
      ],
      itemsList: []
    }
  },
  async created() {
    this.loading = true
    await this.fetchStorages().then(() => {
      this.itemsList = this.itemsFromStorage('')
      this.loading = false
    })
  },
  methods: {
    ...mapActions('storage', ['fetchStorages']),
    selectOptions() {
      this.itemsList = this.itemsFromStorage(this.itemCondition)
    },
    editStorageItem(id) {
      this.$router.push({ name: 'storages.edit', params: { id } })
    }
  },
  computed: {
    ...mapGetters('storage', { itemsFromStorage: 'getStorages' })
  }
}
</script>

<style></style>
