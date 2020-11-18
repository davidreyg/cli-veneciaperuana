export default {
  path: 'billDetails',
  component: () => import('../pages/Index.vue'),
  meta: { auth: true, title: 'Compra de Productos/Ingredientes' },
  children: [
    {
      path: '', component: () => import('../components/BillForm.vue'),
      meta: { auth: true, title: 'Compra de Productos/Ingredientes' }
    },
    // {
    //   path: '/billDetails/create',
    //   name: 'billDetails.create',
    //   component: () => import('../pages/ProductCreate.vue')
    // },
    // {
    //   path: '/billDetails/:id/edit',
    //   name: 'billDetails.edit',
    //   component: () => import('../pages/ProductEdit.vue')
    // }
  ]
}
