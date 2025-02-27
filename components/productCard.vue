<template>
    <div class="frame group relative transition-all duration-500 hover:-translate-y-3">
        <div class="card flex flex-col justify-between text-center relative transition-shadow duration-500 group-hover:shadow-[0px_10px_15px_0px_#0000001A]">
            <div>
                <div class="flex flex-row justify-between items-center">
                    <p><Icon name="material-symbols:favorite-outline" class="icon-xl text-gray-900" /></p>
                    <p id="tag" class="tags bg-blue-300 font-saira font-semibold text-label1 text-white px-3 py-2 radius rounded-lg">NOVO</p>
                </div>
        
                <img :src="product.image" alt="product thumb" class="max-h-[320px] max-w-[85%] mx-auto">
            </div>

            <div class="flex flex-row justify-center gap-2 pt-6">
                <p class="font-saira font-bold text-h6-normal text-blue-900">{{ product.price }} €</p> 
                <span class="font-saira font-bold text-h6-normal text-blue-900">|</span>
                <p class="font-saira font-bold text-h6-normal text-blue-500 ">{{ product.price }} €</p>
                <UPopover :popper="{ placement: 'top-start' }" :ui="{ring:'ring-0', background:'dark:bg-blue-50 bg-blue-50'}">
                    <UButton trailing-icon="mynaui:info-hexagon" class="bg-white dark:bg-white shadow-none hover:bg-white dark:hover:bg-white dark:text-blue-500 p-0 mt-[2px]" />
                    <template #panel>
                        <div class="py-2 px-3">
                        <p class="font-roboto font-bold text-body4 text-gray-900">Cijena za članove</p>
                        </div>
                    </template>
                </UPopover>
            </div>

            <div class="middle opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <NuxtLink :to="`/products/${product.id}`" class="btn-primary medium font-semibold">ODABERI OPCIJE</NuxtLink>
                <NuxtLink :to="`/products/${product.id}`" class="btn-primary medium font-semibold">DODAJ U KOŠARICU</NuxtLink>
            </div>
        </div>
        <!--<p> {{ product.category}}</p>-->
        <p class="font-saira font-semibold text-h5-normal text-center text-blue-900 mt-2 p-2">{{ product.title }}</p>
    </div>
</template>

<script setup>
const { product } = defineProps(['product'])
</script>

<style scoped>
.middle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.5s ease;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width:60%;
}
</style>
