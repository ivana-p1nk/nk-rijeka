import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import { type IProduct } from "@/types/product";

interface FavoriteProduct extends IProduct {
    variationId?: number;
}

export const useFavoritesStore = defineStore("favorites", () => {
    let favorite_products = ref<FavoriteProduct[]>([]);

    const addFavoriteProduct = (payload: IProduct, variationId?: number) => {
        const exists = favorite_products.value.some(
            (item) => item.id === payload.id && item.variationId === variationId
        );

        if (!exists) {
            const newItem: FavoriteProduct = {
                ...payload,
                variationId: variationId,
            };
            favorite_products.value.push(newItem);
            localStorage.setItem("favorite_products", JSON.stringify(favorite_products.value));
        }
    };

    const removeFavoriteProduct = (payload: IProduct, variationId?: number) => {
        favorite_products.value = favorite_products.value.filter(
            (item) => !(item.id === payload.id && item.variationId === variationId)
        );
        localStorage.setItem("favorite_products", JSON.stringify(favorite_products.value));
    };

    const isFavorite = (payload: IProduct, variationId?: number) => {
        return favorite_products.value.some(
            (item) => item.id === payload.id && item.variationId === variationId
        );
    };

    const clearFavorites = () => {
        favorite_products.value = [];
        localStorage.setItem("favorite_products", JSON.stringify(favorite_products.value));
    };

    const initializeFavoriteProducts = () => {
        const favoriteData = localStorage.getItem("favorite_products");
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
