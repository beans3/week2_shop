import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { increase, setUserName } from "./userSlice.js";
import { setCount, addCount } from "./store.js";
import { memo, useMemo, useState } from "react";

// 꼭 필요할 때만 재렌더링
// props가 변할 때(특정 상황)만 재렌더링
// 기존 props와 신규 props 비교
// props가 길고 복잡하다면 손해
let Child = memo( function() {
    console.log('재렌더링')
    return <div>자식임</div>
})

function complex () {
    // 반복문 10억번 돌렸다 가정
    return 1;
}

function Cart() {

    // redux 사용 시 컴포넌트들이 props 없이 state 공유 가능
    let cart = useSelector((state) => state.cart )
    let user = useSelector((state) => state.user )
    let dispatch = useDispatch()
    let [count, setCount] = useState(0)
    let result = complex(); // Cart가 재렌더링 될 때마다 실행
    let useMemoCount = useMemo(() => { return complex() }, [count]) // 컴포넌트 렌더링시 1회만 실행

    return (
        <div>
            <Child count={count}></Child>
            <button onClick={() => {
                setCount(count+1)
            }}>+</button>
            <h6>{ user.name } { user.age }의 장바구니</h6>
            <button onClick={ () => {dispatch(increase(10))} }>숫자 증가</button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.count}</td>
                                <td><button onClick={() => {
                                    // 함수 실행해달라고 store.js에 요청
                                    //dispatch(setCount(item.count))
                                    dispatch(addCount(index))
                                }}>변경</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart