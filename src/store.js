// redux 를 보관하는 상자
import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from './userSlice.js'

let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

let cart = createSlice({
    name : 'cart',
    initialState : [],
    reducers : {
        setCount(state) {
            state[0].name = 'Purple'
        },
        subCount(state, action) {
            state[action.payload].count--
        },
        addCount(state, action) {
            state[action.payload].count++
        },
        addItem(state, action) {
            state.push(action.payload)
        }
    },
})

export let { setCount, addCount, subCount, addItem } = cart.actions

export default configureStore ({
    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        cart : cart.reducer
    }
})