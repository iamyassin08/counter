import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('products', () => {
  const products = ref([])

  async function getProducts() {
    const response = await fetch('/api/products')
    const returnedProducts = await response.json()

    products.value = returnedProducts
    return returnedProducts
  }

  return { products, getProducts }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}