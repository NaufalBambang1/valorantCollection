<template>
   <Category
      :filteredData="filteredWeapons"
      :isLoading="isLoading"
      :title="title"
      :category="weaponCategory"
      v-model:selectedFilter="selectedFilter"
      v-model:searchQuery="searchQuery"
   />
  </template>
  
  <script setup>
  import Category from '@/components/Category.vue'
  import {onMounted,ref,computed} from 'vue'
  import {useStore} from 'vuex'
  
  const store = useStore()
  const dataWeapons = ref([])
  const searchQuery = ref("")
  const selectedFilter = ref("All")
  const isLoading = ref(true)
  const isModalOpen = ref(false)
  const title = ref("weapons")
  
  onMounted( async ()=>{
    try{
      const weaponsResponse = await store.dispatch('getDataWeapons');
      dataWeapons.value = weaponsResponse.data.data
    }
    catch(error){
      console.log(error);
    }finally{
      isLoading.value = false
    }
  })
  
  const filteredWeapons = computed(() => {
    return dataWeapons.value
      .filter((weapon) => {
        return (
            weapon.displayName
            .toLowerCase()
            .indexOf(searchQuery.value.toLowerCase()) !== -1
        );
      })
      .filter((weapon)=>{
        return (
            selectedFilter.value === 'All' || 
            (weapon.shopData && weapon.shopData.category === selectedFilter.value)
        );
      })
  });
  
  const weaponCategory = ref({
    categories: [
      {
        category: 'All',
        value: 'All',
      },
      {
        category: 'Heavy Weapons',
        value: 'Heavy Weapons',
      },
      {
        category: 'Rifles',
        value: 'Rifles',
      },
      {
        category: 'Shotguns',
        value: 'Shotguns',
      },
      {
        category: 'Pistols',
        value: 'Pistols',
      },
      {
        category: 'Sniper Rifles',
        value: 'Sniper Rifles',
      },
      {
        category: 'SMGs',
        value: 'SMGs',
      },
    ],
  });
  
  </script>