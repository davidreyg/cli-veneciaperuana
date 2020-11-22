<template>
  <PageLayout>
    <div
      slot="pageTitle"
      class="text-h6"
      v-html="$t('categories.add_category')"
    ></div>
    <div
      slot="pageSubTitle"
      class="text-subtitle3"
      v-html="$t('general.form_subtitle')"
    >
      Los campos con (*) son obligatorios
    </div>
    <div slot="pageOptions"></div>
    <slot>
      <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
        <form class="row">
          <div class="col-md-6 col-xs-12 col-sm-8 q-gutter-y-md">
            <div class="col-md-2">
              <ValidationProvider
                rules="required|min:4 |max:20"
                :name="$t('form_general.name')"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="category.name"
                  dense
                  outlined
                  type="text"
                  :label="$t('form_general.name') + ' (*)'"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col-md-3">
              <ValidationProvider
                rules="min: 3|max: 100"
                :name="$t('form_general.description')"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="category.description"
                  outlined
                  dense
                  type="text"
                  :label="$t('form_general.description')"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="row justify-around items-center">
              <div class="col-4">
                <q-btn
                  class="full-width"
                  type="submit"
                  :color="invalid ? 'grey' : 'primary'"
                  :label="$t('general.save')"
                  @click.prevent="passes(crearCategorias)"
                />
              </div>
              <div class="col-4">
                <q-btn
                  class="full-width"
                  type="button"
                  color="negative"
                  :label="$t('general.cancel')"
                  @click="$router.go(-1)"
                />
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </slot>
  </PageLayout>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'
import PageLayout from 'core/components/PageLayout'
export default {
  name: 'CreateForm',
  components: { ValidationObserver, PageLayout },
  data() {
    return {
      category: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    // ...mapActions('category', {
    //   cerrarModal: 'openModalCrear'
    // }),
    ...mapActions('category', ['storeCategory']),
    crearCategorias() {
      this.storeCategory(this.category)
        .then(() => {
          this.$router.push({ path: '/categories' })
        })
        .catch(() => {
          alert('error')
        })
      // alert('asd');
    }
  }
}
</script>
