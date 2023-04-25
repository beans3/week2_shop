// redux 를 보관하는 상자
import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from './userSlice.js'

let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

let cart = createSlice({
    name : 'cart',
    initialState : [
      {id : 0, name : 'White and Black', count : 2},
      {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        setCount(state) {
            state[0].name = 'Purple'
        },
        addCount(state, action) {
            state[action.payload].count++
        },
        addItem(state, action) {
            state.push(action.payload)
        }
    },
})

export let { setCount, addCount, addItem } = cart.actions

export default configureStore ({
    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        cart : cart.reducer
    }
})