<template>
    <div>
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
                  v-model="localSearchQuery"
                  @input="updateSearchQuery"
                  >
              </div>
              <div  class="border rounded-sm p-3 mb-3 ">
                <div class="pb-3 px-3">
                  <span class="text-2xl font-semibold sm:text-lg">Category {{title}}</span>
                </div>
                <div class="grid grid-cols-1 gap-3">
                  <label v-for=" item in category.categories" class="border rounded-full p-1 flex pl-5 gap-3 hover:bg-slate-400">
                    <input type="radio" v-model="localSelectedFiltered"  :value="item.value" @change="updateSelectedFilter">
                    <span>{{item.category}}</span>
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
  
              <router-link :to="'/'+ props.title+'/'+data.uuid" v-for="data in props.filteredData" :key="data.uuid" class="border hover:bg-slate-400">
                <div class="overflow-hidden">
                  <img :src="data.displayIcon" :alt="data.displayName" class="hover:scale-100 h-[265px] object-contain">
                </div>
                <div class="bg-white flex justify-center py-2 ">
                  <span class="text-black text-xl font-bold">{{ data.displayName }}</span>
                </div> 
              </router-link>
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
                         v-model="localSearchQuery"
                         @input="updateSearchQuery"
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
                          <label v-for=" item in category.categories" class="border rounded-full p-1 flex pl-5 gap-3 hover:bg-slate-400">
                            <input type="radio" v-model="localSelectedFiltered"  :value="item.value" @change="updateSelectedFilter">
                            <span class="text-black" >{{item.category}}</span>
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

                    <router-link :to="'/'+ props.title+'/'+data.uuid" v-for="data in props.filteredData" :key="data.uuid" class="border hover:bg-slate-400">
                        <div class="overflow-hidden">
                            <img :src="data.displayIcon" :alt="data.displayName" class="hover:scale-100 h-[150px] object-contain">
                        </div>
                        <div class="bg-white flex justify-center py-2 ">
                            <span class="text-black text-xl font-bold">{{ data.displayName }}</span>
                        </div> 
                    </router-link>
                </div>
            </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
    import { ref, watch, defineProps, defineEmits } from 'vue'

    const isModalOpen = ref(false);
    const props = defineProps({
        filteredData: [],
        category:[],
        isLoading: Boolean,
        title: String,
        selectedFilter: String,
        searchQuery: String
    })

    const emit = defineEmits(['update:searchQuery', 'update:selectedFilter']);

    const localSearchQuery = ref(props.searchQuery)
    const localSelectedFiltered = ref(props.selectedFilter)

    const updateSearchQuery = () => {
      emit('update:searchQuery', localSearchQuery.value);
    };

    const updateSelectedFilter = () => {
      emit('update:selectedFilter', localSelectedFiltered.value);
    };

    const openModal = () =>{
        isModalOpen.value = true
    }
    const closeModal = () =>{
        isModalOpen.value = false
    }

</script>

  