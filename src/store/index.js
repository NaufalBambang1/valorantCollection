import { createStore } from 'vuex'
import axios from"axios"

export default createStore({
  state: {
    dataAgents: [],
    dataWeapons: [],
  },
  mutations: {
    SET_DATA_AGENTS(state, payload){
      state.dataAgents = payload;
    },
    SET_DATA_WEAPONS(state, payload){
      state.dataWeapons = payload;
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
    }
  },
  modules: {
  }
})
