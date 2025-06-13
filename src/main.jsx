import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<App />} /> {/* 다이나믹 맥스 */}
          <Route path='/Dynamic01' element={<Dynamic01 />} /> {/* 다이나믹1 */}
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
