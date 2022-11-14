import { ADD_PART3_DATA, DELETE_PART3_DATA, UPDATE_PART3_DATA } from "../actionTypes/actionTypes"

const initalStats ={
    result_part3:[]
}

export const part3Reducer =(store= initalStats,{type,payload})=>{
    switch (type) {
        case ADD_PART3_DATA:
         return {
            ...store,
            result_part3:[...store.result_part3, payload]
         }  

         case UPDATE_PART3_DATA:
            console.log(payload)
            store.result_part3.splice(payload.idx,1,payload.data)
            console.log(store.result_part3)
            return {
                ...store,
                result_part3:store.result_part3
            }
        case DELETE_PART3_DATA:
            return {
                ...store,
                result_part3:store.result_part3.filter(data => data.id !== payload)
            } 
    
        default:
            return store;
    }
}