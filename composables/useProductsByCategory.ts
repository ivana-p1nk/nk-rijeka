import { ref } from 'vue'
import type { IProduct } from '~/types/product'

export const useProductsByCategory = (categoryId: Ref<number>) => {
  const config = useRuntimeConfig()
  const products = ref<IProduct[]>([])
  const loading = ref(false)

  const fetchProducts = async () => {
    loading.value = true
    try {
      const { data: productData } = await useFetch(`${config.public.url}/products`, {
        params: { categories: categoryId.value },
      })

      // @ts-ignore
      products.value = productData.value.data || []
    } catch (error) {
      console.error(`Greška kod učitavanja proizvoda za kategoriju ${categoryId.value}:`, error)
    } finally {
      loading.value = false
    }
  }

   watch(categoryId, () => {
    fetchProducts()
  }, { immediate: true })

  return { products, loading, fetchProducts }
}
