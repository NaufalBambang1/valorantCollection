<template>
    <div class="pt-[68px]">
      <div class="container mx-auto">
        <!-- Desktop -->
        <div class="pt-[3rem] gap-6 hidden md:flex">
          <div class="w-[20%]">
            <div>
              <div class="flex items-center gap-3 mb-3">
                <i class="fa-solid fa-filter text-2xl"></i>
                <span class="text-2xl font-bold">Filter</span>
              </div>
              <div class="border rounded-sm p-1 mb-3 ">
                <input 
                  type="text"
                  placeholder="Search Agent"
                  class="p-2 rounded-sm text-black w-full"
                  v-model="searchQuery"
                  >
              </div>
              <div  class="border rounded-sm p-3 mb-3 ">
                <div class="pb-3 px-3">
                  <span class="text-2xl font-semibold sm:text-lg">Category Weapons</span>
                </div>
                <div class="grid grid-cols-1 gap-3">
                  <label class="border rounded-full p-1 flex pl-5 gap-3 hover:bg-slate-400">
                    <input type="radio" v-model="selectedFilter" value="All">
                    <span>All</span>
                  </label>
                  <label class="border rounded-full p-1 flex pl-5 gap-3 hover:bg-slate-400">
                    <input type="radio"  v-model="selectedFilter" value="Heavy Weapons">
                    <span>Heavy Weapons</span>
                  </label>
                  <label class="border rounded-full p-1 flex pl-5 gap-3 hover:bg-slate-400">
                    <input type="radio"  v-model="selectedFilter" value="Rifles">
                    <span>Rifles</span>
                  </label>
                  <label class="border rounded-full p-1 flex pl-5 gap-3 hover:bg-slate-400">
                    <input type="radio"  v-model="selectedFilter" value="Shotguns">
                    <span>Shotguns</span>
                  </label>
                  <label class="border rounded-full p-1 flex pl-5 gap-3 hover:bg-slate-400">
                    <input type="radio"  v-model="selectedFilter" value="Pistols">
                    <span>Pistol</span>
                  </label>
                  <label class="border rounded-full p-1 flex pl-5 gap-3 hover:bg-slate-400">
                    <input type="radio"  v-model="selectedFilter" value="Sniper Rifles">
                    <span>Sniper Rifles</span>
                  </label>
                  <label class="border rounded-full p-1 flex pl-5 gap-3 hover:bg-slate-400">
                    <input type="radio"  v-model="selectedFilter" value="SMGs">
                    <span>SMGs</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="w-[80%] pt-11">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <!-- Skeleton -->
              <template v-if="isLoading" class="animate-pulse">
                <div class="bg-slate-600 w-full h-[310px] bg-gray-300"></div>
                <div class="bg-slate-600 w-full h-[310px] bg-gray-300"></div>
                <div class="bg-slate-600 w-full h-[310px] bg-gray-300"></div>
                <div class="bg-slate-600 w-full h-[310px] bg-gray-300"></div>
                <div class="bg-slate-600 w-full h-[310px] bg-gray-300"></div>
                <div class="bg-slate-600 w-full h-[310px] bg-gray-300"></div>
                <div class="bg-slate-600 w-full h-[310px] bg-gray-300"></div>
                <div class="bg-slate-600 w-full h-[310px] bg-gray-300"></div>
              </template>
  
              <button v-for="weapon in filteredWeapons" :key="weapon.uuid" class="border hover:bg-slate-400">
                <div class="overflow-hidden">
                  <img :src="weapon.displayIcon" :alt="weapon.displayName" class="hover:scale-100 h-[265px] object-contain">
                </div>
                <div class="bg-white flex justify-center py-2 ">
                  <span class="text-black text-xl font-bold">{{ weapon.displayName }}</span>
                </div> 
              </button>
            </div>
          </div>
        </div>
  
        <!-- Mobile -->
        <div class="pt-[3rem] gap-6 px-3 md:hidden">
            <div class="flex gap-3">
                <div class="border rounded-sm p-1 mb-3 w-full">
                    <input 
                        type="text"
                        placeholder="Search Agent"
                        class="p-2 rounded-sm text-black w-full"
                        v-model="searchQuery"
                    >
                </div>
                <div class="w-full border p-1 mb-3 flex items-center hover:bg-slate-400 "@click="openModal">
                    <div class="flex items-center gap-3 pl-3">
                        <i class="fa-solid fa-filter text-lg"></i>
                        <span class="text-xl font-bold">Filter</span>
                    </div>
                </div>
                <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
                    <div class="bg-white rounded-lg p-6 w-full h-[25rem]">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-xl font-semibold text-black">Filter</h2>
                            <i class="fa-solid fa-xmark text-black text-xl" @click="closeModal"></i>
                        </div>
                        <div class="grid grid-cols-1 gap-3">
                            <label class="border rounded-full p-1 flex pl-5 gap-3 hover:bg-slate-400">
                            <input type="radio" v-model="selectedFilter" value="All">
                                <span class="text-black">All</span>
                            </label>
                            <label class="border rounded-full p-1 flex pl-5 gap-3 hover:bg-slate-400">
                                <input type="radio"  v-model="selectedFilter" value="Heavy Weapons">
                                <span class="text-black">Heavy Weapons</span>
                            </label>
                            <label class="border rounded-full p-1 flex pl-5 gap-3 hover:bg-slate-400">
                                <input type="radio"  v-model="selectedFilter" value="Rifles">
                                <span class="text-black">Rifles</span>
                            </label>
                            <label class="border rounded-full p-1 flex pl-5 gap-3 hover:bg-slate-400">
                                <input type="radio"  v-model="selectedFilter" value="Shotguns">
                                <span class="text-black">Shotguns</span>
                            </label>
                            <label class="border rounded-full p-1 flex pl-5 gap-3 hover:bg-slate-400">
                                <input type="radio"  v-model="selectedFilter" value="Pistols">
                                <span class="text-black">Pistol</span>
                            </label>
                            <label class="border rounded-full p-1 flex pl-5 gap-3 hover:bg-slate-400">
                                <input type="radio"  v-model="selectedFilter" value="Sniper Rifles">
                                <span class="text-black">Sniper Rifles</span>
                            </label>
                            <label class="border rounded-full p-1 flex pl-5 gap-3 hover:bg-slate-400">
                                <input type="radio"  v-model="selectedFilter" value="SMGs">
                                <span class="text-black">SMGs</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pt-3">
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <!-- Skeleton -->
                    <template v-if="isLoading" class="animate-pulse">
                    <div class="bg-slate-600 w-full h-[310px] bg-gray-300"></div>
                    <div class="bg-slate-600 w-full h-[310px] bg-gray-300"></div>
                    <div class="bg-slate-600 w-full h-[310px] bg-gray-300"></div>
                    <div class="bg-slate-600 w-full h-[310px] bg-gray-300"></div>
                    <div class="bg-slate-600 w-full h-[310px] bg-gray-300"></div>
                    <div class="bg-slate-600 w-full h-[310px] bg-gray-300"></div>
                    <div class="bg-slate-600 w-full h-[310px] bg-gray-300"></div>
                    <div class="bg-slate-600 w-full h-[310px] bg-gray-300"></div>
                    </template>

                    <button v-for="weapon in filteredWeapons" :key="weapon.uuid" class="border hover:bg-slate-400">
                        <div class="overflow-hidden">
                            <img :src="weapon.displayIcon" :alt="weapon.displayName" class="hover:scale-100 h-[150px] object-contain">
                        </div>
                        <div class="bg-white flex justify-center py-2 ">
                            <span class="text-black text-xl font-bold">{{ weapon.displayName }}</span>
                        </div> 
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import {onMounted,ref,computed} from 'vue'
  import {useStore} from 'vuex'
  
  const store = useStore()
  const dataWeapons = ref([]);
  const searchQuery = ref("");
  const selectedFilter = ref("All");
  const isLoading = ref(true);
  const isModalOpen = ref(false);
  
  onMounted( async ()=>{
    try{
      const weaponsResponse = await store.dispatch('getDataWeapons');
      dataWeapons.value = weaponsResponse.data.data
      console.log(dataWeapons.value.displayName)
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
  
  const openModal = () =>{
    isModalOpen.value = true
  }
  const closeModal = () =>{
    isModalOpen.value = false
  }
  
  </script>