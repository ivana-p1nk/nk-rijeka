<script setup lang="ts">
    import { useCartStore } from "~/composables/useCart";
    import type { IProduct } from '~/types/product';
    
    const props = defineProps<{ product: IProduct; }>();

    const cartStore = useCartStore();

    const addToCart = () => {
		cartStore.addCartProduct(props.product);
	};
</script>

<template>
    <div class="relative transition-all duration-500 frame group hover:-translate-y-3">
        <div class="card flex flex-col justify-between text-center relative transition-shadow duration-500 group-hover:shadow-[0px_10px_15px_0px_#0000001A]">
            <div>
                <div class="flex flex-row items-center justify-between">
                    <p><Icon name="material-symbols:favorite-outline" class="text-gray-900 icon-xl" /></p>
                    <p id="tag" class="px-3 py-2 font-semibold text-white bg-blue-300 rounded-lg tags font-saira text-label1 radius">NOVO</p>
                </div>
        
                <img :src="product.gallery[0]" alt="product thumb" class="max-h-[320px] max-w-[85%] mx-auto">
            </div>

            <div class="flex flex-row justify-center gap-2 pt-6">
                <p class="font-bold text-blue-900 font-saira text-h6-normal">{{ product.price }} €</p> 
                <span class="font-bold text-blue-900 font-saira text-h6-normal">|</span>
                <p class="font-bold text-blue-500 font-saira text-h6-normal ">{{ product.price }} €</p>
                <UPopover :popper="{ placement: 'top-start' }" :ui="{ring:'ring-0', background:'dark:bg-blue-50 bg-blue-50'}">
                    <UButton trailing-icon="mynaui:info-hexagon" class="bg-white dark:bg-white shadow-none hover:bg-white dark:hover:bg-white dark:text-blue-500 p-0 mt-[2px]" />
                    <template #panel>
                        <div class="px-3 py-2">
                        <p class="font-bold text-gray-900 font-roboto text-body4">Cijena za članove</p>
                        </div>
                    </template>
                </UPopover>
            </div>

            <div class="transition-opacity duration-300 opacity-0 middle group-hover:opacity-100">
                <NuxtLink :to="`/products/${product.id}`" class="font-semibold btn-primary medium">ODABERI OPCIJE</NuxtLink>
                <UButton @click="addToCart" class="font-semibold btn-primary medium" >DODAJ U KOŠARICU</UButton>
            </div>
        </div>
        <!--<p> {{ product.category}}</p>-->
        <p class="p-2 mt-2 font-semibold text-center text-blue-900 font-saira text-h5-normal">{{ product.title }}</p>
    </div>
</template>

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
