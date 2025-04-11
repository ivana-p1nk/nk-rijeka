import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import { type IProduct } from "@/types/product";

export const useFavoritesStore = defineStore("favorites", () => {
    let favorite_products = ref<IProduct[]>([]);

    const addFavoriteProduct = (payload: IProduct) => {
        const exists = favorite_products.value.some(
            (item) => item.id === payload.id
        );

        if (!exists) {
            const newItem: IProduct = payload;
            favorite_products.value.push(newItem);
            localStorage.setItem("favorite_products", JSON.stringify(favorite_products.value));
        }
    };

    const removeFavoriteProduct = (payload: IProduct) => {
        favorite_products.value = favorite_products.value.filter(
            (item) => !(item.id === payload.id)
        );
        localStorage.setItem("favorite_products", JSON.stringify(favorite_products.value));
    };

    const isFavorite = (payload: IProduct) => {
        return favorite_products.value.some(
            (item) => item.id === payload.id
        );
    };

    const clearFavorites = () => {
        favorite_products.value = [];
        localStorage.setItem("favorite_products", JSON.stringify(favorite_products.value));
    };

    const initializeFavoriteProducts = () => {
        const favoriteData = localStorage.getItem("favorite_products");

        console.log('TU SAM');
        console.log(favoriteData);

        if (favoriteData) {
            favorite_products.value = JSON.parse(favoriteData);
        }
    };

    onMounted(() => {
        initializeFavoriteProducts();
    });

    return {
        favorite_products,
        addFavoriteProduct,
        removeFavoriteProduct,
        clearFavorites,
        isFavorite,
        initializeFavoriteProducts,
    };
});
