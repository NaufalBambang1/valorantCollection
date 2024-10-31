<template>
    <div>
        <div class="relative h-[91.9vh]">
            <div class="absolute inset-0 backdrop-saturate-200 bg-black/30 flex justify-center items-center">
                <img :src="dataAgentsDetail.background"  class="h-[375px] sm:h-[900px]">
                <img :src="dataAgentsDetail.fullPortraitV2" :alt="dataAgentsDetail.displayName" class="absolute h-[375px] sm:h-[900px]">
            </div>
            <div class="container mx-auto z-10 relative px-3 top-[90vh] sm:top-[80vh] md:top-[90vh] lg:top-[90vh] xl:top-[27vh]">
                <div class="flex justify-between flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row gap-5">
                  <div class="w-fit sm:w-[30rem]">
                    <div class="mb-6">
                        <h1 class="text-7xl font-bold italic">{{ dataAgentsDetail.displayName }}</h1>
                    </div>
                    <div class="mb-6">
                        <span>{{ dataAgentsDetail.description }}</span>
                    </div>
                    <div v-if="dataAgentsDetail.role" class="border-2 border-red-700 p-2 w-fit">
                        <div class="bg-neutral-800 w-fit p-3 flex flex-col items-center gap-1">
                            <img :src="dataAgentsDetail.role.displayIcon" :alt="dataAgentsDetail.role.displayName" class="w-[20px]">
                            <span>{{ dataAgentsDetail.role.displayName }}</span>
                        </div>
                    </div>
                  </div>
                  <div class="w-fit sm:w-[30rem]">
                    <div>
                        <div class="mb-6">
                            <h1 class="text-5xl font-bold italic">Special Abilities</h1>
                        </div>
                        <div class="flex flex-row gap-7 justify-center mb-6">
                            <div 
                                v-for="(abilities, index) in dataAgentsDetail.abilities" 
                                :key="abilities.slot" 
                                class="hover:bg-neutral-600 hover:rounded-full p-3 cursor-pointer"
                                :class="[selectedAbilities === index ? 'bg-neutral-600 rounded-full': '']"
                                @click="selectedAbilities = index"
                                >
                                <img :src="abilities.displayIcon" :alt="abilities.displayName" class="w-[50px]">
                            </div>
                        </div>
                        <div v-if="selectedAbilities.value !== null && dataAgentsDetail.abilities" class="mb-6">
                            <div class="mb-3">
                                <h1 class="text-2xl font-semibold">{{ dataAgentsDetail.abilities[selectedAbilities].displayName }}</h1>
                            </div>
                            <div>
                                <span>{{ dataAgentsDetail.abilities[selectedAbilities].description }}</span>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted,ref} from 'vue'
import { useRoute } from 'vue-router'
import {useStore} from 'vuex'

const store = useStore()
const route = useRoute()
const dataAgentsDetail = ref([])
const selectedAbilities = ref(0)

onMounted(async ()=>{
    try{
        const agentsDetailResponse = await store.dispatch('getDataAgentsDetail', route.params.id)
        dataAgentsDetail.value = agentsDetailResponse.data.data
    }
    catch(error){
        console.log(error)
    }
})
</script>