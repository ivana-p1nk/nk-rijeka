<template>
    <div>
        <p class="text-body2 text-gray-900 pt-5 pb-2">
            Proizvod trenutno nije na stanju. Obavijesti me kada proizvod bude dostupan.
        </p>
        <form @submit.prevent="submitForm" class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <input
                v-model="email"
                type="email"
                placeholder="E-mail"
                class="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            />
            <button type="submit" class="btn-primary font-bold font-sarira label1 px-6 py-2">POŠALJI</button>
        </form>
        <div class="flex items-start mt-2">
            <input type="checkbox" id="gdpr" v-model="accepted" class="mr-2" />
            <label for="gdpr" class="text-body4 text-color-900">
                Prihvaćam i slažem se sa
                <NuxtLink to="/opci-uvjeti" class="link-plavi body4 underline font-semibold">uvjetima prodaje</NuxtLink>
                i
                <NuxtLink to="/zastita-podataka" class="link-plavi body4 underline font-semibold"
                    >pravilima privatnosti</NuxtLink
                >.
            </label>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const { api } = useAxios()
const toast = useToast()

const props = defineProps({
    productId: Number,
    variationId: Number | undefined,
})

const email = ref('')
const accepted = ref(false)

const submitForm = () => {
    if (!accepted.value) {
        toast.add({
            title: 'Molimo prihvatite politiku privatnosti.',
            color: 'red',
            timeout: 3000,
        })
        return
    }

    try {
        api.post('/notify-product-in-stock', {
            email: email.value,
            product_id: props.productId,
            variation_id: props.variationId || null,
        })
            .then(({ data }) => {
                toast.add({
                    title: 'Hvala! Obavijestit ćemo vas kada proizvod ponovno bude dostupan.',
                    color: 'green',
                    timeout: 3000,
                })
                email.value = ''
                accepted.value = false
            })
            .catch((error) => {
                toast.add({
                    title: 'Došlo je do greške. Pokušajte ponovno kasnije.',
                    color: 'red',
                    timeout: 3000,
                })
            })
    } catch (error) {
        toast.add({
            title: 'Došlo je do greške. Pokušajte ponovno kasnije.',
        })
    }
}
</script>
