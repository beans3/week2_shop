import { useParams } from 'react-router-dom'
import styled from 'styled-components'

// styled-components 사용 장점
// 1. css 파일을 열지 않아도 된다.
// 2. 
let YellowButton = styled.button`
  background : yellow;
  color : black;
  padding : 10px;
`

let TestDiv = styled.div`
  background : grey;
  padding : 20px;
`

function Detail(props) {
  
  // /detail/:id에서 :id 값 가져옴
  let {id} = useParams();
  console.log(id);

  return (
    <div className='detail-product-container'>
      <YellowButton>버튼</YellowButton>
      <div className='detail-product'>
        <img className='detail-product-img' src={props.shoes[id].img}></img>
        <button className='btn'>주문하기</button>
        <h2>{props.shoes[id].title}</h2>
        <p>{props.shoes[id].price}</p>
        <p>{props.shoes[id].content}</p>
      </div>
    </div>
  )
}

export default Detail;