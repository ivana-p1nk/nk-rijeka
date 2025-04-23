<script setup lang="ts">
    import type { IProduct } from '~/types/product';
    import { useCartStore } from "~/composables/useCart";
    import { useNotification } from '~/composables/useNotification';
    import BannerNotification from '~/components/Product/BannerNotification.vue'; 
    import Gallery from './Gallery.vue'
    import { SidebarPersonalize } from '#components';

    const props = defineProps<{ product: IProduct; }>();

    const cartStore = useCartStore();
    const selectedVariationId = ref<number | null>(null);

    const updateSelectedVariation  = (id: number | null) => {
    if (selectedVariationId.value === id) {
        selectedVariationId.value = null; 
    } else {
        selectedVariationId.value = id; 
    }
    };

    const {
        showNotification,
        triggerNotification,
        closeNotification,
        notificationBanner
    } = useNotification();

    const addToCart = () => {
    if (props.product.variations && props.product.variations.length && selectedVariationId.value === null) {
        alert("Molimo odaberite veličinu prije dodavanja u košaricu.");
        return;
    }

    cartStore.addCartProduct(props.product, selectedVariationId.value ?? undefined);
    triggerNotification();

    selectedVariationId.value = null;
    cartStore.orderQuantity = 1;
    };

    /* SHARE PRODUCT */
    //Dohvati trenutni URL proizvoda 
    import { useRoute, useRuntimeConfig } from 'nuxt/app'; 
    const route = useRoute();
    const config = useRuntimeConfig();

    const currentUrl = computed(() => {
    return `${config.public.siteUrl}${route.fullPath}`;
    });

    const facebookShare = computed(() => 
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl.value)}`
    );

    const twitterShare = computed(() => 
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl.value)}&text=${encodeURIComponent(props.product.title)}`
    );


</script>


