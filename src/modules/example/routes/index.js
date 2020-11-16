export default {
  path: 'products',
  component: () => import('../pages/Index.vue'),
  meta: { auth: true, title: 'Productos' },
  children: [
    { path: '', component: () => import('../components/ProductList.vue') },
    {
      path: '/products/create',
      name: 'products.create',
      component: () => import('../pages/ProductCreate.vue')
    },
    {
      path: '/products/:id/edit',
      name: 'products.edit',
      component: () => import('../pages/ProductEdit.vue')
    }
  ]
}
