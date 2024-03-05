import { configureStore } from "@reduxjs/toolkit";
import GlobalDataSet from "../slice/GlobalDataSet";
export const Store = configureStore({
    reducer:GlobalDataSet
})