// redux 를 보관하는 상자
import { createSlice } from "@reduxjs/toolkit";

// 컴포넌트간 state 공유 편해짐
// useState()
// 공유할 필요 없을 때는 넣지 말자
let user = createSlice({
    name : 'user',
    initialState : { name : 'kim', age : 20 },
    // 1. state 수정 함수 만들기
    // 2. export
    // 3. 사용 (dispath)
    reducers : {
        setUserName(state) {
            state.name = 'park'
        },
        increase(state, a) {
            state.age += a.payload // payload는 함수에 실어보내는 화물
        }
    },
    
})
export let { setUserName, increase } = user.actions
export default user