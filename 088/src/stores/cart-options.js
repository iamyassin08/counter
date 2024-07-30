import { defineStore, acceptHMRUpdate } from 'pinia'
import { useProductStore } from './product-options'

export const useCartStore = defineStore('cart', {
  state: () => ({
    productIds: [],
  }),
  getters: {
    cart: (state) => {
      const productStore = useProductStore()
      return state.productIds.map(id => productStore.products.find(p => p.id === id))
    },
    cartTotal() { return this.cart.reduce((prev, cur) => prev += cur.price, 0) },
  },
  actions: {
    addToCart(product) {
      this.productIds.push(product.id)
    },
    removeFromCart(product) {
      const itemIndex = this.productIds.findIndex(id => id === product.id)
      this.productIds.splice(itemIndex, 1)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