<template>
    <div class="container mx-auto px-5 pt-32 pb-20">

        <!--Banner Added to Cart -->
        <div ref="notificationBanner" class="h-32 w-full flex items-center justify-center overflow-hidden">
            <BannerNotification
                :show="showNotification"
                :title="product.title"
                @close="closeNotification"
            />
        </div>

        <div class="grid grid-cols-2 gap-10">

            <!-- PRVI STUPAC: Product Gallery -->
            <div class="p-5 bg-white border border-neutralBlue-100 h-fit">
              
                <div class="flex flex-row items-center justify-between">
                    <div v-if="useFavoritesStore().isFavorite(props.product)">
                        <Icon 
                            @click="useFavoritesStore().removeFavoriteProduct(props.product)" 
                            name="material-symbols:favorite" 
                            class="text-blue-500 icon-xl" />
                    </div>
                    <div v-else>
                        <Icon 
                            @click="useFavoritesStore().addFavoriteProduct(props.product)" 
                            name="material-symbols:favorite-outline" 
                            class="text-gray-900 icon-xl" />
                    </div>
                    <p id="tag" class="px-3 py-2 font-semibold text-white bg-blue-300 rounded-lg tags font-saira text-label1 radius">NOVO</p>
                </div>
                <Gallery :product="product" />
                
            </div>

            <!-- DRUGI STUPAC: Product Details-->
            <div class="px-7 pb-7" >

                <p class="font-normal text-blue-900 font-roboto text-body2">
                <UBreadcrumb
                    divider="/"
                    :links="[
                    { label: 'Početna', to: '/' },
                    { 
                        label: product.category?.title || 'No Category', 
                        to: product.category?.slug ? `/categories/${encodeURIComponent(product.category.slug)}` : '/categories/no-category'
                    },
                    { label: product.title }
                    ]"
                />
                </p>

                <h1 class="my-6 font-medium text-blue-900 font-saira text-h1-normal">{{ product.title }}</h1>

                <div v-if="product.description">
                    <p class="text-gray-900 font-roboto fontnormal text-body2">
                        <span class="font-bold inline-block mr-2">Opis:</span>
                        <span v-html="product.description" class="inline-block"></span>
                    </p>
                </div>

                <!-- Dvojna cijena  -->
                <div class="flex flex-col gap-3 my-7 py-7 border-y border-neutralBlue-100">
                    <div class="flex flex-row gap-3">
                        <p class="font-semibold text-blue-900 font-saira text-h4-normal">{{ product.price.toFixed(2).replace('.', ',') }} €</p>
                        <p class="flex items-center px-3 py-1 font-bold text-white uppercase bg-gray-900 rounded-lg font-saira text-label1">REDOVNA CIJENA</p>
                    </div>
                    <div class="flex flex-row gap-3">
                        <p class="font-semibold text-blue-300 font-saira text-h4-normal">{{ product.member_price.toFixed(2).replace('.', ',') }} €</p>
                        <p class="flex items-center px-3 py-1 font-bold text-white uppercase bg-blue-300 rounded-lg font-saira text-label1">CIJENA ZA ČLANOVE</p>
                    </div>
                </div>

                
                <div class="border-b border-neutralBlue-100">

                    <div>
                        <!-- Personaliziraj -->
                        <SidebarPersonalize 
                        :product="product" 
                        :selectedVariationId="selectedVariationId" 
                        @update-selected-variation="updateSelectedVariation"
                        />
                    </div>
                    
                    
                    <!-- veličina -->
                    <div v-if="product.variations && product.variations.length" class="pt-7">
                        <p class="font-bold text-gray-900 font-saira text-h6-normal">Veličina</p>

                        <div class="flex flex-wrap flex-row gap-1 py-3">
                            <button
                            v-for="variation in product.variations"
                            :key="variation.id"
                            :class="[
                                'btn-variations', 
                                'xl', 
                                'btn-size', 
                                'w-fit', 
                                { 
                                    'active-variation': selectedVariationId === variation.id, 
                                    'hover:bg-blue-50': selectedVariationId !== variation.id 
                                }]"
                             @click="updateSelectedVariation(variation.id)">
                            {{ variation.packaging }}
                        </button>
                        </div>

                        <NuxtLink to="/tablica-velicina" class="font-normal text-gray-900 underline font-roboto text-body2 link-plavi">
                            Pogledajte tablicu veličina
                        </NuxtLink>
                    </div>

        
                    
                    <div class="flex flex-row gap-4 mt-7 pb-7">

                        <!--količina-->
                        <div class="flex flex-row items-center gap-1">
                            <button class="btn-icon-secondary square-large rounded-md flex items-center justify-center border-[1.4px]"
                                @click="cartStore.decrement(product.minimum_quantity || 1)"
                                 >
                                <UIcon name="heroicons:minus" />
                            </button>
                            <input class="bg-white border-blue-300 border-[1.4px] square-large rounded-lg text-center" type="text"
                                :min="product.minimum_quantity" :value="cartStore.orderQuantity" disabled />
                            <button class="btn-icon-secondary square-large rounded-md flex items-center justify-center border-[1.4px]" @click="cartStore.increment()">
                                <UIcon name="heroicons:plus"/>
                            </button>
                        </div>

                        <UButton
                            @click="addToCart"
                            size="lg"
                            variant="solid"
                            :ui="{
                                base: 'text-white font-saira font-semibold',
                                variant: {
                                solid: 'bg-blue-600 hover:bg-blue-700 active:bg-800'
                                }
                            }"
                            class="px-5 uppercase text-[15px] flex justify-center focus:outline-none focus:ring-0 active:bg-blue-800 transition-colors duration-200 font-saira font-semibold "
                            >
                            Dodaj u košaricu
                            <Icon name="streamline:shopping-cart-1" class="text-white icon-medium" />
                        </UButton>
                    </div>
                    
                </div>

                <div class="pt-7">
                    <p class="pb-3 text-gray-900 font-roboto fontnormal text-body2"><span class="font-bold">
                        Šifra: </span><!--{{ product.sku }}-->
                    </p>
                    <p class="text-gray-900 font-roboto fontnormal text-body2"><span class="font-bold">
                        Kategorija: </span>{{ product.category.title }}
                    </p>
                </div>

                <div class="pt-6 pb-7">
                    <p class="font-normal text-blue-900 font-roboto text-body3">* Personalizacija dresova i hlačica tiska se po fontu sezone 2024/25<br><br>
                        * Molimo da prilikom preuzimanja pošiljke, u prisustvu djelatnika Hrvatske pošte, 
                        utvrdite eventualna oštećenja ili manjkavost.
                    </p>
                </div>

                <div>
                    <p class="font-bold text-gray-900 font-saira text-h6-normal">Podijeli</p>
                    <ul class="inline-flex gap-2 mt-2">
                        <li>
                            <a class="circle-page" :href="facebookShare" target="_blank" rel="noopener">
                                <Icon name="brandico:facebook" class="text-white icon-small" />
                            </a>
                        </li>
                        <li>
                            <a class="circle-page" :href="twitterShare" target="_blank" rel="noopener">
                                <Icon name="garden:twitter-stroke-12" class="text-white icon-xs" />
                            </a>
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style scoped>
    img {
        max-width:400px;
    }
</style>
