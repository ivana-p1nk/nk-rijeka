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
let fetchPromise: Promise<void> | null = null

const fetchAllTags = async () => {
  if (loaded.value) return
  if (fetchPromise) return fetchPromise

  const config = useRuntimeConfig()

  fetchPromise = (async () => {
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
  })()

  return fetchPromise
}

export const useTagCategories = () => {
  onMounted(fetchAllTags)

  return {
    tagProducts,
    tagCategoryMap
  }
}


type IProductVariation = NonNullable<IProduct['variations']>[number]

export const getProductTags = (
  product: IProduct,
  tagProductsMap: Record<number, IProduct[]> | undefined,
  tagMap: Record<number, string>,
  selectedVariation: IProductVariation | null
): string[] => {
  const tags: string[] = []

  if (!tagProductsMap) return tags

  for (const catIdStr in tagMap) {
    const catId = Number(catIdStr)
    const tagLabel = tagMap[catId]
    const isInCategory = tagProductsMap[catId]?.some(p => p.id === product.id)

    if (isInCategory) {
      tags.push(tagLabel)
    }
  }

  const hasDiscount =
    (selectedVariation?.price_discount && selectedVariation.price_discount > 0) ||
    (product.price_discount && product.price_discount > 0)

  if (hasDiscount) {
    tags.push('AKCIJA')
  }

  return tags
}


