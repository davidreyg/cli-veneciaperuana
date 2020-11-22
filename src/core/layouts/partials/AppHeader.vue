<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn
        dense
        flat
        round
        icon="menu"
        @click="$emit('left-drawer', !left)"
      />

      <q-toolbar-title>
        <q-avatar>
          <img src="statics/icons/logoVeneciaPeruana.jpg" />
        </q-avatar>
        Facturacion con Laravel
      </q-toolbar-title>
      <q-btn-dropdown stretch flat label="Idioma">
        <q-list
          v-for="(language, index) in options"
          :key="`Lang${index}`"
          :value="language"
          @click="setLanguage(language)"
        >
          <q-item clickable v-close-popup tabindex="0">
            <q-item-section>
              <q-item-label>{{ language }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn dense flat round icon="account_circle">
        <q-menu>
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
              <q-input
                :value="'Administrador'"
                type="text"
                label="Tipo"
                readonly
              />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img :src="loggedUserAvatar || null" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">
                {{ loggedUser.employee.name }}
              </div>

              <q-btn
                color="primary"
                :label="labelLogout"
                push
                size="sm"
                @click="cerrarSesion"
              />
            </div>
          </div>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script>
import { localize } from 'vee-validate'
import { mapActions } from 'vuex'
export default {
  name: 'AppHeader',
  props: ['left'],
  data() {
    return {
      options: ['es', 'en', 'pt_BR']
    }
  },
  methods: {
    // ...mapActions('company', ['resetState']),
    ...mapActions(['resetApp']),
    cerrarSesion() {
      this.$auth
        .logout({
          makeRequest: true,
          redirect: '/auth/login'
          // etc...
        })
        .then(data => {
          this.resetApp()
        })
    },
    setLanguage(selectedLanguage) {
      this.$i18n.locale = selectedLanguage
      // Install and Activate the Arabic locale.
      localize(selectedLanguage)
    }
  },
  computed: {
    loggedUser() {
      return this.$auth.user() || null
    },
    loggedUserAvatar() {
      return this.$auth.user() ? this.$auth.user().avatar : null
    },
    labelLogout() {
      return this.$t('navigation.logout')
    }
  }
}
</script>
