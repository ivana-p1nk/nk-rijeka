<script setup lang="ts">
    const router = useRouter()

    definePageMeta({
        layout: false,
    })

    useSeoMeta({
        title: 'Uspješna registracija',
    })

    const goToPreviousPage = () => {
        router.go(-1)
    }
</script>

<template>
    <section class="container mx-auto justify-center pt-20 pb-32 px-5">
        <div class="absolute top-7 left-7">
            <button @click="goToPreviousPage" class="uppercase btn-secondary py-3 xs flex items-center w-fit h-fit">
                <Icon name="i-heroicons-chevron-left" />
            </button>
        </div>

        <div class="pb-8 mx-auto">
            <NuxtLink to="/">
                <img src="/assets/images/grbrijeka.svg" alt="logo" class="w-20 h-20 mx-auto" />
            </NuxtLink>
            <h2 class="text-5xl mt-8 font-medium uppercase font-saira leading-9 tracking-tight text-center">
                Račun kreiran
            </h2>

        </div>

        <div class="text-center max-w-[400px] mx-auto">
            <img src="/assets/images/racun-kreiran.jpg" class="w-full rounded-md">
            <p class="px-0 sm:px-5 text-body2 font-bold text-blue-900 pt-8 pb-4">Kako bi završili registraciju vašeg računa aktivirajte link koji je poslan na vašu email adresu.</p>
            <p class="px-0 sm:px-5 text-body3 text-blue-900 pb-4">Lozinku i email adresu možete promjeniti u postavkama računa</p>
            <hr class="border-t-[1.4px] border-gray-200" />
            <p class="px-5 text-body3 font-bold text-blue-500 py-4">Hvala Vam na podršci kluba</p>
            <NuxtLink
                to="/login"
                class="block w-full px-5 py-3 uppercase text-white font-bold font-saira bg-blue-600 hover:bg-blue-700 rounded-[6px] text-center transition-colors duration-200 ease-in-out"
                >
                Prijavi se
            </NuxtLink>
        </div>
         
    </section>

</template>


<style scoped>
    :deep(.form-input:focus),
    :deep(.form-input:focus-visible),
    :deep(.form-select:focus),
    :deep(.form-select:focus-visible),
    :deep(textarea:focus),
    :deep(textarea:focus-visible) {
        --tw-ring-color: #009FF5 !important;
        --tw-border-color: #009FF5 !important;
        border-color: #009FF5 !important;
    }

    :deep(.form-input),
    :deep(.form-select),
    :deep(textarea) {
        padding-top: 10px;
        padding-bottom: 10px;
        height: 42px;
    }
</style>