import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRuntimeConfig, useFetch } from '#imports'
import type { ICategory } from '@/types/category'
import type { IProduct } from '@/types/product'

export function useCategoryProducts(catslug: string | string[], slug?: string | string[]) {
  const config = useRuntimeConfig()

  const category = ref<ICategory>()
  const parentCategory = ref<ICategory>()
  const products = ref<IProduct[]>([])

  const loadingCat = ref(true)
  const loadingParentCat = ref(!!slug)
  const loadingProduct = ref(false)

  const page = ref(1)
  const perPage = 5
  const totalProducts = ref(0)
  const totalPages = computed(() => Math.ceil(totalProducts.value / perPage))

  const categoriy = ref<number[]>([])
  const sort = ref('Najnoviji')
  const activeFilters = ref<Record<string, string>>({})

  const filteredProducts = computed(() => {
    return products.value.filter((product) => {
      const { size, price } = activeFilters.value

      if (size && !product.variations?.some((v) => v.packaging === size)) {
        return false
      }

      if (price && product.price !== undefined && product.price !== null) {
        if (price === '200€+') {
          if (product.price < 200) return false
        } else {
          const [minStr, maxStr] = price.split('-')
          const min = parseFloat(minStr)
          const max = parseFloat(maxStr)
          if (!(product.price >= min && product.price < max)) {
            return false
          }
        }
      }

      return true
    })
  })

  const fetchCategory = async () => {
    loadingCat.value = true
    try {
      const slugToFetch = slug ?? catslug
      const { data: categoryData } = await useFetch(`${config.public.url}/categories/${slugToFetch}`)
      // @ts-ignore
      category.value = categoryData.value[0]
    } catch (err) {
      console.error('Greška pri učitavanju kategorije:', err)
    } finally {
      loadingCat.value = false
    }
  }

  const fetchParentCategory = async () => {
    if (!slug) return
    loadingParentCat.value = true
    try {
      const { data: parentData } = await useFetch(`${config.public.url}/categories/${catslug}`)
      // @ts-ignore
      parentCategory.value = parentData.value[0]
    } catch (err) {
      console.error('Greška pri učitavanju glavne kategorije:', err)
    } finally {
      loadingParentCat.value = false
    }
  }

  const fetchProducts = async () => {
    loadingProduct.value = true
    try {
      const catIds = slug
        ? category.value?.id
        : category.value?.sub_categories?.map((c) => c.id).join(',') || category.value?.id

      const { data: productData } = await useFetch(`${config.public.url}/products`, {
        params: {
          categories: categoriy.value.length > 0 ? categoriy.value : catIds,
          page: page.value,
          perPage,
          sort: sort.value,
        },
      })

      // @ts-ignore
      products.value = productData.value.data || []
      // @ts-ignore
      totalProducts.value = productData.value.total || 0
    } catch (err) {
      console.error('Greška pri učitavanju proizvoda:', err)
    } finally {
      loadingProduct.value = false
    }
  }

  const fetchAll = async () => {
    await Promise.all([fetchCategory(), fetchParentCategory()])
    fetchProducts()
  }

  watch([sort, categoriy], () => {
    page.value = 1
    fetchProducts()
  })

  watch(page, () => {
    fetchProducts()
  })

  return {
    category,
    parentCategory,
    products,
    filteredProducts,
    sort,
    activeFilters,
    categoriy,
    page,
    perPage,
    totalProducts,
    totalPages,
    loadingCat,
    loadingParentCat,
    loadingProduct,
    fetchAll,
  }
}
