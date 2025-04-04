<script setup lang="ts">
import type { IProduct } from '~/types/product';
const config = useRuntimeConfig();
import ProductCard from '@/components/productCard.vue'

const products = ref<IProduct[]>([]);
const loading = ref(false);

const fetchData = async () => {
    loading.value = true;

    try {
        const { data: productData } = await useFetch(`${config.public.url}/products`);

        // @ts-ignore
        products.value = productData.value.data || [];
    
    } catch (error) {
    loading.value = false;
        console.error('Došlo je do greške pri učitavanju proizvoda:', error);
    } finally {
        loading.value = false;
    }
};

const carouselNew = ref()

onMounted(() => {
    fetchData();

    setInterval(() => {
        if (!carouselNew.value) return
        if (carouselNew.value.page === carouselNew.value.pages) {
            return carouselNew.value.select(0)
        }
        carouselNew.value.next()
    }, 3000)
});
</script>


<template>
    <div class="bg-igraci">
        <div class="container mx-auto pt-52 pb-12 px-5">

            <h1 class="font-saira font-medium text-h1-normal text-gray-900 pb-6 md:pb-20">
                Favoriti
            </h1>
            
            <div>
                <!-- PROIZVODI-->
            </div>

            <div class="container mx-auto border-t border-neutralBlue-100 pt-8">
                <div class="flex flex-col items-center gap-1 pb-10">
                    <h1 class="font-bold text-blue-900 uppercase font-saira text-h2-normal">BESTSELLERI</h1>
                    <p class="font-normal text-blue-900 font-roboto text-body1">Počasti se novim dresom, odabri atraktivan <br>poklon, ne propusti promotivne cijene...</p>
                </div>
                
                <UCarousel 
                    v-if="products.length > 0"
                    v-slot="{ item }"
                    indicators 
                    :items="products"
                    :ui="{ item: 'basis-1/4',
                        indicators: {
                            wrapper: 'flex gap-2 mt-8',  
                            indicator: 'w-2 h-2 bg-customColors-300 rounded-full transition-all duration-300', 
                            active: 'bg-blue-800 w-2 h-2'
                        }
                    }" >
                    <ProductCard :product="item" class="pt-6" />
                </UCarousel>
            </div>
       
        </div>
    </div>
</template>
