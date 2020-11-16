// const getDefaultState = () => {
//   return {
//     categorias: [],
//     categoria: {},
//     modalCrearAbierto: false,
//     modalEditarAbierto: false
//   }
// }

export default function () {
  return {
    cart: {
      notes: '',
      sub_total: '',
      total: 0,
      user_id: '',
      client_id: '',
      tax: '',
      invoice_products: []
    }
  }
}
