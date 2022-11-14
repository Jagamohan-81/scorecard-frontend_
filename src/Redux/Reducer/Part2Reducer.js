import { ADD_PART2_DATA, DELETE_PART2_DATA,UPDATE_PART2_DATA } from "../actionTypes/actionTypes"


const initalStats={
    result_part2:[]
}

export const part2Reducer =(store=initalStats,{type,payload})=>{
    switch (type) {
        case ADD_PART2_DATA:
         return {
            ...store,
            result_part2:[...store.result_part2, payload]
         }  
         case UPDATE_PART2_DATA:
            store.result_part2.splice(payload.idx,1,payload.data)
            return {
                ...store,
                result_part2:store.result_part2
            }
        case DELETE_PART2_DATA:
            return {
                ...store,
                result_part2:store.result_part2.filter(data => data.id !== payload)
            } 
    
        default:
            return store;
    }
}