export default {
  path: 'storages',
  component: () => import('modules/storage/pages/Index.vue'),
  meta: { auth: true, title: 'Categorias' },
  children: [
    { path: '', component: () => import('modules/storage/components/StorageList.vue') },
    // {
    //   path: '/categories/create',
    //   name: 'categories.create',
    //   component: () => import('modules/category/pages/CategoryCreate.vue')
    // },
    {
      path: '/storages/:id/edit',
      name: 'storages.edit',
      component: () => import('modules/storage/pages/StorageEdit.vue')
    }
  ]
}
