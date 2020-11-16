<template>
  <q-table
    dense
    :grid="$q.screen.xs"
    title="Productos"
    :data="getProducts"
    :columns="columns"
    row-key="id"
    :filter="filter"
    :loading="loading"
    :visible-columns="visibleColumns"
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
      <div class="row items-center q-gutter-sm">
        <div class="col-">
          <q-btn
            color="primary"
            label="Nuevo"
            icon="add"
            @click="newProduct(true)"
          >
            <q-tooltip content-class="bg-accent">Nueva categoria</q-tooltip>
          </q-btn>
        </div>
        <div class="col">
          <q-select
            v-model="visibleColumns"
            multiple
            square
            flat
            dense
            options-dense
            :display-value="$q.lang.table.columns"
            emit-value
            map-options
            :options="columns"
            option-value="name"
            options-cover
            style="min-width: 150px"
          />
        </div>
      </div>
    </template>
    <template v-slot:body-cell-action="props">
      <q-td :props="props" auto-width class="q-gutter-xs">
        <q-btn
          outline
          round
          color="warning"
          icon="edit"
          no-caps
          dense
          @click="editProduct(props.row.id)"
        />
        <q-btn
          outline
          round
          color="negative"
          icon="delete"
          no-caps
          dense
          @click="eliminarProducto(props.row)"
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
                    @click="editProduct(props.row.id)"
                  />
                  <q-btn
                    outline
                    round
                    size="sm"
                    color="negative"
                    icon="delete"
                    no-caps
                    dense
                    @click="eliminarProducto(props.row)"
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
  name: 'ProductList',
 data () {
    return {
      loading: false,
      loadingBtnFetch: false,
      filter: '',
      visibleColumns: ['nombre', 'descripcion', 'categoria', 'stock', 'action'],
      columns: [
        {
          name: 'id',
          label: 'Id',
          align: 'left',
          field: 'id',
          sortable: true
        },
        { name: 'nombre', align: 'center', label: 'Nombre', field: 'name', sortable: true, required: true },
        { name: 'categoria', align: 'center', label: 'Categoria', field: row => row.category.name, required: true },
        { name: 'descripcion', align: 'center', label: 'Descripcion', field: 'description', sortable: true },
        { name: 'stock', align: 'center', label: 'Stock', field: 'stock', sortable: true },
        { name: 'precio_compra', align: 'center', label: 'P. Compra', field: row => this.Dinero({ amount: row.purchase_price }).toFormat(), sortable: true },
        { name: 'precio_venta', align: 'center', label: 'P. Venta', field: row => this.Dinero({ amount: row.retail_price }).toFormat(), sortable: true },
        { name: 'moneda', align: 'center', label: 'Moneda', field: 'currency', sortable: true },
        { name: 'ganancia', align: 'center', label: 'Ganancia', field: row => this.Dinero({ amount: row.gain }).toFormat(), sortable: true },
        { name: 'action', align: 'center', label: 'Opciones', field: 'action', required: true }
      ]
    }
  },
  async created() {
    this.loading = true
    await this.fetchProducts()
    this.loading = false
  },
  methods: {
    // listarCategorias();
    ...mapActions('product', ['fetchProducts']),

    // ...mapActions('categoria', ['openModalCrear']),
    ...mapActions('product', ['deleteProduct']),
    eliminarProducto(product) {
      // console.log(product)
      this.$swal
        .fire({
          title: `¿Esta seguro de eliminar el producto ${product.name}?`,
          html:
            '<span style="color:red">¡No podra revertir esta acción!</span>',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Si, seguro!'
        })
        .then(confirmado => {
          if (confirmado.value) {
            this.deleteProduct(product.id)
          }
        })
    },
    newProduct() {
      this.$router.push({ name: 'products.create' })
    },
    editProduct(id) {
      this.$router.push({ name: 'products.edit', params: { id: id } })
    }
  },
  computed: {
    // LET CATEGORIAS
    ...mapGetters('product', ['getProducts'])
  }
}
</script>

<style></style>
