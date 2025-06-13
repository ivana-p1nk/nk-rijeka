import type { IProduct } from '~/types/product'

export const useProductTags = (product: IProduct) => {
  const tags: { label: string; color: string }[] = []
  const categoryIds = product.category?.map(cat => cat.id) ?? []

  if (categoryIds.includes(34)) {
    tags.push({ label: 'NOVO', color: 'bg-blue-500' })
  }
  if (categoryIds.includes(8)) {
    tags.push({ label: 'AKCIJA', color: 'bg-red-500' })
  }

  return tags
}