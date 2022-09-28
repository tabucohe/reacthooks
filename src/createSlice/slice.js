import { createSlice } from "@reduxjs/toolkit";

const stickySlice=createSlice({
    name:"notes",
    initialState:{
        lastNotesCreated:null,
        totalNotes:0,
        notes:[]
    },
    reducers:{
        addNotes:(preState,action)=>{
            return{
                ...preState,
                notes:[...preState.notes,action.payload],
                totalNotes: preState.notes.length + 1,
             lastNoteCreated: new Date().toTimeString().slice(0, 8),
            }
    },
    delNote:(preState,action) => {
        return {
            ...preState,
            notes: preState.notes.filter((note) => note.id !== action.payload.id),
            totalNotes : preState.notes.length - 1,
        }
    },

   
}
})

export const {actions,reducer}=stickySlice;
export const {addNotes,delNote} = actions;
export default reducer;