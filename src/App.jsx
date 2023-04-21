import { useState } from 'react'
import './App.css'
import mainBannerImg from './img/bg.png'
import data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom' 
import Detail from './detail.jsx'

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();
  
  return (
    <div className="App">
      <div className='navbar'>
        <ul>
          <li><img src='/vite.svg'></img></li>
          <li><Link to='/'>HOME</Link></li>
          <li onClick={ () => { navigate('/detail/0') }}>상세페이지</li>
          <li onClick={ () => { navigate('/about') }}>ABOUT</li>
        </ul>
      </div>
      <div className='main-banner' style={{ backgroundImage: 'url('+ mainBannerImg+')' }}></div>
      <Routes>
        <Route path='/' element={<Product shoes={shoes}/>} />
        <Route path='/detail/:id' element={<Detail shoes={shoes}/>} />
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
    <div className='main-product-container'>
      {
        props.shoes.map(shoes => (
          <div className='main-product' key={shoes.id}>
            <img className='main-product-img' src={shoes.img}></img>
            <h4>{shoes.title}</h4>
            <p>{shoes.content}</p>
          </div>
        ))
      }
    </div>
  )
}

export default App