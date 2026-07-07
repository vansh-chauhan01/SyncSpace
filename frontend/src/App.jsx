import LandingPage from './pages/Landing.jsx'
import Authentication from './pages/Authentication.jsx'
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'

function App() {
  

  return (
    <>
     <div className="app">

        <BrowserRouter>
        <AuthProvider>

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path ="/auth" element={<Authentication/>}/>
          </Routes>

          
        </AuthProvider>
        </BrowserRouter>
        


     </div>
              
    </>
  )
}

export default App
