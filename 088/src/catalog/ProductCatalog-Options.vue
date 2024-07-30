<template>
  <div>
    <h2 v-if="productsLoading">Product data is loading...</h2>
    <ul class="products">
      <li class="product-item" v-for="(product, index) in products" :key="index">
        <ProductInfo :product="product">
          <button class="cta" @click="addToCart(product)">Buy</button>
        </ProductInfo>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import ProductInfo from './product-info/ProductInfo.vue'
import { useCartStore } from '@/stores/cart-options'
import { useProductStore } from '@/stores/product-options'

export default {
  components: {
    ProductInfo,
  },
  // setup() {
  //   const cartStore = useCartStore()
  //   const productStore = useProductStore()

  //   return { cartStore, productStore }
  // },
  created() {
    this.getProducts()
  },
  computed: {
    ...mapState(useProductStore, ['products', 'productsLoading']),
  },
  methods: {
    ...mapActions(useCartStore, { cartStoreAddToCart: 'addToCart' }),
    ...mapActions(useProductStore, ['getProducts']),
    addToCart(product) {
      this.cartStoreAddToCart(product)
    },
  },
}

</script>

<style scoped>
.products {
  margin: 0 100px;
}

.product-item {
  border-bottom: 2px solid #999;
}
</style>