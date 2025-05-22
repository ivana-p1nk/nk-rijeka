<template>
    <div>
        <!-- PERSONALIZIRAJ BUTTON -->
        <button
            @click="show = true"
            :class="[
                'group flex flex-row items-center gap-2 uppercase medium w-fit transition-colors duration-300',
                show ? 'btn-secondary-focus' : 'btn-secondary',
            ]"
        >
            PERSONALIZIRAJ
            <Icon
                name="streamline:shopping-cart-1"
                :class="[
                    'icon-large transition-colors duration-300 group-active:text-white',
                    show ? 'text-white' : 'text-gray-900',
                ]"
            />
        </button>

        <!-- SIDEBAR CONTENT  -->
        <Offcanvas :isOpen="show" @close="show = false">
            <div>
                <h1 class="text-h4-normal font-semibold font-saira mb-4 text-blue-900">Personalizacija</h1>

                <div v-if="product?.gallery?.length" class="bg-white rounded-lg p-3 border border-neutralBlue-100">
                    <img :src="product.gallery[0]" alt="Product Image" class="mx-auto rounded-lg max-w-full h-auto" />
                </div>

                <div>
                    <!-- Input za slova -->
                    <div class="mt-4">
                        <label for="textInput" class="block text-body3 text-blue-900 mb-1">Upiši ime</label>
                        <input
                            id="textInput"
                            v-model="textInput"
                            type="text"
                            maxlength="12"
                            pattern="[A-Za-zČĆŽŠĐčćžšđ ]*"
                            class="input-style w-full border text-body3 border-neutralBlue-300 rounded-lg p-3 outline-none"
                            placeholder="Maksimalno 12 znakova"
                        />
                        <p class="text-xs text-blue-900 text-right mt-1 mr-2">
                            {{ textInputPrice.toFixed(2).replace('.', ',') }} €
                        </p>
                    </div>

                    <!-- Input za brojeve -->
                    <div>
                        <label for="numberInput" class="block text-body3 text-blue-900 mb-1">Upiši broj</label>
                        <input
                            id="numberInput"
                            v-model="numberInput"
                            type="text"
                            maxlength="2"
                            pattern="[0-9]*"
                            class="input-style w-full border text-body3 border-neutralBlue-300 rounded-lg p-3 outline-none"
                            placeholder="Maksimalno 2 znaka"
                        />
                        <p class="text-xs text-blue-900 text-right mt-1 mr-2">
                            {{ numberInputPrice.toFixed(2).replace('.', ',') }} €
                        </p>
                    </div>
                </div>

                <!-- Veličine -->
                <div
                    v-if="product.variations && product.variations.length"
                    class="my-4 pb-1 pt-4 border-y border-neutralBlue-100"
                >
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
                                'px-4',
                                {
                                    'active-variation': selectedVariationId === variation.id,
                                    'hover:bg-blue-50': selectedVariationId !== variation.id,
                                },
                            ]"
                            @click="updateVariation(variation.id)"
                        >
                            {{ variation.packaging }}
                        </button>
                    </div>
                </div>

                <div class="flex flex-row justify-between">
                    <!-- količina -->
                    <div v-if="selectedVariation && selectedVariation.quantity === 0" class="bg-red-500 text-label1 font-saira font-semibold text-white rounded-lg py-3 px-5 w-fit">
                        RASPRODANO
                    </div>
                    <template v-else>
                        <div class="flex flex-row items-center gap-1">
                            <button
                                class="btn-icon-secondary square-large rounded-md flex items-center justify-center border-[1.4px]"
                                @click="cartStore.decrement(product.minimum_quantity || 1)"
                            >
                                <UIcon name="heroicons:minus" />
                            </button>
                            <input
                                class="bg-white border-blue-300 border-[1.4px] square-large rounded-lg text-center"
                                type="text"
                                :min="product.minimum_quantity"
                                :value="cartStore.orderQuantity"
                                disabled
                            />
                            <button
                                class="btn-icon-secondary square-large rounded-md flex items-center justify-center border-[1.4px]"
                                @click="cartStore.increment()"
                            >
                                <UIcon name="heroicons:plus" />
                            </button>
                        </div>

                        <!-- košarica -->
                        <UButton
                            @click="addToCart"
                            size="lg"
                            variant="solid"
                            :ui="{
                                base: 'text-white font-saira font-semibold',
                                variant: {
                                    solid: 'bg-blue-600 hover:bg-blue-700 active:bg-800',
                                },
                            }"
                            class="px-5 uppercase text-[15px] flex justify-center focus:outline-none focus:ring-0 active:bg-blue-800 transition-colors duration-200 font-saira font-semibold"
                        >
                            Dodaj u košaricu
                            <Icon name="streamline:shopping-cart-1" class="text-white icon-medium" />
                        </UButton>
                    </template>
                </div>
            </div>
        </Offcanvas>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Offcanvas from '~/components/Sidebar/Offcanvas.vue'
import { useCartStore } from '~/composables/useCart'
import type { IProduct } from '~/types/product'
import { useRouter } from 'vue-router'

import type { IUser } from '~/types/user'
const user = useSanctumUser() as Ref<IUser | null>

const router = useRouter()
const toast = useToast()

const textInput = ref('')
const numberInput = ref('')

const textInputPrice = ref(0)
const numberInputPrice = ref(0)

watch(textInput, (val) => {
    textInputPrice.value = val.trim() ? 5.3 : 0
})

watch(numberInput, (val) => {
    const digits = val.trim()
    if (digits.length === 1) {
        numberInputPrice.value = 5.3
    } else if (digits.length === 2) {
        numberInputPrice.value = 10.6
    } else {
        numberInputPrice.value = 0
    }
})

const props = defineProps<{ product: IProduct; selectedVariationId: number | null }>()
const emit = defineEmits(['update-selected-variation'])
const cartStore = useCartStore()

const selectedVariation = computed(() =>
    props.product.variations?.find(v => v.id === selectedVariationId.value) || null
)

const show = ref(false)
const selectedVariationId = computed({
    get: () => props.selectedVariationId,
    set: (val) => emit('update-selected-variation', val),
})

const updateVariation = (id: number) => {
    selectedVariationId.value = id
}

const addToCart = () => {
    if (!/^[A-Za-zČĆŽŠĐčćžšđ ]{1,12}$/.test(textInput.value)) {
        alert('Molim vas unesite samo slova - bez brojeva i posebnih znakova!')
        return
    }

    if (!/^[0-9]{1,2}$/.test(numberInput.value)) {
        alert('Molim vas unesite samo broj - bez slova i posebnih znakova!')
        return
    }

    if (!selectedVariationId.value) {
        alert('Molimo odaberite veličinu prije dodavanja u košaricu.')
        return
    }

    const totalPrice = textInputPrice.value + numberInputPrice.value

    const structureData = {
        ...props.product,
        textInput: textInput.value,
        numberInput: numberInput.value,
        personalizationPrice: totalPrice,
        textInputAddonPrice: textInputPrice.value,
        numberInputAddonPrice: numberInputPrice.value,
    }

    cartStore.addCartProduct(structureData, selectedVariationId.value, true, user.value?.role ?? 'guest')

    textInput.value = ''
    numberInput.value = ''
    show.value = false

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
