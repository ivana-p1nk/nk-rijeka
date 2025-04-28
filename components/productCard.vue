<script setup lang="ts">
import { useCartStore } from '~/composables/useCart'
import type { IProduct } from '~/types/product'
import { useRouter } from 'vue-router'
import type { IUser } from '~/types/user'

const props = defineProps<{ product: IProduct }>()
const router = useRouter()
const toast = useToast()
const user = useSanctumUser() as Ref<IUser | null>

const cartStore = useCartStore()

const addToCart = () => {
    cartStore.addCartProduct(props.product, undefined, false, user.value?.role ?? 'guest')

    toast.add({
        icon: 'solar:check-circle-broken',
        title: `Proizvod "${props.product.title}" je uspješno dodan u vašu košaricu.`,
        description: `Kliknite ovdje za pregled košarice`,
        color: 'green',
        click: () => {
            router.push('/cart')
        },
    })
}
</script>

<template>
    <div class="relative transition-all duration-500 frame group hover:-translate-y-3">
        <div
            class="card flex flex-col justify-between text-center relative transition-shadow duration-500 group-hover:shadow-[0px_10px_15px_0px_#0000001A]"
        >
            <div>
                <div class="flex flex-row items-center justify-between">
                    <div v-if="useFavoritesStore().isFavorite(props.product)">
                        <Icon
                            @click="useFavoritesStore().removeFavoriteProduct(props.product)"
                            name="material-symbols:favorite"
                            class="text-blue-500 icon-xl"
                        />
                    </div>
                    <div v-else>
                        <Icon
                            @click="useFavoritesStore().addFavoriteProduct(props.product)"
                            name="material-symbols:favorite-outline"
                            class="text-gray-900 icon-xl"
                        />
                    </div>
                    <p
                        id="tag"
                        class="px-3 py-2 font-semibold text-white bg-blue-300 rounded-lg tags font-saira text-label1 radius"
                    >
                        NOVO
                    </p>
                </div>

                <img :src="product.gallery[0]" alt="product thumb" class="max-h-[320px] max-w-[85%] mx-auto" />
            </div>

            <div class="flex flex-row justify-center gap-2 pt-6">
                <p class="font-bold text-blue-900 font-saira text-h6-normal">
                    {{ product.price.toFixed(2).replace('.', ',') }} €
                </p>
                <span class="font-bold text-blue-900 font-saira text-h6-normal">|</span>
                <p class="font-bold text-blue-500 font-saira text-h6-normal">
                    {{ product.member_price.toFixed(2).replace('.', ',') }} €
                </p>
                <UPopover
                    :popper="{ placement: 'top-start' }"
                    :ui="{ ring: 'ring-0', background: 'dark:bg-blue-50 bg-blue-50' }"
                >
                    <UButton
                        trailing-icon="mynaui:info-hexagon"
                        class="bg-white shadow-none hover:bg-white text-blue-500 p-0 mt-[2px]"
                    />

                    <template #panel>
                        <div class="px-3 py-2">
                            <p class="font-bold text-gray-900 font-roboto text-body4">Cijena za članove</p>
                        </div>
                    </template>
                </UPopover>
            </div>

            <div class="transition-opacity duration-300 opacity-0 middle group-hover:opacity-100">
                <NuxtLink :to="`/products/${product.id}`" class="font-semibold btn-primary large active:bg-blue-800">
                    {{ product.variations?.length > 0 ? 'ODABERI OPCIJE' : 'POGLEDAJ VIŠE' }}
                </NuxtLink>

                <UButton
                    v-if="product.variations?.length < 1"
                    @click="addToCart"
                    size="lg"
                    variant="solid"
                    :ui="{
                        base: 'text-white font-saira font-semibold',
                        variant: {
                            solid: 'bg-blue-600 hover:bg-blue-700 active:bg-800',
                        },
                    }"
                    class="text-[15px] flex justify-center focus:outline-none focus:ring-0 active:bg-blue-800 transition-colors duration-200 font-saira font-semibold"
                >
                    DODAJ U KOŠARICU
                </UButton>
            </div>
        </div>
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
    gap: 6px;
    width: 60%;
}
</style>
