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

export const getProductTags = (
  product: IProduct,
  tagProductsMap: Record<number, IProduct[]>,
  tagMap: Record<number, string>
) => {
  const tags: string[] = []

  for (const [catId, tagLabel] of Object.entries(tagMap)) {
    const isInCategory = tagProductsMap[+catId]
      ?.some(p => p.id === product.id)

    if (isInCategory) tags.push(tagLabel)
  }

  if (product.price_discount && product.price_discount > 0) {
    tags.push('AKCIJA')
  }

  return tags
}
