import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useEffect , useState} from 'react'
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import VideoDetail from "./components/VideoDetail";
import LoginPage from "./components/LoginPage";
import RegistrationPage from './components/RegistrationPage'
import HomePage from "./components/HomePage";
import History from "./components/History"
import SearchDetails from './components/SearchDetails'
import Admin from "./components/Pages/Admin";
import { Footer } from "./components/Footer";
import ChannelDetail from "./components/ChannelDetail";
import { AboutUs } from "./components/AboutUs";
import { Contact } from "./components/Contact";
export default function App() {

  const [userData , setUserData] = useState([])

  useEffect(()=>{
    setUserData(localStorage.getItem("userName"))
    console.log(userData)
  } , [])

  return (
    <BrowserRouter>
      <div className="App">
        {
          userData ? <Navbar />:null
        }
        <Routes>
          <Route path="/" element={userData ? <Feed/> :<HomePage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/video/:videoId" element={<VideoDetail />} />
          <Route path="/search/:searchTerm" element={<SearchDetails />} />
          <Route path="/channel/:channelId" element={<ChannelDetail />} />
          <Route path="/history" element={<History/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
        {
          userData ? <Footer />:null
        }
      </div>
    </BrowserRouter>
  );
}
