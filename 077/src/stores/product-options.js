import { defineStore, acceptHMRUpdate } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
  }),
  actions: {
    async getProducts() {
      const response = await fetch('/api/products')
      const returnedProducts = await response.json()

      this.products = returnedProducts
      return returnedProducts
    },
  },
  cache: { getProducts: { stateKey: 'products', loadingStateKey: 'productsLoading' } },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}