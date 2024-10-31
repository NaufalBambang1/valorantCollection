import { createStore } from 'vuex'
import axios from"axios"

export default createStore({
  state: {
    dataAgents: [],
    dataWeapons: [],
    dataAgentsDetail: [],
    dataWeaponsDetail: [],
  },
  mutations: {
    SET_DATA_AGENTS(state, payload){
      state.dataAgents = payload;
    },
    SET_DATA_WEAPONS(state, payload){
      state.dataWeapons = payload;
    },
    SET_DATA_AGENTS_DETAIL(state, payload){
      state.dataAgentsDetail = payload;
    },
    SET_DATA_WEAPONS_DETAIL(state, payload){
      state.dataWeaponsDetail = payload;
    }
  },
  actions: {
    getDataAgents({commit}){
      return new Promise((resolve,reject)=>{
        axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true')
        .then(response =>{
          commit('SET_DATA_AGENTS',response.data)
          resolve(response)
        })
        .catch(error =>{
          reject(error)
        })
      })
    },
    getDataWeapons({commit}){
      return new Promise((resolve,reject)=>{
        axios.get('https://valorant-api.com/v1/weapons')
        .then(response =>{
          commit('SET_DATA_WEAPONS',response.data)
          resolve(response)
        })
        .catch(error =>{
          reject(error)
        })
      })
    },
    getDataAgentsDetail({commit},params){
      return new Promise((resolve,reject)=>{
        axios.get(`https://valorant-api.com/v1/agents/${params}`)
        .then(response =>{
          commit('SET_DATA_AGENTS_DETAIL',response.data)
          resolve(response)
        })
        .catch(error =>{
          reject(error)
        })
      })
    },
    getDataWeaponsDetail({commit},params){
      return new Promise((resolve,reject)=>{
        axios.get(`https://valorant-api.com/v1/weapons/${params}`)
        .then(response =>{
          commit('SET_DATA_WEAPONS_DETAIL',response.data)
          resolve(response)
        })
        .catch(error =>{
          reject(error)
        })
      })
    }
  },
  modules: {
  }
})
