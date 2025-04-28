<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="filter in filterConfigs" :key="filter.key">
        <USelect
          v-model="filters[filter.key as FilterKey]"
          :options="filter.options"
          :placeholder="filter.label"
          :ui="selectUI"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import type { IProduct } from '~/types/product';

    const props = defineProps<{products: IProduct[];}>();
    
    const emit = defineEmits<{
        (e: 'update:filters', value: Record<FilterKey, string>): void;
    }>();
    
    type FilterKey = 'size' | 'gender' | 'age' | 'price';
    
    const filters = reactive<Record<FilterKey, string>>({
        size: '',
        gender: '',
        age: '',
        price: ''
    });
    
    watch(filters, () => {
        emit('update:filters', { ...filters });
    }, { deep: true });
    
    const products = computed(() => props.products);
    
    const availableVariations = computed(() => {
        const allVariations = products.value
        .flatMap(p => p.variations || [])
        .map(v => v.packaging);
    
        return Array.from(new Set(allVariations));
    });
    
    const filterConfigs = computed(() => [
        {
        key: 'size',
        label: 'Veličina',
        options: availableVariations.value
        },
        {
        key: 'gender',
        label: 'Spol',
        options: ['Muškarci', 'Žene']
        },
        {
        key: 'age',
        label: 'Dob',
        options: ['Odrasli', 'Djeca']
        },
        {
        key: 'price',
        label: 'Cijena',
        options: ['0-50€', '50-100€', '100-200€', '200€+']
        }
    ]);
    
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
    };
  </script>
  
  <style>
    .form-select {
        @apply text-black placeholder-black !important;
    }
    .dark .form-select {
        @apply text-black placeholder-black !important;
    }
  </style>
  