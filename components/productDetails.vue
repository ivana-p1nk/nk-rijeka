<template>
    <div>
        <div class="grid grid-cols-2 gap-10">
            <div class="p-5 bg-white border border-neutralBlue-100">
                <div class="flex flex-row justify-between items-center">
                    <p><Icon name="material-symbols:favorite-outline" class="icon-xl text-gray-900" /></p>
                    <p id="tag" class="tags bg-blue-300 font-saira font-semibold text-label1 text-white px-3 py-2 radius rounded-lg">NOVO</p>
                </div>
                <img :src="product.image" alt="product img" class="mx-auto my-7">
            </div>
            <div class="p-7" >
                <p class="font-roboto font-normal text-body2 text-blue-900">
                    <NuxtLink class="text-blue-400 " to="/">Početna /</NuxtLink>
                     <span class="uppercase">Breadcrumbs</span>
                </p>
                <h1 class="font-saira font-medium text-h1-normal text-blue-900 my-6">{{ product.title }}</h1>
                <!-- details-->
                <div>
                    <p class="font-roboto fontnormal text-body2 text-gray-900"><span class="font-bold">
                        Opis:</span>{{ product.description }}</p>
                </div>
                <!--price-->
                <div class="flex flex-col gap-3 my-7 py-7 border-y border-neutralBlue-100">
                    <div class="flex flex-row gap-3">
                        <p class="font-saira font-semibold text-h4-normal text-blue-900">{{ product.price }} €</p>
                        <p class="bg-gray-900 py-1 px-3 rounded-lg uppercase font-saira font-bold text-label1 text-white flex items-center">REDOVNA CIJENA</p>
                    </div>
                    <div class="flex flex-row gap-3">
                        <p class="font-saira font-semibold text-h4-normal text-blue-300">{{ product.price }} €</p>
                        <p class="bg-blue-300 py-1 px-3 rounded-lg uppercase font-saira font-bold text-label1 text-white flex items-center">CIJENA ZA ČLANOVE</p>
                    </div>
                </div>

                <button class="btn-secondary xl flex flex-row items-center gap-2 w-fit uppercase">
                    Personaliziraj
                    <Icon name="material-symbols:favorite-outline" class="icon-xl text-gray-900" />
                </button>

                <!--veličina-->
                <div class="py-7 border-b border-neutralBlue-100">
                    <p class="font-saira font-bold text-h6-normal text-gray-900">Veličina</p>
                    <div class="flex flex-row gap-1 py-3">
                        <button class="btn-secondary xl" >S</button>
                        <button class="btn-secondary xl">M</button>
                        <button class="btn-secondary xl">L</button>
                        <button class="btn-secondary xl">XL</button>
                        <button class="btn-secondary xl">2XL</button>
                        <button class="btn-secondary xl"> 3XL</button>
                    </div>
                    <NuxtLink to="" class="font-roboto font-normal text-body2 text-gray-900 underline">Pogledajte tablicu veličina</NuxtLink>
                    <div class="flex flex-row gap-4 mt-7">
                        <div class="flex flex-row gap-1">
                            <button class="btn-secondary xl" >-</button>
                            <button class="btn-secondary xl">01</button>
                            <button class="btn-secondary xl">+</button>
                        </div>
                        <button class="btn-primary xl flex flex-row gap-2 items-center w-fit uppercase">
                        Dodaj u košaricu
                        <Icon name="material-symbols:favorite-outline" class="icon-xl text-white" />
                        </button>
                    </div>
                </div>

                <div class="pt-7">
                    <p class="font-roboto fontnormal text-body2 text-gray-900 pb-3"><span class="font-bold">
                        Model: </span>{{ product.model }}
                    </p>
                    <p class="font-roboto fontnormal text-body2 text-gray-900"><span class="font-bold">
                        Kategorija: </span>{{ product.category }}
                    </p>
                </div>

                <div class="pt-6 pb-7">
                    <p class="font-roboto font-normal text-body3 text-blue-900">* Personalizacija dresova i hlačica tiska se po fontu sezone 2024/25<br><br>
                        * Molimo da prilikom preuzimanja pošiljke, u prisustvu djelatnika Hrvatske pošte, 
                        utvrdite eventualna oštećenja ili manjkavost.
                    </p>
                </div>

                <div>
                    <p class="font-saira font-bold text-h6-normal text-gray-900">Podijeli</p>
                    <ul class="inline-flex gap-2">
                            <li>
                                <a class="circle-footer" href="https://www.facebook.com/nk.rijeka" target="_blank">
                                    <Icon name="brandico:facebook" class="custom-blue" />
                                </a>
                            </li>
                            <li>
                                <a class="circle-footer" href="https://www.instagram.com/nk_rijeka" target="_blank">
                                    <Icon name="hugeicons:instagram" class="custom-blue" />
                                </a>
                            </li>
                            <li>
                                <a class="circle-footer" href="https://x.com/nkrijeka?mx=2" target="_blank">
                                    <Icon name="garden:twitter-stroke-12" class="custom-blue" />
                                </a>
                            </li>
                        </ul>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
    const { product} = defineProps(['product'])
</script>

<style scoped>

img {
    max-width:400px;
}

</style>
