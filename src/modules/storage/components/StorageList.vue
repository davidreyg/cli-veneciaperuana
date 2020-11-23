<template>
  <PageLayout>
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="25" cy="25" r="25" fill="#EAF1FB" />
      <path
        d="M4.93,4.93C3.12,6.74 2,9.24 2,12C2,14.76 3.12,17.26 4.93,19.07L6.34,17.66C4.89,16.22 4,14.22 4,12C4,9.79 4.89,7.78 6.34,6.34L4.93,4.93M19.07,4.93L17.66,6.34C19.11,7.78 20,9.79 20,12C20,14.22 19.11,16.22 17.66,17.66L19.07,19.07C20.88,17.26 22,14.76 22,12C22,9.24 20.88,6.74 19.07,4.93M7.76,7.76C6.67,8.85 6,10.35 6,12C6,13.65 6.67,15.15 7.76,16.24L9.17,14.83C8.45,14.11 8,13.11 8,12C8,10.89 8.45,9.89 9.17,9.17L7.76,7.76M16.24,7.76L14.83,9.17C15.55,9.89 16,10.89 16,12C16,13.11 15.55,14.11 14.83,14.83L16.24,16.24C17.33,15.15 18,13.65 18,12C18,10.35 17.33,8.85 16.24,7.76M12,10C10.9,10 10,10.9 10,12C10,13.1 10.9,14 12,14C13.1,14 14,13.1 14,12C14,10.9 13.1,10 12,10Z"
        fill="#5851D8"
      />
    </svg>
    <div slot="pageTitle" class="text-h6" v-html="$t('storages.title')"></div>
    <div
      slot="pageSubTitle"
      class="text-subtitle2"
      v-html="$t('storages.storage_list')"
    ></div>
    <div slot="pageOptions" class="row items-center justify-end">
      <div class="col-12">
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
        separator="none"
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
