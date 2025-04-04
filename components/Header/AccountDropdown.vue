<template>
  <!--Login/Account Dropdown-->
  <UDropdown
  :items="dropdownItems"
  :popper="{ placement: 'bottom-start' }"
  class="custom-dropdown"
  :ui="{
      width: 'w-[245px]',
      background: 'bg-header-gradient dark:bg-header-gradient pt-6 pb-3',
      rounded: 'rounded-2xl',
      padding: 'p-0',
      divide: 'divide-none',
      shadow: 'shadow-lg',
      ring: 'ring-0',
      item: {
          inactive: 'text-white dark:text-white',
          active:  'rounded-none bg-blue-500 dark:bg-blue-500 dark:bg-opacity-10 bg-opacity-10 text-white dark:text-white',
      }
  }"
  >
  
  <UButton
      icon="i-heroicons-user-circle"
      size="lg"
      color="dark"
      square
      variant="solid"
      class="p-0 dark:text-white text-white" 
  />
  <!-- Stavke dropdowna -->
  <template #item="{ item, isActive }">
      <div class="px-2 py-1">
          <span v-if="item.custom" v-html="item.custom"></span>
          <span v-else>
              <span v-if="item.icon" class="mr-1">
                  <Icon :name="item.icon" class="w-5 h-5 ml-5 -mb-1 text-blue-500 " />
              </span>   
              {{ item.label }}
          </span>
      </div>
  </template>
  </UDropdown>
  </template>
  
  
  <script setup>
  
  const user = useSanctumUser();
  
  const dropdownItems = computed(() => {
    if (user.value != null) {
      return [
        [{
          custom: `Pozdrav ${user.value.name}`,  
          class: 'font-roboto font-normal account-frame pl-3 pt-0 pb-3 account-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent',
        }],
        [{
          label: 'Narudžbe',
          to: '/profile',
          icon: 'streamline:ticket-1',
          class: 'account-frame-items',
        }],
        [{
          label: 'Detalji profila',
          to: '/profile',
          icon: 'tdesign:user-circle',
          class: 'account-frame-items',
        }],
        [{
          label: 'Odjava',
          to: '/odjava',
          icon: 'uiw:login',
          class: 'account-frame-items',
        }]
      ];
    } else {
      return [
        [{
          label: 'Prijavi se',
          to: '/login',
           class: 'account-login-btn w-[80%] mb-2 mx-auto rounded-md'
        }],
        [{
          custom: '<div class="border-t border-blue-800 pt-4 flex flex-row gap-3"><p class="font-normal mb-0 font-roboto text-white text-sm mb-1">Nemaš račun?</p><nuxt-link to="/register" class="uppercase link-plavi underline ">Registriraj se</nuxt-link></div>',
          class: 'justify-center w-full mx-auto text-center hover:bg-transparent focus:bg-transparent active:bg-transparent', 
        }]
      ];
    }
  });
  
  
  </script>