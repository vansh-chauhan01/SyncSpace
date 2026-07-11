import LandingPage from './pages/Landing.jsx'
import Authentication from './pages/Authentication.jsx'
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import VideoMeet from './pages/VideoMeet.jsx'
import Home from './pages/Home.jsx';


function App() {
  

  return (
    <>
     <div className="app">

        <BrowserRouter>
        <AuthProvider>

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path ="/auth" element={<Authentication/>}/>
            <Route path='/:url' element = {<VideoMeet/>} />
            <Route path='/home' element = {<Home/>} />
          </Routes>


        </AuthProvider>
        </BrowserRouter>
        


     </div>
              
    </>
  )
}

export default App
