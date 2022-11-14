import { ADD_RESULT, DELETE_RESULT, UPDATE_RESULT } from "../actionTypes/actionTypes"


const initalStats={
    result_part1:[]

}

export const resultReducer=( store = initalStats, {type , payload})=>{
    switch (type) {
        case ADD_RESULT:
            return {
                ...store,
                result_part1:[...store.result_part1, payload]
            }

        case UPDATE_RESULT:{
          
            store.result_part1.splice(payload.idx,1,payload.data)
            return{
                ...store,
                result_part1:store.result_part1

            }
        }
        case DELETE_RESULT :
        //    console.log(payload)
            return {
                ...store,
                result_part1:store.result_part1.filter(data => data.id !== payload)
            }
        default:
            return store;
    }
}