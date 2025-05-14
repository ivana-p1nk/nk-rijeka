
export const activetab = ref<string>('');
export const openMenu = ref<boolean>(false);

export const setActiveTab = (newTab: string) => {
    if (activetab.value === newTab) {
        activetab.value = '';
        openMenu.value = false;
        return;
    }

    activetab.value = newTab;
    openMenu.value = true;
};

export const closeTabMenu = () => {
  activetab.value = '';
  openMenu.value = false;
};
