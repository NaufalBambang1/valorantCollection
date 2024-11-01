<template>
    <div class="min-h-screen backdrop-saturate-200 bg-black/30">
        <div class="container mx-auto pt-5 px-3">
            <div class="grid grid-cols-3 md:grid-cols-4 gap-4 ">
                <div v-if="!selectedImage" class="col-span-3 flex justify-center items-center p-3">
                    <img :src="dataWeaponsDetail.displayIcon" :alt="dataWeaponsDetail.displayName" class="max-w-full max-h-full sm:max-w-[512px] sm:max-h-[124px]">
                </div>
                <div v-else class="col-span-3 flex justify-center items-center p-3">
                    <img v-if="selectedSkin" :src="selectedSkin.displayIcon" alt="" class="max-w-full max-h-full sm:max-w-[512px] sm:max-h-[124px]">
                </div>
                <div class="border-2 rounded-lg p-3 col-span-4  lg:col-span-1">
                    <div class="flex justify-center">
                        <h1 class="text-2xl font-semibold">{{ dataWeaponsDetail.displayName }}</h1>
                    </div>
                    <template v-if="isLoading" class="animate-pulse">
                        <div class="flex flex-col">
                            <div class="flex justify-between">
                                <div class="bg-slate-600 w-full h-2 bg-gray-300"></div>
                                <div class="bg-slate-600 w-full h-2 bg-gray-300"></div>
                            </div>
                            <div class="flex justify-between">
                                <div class="bg-slate-600 w-full h-2 bg-gray-300"></div>
                                <div class="bg-slate-600 w-full h-2 bg-gray-300"></div>
                            </div>
                        </div>
                        <div class="flex flex-col">
                            <div class="flex justify-between">
                                <div class="bg-slate-600 w-full h-2  bg-gray-300"></div>
                                <div class="bg-slate-600 w-full h-2 bg-gray-300"></div>
                            </div>
                            <div class="flex justify-between">
                                <div class="bg-slate-600 w-full h-2 bg-gray-300"></div>
                                <div class="bg-slate-600 w-full h-2 bg-gray-300"></div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div v-if="dataWeaponsDetail.shopData" class="flex flex-col">
                            <div class="flex justify-between">
                                <span class="text-xl">Cost : </span>
                                <span class="text-xl text-slate-400">{{ dataWeaponsDetail.shopData.cost }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-xl">Category : </span>
                                <span class="text-xl text-slate-400">{{ dataWeaponsDetail.shopData.category }}</span>
                            </div>
                        </div>
                        <div v-if="dataWeaponsDetail.weaponStats" class="flex flex-col">
                            <div v-if="dataWeaponsDetail.weaponStats.adsStats" class="flex justify-between">
                                <span class="text-xl">Fire Rate : </span>
                                <span class="text-xl text-slate-400">{{ dataWeaponsDetail.weaponStats.fireRate }}/s - {{ dataWeaponsDetail.weaponStats.adsStats.fireRate }}/s </span>
                            </div>
                            <div v-else class="flex justify-between">
                                <span class="text-xl">Fire Rate : </span>
                                <span class="text-xl text-slate-400">{{ dataWeaponsDetail.weaponStats.fireRate }}/s</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-xl">Magazine : </span>
                                <span class="text-xl text-slate-400">{{ dataWeaponsDetail.weaponStats.magazineSize }}</span>
                            </div>
                            <div v-if="dataWeaponsDetail.weaponStats.adsStats" class="flex justify-between">
                                <span class="text-xl">Run Speed : </span>
                                <span class="text-xl text-slate-400">{{ dataWeaponsDetail.weaponStats.runSpeedMultiplier }}/s - {{ dataWeaponsDetail.weaponStats.adsStats.runSpeedMultiplier }}/s </span>
                            </div>
                            <div class="flex justify-between mb-5">
                                <span class="text-xl">Reload Time : </span>
                                <span class="text-xl text-slate-400">{{ dataWeaponsDetail.weaponStats.reloadTimeSeconds }}</span>
                            </div>
                            <div v-if="dataWeaponsDetail.weaponStats.damageRanges" class="flex justify-between flex-col">
                                <div v-for="(damage,index) in dataWeaponsDetail.weaponStats.damageRanges" >
                                    <div :key="index+dqa">
                                        <span class="text-xl text-slate-400">{{ damage.rangeStartMeters }}m - {{ damage.rangeEndMeters }}m</span>
                                         <div class="flex justify-between">
                                            <span>Head: </span>
                                            <span>{{ damage.headDamage }}</span>
                                         </div>   
                                         <div class="flex justify-between">
                                            <span>Body: </span>
                                            <span>{{ damage.bodyDamage }}</span>
                                         </div>   
                                         <div class="flex justify-between">
                                            <span>Leg: </span>
                                            <span>{{ damage.legDamage }}</span>
                                         </div>   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class=" mt-5 mb-5 flex flex-col sm:flex-row justify-between gap-4" >
                <h1  class="text-5xl font-bold italic">Skin for {{ dataWeaponsDetail.displayName }}</h1>
                <input 
                      type="text"
                      placeholder="Search Skin"
                      class="p-2 rounded-sm text-black w-full sm:w-1/4"
                      v-model="searchQuery"
                >
            </div>
            <div v-if="dataWeaponsDetail.skins" class="relative pb-5">
                <div class="flex gap-4 overflow-x-auto">
                    <div
                        v-for="(skin, index) in filteredSkin"
                        :key="index"
                        class="border hover:bg-slate-400 cursor-pointer flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/6 mb-4"
                        @click="selectedImage = skin.uuid"
                    >
                        <div class="p-3">
                            <img
                                :src="skin.displayIcon"
                                :alt="skin.displayName"
                                class="hover:scale-125 h-[150px] object-contain"
                            />
                        </div>
                        <div class="bg-white flex justify-center py-1">
                            <span class="text-black text-lg font-bold line-clamp-1">{{ skin.displayName }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {computed, onMounted,ref} from 'vue'
    import { useRoute } from 'vue-router'
    import {useStore} from 'vuex'

    const store = useStore()
    const route = useRoute()
    const dataWeaponsDetail = ref([])
    const isLoading = ref(true)
    const selectedImage = ref(null)
    const searchQuery = ref("")

    onMounted(async ()=>{
        try{
            const weaponsDetailResponse = await store.dispatch('getDataWeaponsDetail', route.params.id)
            dataWeaponsDetail.value = weaponsDetailResponse.data.data
        }
        catch(error){
            console.log(error)
        }
        finally{
            isLoading.value = false
        }
    })
    const filteredSkin = computed(()=>{
        return dataWeaponsDetail.value.skins
        .filter((skin)=>{
            return(
                skin.displayName
                .toLowerCase()
                .indexOf(searchQuery.value.toLowerCase()) !== -1
            )
            })
    })
    const selectedSkin = computed(() => {
        return filteredSkin.value.find(skin => skin.uuid === selectedImage.value);
    });
    
</script>