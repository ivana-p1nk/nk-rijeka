

<template>
    <div>
        <!-- FILTER OPEN  BUTTON -->
        <button
            @click="show = true"
            :class="[
                'group flex flex-row items-center gap-2 uppercase medium w-fit transition-colors duration-300',
                show ? 'btn-secondary-focus' : 'btn-secondary',
            ]"
        >
        <Icon
                name="mage:filter"
                :class="[
                    'icon-large transition-colors duration-300 group-active:text-white',
                    show ? 'text-white' : 'text-gray-900',
                ]"
            />
            FILTER
            
        </button>



        <!-- SIDEBAR CONTENT  -->
        <Offcanvas :isOpen="show" @close="show = false">
          <div class="space-y-4">
            <div v-for="filter in filterConfigs" :key="filter.key" class="w-full">
                <USelect
                class="w-full"
                v-model="filters[filter.key as FilterKey]"
                :options="filter.options"
                :ui="selectUI"
                />
                
            </div>
            <UButton
                block
                size="lg"
                variant="solid"
                class="mt-6"
                @click="applyFilters"
                >
                Primijeni filtere
            </UButton>
          </div>
        </Offcanvas>
    </div>
</template>




<script setup lang="ts">
import Offcanvas from './Offcanvas.vue'
import { computed } from 'vue'
import type { IProduct } from '~/types/product'

const props = defineProps<{
  filters: Record<string, string>,
  products: IProduct[]
}>()

const show = ref(false)

const emit = defineEmits(['close', 'update:filters'])
const applyFilters = () => {
  emit('close') 
  emit('update:filters', { ...props.filters }) 
}
type FilterKey = 'size' | 'ageGender' | 'price'

const availableVariations = computed(() => {
  const all = props.products.flatMap(p => p.variations || []).map(v => v.packaging)
  return Array.from(new Set(all))
})

const availablePriceRanges = [
  { label: '0-15€', value: '0-15' },
  { label: '15-30€', value: '15-30' },
  { label: '30-50€', value: '30-50' },
  { label: '50-100€', value: '50-100' },
  { label: '100-150€', value: '100-150' },
  { label: '150-200€', value: '150-200' },
  { label: '200+€', value: '200-1000' }
]

const filterConfigs = computed(() => [
  {
    key: 'size',
    label: 'Veličina',
    options: [{ label: 'Veličina', value: '' }, ...availableVariations.value.map(v => ({ label: v, value: v }))]
  },
  {
    key: 'ageGender',
    label: 'Spol i dob',
    options: [
      { label: 'Spol i dob', value: '' },
      { label: 'Muškarci', value: 'muskarci' },
      { label: 'Žene', value: 'zene' },
      { label: 'Djeca', value: 'djeca' }
    ]
  },
  {
    key: 'price',
    label: 'Cijena',
    options: [{ label: 'Cijena', value: '' }, ...availablePriceRanges]
  }
])

const selectUI = {
  color: {
    white: {
      outline: `
        border border-gray-300
        bg-white
        text-black
        placeholder-black
        dark:bg-white
        dark:text-black
        dark:placeholder-black
        shadow-none
        ring-0
        focus:ring-0
        focus:ring-blue-500
      `
    }
  }
}

const close = () => emit('close')
</script>