<template>
    <Category
      :filteredData="filteredAgents"
      :isLoading="isLoading"
      :title="title"
      :category="agentsCategory"
      v-model:selectedFilter="selectedFilter"
      v-model:searchQuery="searchQuery"
   />

</template>

<script setup>
import Category from '@/components/Category.vue'
import {onMounted,ref,computed} from 'vue';
import {useStore} from 'vuex';

const store = useStore()
const dataAgents = ref([])
const searchQuery = ref("")
const selectedFilter = ref("All")
const isLoading = ref(true)
const isModalOpen = ref(false)
const title = ref('agents')

onMounted( async ()=>{
  try{
    const agentsResponse = await store.dispatch('getDataAgents')
    dataAgents.value = agentsResponse.data.data
  }
  catch(error){
    console.log(error);
  }finally{
    isLoading.value = false
  }
})

const filteredAgents = computed(() => {
  return dataAgents.value
    .filter((agent) => {
      return (
        agent.displayName
          .toLowerCase()
          .indexOf(searchQuery.value.toLowerCase()) !== -1
      );
    })
    .filter((agent)=>{
      return(
        selectedFilter.value === 'All' || agent.role.displayName === selectedFilter.value
      )
    })
});

const agentsCategory = ref({
  categories: [
    {
      category: 'All',
      value: 'All',
    },
    {
      category: 'Duelist',
      value: 'Duelist',
    },
    {
      category: 'Initiator',
      value: 'Initiator',
    },
    {
      category: 'Controller',
      value: 'Controller',
    },
    {
      category: 'Sentinel',
      value: 'Sentinel',
    },
  ],
});

</script>