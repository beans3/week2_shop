import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Nav from 'react-bootstrap/Nav';
import { addItem } from './store.js'
import { useDispatch } from 'react-redux';

// styled-components 사용 장점
// 1. css 파일을 열지 않아도 된다.
// 2. 여기 적은 스타일은 다른 JS 파일에 오염되지 않음
// 3. 페이지 로딩 시간 단축 : <style></style> 태그에 들어가기 때문
let DefaultButton = styled.button`
  background : ${ props => props.bg };
  color : ${ props => props.bg == '#27374D' ? 'white' : 'black' };
  padding : 10px;
  width: 25%;
  border: none;
  border-radius: 10px;
  padding: 20px;
  font-size: 20px;
  cursor: pointer;
`

let DefaultInput = styled.input`
  padding : 10px;
  width: 25%;
  border: none;
  border-radius: 10px;
  padding: 20px;
  font-size: 20px;
  text-align: center;
`
let CountText = styled.span`
  padding : 10px;
  width: 25%;
  font-size: 20px;
  text-align: center;
  display: inline-block;
`
// styled component 단점
// 1. 파일이 더러워짐
// 2. 중복 스타일은 import 하기 때문에 css와 다를 바 없음
// 3. 협업시 css 숙련도 이슈
let NewBtn = styled.button(DefaultButton);

let TestDiv = styled.div`
  background : grey;
  padding : 20px;
`

// life cycle : component의 생명 주기
// 1. mount 페이지 장착
// 2. update 업데이트
// 3. unmount 필요없으면 제거
// 옛날 방식
// class Detail2 extends React.Component {
//   componentDidMount() {
//   }
//   componentDidUpdate() {
//   }
//   componentWillUnmount() {
//   }
// }

function Detail(props) {
  let [count, setCount] = useState(1)
  // /detail/:id에서 :id 값 가져옴
  let {id} = useParams()
  let [alertString, setAlert] = useState(true)
  let [num, setNum] = useState('')
  let [tab, setTab] = useState(1)
  let [fade, setFade] = useState('')
  let dispatch = useDispatch()
  let navigate = useNavigate()

  useEffect(() => {
    // console.log(id)
    let orgWatched = localStorage.getItem('watched')
    orgWatched = JSON.parse(orgWatched)
    if (!orgWatched.includes(id)) {
      orgWatched.push(id)
    }
    localStorage.setItem('watched', JSON.stringify(orgWatched))
  }, [id])

  useEffect(() => {
    let a = setTimeout(() => {
      setFade('end')
    }, 200)
    return () => {
      clearTimeout(a)
      setFade('')
    }
  }, [tab])

  // 이걸 언제 씀? side effect 보관함
  // useEffect 안의 코드는 html 렌더링 후에 동작
  // 1. 어려운 연산
  // 2. 서버에서 데이터 가져오는 작업
  // 3. 타이머 장착
  useEffect(() => {
    //  for (let i = 0; i < 10000; i++) {
    //   console.log(i);
    //  }
    // console.log(num);
    if (isNaN(num) == true) {
      alert('숫자만 입력하세요')
    }
    if (count < 1) {
      console.log('1보다 작을 때')
      alert('한 개 이상부터 주문 가능합니다.')
      setCount(1)
      return
    }
    if (count > 10) {
      console.log('10보다 클 때')
      alert('10개까지 주문 가능합니다.')
      setCount(count -1)
      return
    }
    let a = setTimeout(() => { setAlert(false) }, 2000)
    // console.log('안녕2')
    return () => {
      // clean up function
      // use effect 실행 전에 실행됨
      // ex. 기존 타이머는 삭제
      // console.log('안녕1')
      clearTimeout(a) // mount시 실행 안되고 unmount시 실행됨
      // 서버로 데이터 요청하는 코드(2초 소요), 기존 데이터 요청은 제거해야 함
    }
  }, [count, num]) // mount시, count라는 변수가 변할 때마다 코드 실행, [] 비워두면 mount 시에만 실행

  // 재렌더링마다 실행
  // 1회 실행
  // componenet가 삭제될 때 한 번

  return (
    <div className={ `start ${fade}`}>
      {
        alertString == true ? <div className='alert alert-warning'>2초 이내 구매시 할인</div> : null
      }
      <div className='detail-product-container'>  
        <div className='detail-product'>
          {
            !props.allData[id].img ? (
              <img className='detail-product-img' src={props.allData[id].img}></img>
            ) : (
              <img className='detail-product-img' src={props.allData[id].img}></img>
            )
          }
          <div>
            <CountText>수량</CountText>
            <DefaultInput onChange={(e) => {setNum(e.target.value)}} value={ count } disabled />
            <DefaultButton bg='#526D82' onClick={() => { setCount(count - 1)}}>-</DefaultButton>
            <DefaultButton bg='#27374D' onClick={() => { setCount(count + 1)}}>+</DefaultButton>
          </div>
          
          <button className='btn' onClick={ () => {
            dispatch(addItem({id : id, name : props.allData[id].title, count : count}))
          }}>장바구니</button>
          <h2>{props.allData[id].title}</h2>
          <p>{props.allData[id].price}</p>
          <p>{props.allData[id].content}</p>
        </div>  
      </div>
      <Nav variant="tabs" defaultActiveKey="link-0">
        <Nav.Item onClick={ () => { setTab(0) } }>
          <Nav.Link eventKey="link-0">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={ () => { setTab(1) } }>
          <Nav.Link eventKey="link-1">Option 1</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={ () => { setTab(2) } }>
          <Nav.Link eventKey="link-2">Option 2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={ tab } />
    </div>
  )
}

function TabContent({ tab }) {

  // react 18 버전 이상에서는 automatic batching 기능이 추가됨
  // 함수가 근처에 있으면 하나로 합쳐서 한 번만 state를 변경
  // state 변경이 되고 나서 재렌더링 한 번 실행
  let [fade, setFade] = useState('')
  useEffect(() => {
    let a = setTimeout(() => {
      setFade('end')
    }, 100)
    return () => {
      clearTimeout(a)
      setFade('')
    }
  }, [ tab ])
  // if (props.tab == 0) {
  //   return <div>내용0</div>
  // } else if (props.tab == 1) {
  //   return <div>내용1</div>
  // } else if (props.tab == 2) {
  //   return <div>내용2</div>
  // }
  return <div className={ `start ${fade}`}>{ [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab] }</div>
}
export default Detail;