<script setup lang="ts">
    import type { IProduct } from '~/types/product';
    
    const props = defineProps<{ product: IProduct; }>();
</script>

<template>
    <div>
        <div class="grid grid-cols-2 gap-10">
            <div class="p-5 bg-white border border-neutralBlue-100 h-fit">
                <div class="flex flex-row items-center justify-between">
                    <p><Icon name="material-symbols:favorite-outline" class="text-gray-900 icon-xl" /></p>
                    <p id="tag" class="px-3 py-2 font-semibold text-white bg-blue-300 rounded-lg tags font-saira text-label1 radius">NOVO</p>
                </div>
                <img :src="product.gallery[0]" alt="product img" class="mx-auto my-7">
            </div>
            <div class="p-7" >
                <p class="font-normal text-blue-900 font-roboto text-body2">
                    <NuxtLink class="text-blue-400 " to="/">Početna /</NuxtLink>
                     <span class="uppercase">Breadcrumbs</span>
                </p>
                <h1 class="my-6 font-medium text-blue-900 font-saira text-h1-normal">{{ product.title }}</h1>
                <!-- details-->
                <div>
                    <p class="text-gray-900 font-roboto fontnormal text-body2"><span class="font-bold">
                        Opis: </span>{{ product.description }}</p>
                    <p class="text-gray-900 font-roboto fontnormal text-body2"><span class="font-bold">
                        Boja: </span> </p>
                    <p class="text-gray-900 font-roboto fontnormal text-body2"><span class="font-bold">
                        Sastav: </span> </p>
                </div>
                <!--price-->
                <div class="flex flex-col gap-3 my-7 py-7 border-y border-neutralBlue-100">
                    <div class="flex flex-row gap-3">
                        <p class="font-semibold text-blue-900 font-saira text-h4-normal">{{ product.price }} €</p>
                        <p class="flex items-center px-3 py-1 font-bold text-white uppercase bg-gray-900 rounded-lg font-saira text-label1">REDOVNA CIJENA</p>
                    </div>
                    <div class="flex flex-row gap-3">
                        <p class="font-semibold text-blue-300 font-saira text-h4-normal">{{ product.price }} €</p>
                        <p class="flex items-center px-3 py-1 font-bold text-white uppercase bg-blue-300 rounded-lg font-saira text-label1">CIJENA ZA ČLANOVE</p>
                    </div>
                </div>

                <button class="flex flex-row items-center gap-2 uppercase btn-secondary xl w-fit">
                    Personaliziraj
                    <Icon name="streamline:shopping-cart-1" class="text-gray-900 icon-large" />
                </button>

                <!--veličina-->
                <div class="border-b py-7 border-neutralBlue-100">
                    <p class="font-bold text-gray-900 font-saira text-h6-normal">Veličina</p>
                    <div class="flex flex-row gap-1 py-3">
                        <button class="btn-secondary xl btn-size" >S</button>
                        <button class="btn-secondary xl btn-size">M</button>
                        <button class="btn-secondary xl btn-size">L</button>
                        <button class="btn-secondary xl btn-size">XL</button>
                        <button class="btn-secondary xl btn-size">2XL</button>
                        <button class="btn-secondary xl btn-size"> 3XL</button>
                    </div>
                    <NuxtLink to="" class="font-normal text-gray-900 underline font-roboto text-body2">Pogledajte tablicu veličina</NuxtLink>
                    <div class="flex flex-row gap-4 mt-7">
                        <div class="flex flex-row items-center gap-1">
                            <button class="btn-secondary xl btn-size" >-</button>
                            <button class="btn-secondary xl btn-size">01</button>
                            <button class="btn-secondary xl btn-size">+</button>
                        </div>
                        <button class="flex flex-row items-center gap-2 uppercase btn-primary large w-fit">
                        Dodaj u košaricu
                        <Icon name="streamline:shopping-cart-1" class="text-white icon-large" />
                        </button>
                    </div>
                </div>

                <div class="pt-7">
                    <p class="pb-3 text-gray-900 font-roboto fontnormal text-body2"><span class="font-bold">
                        Model: </span>{{ product.model }}
                    </p>
                    <p class="text-gray-900 font-roboto fontnormal text-body2"><span class="font-bold">
                        Kategorija: </span>{{ product.category }}
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
                                <a class="circle-page" href="https://www.facebook.com/nk.rijeka" target="_blank">
                                    <Icon name="brandico:facebook" class="text-white icon-small" />
                                </a>
                            </li>
                            <li>
                                <a class="circle-page" href="https://www.instagram.com/nk_rijeka" target="_blank">
                                    <Icon name="hugeicons:instagram" class="text-white icon-small" />
                                </a>
                            </li>
                            <li>
                                <a class="circle-page" href="https://x.com/nkrijeka?mx=2" target="_blank">
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
