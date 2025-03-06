import { ref, onMounted, computed, watch } from "vue";
import { type IProduct } from "@/types/product";
import { defineStore } from "pinia";

interface CartProduct extends IProduct {
    variationId?: number;
}

export const useCartStore = defineStore("cart_product", () => {
    const route = useRoute();
    let cart_products = ref<CartProduct[]>([]);
    let orderQuantity = ref<number>(1);

    const addCartProduct = (payload: IProduct, variationId?: number) => {
        let productPrice = payload.price;
        let variationName = null;

        if (variationId) {
            const selectedVariation = payload.variations?.find(
                (variation) => variation.id === variationId
            );

            if (selectedVariation) {
                variationName = selectedVariation.packaging;
                productPrice = selectedVariation.price;
            }
        }

        const isExist = cart_products.value.some(
            (i) => i.id === payload.id && i.variationId === variationId
        );

        if (!isExist) {
            const newItem = {
                ...payload,
                price: productPrice,
                variationId: variationId,
                variationName: variationName,
                orderQuantity: orderQuantity.value != 1 ? orderQuantity.value : 1,
            };
            cart_products.value.push(newItem);
        } else {
            cart_products.value.map((item) => {
                if (item.id === payload.id && item.variationId === variationId) {
                    if (typeof item.orderQuantity !== "undefined") {
                        item.orderQuantity = orderQuantity.value !== 1 ? orderQuantity.value + item.orderQuantity : item.orderQuantity + 1;
                    }
                }
                return { ...item };
            });
        }
        localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
    };

    const setInitialOrderQuantity = (min: number = 1) => {
        orderQuantity.value = min;
    };

    const increment = () => {
        orderQuantity.value = orderQuantity.value + 1;
    };

    const decrement = (min: number = 1) => {
        orderQuantity.value = Math.max(orderQuantity.value - 1, min);
    };

    const quantityDecrement = (payload: IProduct, variationId?: number) => {
        cart_products.value.map((item) => {
            if (item.id === payload.id && item.variationId === variationId) {
                if (typeof item.orderQuantity !== "undefined" && item.orderQuantity > 1) {
                    item.orderQuantity -= 1;
                }
            }
            return { ...item };
        });
        localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
    };

    const removeCartProduct = (payload: IProduct, variationId?: number) => {
        cart_products.value = cart_products.value.filter(
            (p) => !(p.id === payload.id && p.variationId === variationId)
        );
        localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
    };

    const initializeCartProducts = () => {
        const cartData = localStorage.getItem("cart_products");
        if (cartData) {
            cart_products.value = JSON.parse(cartData);
        }
    };

    const clear_cart = () => {
        cart_products.value = [];
        localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
    };

    const initialOrderQuantity = () => (orderQuantity.value = 1);

    const totalPriceQuantity = computed(() => {
        return cart_products.value.reduce(
            (cartTotal, cartItem) => {
                const { price, orderQuantity } = cartItem;
                if (typeof orderQuantity !== "undefined") {
                    const itemTotal = price * orderQuantity;
                    cartTotal.total += itemTotal;
                    cartTotal.quantity += orderQuantity;
                }
                return cartTotal;
            },
            {
                total: 0,
                quantity: 0,
            }
        );
    });

    onMounted(() => {
        initializeCartProducts();
    });

    watch(() => route.path, () => {
        orderQuantity.value = 1;
    });

    return {
        addCartProduct,
        cart_products,
        quantityDecrement,
        removeCartProduct,
        clear_cart,
        initialOrderQuantity,
        totalPriceQuantity,
        orderQuantity,
        increment,
        decrement,
        setInitialOrderQuantity,
    };
});