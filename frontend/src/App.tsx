import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FirstPage from './pages/FirstPage'
import BlogId from './pages/BlogId'
import Publish from './pages/Publish'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FirstPage/>}/>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/blog/:id' element={<BlogId/>} />
          <Route path='/blogs' element={<Blog />} />
          <Route path='/publish' element={<Publish/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
