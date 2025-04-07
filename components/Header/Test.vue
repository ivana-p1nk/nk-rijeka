<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref<number | null>(null)

function toggleSubMenu(index: number) {
  activeIndex.value = activeIndex.value === index ? null : index;
}
</script>

<template>
  <div class="relative">
    <nav class="bg-gray-800 text-white p-4">
      <ul class="flex justify-start space-x-6">
        <li>
          <button @click="toggleSubMenu(0)" class="w-full text-left">
            Menu 1
          </button>
        </li>
        <li>
          <button @click="toggleSubMenu(1)" class="w-full text-left">
            Menu 2
          </button>
        </li>
        <li>
          <button @click="toggleSubMenu(2)" class="w-full text-left">
            Menu 3
          </button>
        </li>
      </ul>

      <div class="mt-4">
        <div
          v-show="activeIndex === 0"
          :class="[
            'overflow-hidden transition-all duration-300 ease-in-out',
            activeIndex === 0 ? 'max-h-40' : 'max-h-0'
          ]"
          class="bg-gray-700 p-2"
        >
          <ul>
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li><a href="#">Link 3</a></li>
          </ul>
        </div>

        <div
          v-show="activeIndex === 1"
          :class="[
            'overflow-hidden transition-all duration-300 ease-in-out',
            activeIndex === 1 ? 'max-h-40' : 'max-h-0'
          ]"
          class="bg-gray-700 p-2"
        >
          <ul>
            <li><a href="#">Link A</a></li>
            <li><a href="#">Link B</a></li>
            <li><a href="#">Link C</a></li>
          </ul>
        </div>

        <div
          v-show="activeIndex === 2"
          :class="[
            'overflow-hidden transition-all duration-300 ease-in-out',
            activeIndex === 2 ? 'max-h-40' : 'max-h-0'
          ]"
          class="bg-gray-700 p-2"
        >
          <ul>
            <li><a href="#">Link X</a></li>
            <li><a href="#">Link Y</a></li>
            <li><a href="#">Link Z</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.bg-gray-700 {
  transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
}
</style>
