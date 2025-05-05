<template>
    <div class="bg-igraci">
      <div class="container mx-auto con-height pb-5 px-5">
        <div class="border-b border-1 border-gray-200">
          <!-- Breadcrumb -->
          <p class="font-normal text-blue-900 font-roboto text-body2">
            <NuxtLink class="text-blue-400 link-color" to="/">Početna / </NuxtLink>
            <span>Tablica veličina</span>
          </p>
          <p class="pt-1 pb-8 text-h1-normal font-medium uppercase text-blue-900 font-saira">
            Veličine
          </p>
  
          <!-- Tabs -->
          <div class="flex space-x-2 mb-6">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="activeTab = tab.name"
              :class="['btn-secondary uppercase small px-5 inline-block', { 'bg-blue-800 border-blue-800 text-white': activeTab === tab.name }]"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>
  
        <!-- Glavni sadržaj -->
        <div class="pt-8 max-w-[950px] w-full">
            <div class="flex flex-col md:flex-row gap-[60px]">
            <!-- Lijevi izbornik -->
            <div class="w-full md:w-[226px] shrink-0">
            <ul
                class="bg-white rounded-lg uppercase overflow-hidden"
                style="box-shadow: 0px 10px 10px 0px #0000000A, 0px 20px 25px 0px #0000001A;">
                <li
                v-for="(section, index) in sections"
                :key="section.key"
                @click="activeSection = section.key"
                :class="[
                    'px-6 py-3 cursor-pointer font-saira font-semibold text-sm text-blue-900',
                    activeSection === section.key ? 'bg-blue-50' : 'hover:bg-blue-50',
                    index !== sections.length - 1 ? 'border-b border-blue-100 ' : ''
                ]"
                >
                {{ section.label }}
                </li>
            </ul>
            </div>

  
            <!-- Desni sadržaj -->
            <div class="w-full md:max-w-[655px]">
              <h2 class="text-body1 font-bold mb-4 text-blue-900">{{ sectionLabel }}</h2>
  
              <div class="overflow-x-auto rounded-lg border-[1.4px] border-blue-100">
                <table class="w-full border-collapse text-sm">
                    <thead>
                    <tr class="bg-neutralBlue-100 text-black uppercase font-bold font-saira">
                        <th
                        v-for="header in tableHeaders"
                        :key="header"
                        class="px-3 py-2 text-center"
                        >
                        {{ header }}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="(row, idx) in currentTableData"
                        :key="idx"
                        class="bg-white border-t border-blue-100"
                        >
                            <td
                            v-for="header in tableHeaders"
                            :key="header"
                            class="px-3 py-2 text-center font-saira text-body3"
                            >
                                {{ row[headerKeyMap[header]] || '-' }}
                            </td>
                        </tr>
                    </tbody>
                </table>
              </div>
              <p class="text-body3 text-black mt-2">* mjere su izražene u centimetrima (cm)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  
  // Tabs
  const tabs = [
    { name: 'muskarci', label: 'Muškarci' },
    { name: 'zene', label: 'Žene' },
    { name: 'djeca', label: 'Djeca' }
  ]
  
  const tableHeadersConfig = {
    gornji: ['Veličina', 'Prsa', 'Struk', 'Bokovi'],
    donji: ['Veličina', 'Struk', 'Bokovi', 'Noga'],
    obuca: ['Veličina', 'Dužina'],
    djeca_gd: ['Veličina', 'Godine', 'Visina', 'Prsa', 'Struk', 'Bokovi'],
    }
  
  const headerKeyMap = {
    Veličina: 'velicina',
    Prsa: 'prsa',
    Struk: 'struk',
    Bokovi: 'bokovi',
    Noga: 'noga',
    Godine: 'godine',
    Visina: 'visina',
    Dužina: 'duzina',
  }
  
  // Podaci za obuću (isti za sve)
  const obucaData = [
    { velicina: '20', duzina: '119–125' },
    { velicina: '21', duzina: '126–132' },
    { velicina: '22', duzina: '133–138' },
    { velicina: '23', duzina: '139–145' },
    { velicina: '24', duzina: '146–152' },
    { velicina: '25', duzina: '153–158' },
    { velicina: '26', duzina: '159–165' },
    { velicina: '27', duzina: '166–172' },
    { velicina: '28', duzina: '173–178' },
    { velicina: '29', duzina: '179–185' },
    { velicina: '30', duzina: '186–192' },
    { velicina: '31', duzina: '193–198' },
    { velicina: '32', duzina: '199–205' },
    { velicina: '32.5', duzina: '203–208' },
    { velicina: '33', duzina: '206–212' },
    { velicina: '34', duzina: '214–218' },
    { velicina: '35', duzina: '219–223' },
    { velicina: '35.5', duzina: '224–229' },
    { velicina: '36', duzina: '226–232' },
    { velicina: '37', duzina: '233–236' },
    { velicina: '37.5', duzina: '237–239' },
    { velicina: '38', duzina: '240–245' },
    { velicina: '39', duzina: '246–252' },
    { velicina: '40', duzina: '253–256' },
    { velicina: '40.5', duzina: '257–262' },
    { velicina: '41', duzina: '259–265' },
    { velicina: '42', duzina: '266–269' },
    { velicina: '42.5', duzina: '270–273' },
    { velicina: '43', duzina: '273–276' },
    { velicina: '43.5', duzina: '277–279' },
    { velicina: '44', duzina: '279–283' },
    { velicina: '44.5', duzina: '284–288' },
    { velicina: '45', duzina: '288–292' },
    { velicina: '46', duzina: '293–298' },
    { velicina: '47', duzina: '299–305' },
  ]
  
  // Svi podaci za sve sekcije
  const data = {
    muskarci: {
      gornji: [
        { velicina: 'S', prsa: '87-94', struk: '75-82', bokovi: '86-93' },
        { velicina: 'M', prsa: '95-101', struk: '83-90', bokovi: '94-100' },
        { velicina: 'L', prsa: '102-108', struk: '91-97', bokovi: '101-108' },
        { velicina: 'XL', prsa: '109-114', struk: '98-103', bokovi: '109-113' },
        { velicina: 'XXL-3XL', prsa: '115-143', struk: '104-134', bokovi: '114-138' },
      ],
      donji: [
        { velicina: 'XS', struk: '68-74', bokovi: '80-85', noga: '81' },
        { velicina: 'S', struk: '75-82', bokovi: '86-93', noga: '81.5' },
        { velicina: 'M', struk: '83-90', bokovi: '94-100', noga: '82' },
        { velicina: 'L', struk: '91-97', bokovi: '101-108', noga: '82.5' },
        { velicina: 'XL', struk: '98-103', bokovi: '109–113', noga: '83' },
        { velicina: 'XXL-3XL', struk: '104-134', bokovi: '114-138', noga: '83.5' },
      ],
      obuca: obucaData
    },
  
    zene: {
      gornji: [
        { velicina: 'XS', prsa: '76-82', struk: '61-68', bokovi: '86-90' },
        { velicina: 'S', prsa: '83-89', struk: '69-73', bokovi: '91-95' },
        { velicina: 'M', prsa: '90-94', struk: '74-78', bokovi: '96-100' },
        { velicina: 'L', prsa: '95-98', struk: '79-82', bokovi: '101-104' },
        { velicina: 'XL', prsa: '99-102', struk: '83-86', bokovi: '105-108' },
        { velicina: 'XXL-3XL', prsa: '103-106', struk: '87-90', bokovi: '109-112' },
      ],
      donji: [
        { velicina: 'XS', struk: '61-68', bokovi: '86-90', noga: '78' },
        { velicina: 'S', struk: '69-73', bokovi: '91-95', noga: '78.5' },
        { velicina: 'M', struk: '74-78', bokovi: '96-100', noga: '79' },
        { velicina: 'L', struk: '79-82', bokovi: '101-104', noga: '79.5' },
        { velicina: 'XL', struk: '83-86', bokovi: '105-108', noga: '80' },
        { velicina: 'XXL-3XL', struk: '87-90', bokovi: '109-112', noga: '80.5' },
      ],
      obuca: obucaData
    },
  
    djeca: {
      gornji_donji: [
        { velicina: '6XS', godine: '4-5', visina: '100-108', prsa: '55-57', struk: '54-55', bokovi: '60–62' },
        { velicina: '5XS', godine: '5-6', visina: '109-117', prsa: '58-61', struk: '56-57', bokovi: '63–65' },
        { velicina: '4XS', godine: '7-8', visina: '118-128', prsa: '62-66', struk: '58–60', bokovi: '66–68' },
        { velicina: '3XS', godine: '9-10', visina: '129-140', prsa: '67-72', struk: '61–64', bokovi: '69–74' },
        { velicina: '2XS', godine: '11-12', visina: '141-152', prsa: '73-79', struk: '65–68', bokovi: '75–80' },
        { velicina: 'XS', godine: '12-14', visina: '153-164', prsa: '80-87', struk: '69–72', bokovi: '81–86' },
      ],
      obuca: obucaData
    }
  }
  
  const activeTab = ref('muskarci')
  const activeSection = ref('gornji')
  
  const sections = computed(() => {
    if (activeTab.value === 'djeca') {
      return [
        { key: 'gornji_donji', label: 'Gornji i donji dio' },
        { key: 'obuca', label: 'Obuća' }
      ]
    } else {
      return [
        { key: 'gornji', label: 'Gornji dio' },
        { key: 'donji', label: 'Donji dio' },
        { key: 'obuca', label: 'Obuća' }
      ]
    }
  })
  
  // Kad se promijeni tab — resetiraj sekciju
  watch(activeTab, () => {
    activeSection.value = sections.value[0].key
  })
  
  // Headeri za tablicu
  const tableHeaders = computed(() => {
    if (activeTab.value === 'djeca') {
      return activeSection.value === 'gornji_donji'
        ? tableHeadersConfig.djeca_gd
        : tableHeadersConfig.obuca
    } else {
      return tableHeadersConfig[activeSection.value] || []
    }
  })
  
  const sectionLabel = computed(() => {
    const section = sections.value.find(s => s.key === activeSection.value)
    return section ? section.label : ''
  })
  
  // Podaci za trenutnu tablicu
  const currentTableData = computed(() => {
    return data[activeTab.value][activeSection.value] || []
  })
  </script>
  