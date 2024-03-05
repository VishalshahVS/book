import { createSlice,nanoid } from "@reduxjs/toolkit";

const dataofLocalStorage = JSON.parse(localStorage.getItem("Plans"));
console.log(dataofLocalStorage,"********")
const initialState=[{
    id:'',
    title:'',
    books:'',
    timing:'',
    start_date:'',
    end_date:'',
    created_date:''
}]
const GlobalDataSet = createSlice({
    name:'GlobalDataSet',
    initialState,

    reducers:{
        addData:(state,action) =>{
            console.log("hello")
        }
    }
})

export const {addData} = GlobalDataSet.actions;
export default GlobalDataSet.reducer;
