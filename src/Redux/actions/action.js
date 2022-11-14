import {  ADD_PART2_DATA, ADD_PART3_DATA, ADD_RESULT, DELETE_PART2_DATA, DELETE_PART3_DATA, DELETE_RESULT, UPDATE_PART2_DATA, UPDATE_PART3_DATA, UPDATE_RESULT,ADD_STUDENT,REMOVE_STUDENT } from "../actionTypes/actionTypes"


export const  AddResult =(data)=>({
    type:ADD_RESULT,
    payload:data,
})

export const EditeResult =(data,idx)=>({
    type:UPDATE_RESULT,
    payload:{data,idx}
})

export const RemoveResult = (id)=>({
    type:DELETE_RESULT,
    payload:id
})

// Part2 action
export const Addpart2_data =(data)=>({
    type: ADD_PART2_DATA,
    payload:data
})

export const Updatepart2_data=(idx,data)=>({
    type:UPDATE_PART2_DATA,
    payload:{idx,data}
})

export const RemovePart2_data =(id)=>({
    type:DELETE_PART2_DATA,
    payload:id
})
//part3action
export const Addpart3_data =(data)=>({
    type: ADD_PART3_DATA,
    payload:data
})

export const Updatepart3_data=(idx,data)=>({
    type:UPDATE_PART3_DATA,
    payload:{idx,data}
})


export const RemovePart3_data =(id)=>({
    type:DELETE_PART3_DATA,
    payload:id
})

export const add_student=(data)=>({
    type:ADD_STUDENT,
    payload:data

})
export const remove_student=(idx,data)=>({
    type:REMOVE_STUDENT,
    payload:{idx,data}
})