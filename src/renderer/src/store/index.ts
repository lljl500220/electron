import {defineStore} from "pinia";

export const useRemStore = defineStore('rem',{
  state:()=>{
    return {
      remPx: 0
    }
  }
})
