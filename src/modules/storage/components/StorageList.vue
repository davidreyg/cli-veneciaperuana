<template>
  <q-table
    dense
    :grid="$q.screen.xs"
    title="Categorias"
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
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:top-left>
      <div class="row">
        <div class="col-3">
          <h5>Almacén</h5>
        </div>
        <div class="col-9">
          <q-radio
            v-model="itemCondition"
            @input="selectOptions"
            val=""
            label="Todo"
          />
          <q-radio
            v-model="itemCondition"
            @input="selectOptions"
            val="C"
            label="Stock 0"
          />
          <q-radio
            v-model="itemCondition"
            @input="selectOptions"
            val="A"
            label="Recien comprado"
          />
          <q-radio
            v-model="itemCondition"
            @input="selectOptions"
            val="V"
            label="Con precio de venta"
          />
        </div>
      </div>
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
        <!-- <q-btn
          outline
          round
          color="negative"
          icon="delete"
          no-caps
          dense
          @click="eliminarCategoria(props.row)"
        /> -->
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'StorageList',
  data() {
    return {
      itemCondition: '',
      loading: false,
      filter: '',
      visibleColumns: ['code', 'name', 'description', 'price', 'action'],
      columns: [
        {
          name: 'code',
          label: 'Codigo',
          align: 'left',
          field: 'code',
          sortable: true
        },
        {
          name: 'name',
          align: 'left',
          label: 'Nombre',
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
          label: 'Descripción',
          field: 'description',
          sortable: true
        },
        {
          name: 'purchase_price',
          align: 'right',
          label: 'P. Compra',
          field: row => this.Dinero({ amount: row.purchase_price }).toFormat(),
          sortable: true
        },
        {
          name: 'selling_price',
          align: 'right',
          label: 'P. Venta',
          field: row => this.Dinero({ amount: row.selling_price }).toFormat(),
          sortable: true
        },
        { name: 'action', align: 'center', label: 'Opciones', field: 'action' }
      ],
      itemsList: []
    }
  },
  async created() {
    this.loading = true
    await this.fetchStorages().then(() => {
      this.loading = false
      this.itemsList = this.itemsFromStorage('')
    })
  },
  methods: {
    ...mapActions('storage', ['fetchStorages']),
    newCategory() {
      this.$router.push({ name: 'categories.create' })
    },
    selectOptions() {
      this.itemsList = this.itemsFromStorage(this.itemCondition)
      // if (this.itemCondition === 'stateV')
      // if (this.itemCondition === 'stateC')
      //   this.itemsList = this.itemsList.filter(item => item.status === 'C')
      // if (this.itemCondition === 'stateA')
      //   this.itemsList = this.itemsList.filter(item => item.status === 'A')
      // if (this.itemCondition === 'all') this.itemsList
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
