import { ADD_STUDENT,REMOVE_STUDENT } from "../actionTypes/actionTypes"


const initalStats={
    students:[]

}

export const student_reducer=( store = initalStats, {type , payload})=>{
    switch (type) {
        case ADD_STUDENT:
            return {
                ...store,
                students:[...store.students, payload]
            }

        // case UPDATE_RESULT:{
          
        //     store.result_part1.splice(payload.idx,1,payload.data)
        //     return{
        //         ...store,
        //         result_part1:store.result_part1

        //     }
        // }
        case REMOVE_STUDENT :
        //    console.log(payload)
            return {
                ...store,
                students:store.students.filter(data => data.id !== payload)
            }
        default:
            return store;
    }
}