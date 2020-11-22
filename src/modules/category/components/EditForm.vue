<template>
  <PageLayout>
    <div
      slot="pageTitle"
      class="text-h6"
      v-html="$t('categories.edit_category')"
    ></div>
    <div
      slot="pageSubTitle"
      class="text-subtitle3"
      v-html="$t('form_general.form_subtitle')"
    >
      Los campos con (*) son obligatorios
    </div>
    <div slot="pageOptions"></div>
    <slot>
      <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
        <form class="row">
          <div class="col-md-6 col-xs-12 col-sm-8 q-gutter-y-md">
            <div class="col col-12">
              <ValidationProvider
                rules="required|min:4 |max:20"
                :name="$t('form_general.name')"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="name"
                  dense
                  outlined
                  type="text"
                  :label="$t('form_general.name') + ' (*)'"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-12">
              <ValidationProvider
                rules="min: 3|max: 100"
                :name="$t('form_general.description')"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="description"
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
                  @click.prevent="passes(actualizarCategoria)"
                />
              </div>
              <div class="col-4">
                <q-btn
                  class="full-width"
                  type="button"
                  color="negative"
                  :label="$t('general.cancel')"
                  @click="resetCategoryState()"
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
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('category')
import { createHelpers } from 'vuex-map-fields'
const { mapFields } = createHelpers({
  getterType: 'category/getCategoryField',
  mutationType: 'category/updateCategoryField'
})
import PageLayout from 'core/components/PageLayout'
export default {
  name: 'EditForm',
  components: { ValidationObserver, PageLayout },
  data() {
    return {}
  },
  async created() {
    await this.fetchOneCategory(this.$route.params.id)
  },
  methods: {
    // ...mapActions({
    //   cerrarModal: 'openModalEditar'
    // }),
    ...mapActions({
      updateCategoria: 'updateCategory',
      fetchOneCategory: 'fetchOneCategory',
      emptySelectedCategory: 'emptySelectedCategory'
    }),
    actualizarCategoria() {
      this.updateCategoria(this.category)
        .then(() => {
          this.$router.push({ path: '/categories' })
        })
        .catch(() => {
          alert('error')
        })
    },
    resetCategoryState() {
      this.$router.go(-1)
      setTimeout(() => {
        this.emptySelectedCategory()
      }, 300)
    }
  },
  computed: {
    ...mapGetters({ category: 'getCategory' }),
    ...mapFields(['id', 'name', 'description'])
  }
}
</script>
