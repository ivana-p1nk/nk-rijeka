import { ref, onMounted, computed, watch } from 'vue'
import { type IProduct } from '@/types/product'
import { defineStore } from 'pinia'
import { type ICoupon } from '@/types/coupon'

interface CartProduct extends IProduct {
    variationId?: number
    textInput?: string
    numberInput?: string
    personalizationPrice?: number
    textInputAddonPrice?: number
    numberInputAddonPrice?: number
    discountPrice?: number
    totalPrice?: number
}

export const useCartStore = defineStore('cart_product', () => {
    const route = useRoute()
    let cart_products = ref<CartProduct[]>([])
    let orderQuantity = ref<number>(1)
    const userRole = ref<string | null>(null)

    let coupon = ref<ICoupon | null>(null)

    const setUserRole = (role: string | null) => {
        userRole.value = role
        updatePricesBasedOnRole()
    }

    const updatePricesBasedOnRole = () => {
        cart_products.value = cart_products.value.map((item) => {
            let basePrice = item.price
            let discountPrice = item.price_discount
            let memberPrice = item.member_price

            const selectedVariation = item.variations?.find((v) => v.id === item.variationId)
            if (selectedVariation) {
                basePrice = selectedVariation.price
                discountPrice = selectedVariation.price_discount
                memberPrice = selectedVariation.member_price
            }

            let newPrice = basePrice

            if (userRole.value === 'member' && memberPrice) {
                newPrice = memberPrice
            }

            if (discountPrice) {
                newPrice = discountPrice
            }

            if (item.personalizationPrice) {
                newPrice += item.personalizationPrice
            }

            return {
                ...item,
                totalPrice: newPrice,
            }
        })

        localStorage.setItem('cart_products', JSON.stringify(cart_products.value))
    }

    const addCartProduct = (
        payload: CartProduct,
        variationId?: number,
        isPersonalization?: boolean,
        userRole?: string
    ) => {
        let productPrice = payload.price
        let variationName = null
        let discountPrice = payload.price_discount

        if (variationId) {
            const selectedVariation = payload.variations?.find((variation) => variation.id === variationId)

            if (selectedVariation) {
                variationName = selectedVariation.packaging
                productPrice = selectedVariation.price
                discountPrice = selectedVariation.price_discount
            }
        }

        if (userRole === 'member') {
            productPrice = payload.member_price
        }

        if (discountPrice) {
            productPrice = discountPrice
        }

        if (isPersonalization) {
            productPrice = productPrice + (payload.personalizationPrice || 0)
        }

        const isExist = cart_products.value.some(
            (i) =>
                i.id === payload.id &&
                i.variationId === variationId &&
                i.textInput === payload.textInput &&
                i.numberInput === payload.numberInput
        )

        if (!isExist) {
            const newItem = {
                ...payload,
                totalPrice: productPrice,
                discountPrice: discountPrice,
                variationId: variationId,
                variationName: variationName,
                orderQuantity: orderQuantity.value != 1 ? orderQuantity.value : 1,
            }
            cart_products.value.push(newItem)
        } else {
            cart_products.value.map((item) => {
                if (
                    item.id === payload.id &&
                    item.variationId === variationId &&
                    item.textInput === payload.textInput &&
                    item.numberInput === payload.numberInput
                ) {
                    if (typeof item.orderQuantity !== 'undefined') {
                        item.orderQuantity =
                            orderQuantity.value !== 1
                                ? orderQuantity.value + item.orderQuantity
                                : item.orderQuantity + 1
                    }
                }
                return { ...item }
            })
        }

        localStorage.setItem('cart_products', JSON.stringify(cart_products.value))
    }

    const setInitialOrderQuantity = (min: number = 1) => {
        orderQuantity.value = min
    }

    const increment = () => {
        orderQuantity.value = orderQuantity.value + 1
    }

    const decrement = (min: number = 1) => {
        orderQuantity.value = Math.max(orderQuantity.value - 1, min)
    }

    const quantityDecrement = (payload: CartProduct, variationId?: number) => {
        cart_products.value.map((item) => {
            if (
                item.id === payload.id &&
                item.variationId === variationId &&
                item.textInput === payload.textInput &&
                item.numberInput === payload.numberInput
            ) {
                if (typeof item.orderQuantity !== 'undefined' && item.orderQuantity > 1) {
                    item.orderQuantity -= 1
                }
            }
            return { ...item }
        })
        localStorage.setItem('cart_products', JSON.stringify(cart_products.value))
    }

    const removeCartProduct = (payload: CartProduct, variationId?: number) => {
        cart_products.value = cart_products.value.filter(
            (p) =>
                !(
                    p.id === payload.id &&
                    p.variationId === variationId &&
                    p.textInput === payload.textInput &&
                    p.numberInput === payload.numberInput
                )
        )
        localStorage.setItem('cart_products', JSON.stringify(cart_products.value))
    }

    const initializeCartProducts = () => {
        const cartData = localStorage.getItem('cart_products')
        if (cartData) {
            cart_products.value = JSON.parse(cartData)
        }
    }

    const clear_cart = () => {
        cart_products.value = []
        localStorage.setItem('cart_products', JSON.stringify(cart_products.value))
    }

    const initialOrderQuantity = () => (orderQuantity.value = 1)

    const totalPriceQuantity = computed(() => {
        return cart_products.value.reduce(
            (cartTotal, cartItem) => {
                const { totalPrice, orderQuantity } = cartItem
                if (typeof orderQuantity !== 'undefined' && typeof totalPrice !== 'undefined') {
                    const itemTotal = totalPrice * orderQuantity
                    cartTotal.total += itemTotal
                    cartTotal.quantity += orderQuantity
                }

                if (coupon.value) {
                    if (coupon.value.type === 'percentage') {
                        cartTotal.total = cartTotal.total * (1 - coupon.value.discount / 100)
                    } else {
                        cartTotal.total = cartTotal.total - coupon.value.discount
                    }
                }

                return cartTotal
            },
            {
                total: 0,
                quantity: 0,
            }
        )
    })

    // ---------------------------
  //  🇭🇷/🌍 DOSTAVA – NOVO (ISO)
  // ---------------------------

  // (1) Odredišna država (ISO kod iz tvog JSON-a, npr. "HR", "DE", "US")
  const destinationCountry = ref<string>('HR') // default HR dok forma ne postavi

  const setDestinationCountry = (iso2: string) => {
    destinationCountry.value = (iso2 || '').toUpperCase()
  }

  // (2) Grupe zemalja po ISO kodovima
  const ISO_CROATIA = ['HR']

  const ISO_EU = [
    'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU',
    'MT','NL','PL','PT','RO','SK','SI','ES','SE'
  ]

  const ISO_EUROPE_NON_EU = [
    'AL','AD','BY','BA','IS','XK','LI','MD','MC','ME','MK','NO','SM','RS','CH','UA','GB','VA','GI'
  ]

  const ISO_US_CA = ['US', 'CA']

  // (3) Cjenik
  const intlRates = {
    eu:     { base: 40, freeFrom: 200 }, // EU (bez HR)
    europe: { base: 45, freeFrom: 200 }, // ostale europske zemlje (non‑EU)
    usca:   { base: 50, freeFrom: 300 }, // SAD i Kanada
    world:  { base: 60, freeFrom: 350 }, // ostatak svijeta
  }

  // (4) Domaća (HR) pravila i opcije
  const selectedDeliveryOption = ref<'free' | 'paket24'>('free')
  const free_delivery_hr = 50
  const paket24 = ref<number>(6)

  // (5) Pomoćne detekcije
  const isCroatiaDest = computed(() => ISO_CROATIA.includes(destinationCountry.value))
  const isEU = computed(() => ISO_EU.includes(destinationCountry.value) && !isCroatiaDest.value)
  const isEuropeNonEU = computed(() => ISO_EUROPE_NON_EU.includes(destinationCountry.value))
  const isUSCanada = computed(() => ISO_US_CA.includes(destinationCountry.value))

  // (6) Cijena dostave
  const deliveryPrice = computed(() => {
    const subtotal = totalPriceQuantity.value.total

    // Hrvatska – zadržavamo postojeće opcije (free/paket24) i prag 50 €
    if (isCroatiaDest.value) {
      if (subtotal < free_delivery_hr) {
        selectedDeliveryOption.value = 'paket24' // force ispod praga
        return paket24.value
      }
      return selectedDeliveryOption.value === 'free' ? 0 : paket24.value
    }

    // Međunarodno – automatski izračun (nema ručnog odabira)
    let base = 0
    let freeFrom = 0

    if (isEU.value) {
      base = intlRates.eu.base
      freeFrom = intlRates.eu.freeFrom
    } else if (isEuropeNonEU.value) {
      base = intlRates.europe.base
      freeFrom = intlRates.europe.freeFrom
    } else if (isUSCanada.value) {
      base = intlRates.usca.base
      freeFrom = intlRates.usca.freeFrom
    } else {
      base = intlRates.world.base
      freeFrom = intlRates.world.freeFrom
    }

    return subtotal >= freeFrom ? 0 : base
  })

  const totalPriceWithDelivery = computed(() => {
    return totalPriceQuantity.value.total + deliveryPrice.value
  })

  const changeDelivery = (delivery: 'free' | 'paket24') => {
    // Odabir je smislen samo za HR
    if (isCroatiaDest.value) selectedDeliveryOption.value = delivery
  }

  // Automatski toggle free/paket24 SAMO za HR
  watch(
    () => totalPriceQuantity.value.total,
    (newTotal) => {
      if (!isCroatiaDest.value) return
      if (newTotal < free_delivery_hr) {
        selectedDeliveryOption.value = 'paket24'
      } else if (selectedDeliveryOption.value !== 'free') {
        selectedDeliveryOption.value = 'free'
      }
    },
    { immediate: true }
  )

    // ---------------------------

  const initializeCoupon = () => {
    const couponData = localStorage.getItem('coupon')
    if (couponData) {
      coupon.value = JSON.parse(couponData)
    }
  }

  const addCoupon = (useCoupon: ICoupon) => {
    coupon.value = useCoupon
    localStorage.setItem('coupon', JSON.stringify(coupon.value))
  }

  const deleteCoupon = () => {
    coupon.value = null
    localStorage.setItem('coupon', JSON.stringify(coupon.value))
  }

  onMounted(() => {
    initializeCartProducts()
    initializeCoupon()
  })

  watch(
    () => route.path,
    () => {
      orderQuantity.value = 1
    }
  )

  return {
    addCartProduct,
    cart_products,
    quantityDecrement,
    removeCartProduct,
    clear_cart,
    initialOrderQuantity,
    totalPriceQuantity,
    coupon,
    addCoupon,
    deleteCoupon,
    orderQuantity,
    increment,
    decrement,
    setInitialOrderQuantity,
    setUserRole,

    // NOVO – dostava
    destinationCountry,
    setDestinationCountry,
    paket24,
    deliveryPrice,
    changeDelivery,
    totalPriceWithDelivery,
    selectedDeliveryOption,
  }
})
