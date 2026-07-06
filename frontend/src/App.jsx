import LandingPage from './pages/Landing.jsx'
import Authentication from './pages/Authentication.jsx'
import {BrowserRouter , Route , Routes} from 'react-router-dom'

function App() {
  

  return (
    <>
     <div className="app">

        <BrowserRouter>

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path ="/auth" element={<Authentication/>}/>
          </Routes>

        </BrowserRouter>


     </div>
              
    </>
  )
}

export default App
