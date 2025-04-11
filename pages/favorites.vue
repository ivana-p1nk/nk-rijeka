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

    const favorites = useFavoritesStore().favorite_products;

    watch([favorites], () => {
        console.log('ok');
    });
</script>


<template>
    <div class="bg-igraci">
        <div class="container px-5 pb-12 mx-auto pt-52">

            <h1 class="pb-6 font-medium text-gray-900 font-saira text-h1-normal md:pb-20">
                Favoriti
            </h1>
            
            <div v-if="favorites.length > 0" class="grid grid-cols-1 gap-4 py-4 md:grid-cols-4">
                <div
                    v-for="item in favorites"
                    :key="`${item.id}`"
                >
                    <ProductCard :product="item" />
                </div>
            </div>

            <div class="container pt-8 mx-auto border-t border-neutralBlue-100">
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
