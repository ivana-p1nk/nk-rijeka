import { ref, onMounted } from 'vue'
import type { IProduct } from '~/types/product'
import { useRuntimeConfig } from '#imports'

const tagCategoryMap = {
  34: 'NOVO'
} as const

type TagCategoryId = keyof typeof tagCategoryMap

const tagProducts = ref<Record<TagCategoryId, IProduct[]>>({
  34: []
})

const loaded = ref(false)

export const useTagCategories = () => {
  const config = useRuntimeConfig()

  const fetchAllTags = async () => {
    if (loaded.value) return

    try {
      await Promise.all(
        Object.keys(tagCategoryMap).map(async (catId) => {
          const { data } = await useFetch(`${config.public.url}/products`, {
            params: { categories: catId }
          })
          // @ts-ignore
          tagProducts.value[catId] = data.value?.data || []
        })
      )

      loaded.value = true
    } catch (err) {
      console.error('Greška pri učitavanju tag kategorija:', err)
    }
  }

  onMounted(fetchAllTags)

  return {
    tagProducts,
    tagCategoryMap
  }
}
