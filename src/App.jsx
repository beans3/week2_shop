import { createContext, useState } from 'react'
import './App.css'
import mainBannerImg from './img/bg.png'
import data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom' 
import Detail from './detail.jsx'
import axios from 'axios'
import Cart from './Cart.jsx'

function App() {
  let obj = { name : 'kim' }
  // local storage
  // 1. key: value 형태로 저장 가능
  // 2. 문자 데이터만 저장 가능, 최대 5MB
  // 3. 사이트 재접속해도 남아있음(브라우저 청소하면 삭제됨)
  localStorage.setItem('data', JSON.stringify(obj));
  let localST = localStorage.getItem('data');
  //object니까!
  console.log(JSON.parse(localST));
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

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
        </ul>
      </div>
      <div className='main-banner' style={{ backgroundImage: 'url('+ mainBannerImg+')' }}></div>
      <Routes>
        <Route path='/' element={<Product shoes={shoes} setShoes={setShoes} navigate={navigate}/>}/>
        <Route path='/detail/:id' element={<Detail shoes={shoes} />}/>
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
        props.shoes.map(shoes => (
          <div className='main-product' key={shoes.id} onClick={ () => {
            props.navigate('/detail/' + shoes.id)
          }}>
            <img className='main-product-img' src={shoes.img}></img>
            <h4>{shoes.title}</h4>
            <p>{shoes.content}</p>
          </div>
        ))
      }
    </div>
    <button className='btn' onClick={() => {
      axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((results) => { 
          console.log(results.data);
          let copy = [...props.shoes, ...results.data];
          console.log(copy);
          props.setShoes(copy);
        })
        .catch(() => {
          console.log('실패')
        })

        // axios.post('/asjdhkas', { name : 'kim'})
        // Promise.all([axios.get('/url1'), axios.get('/url2')])
        // .then(() => {
        // })
        
        // 원래는 문자만 주고 받을 수 있음. 따옴표 쳐놓으면 array, object 보낼 수 있음(JSON)
        // fetch('https://codingapple1.github.io/shop/data2.json')
        // .then(resultjs => resultjs.json())
        // .then(data => {})
        
      }}>더보기</button>
    </>
  )
}

export default App