import { lazy, Suspense, useEffect, useState } from 'react'
import './App.css'
import mainBannerImg from './img/bg.png'
import data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom' 
import axios from 'axios'
import { useQuery } from 'react-query'

// 필요해질 때 import 해주세요
const Detail = lazy(() => import('./detail.jsx'))
const Cart = lazy(() => import('./Cart.jsx'))

function App() {
  let obj = { name : 'kim' }
  // local storage
  // 1. key: value 형태로 저장 가능
  // 2. 문자 데이터만 저장 가능, 최대 5MB
  // 3. 사이트 재접속해도 남아있음(브라우저 청소하면 삭제됨)
  localStorage.setItem('data', JSON.stringify(obj))
  let localST = localStorage.getItem('data')
  // object니까!
  // console.log(JSON.parse(localST));
  let [shoes, setShoes] = useState(data)
  let [isHide, setIsHide] = useState(false)
  let [listIndex, setListIndex] = useState(3)
  let [allData, setAllData] = useState([])
  let navigate = useNavigate()

  function loadingMore() {
    axios
    .get('https://codingapple1.github.io/shop/data2.json')
    .then((results) => {
      setListIndex(listIndex + 3)
      setAllData([...data, ...results.data])
    })
    .catch(() => {
      console.log('실패')
    })
  }

  // 초기 데이터 설정
  useEffect(() => {
    setAllData([...shoes])
  }, [])

  // listIndex가 바뀔 떄마다 더보기 버튼 숨길지
  useEffect(() => {
    if (allData.length < listIndex) {
    } else {
      console.log('로딩 끝!')
      setIsHide(true)
    }
  }, [listIndex])

  useEffect(() => {
    const orgWatched = localStorage.getItem('watched')
    if (!orgWatched) {
      localStorage.setItem('watched', JSON.stringify([]))
    }
  }, [])

  // axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
  //   a.data
  // });
  // 성공, 실패, 로딩중 쉽게 파악 가능
  // 틈만 나면 자동으로 재요청 해줌(refetch)
  // 실패시 retry 알아서 해줌
  // state 공유 안해도 됨
  // 같은 화면에 같은 요청 시도해도 하나만 시도
  // ajax 결과 캐싱 가능
  let resultName = useQuery('nameData', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      console.log('요청됨')
      return a.data
    });
  }, { staleTime : 2000 })

  return (
    <div className="App">
      <div className='navbar'>
        <ul>
          <li onClick={ () => { navigate('/') }}><img src='/vite.svg'></img></li>
          <li><Link to='/'>HOME</Link></li>
          <li onClick={ () => { navigate('/detail/0') }}>상세페이지</li>
          <li onClick={ () => { navigate('/about') }}>ABOUT</li>
          <li onClick={ () => { navigate('/cart') }}>CART</li>
          <li onClick={ () => { navigate('/event/one') }}>EVENT1</li>
          <li onClick={ () => { navigate('/event/two') }}>EVENT2</li>
          <li>
            { resultName.isLoading ? '로딩중입니다.' : resultName.data.name }
          </li>
        </ul>
      </div>
      <div className='main-banner' style={{ backgroundImage: 'url('+ mainBannerImg+')' }}></div>
      <Suspense fallback={<div>로딩중임!!!</div>}>
        <Routes>
          <Route path='/' element={<Product listIndex={listIndex} isHide={isHide} allData={allData} loadingMore={loadingMore} navigate={navigate}/>}/>
          <Route path='/detail/:id' element={
            
              <Detail shoes={shoes} />
            
          }/>
          <Route path='*' element={<div>없는 페이지임</div>} />
          <Route path='/about' element={<About/>}>
            <Route path='member' element={<div>멤버임</div>} />
            <Route path='location' element={<About/>} />
          </Route>
          <Route path='/event' element={<Event />}>
            <Route path='one' element={<p>첫 주문시 양배추즙 서비스</p>} />
            <Route path='two' element={<p>생일기념 쿠폰받기</p>} />
          </Route>
          <Route path='*' element={<div>없는 페이지임</div>} />
          <Route path='/cart' element={<Cart />}></Route>
        </Routes>
      </Suspense>
    </div>
  )
}

function Event() {
  return (
    <div className='main-product-container'>
      {
        <div>
          <h2>오늘의 이벤트</h2>
          <Outlet></Outlet>
        </div>
      }
    </div>
  )
}

function About() {
  return (
    <div className='main-product-container'>
      {
        <div>
          <h4>회사 정보임</h4>
          <Outlet></Outlet>
        </div>
      }
    </div>
  )
}

function Product(props) {
  return (
    <>
    <div className='main-product-container'>
      {
        props.allData.map(shoes => (
          <div className='main-product' key={shoes.id} onClick={ () => {
            props.navigate('/detail/' + shoes.id)
          }}>
            {!shoes.img ? (
              <img className='main-product-no-img' src="/vite.svg"></img>
            ) : (
              <img className='main-product-img' src={shoes.img}></img>
            )}
            <h4>{shoes.title}</h4>
            <p>{shoes.content}</p>
          </div>
        ))
      }
    </div>
    {props.isHide === false ? <button className="btn" onClick={props.loadingMore}>더보기</button> : null}
    {
      // axios.post('/asjdhkas', { name : 'kim'})
        // Promise.all([axios.get('/url1'), axios.get('/url2')])
        // .then(() => {
        // })
        
        // 원래는 문자만 주고 받을 수 있음. 따옴표 쳐놓으면 array, object 보낼 수 있음(JSON)
        // fetch('https://codingapple1.github.io/shop/data2.json')
        // .then(resultjs => resultjs.json())
        // .then(data => {})
    }
    </>
  )
}

export default App