<script setup lang="ts">
const router = useRouter()

definePageMeta({
    layout: false,
})

useSeoMeta({
    title: 'Zaboravljena lozinka',
})

const goToPreviousPage = () => {
    router.go(-1)
}
</script>

<template>
    <div class="container mx-auto">
        <div class="absolute top-7 left-7">
            <button @click="goToPreviousPage" class="uppercase btn-secondary py-3 xs flex items-center w-fit h-fit">
                <Icon name="i-heroicons-chevron-left" />
            </button>
        </div>

        <ProfileLostPassword />
    </div>

    <UNotifications />
</template>
