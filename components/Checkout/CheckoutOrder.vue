<script setup lang="ts">
  let shipCost = ref<number>(0);
  let payment_name = ref<string>('');

  const cartStore = useCartStore();

  defineProps<{
    terms: boolean,
  }>();

  // handle shipping cost 
  const handleShippingCost = (value: number | string) => {
    shipCost.value = value === 'free' ? 0 : value as number;
  };

  // handle payment item
  const handlePayment = (value: string) => {
    payment_name.value = value;
  };
</script>


<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h3 class="mb-4 text-xl font-semibold text-background">Your Order</h3>
    <div class="space-y-4">
      <ul class="space-y-4">
        <!-- header -->
        <li class="flex justify-between pb-2 font-semibold border-b text-background">
          <h4>Product</h4>
          <h4>Total</h4>
        </li>

        <!-- item list -->
        <li v-for="item in cartStore.cart_products" :key="item.id" class="flex justify-between">
          <div>
            <p class="font-semibold text-background">{{ item.title }}</p>
            <p class="text-sm text-background">Količina: {{ item.orderQuantity }}</p>
            <!-- Prikaz varijacije -->
            <p v-if="item.variationName" class="text-sm text-background">
              Varijacija: {{ item.variationName }}
            </p>
          </div>

          <!-- Prikaz cijene s popustom, ako postoji -->
          <div v-if="item.price_discount > 0">
            <span class="text-lg font-bold text-red-500">
              {{ item.price_discount.toFixed(2).replace('.', ',') }} €{{ " " }}
            </span>
            <span
              class="font-normal line-through text-md text-background"
            >
              {{ item.price.toFixed(2).replace('.', ',') }} €
            </span>
          </div>
          <span
            v-else
            class="mb-4 text-lg font-bold text-background"
          >
            {{ item.price.toFixed(2).replace('.', ',') }} €
          </span>
        </li>

        <!-- subtotal -->
        <li class="flex justify-between pt-2 font-semibold border-t">
          <span>Subtotal</span>
          <span>{{ cartStore.totalPriceQuantity.total.toFixed(2).replace('.', ',') }} €</span>
        </li>

        <!-- shipping -->
        <li class="flex flex-col space-y-2">
          <span class="font-semibold">Shipping</span>
          <div class="space-y-2">
            <label class="flex items-center space-x-2">
              <input id="flat_rate" type="radio" name="shipping" @click="handleShippingCost(20)" class="text-indigo-600 focus:ring-indigo-500">
              <span>Flat rate: <span>20.00 €</span></span>
            </label>
            <label class="flex items-center space-x-2">
              <input id="local_pickup" type="radio" name="shipping" @click="handleShippingCost(25)" class="text-indigo-600 focus:ring-indigo-500">
              <span>Local pickup: <span>25.00 €</span></span>
            </label>
            <label class="flex items-center space-x-2">
              <input id="free_shipping" type="radio" name="shipping" @click="handleShippingCost('free')" class="text-indigo-600 focus:ring-indigo-500">
              <span>Free shipping</span>
            </label>
          </div>
        </li>

        <!-- total -->
        <li class="flex justify-between pt-2 text-lg font-semibold border-t text-background">
          <span>Total</span>
          <span>{{ (cartStore.totalPriceQuantity.total + shipCost).toFixed(2).replace('.', ',') }} €</span>
        </li>
      </ul>
    </div>

    <div class="mt-6 space-y-4">
      <!-- Payment Options -->
      <div class="space-y-4">
        <div>
          <label class="flex items-center space-x-2">
            <input type="radio" id="back_transfer" name="payment" @click="handlePayment('bank')" class="text-indigo-600 focus:ring-indigo-500">
            <span>Direct Bank Transfer</span>
          </label>
          <div v-if="payment_name === 'bank'" class="pl-6 mt-2 text-sm text-gray-500">
            <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
          </div>
        </div>
        <div>
          <label class="flex items-center space-x-2">
            <input type="radio" id="cheque_payment" name="payment" @click="handlePayment('cheque_payment')" class="text-indigo-600 focus:ring-indigo-500">
            <span>Cheque Payment</span>
          </label>
          <div v-if="payment_name === 'cheque_payment'" class="pl-6 mt-2 text-sm text-gray-500">
            <p>Make your payment by cheque. Please use your Order ID as the payment reference. Your order will not be shipped until the cheque has been cleared.</p>
          </div>
        </div>
      </div>

      <!-- Agree Terms -->
      <div class="flex items-center space-x-2">
        <UFormGroup name="read_all" class="col-span-2">
          <UCheckbox :v-model="terms" class="text-background" required name="read_all" label="I have read and agree to the website." />
        </UFormGroup>
      </div>

      <!-- Place Order Button -->
      <div>
        <div class="mt-6">
          <UButton type="submit" class="bg-blue-500 hover:bg-blue-600">
            Submit
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>