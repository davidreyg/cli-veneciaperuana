export default {
  path: 'invoiceProducts',
  component: () => import('../pages/Index.vue'),
  meta: { auth: true, title: 'Venta de Products' },
  children: [
    {
      path: '', component: () => import('../components/InvoiceForm.vue'),
      meta: { auth: true, title: 'Venta de Products' }
    },
    // {
    //   path: '/invoiceProducts/create',
    //   name: 'invoiceProducts.create',
    //   component: () => import('../pages/ProductCreate.vue')
    // },
    // {
    //   path: '/invoiceProducts/:id/edit',
    //   name: 'invoiceProducts.edit',
    //   component: () => import('../pages/ProductEdit.vue')
    // }
  ]
}
