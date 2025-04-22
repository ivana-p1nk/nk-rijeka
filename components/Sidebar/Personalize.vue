<template>
  <div>
    <!-- PERSONALIZIRAJ BUTTON -->
    <button @click="show = true" class="group flex flex-row items-center gap-2 uppercase btn-secondary medium w-fit">
      PERSONALIZIRAJ
      <Icon name="streamline:shopping-cart-1" class="icon-large text-gray-900 group-focus:text-white group-active:text-white transition-colors duration-500" />
    </button>

    <!-- SIDEBAR CONTENT  -->
    <Offcanvas :isOpen="show" @close="show = false">
      <div>
        <h1 class="text-xl font-bold mb-4">Personalizacija</h1>

        <div v-if="product?.gallery?.length">
          <img :src="product.gallery[0]" alt="Product Image" class="mx-auto rounded-lg max-w-full h-auto"/>
        </div>
        
        <!-- Input za slova -->
        <div> 

          <div class="mt-4">
            <label for="textInput" class="block font-medium mb-1">Upiši ime</label>
            <input
              id="textInput"
              v-model="textInput"
              type="text"
              maxlength="12"
              pattern="[A-Za-zČĆŽŠĐčćžšđ ]*"
              class="input-style w-full"
              placeholder="Maksimalno 12 znakova"
            />
          </div>

          <!-- Input za brojeve -->
          <div class="mt-4">
            <label for="numberInput" class="block font-medium mb-1">Upiši broj</label>
            <input
              id="numberInput"
              v-model="numberInput"
              type="text"
              maxlength="2"
              pattern="[0-9]*"
              class="input-style w-full"
              placeholder="Maksimalno 2 znaka"
            />
          </div>

        </div>

        <!-- Veličine -->
        <div v-if="product.variations && product.variations.length" class="pt-7">
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
                    { 
                        'active-variation': selectedVariationId === variation.id, 
                        'hover:bg-blue-50': selectedVariationId !== variation.id 
                    }]"
                @click="updateVariation(variation.id)"
            >
                {{ variation.packaging }}
            </button>
          </div>
        </div>

        <!-- količina -->
        <div class="flex flex-row items-center gap-1">
          <button class="btn-icon-secondary square-large rounded-md flex items-center justify-center border-[1.4px]"
          @click="cartStore.decrement(product.minimum_quantity || 1)"
          >
            <UIcon name="heroicons:minus" />
          </button>
          <input class="bg-white border-blue-300 border-[1.4px] square-large rounded-lg text-center" type="text"
          :min="product.minimum_quantity" :value="cartStore.orderQuantity" disabled />
          <button class="btn-icon-secondary square-large rounded-md flex items-center justify-center border-[1.4px]" @click="cartStore.increment()">
            <UIcon name="heroicons:plus"/>
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
              solid: 'bg-blue-600 hover:bg-blue-700 active:bg-800'
            }
          }"
          class="px-5 uppercase text-[15px] flex justify-center focus:outline-none focus:ring-0 active:bg-blue-800 transition-colors duration-200 font-saira font-semibold "
          >
          Dodaj u košaricu
          <Icon name="streamline:shopping-cart-1" class="text-white icon-medium" />
        </UButton>
      </div>
    </Offcanvas>
  </div>
</template>

<script setup lang="ts">
   import { ref } from 'vue';
   import Offcanvas from '~/components/Sidebar/Offcanvas.vue';
   import { useCartStore } from '~/composables/useCart';
   import type { IProduct } from '~/types/product';

   const textInput = ref('');
   const numberInput = ref('');

   const props = defineProps<{ product: IProduct; selectedVariationId: number | null }>();
   const emit = defineEmits(['update-selected-variation']);
   const cartStore = useCartStore();

   const show = ref(false);
   const selectedVariationId = computed({
    get: () => props.selectedVariationId,
    set: (val) => emit('update-selected-variation', val)
  });

  const updateVariation = (id: number | null) => {
    selectedVariationId.value = selectedVariationId.value === id ? null : id;
  };

  const addToCart = () => {

    if (!/^[A-Za-zČĆŽŠĐčćžšđ ]{1,12}$/.test(textInput.value)) {
      alert("Molim vas unesite samo slova - bez brojeva i posebnih znakova!");
      return;
    }

    if (!/^[0-9]{1,2}$/.test(numberInput.value)) {
      alert("Molim vas unesite samo broj - bez slova i posebnih znakova!");
      return;
    }

    if (!selectedVariationId.value) {
      alert("Molimo odaberite veličinu prije dodavanja u košaricu.");
      return;
    }

    cartStore.addCartProduct(props.product, selectedVariationId.value);
    cartStore.orderQuantity = 1;
    show.value = false; 
  };
  
</script>
