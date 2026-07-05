import LandingPage from './pages/Landing.jsx'
import {BrowserRouter , Route , Routes} from 'react-router-dom'

function App() {
  

  return (
    <>
     <div className="app">

        <BrowserRouter>

          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>

        </BrowserRouter>


     </div>
              
    </>
  )
}

export default App
