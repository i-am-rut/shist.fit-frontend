import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import weightReducer from'./slices/weightSlice'
import waterReducer from './slices/waterSlice'
import goalsReducer from './slices/goalsSlice'
import foodReducer from './slices/foodSlice'
import sleepReducer from './slices/sleepSlice'
import stepsReducer from './slices/stepsSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
        weight: weightReducer,
        water: waterReducer,
        goals: goalsReducer,
        food: foodReducer,
        sleep: sleepReducer,
        steps: stepsReducer,
    },
})

export default appStore