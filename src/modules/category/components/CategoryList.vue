<template>
  <PageLayout>
    <div slot="pageTitle" class="text-h6" v-html="$t('categories.title')"></div>
    <div
      slot="pageSubTitle"
      class="text-subtitle2"
      v-html="$t('categories.items_list')"
    ></div>
    <div slot="pageOptions" class="row items-center justify-between">
      <div class="col-md-8 col-xs-5 col-sm-6 col-lg-7 column items-end">
        <q-select
          v-model="visibleColumns"
          multiple
          outlined
          rounded
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
        />
      </div>
      <div class="col-md-4 col-xs-5 col-sm-6 col-lg-3 column items-end">
        <q-btn
          color="primary"
          rounded
          :label="$t('general.add_new')"
          icon="add"
          @click="newCategory(true)"
        >
          <q-tooltip content-class="bg-accent">Nueva categoria</q-tooltip>
        </q-btn>
      </div>
    </div>
    <slot>
      <q-table
        dense
        :grid="$q.screen.xs"
        :data="getCategories"
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
              color="warning"
              icon="edit"
              no-caps
              dense
              @click="editCategory(props.row.id)"
            />
            <q-btn
              outline
              round
              color="negative"
              icon="delete"
              no-caps
              dense
              @click="eliminarCategoria(props.row)"
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
                        @click="editCategory(props.row.id)"
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
  name: 'CategoryList',
  components: { PageLayout },
  data() {
    return {
      loading: false,
      filter: '',
      visibleColumns: ['name', 'description', 'price', 'action'],
      columns: [
        {
          name: 'id',
          label: 'Id',
          align: 'left',
          field: 'id',
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
          name: 'description',
          align: 'right',
          label: this.$t('form_general.description'),
          field: 'description',
          sortable: true
        },
        {
          name: 'action',
          align: 'center',
          label: this.$t('general.actions'),
          field: 'action'
        }
      ]
    }
  },
  async created() {
    this.loading = true
    await this.fetchCategories()
    this.loading = false
  },
  methods: {
    // ...mapActions('categoria', ['openModalCrear']),
    ...mapActions('category', ['deleteCategory', 'fetchCategories']),
    eliminarCategoria(category) {
      // console.log(categoria)
      this.$swal
        .fire({
          title: `¿Esta seguro de eliminar la categoria ${category.name}?`,
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
            this.deleteCategory(category.id)
          }
        })
    },
    newCategory() {
      this.$router.push({ name: 'categories.create' })
    },
    editCategory(id) {
      this.$router.push({ name: 'categories.edit', params: { id: id } })
    }
  },
  computed: {
    // LET CATEGORIAS
    ...mapGetters('category', ['getCategories'])
  }
}
</script>

<style></style>
