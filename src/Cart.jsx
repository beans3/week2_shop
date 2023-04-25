import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { increase, setUserName } from "./userSlice.js";
import { setCount, addCount } from "./store.js";

function Cart() {

    // redux 사용 시 컴포넌트들이 props 없이 state 공유 가능
    let cart = useSelector((state) => state.cart )
    let user = useSelector((state) => state.user )
    let dispatch = useDispatch()

    return (
        <div>
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
                    <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Cart