<template>
  <q-layout view="hHh Lpr fFf">
    <app-header :left="left" @left-drawer="isleftDrawer"></app-header>
    <!-- <app-left-drawer :left="left"></app-left-drawer> -->
    <q-drawer
      v-model="left"
      side="left"
      elevated
      :mini="miniState"
      show-if-above
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="300"
      :breakpoint="500"
      content-class="bg-grey-3"
    >
      <q-list padding>
        <q-expansion-item
          expand-separator
          icon="mail"
          label="Mantenimiento"
          caption="Tablas Categoria,Prod..."
          default-opened
        >
          <q-item clickable tag="a" to="/categories">
            <q-item-section avatar>
              <q-icon name="school" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Categorias</q-item-label>
              <q-item-label caption>api/categorias</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" to="/products">
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Productos</q-item-label>
              <q-item-label caption>api/productos</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" to="/invoiceProducts">
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Ventas</q-item-label>
              <q-item-label caption>api/ventas</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" to="/billDetails">
            <q-item-section avatar>
              <q-icon name="school" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Compras</q-item-label>
              <q-item-label caption>api/bills/billDetail</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          icon="settings"
          label="Configuracion"
          caption="Tipo documentos..."
        >
          <q-item clickable tag="a" to="tipo_documentos">
            <q-item-section avatar>
              <q-icon name="school" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Tipo de Documentos</q-item-label>
              <q-item-label caption>api/tipo_documentos</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-item clickable tag="a" to="tienda">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tinda</q-item-label>
            <q-item-label caption>api/categorias</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <div class="q-pa-sm">
        <transition
          name="mainlayoutTransition"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOutDown"
          mode="out-in"
        >
          <router-view />
        </transition>
      </div>
    </q-page-container>

    <app-footer></app-footer>
  </q-layout>
</template>

<script>
// import AppLeftDrawer from './partials/AppLeftDrawer'
import AppHeader from './partials/AppHeader'
import AppFooter from './partials/AppFooter'
import Ls from 'core/services/ls'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'MainLayout',
  components: { AppHeader, AppFooter },
  data() {
    return {
      left: false,
      miniState: false
    }
  },
  created() {
    this.bootstrap().then(res => {
      this.setInitialCompany()
    })
  },
  methods: {
    ...mapActions(['bootstrap']),
    ...mapActions('company', ['setSelectedCompany']),

    setInitialCompany() {
      let selectedCompany = Ls.get('selectedCompany') !== null

      if (selectedCompany) {
        let foundCompany = this.companies.find(
          company => company.id === parseInt(selectedCompany)
        )

        if (foundCompany) {
          this.setSelectedCompany(foundCompany)
          return
        }
      }

      this.setSelectedCompany(this.companies[0])
    },
    isleftDrawer(data) {
      this.left = data
    }
  },
  computed: {
    ...mapGetters('company', {
      selectedCompany: 'getSelectedCompany',
      companies: 'getCompanies'
    }),

    isShow() {
      return true
    }
  }
}
</script>
