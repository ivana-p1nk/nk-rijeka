<script setup lang="ts">
import { useCartStore } from '~/composables/useCart'

defineProps<{
    submitForm: () => void
    term: () => void
    termMessage: string
    loadingForm: boolean
}>()

const cartStore = useCartStore()

const coupon = ref('')
const emit = defineEmits(['useCoupon'])
</script>

<template>
    <div class="md:p-10 p-5 rounded-lg bg-[#D9F1FD]">
        <p class="text-h6-desktop font-saira font-bold">VAŠA NARUDŽBA</p>

        <div class="w-full h-[1px] bg-[#A9DCF7] my-4"></div>

        <div v-if="cartStore.coupon" class="flex items-center gap-2">
            <UInput
                icon="cuida:ticket-outline"
                v-model="cartStore.coupon.code"
                disabled
                size="xl"
                class="w-full"
                variant="outline"
            />
            <button @click="cartStore.deleteCoupon" class="uppercase bg-red-600 text-white btn-secondary large w-52">
                Obriši kupon
            </button>
        </div>
        <div v-else class="flex items-center gap-2">
            <UInput
                icon="cuida:ticket-outline"
                v-model="coupon"
                size="xl"
                variant="outline"
                class="w-full focus:ring-blue-500"
                color="gray"
            />
            <button @click="$emit('useCoupon', coupon)" class="uppercase btn-secondary large w-52">Iskoristi kupon</button>
        </div>

        <div class="w-full h-[1px] bg-[#A9DCF7] my-4"></div>

        <p class="flex items-center justify-between text-xl font-normal">
            <span>Ukupno za plaćanje:</span>
            <span>{{ cartStore.totalPriceQuantity.total.toFixed(2).replace('.', ',') }} €</span>
        </p>

        <div class="w-full h-[1px] bg-[#A9DCF7] my-4"></div>

        <p>
            Vaši osobni podaci koristit će se za obradu vaše narudžbe, pružanja boljeg iskustva na web stranici i u
            druge svrhe opisane u našim <a href="#" class="link-plavi body4 underline font-semibold">pravilima privatnosti</a>.
        </p>

        <UCheckbox v-on:change="term" id="gdpr" name="terms" class="mt-4" color="blue">
            <template #label>
                <p class="font-normal">
                    Prihvaćam i slažem se sa
                    <NuxtLink to="/opci-uvjeti" class="link-plavi body4 underline font-semibold"
                        >uvjetima prodaje</NuxtLink
                    >
                    i
                    <NuxtLink to="/zastita-podataka" class="link-plavi body4 underline font-semibold"
                        >pravilima privatnosti</NuxtLink
                    >
                    <span class="text-red-500"> *</span>
                </p>
            </template>
        </UCheckbox>

        <p v-if="termMessage != ''" class="text-sm italic font-medium text-red-500">{{ termMessage }}</p>

        <UButton
            :disabled="loadingForm"
            :loading="loadingForm"
            @click="submitForm"
            id="btn-order-and-pay"
            data-location="cart-total-checkout"
            class="w-full px-5 py-3 mt-4 font-bold text-white uppercase rounded-lg"
            style="background: linear-gradient(79.46deg, #0083c9 3.18%, #58b6e7 107.55%)"
        >
            naruči i plati
        </UButton>
    </div>
</template>

<style scoped>
:deep(.form-input:focus) {
    --tw-ring-color: #009ff5;
}


</style>
