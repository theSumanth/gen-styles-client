import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <div>
        <Toaster position='top-center' ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={} ></Route>
          <Route path='/editor/:roomId' element={} ></Route>
        </Routes>
      </BrowserRouter>
  
    </>
  );
}

export default App
