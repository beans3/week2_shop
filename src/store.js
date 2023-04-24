// redux 를 보관하는 상자
import { configureStore, createSlice } from "@reduxjs/toolkit";

// 컴포넌트간 state 공유 편해짐
// useState()
// 공유할 필요 없을 때는 넣지 말자
let user = createSlice({
    name : 'user',
    initialState : 'kim',
    // 1. state 수정 함수 만들기
    // 2. export
    // 3. 사용 (dispath)
    reducers : {
        setUserName(state) {
            return 'john' + state
        }
    }
})

export let { setUserName } = user.actions

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
            return state + 1;
        }
    }
})

export let { setCount } = user.actions

export default configureStore ({
    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        cart : cart.reducer
    }
})