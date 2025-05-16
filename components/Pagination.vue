<script setup lang="ts">
    const props = defineProps<{
    modelValue: number
    totalPages: number
    }>()

    const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
    }>()

    const currentPage = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
    })

    const visiblePages = computed(() => {
    const maxPagesToShow = 6
    const pages: (number | string)[] = []

    if (props.totalPages <= maxPagesToShow + 2) {
        for (let i = 1; i <= props.totalPages; i++) {
        pages.push(i)
        }
    } else {
        pages.push(1)
        if (currentPage.value > 3) {
        pages.push('...')
        }

        const start = Math.max(2, currentPage.value - 1)
        const end = Math.min(props.totalPages - 1, currentPage.value + 1)
        for (let i = start; i <= end; i++) {
        pages.push(i)
        }

        if (currentPage.value < props.totalPages - 2) {
        pages.push('...')
        }

        pages.push(props.totalPages)
    }

    return pages
    })
</script>

<template>
  <div class="flex justify-center mt-10 gap-1 pt-8 border-t border-neutralBlue-200" v-if="props.totalPages > 1">
    <button
      @click="currentPage--"
      :disabled="currentPage <= 1"
      class="px-3 py-3 bg-white rounded-lg transition-colors duration-300 flex items-center shadow-sm disabled:opacity-50 hover:bg-blue-800 hover:text-white"
    >
      <Icon name="material-symbols:chevron-left" class="text-current" />
    </button>

    <button
      v-for="(p, index) in visiblePages"
      :key="index"
      @click="typeof p === 'number' && (currentPage = p)"
      class="px-4 py-3 rounded-lg shadow-sm text-button3 font-bold transition-colors duration-300"
      :class="currentPage === p
        ? 'bg-blue-800 text-white'
        : 'bg-white text-gray-900 hover:bg-blue-800 hover:text-white'"
      :disabled="p === '...'"
    >
      {{ p }}
    </button>

    <button
      @click="currentPage++"
      :disabled="currentPage >= props.totalPages"
      class="px-3 py-3 bg-white rounded-lg transition-colors duration-300 flex items-center shadow-sm disabled:opacity-50 hover:bg-blue-800 hover:text-white"
    >
      <Icon name="material-symbols:chevron-right" class="text-current" />
    </button>
  </div>
</template>
