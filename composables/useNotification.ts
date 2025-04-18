import { ref, nextTick } from 'vue';

export const useNotification = () => {
  const showNotification = ref(false);
  const notificationBanner = ref<HTMLElement | null>(null);

  const triggerNotification = () => {
    showNotification.value = true;

    // Scroll to the banner
    nextTick(() => {
      notificationBanner.value?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    setTimeout(() => {
      showNotification.value = false;
    }, 4500);
  };

  const closeNotification = () => {
    showNotification.value = false;
  };

  return {
    showNotification,
    triggerNotification,
    closeNotification,
    notificationBanner, 
  };
};
