<script setup lang="ts">
    const emit = defineEmits(['toggleHamburgerAccount']);
</script>

<template>
    <div class="flex">
        <UButton
            icon="i-heroicons-user-circle"
            size="sm"
            variant="neutral"
            square
            class="p-0 text-white transition-colors duration-200 ease-in-out dark:text-white hover:text-blue-500" 
            @click="$emit('toggleHamburgerAccount')"
        />
    </div>
</template>