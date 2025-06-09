<template>
  <div>
    <!-- Dugme za otvaranje sort sidebar-a na mobilnim uređajima -->
    <button
    @click="isSidebarOpen = true"
    class="group flex flex-row items-center gap-2 uppercase filter-width w-full transition-colors duration-300 md:hidden btn-secondary"
    >
        Poredaj po
        <Icon name="streamline:interface-page-controller-scroll-up-down-move-scroll-vertical" 
        :class="[
          'icon-large transition-colors duration-300 group-active:text-white',
          isSidebarOpen ? 'text-white' : 'text-gray-900',
        ]" />
    </button>

    <!-- Sidebar za mobilne uređaje -->
    <USlideover v-model="isSidebarOpen" side="right" :ui="slideOverUI">
      <template #default>
        <div class="flex flex-col h-full bg-blue-00 shadow-lg">
          <div class="w-full flex justify-end pt-6 px-4">
            <button @click="isSidebarOpen = false">
              <Icon name="line-md:close" class="medium text-gray-900" />
            </button>
          </div>

          <div class="space-y-4 overflow-y-auto grow p-6">
            <h1 class="text-h4-normal font-semibold font-saira mb-5 text-blue-900">Poredaj po</h1>

            <div class="space-y-4">
              <div v-for="option in sortOptions" :key="option.value" class="flex items-center gap-3">
                <input
                  type="radio"
                  :id="option.value"
                  :value="option.value"
                  v-model="selected"
                  class="accent-blue-600"
                />
                <label :for="option.value" class="text-body2 text-blue-900">{{ option.label }}</label>
              </div>
            </div>
            <hr>
            <UButton
              block
              size="lg"
              variant="solid"
              :ui="{
                base: 'text-white font-saira font-semibold',
                variant: {
                  solid: 'bg-blue-600 hover:bg-blue-700 active:bg-800',
                },
              }"
              class="px-5 uppercase text-[15px] flex justify-center focus:outline-none focus:ring-0 active:bg-blue-800 transition-colors duration-200 font-saira font-semibold" 
              @click="applySort"
            >
               Primijeni filter
            </UButton>
          </div>
        </div>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isSidebarOpen = ref(false)
const selected = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  selected.value = val
})

function applySort() {
  emit('update:modelValue', selected.value)
  isSidebarOpen.value = false
}

const sortOptions = [
  { value: 'Najnoviji', label: 'Najnovije' },
  { value: 'S nižom cijenom', label: 'Cijena: od najniže do najviše' },
  { value: 'S višom cijenom', label: 'Cijena: od najviše do najniže' },
]

const slideOverUI = {
  overlay: {
    base: 'fixed inset-0 z-1',
    background: 'bg-black/60',
  },
  content: 'fixed top-0 right-0 z-50 w-96 max-w-full h-full bg-white shadow-xl flex flex-col focus:outline-none',
}
</script>
