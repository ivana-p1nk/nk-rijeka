<template>
  <p class="font-normal text-blue-900 font-roboto text-body2 flex flex-wrap gap-1">
    <template v-for="(item, index) in breadcrumbsItems" :key="index">
      <span v-if="item.slug">
        <router-link :to="item.slug" class="text-blue-400 link-color">
          {{ item.label }}
        </router-link>
      </span>
      <span v-else>{{ item.label }}</span>
      <span class="text-blue-400 link-color" v-if="index !== breadcrumbsItems.length - 1"> / </span>
    </template>
  </p>
</template>

<script setup lang="ts">
import type { IProduct } from '~/types/product'

const props = defineProps<{
  product: IProduct
}>()

const breadcrumbsItems = computed(() => {
  const categories = props.product.category || []

  let parentCategory = null
  let subCategory = null

  for (const cat of categories) {
    if (cat.children && cat.children.length) {
      const child = cat.children.find(childCat =>
        categories.some(c => c.id === childCat.id)
      )
      if (child) {
        parentCategory = cat
        subCategory = child
        break
      }
    }
  }

  if (parentCategory && subCategory) {
    return [
      { label: parentCategory.title, slug: `/categories/${parentCategory.slug}` },
      { label: subCategory.title, slug: `/categories/${subCategory.slug}` },
      { label: props.product.title, slug: null }
    ]
  } else if (categories.length) {
    return [
      { label: categories[0].title, slug: `/categories/${categories[0].slug}` },
      { label: props.product.title, slug: null }
    ]
  } else {
    return [
      { label: 'Proizvodi', slug: '/products' },
      { label: props.product.title, slug: null }
    ]
  }
})
</script>